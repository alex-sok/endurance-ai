#!/usr/bin/env node
/**
 * One-shot extraction of US interstate highway geometry from OpenStreetMap
 * via the Overpass API.
 *
 *   node scripts/extract-interstates.mjs
 *
 * For each interstate in INTERSTATES below, queries OSM for all ways
 * tagged `highway=motorway` with the matching `ref`, dumps the way
 * geometries, projects them from lon/lat to the /logistics §6 SVG
 * viewBox (800×480, equirectangular fit to the continental US),
 * simplifies via Ramer–Douglas–Peucker, and writes a typed TS module
 * to app/logistics/data/interstates.ts.
 *
 * Data © OpenStreetMap contributors, ODbL 1.0. The map credits OSM
 * via a small attribution line beneath the visual.
 *
 * Re-run any time you want to refresh the geometry. The output file
 * is the source of truth committed to the repo — the page itself
 * does NOT call Overpass at runtime.
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "..", "app", "logistics", "data", "interstates.ts");
const CACHE_DIR = resolve(__dirname, ".overpass-cache");

// Interstates we surface in §6. Order = ignition order on scroll.
// `ref` matches OSM's network=US:I tagging — just the highway number,
// no "I " prefix. That's how OSM stores route relations canonically.
const INTERSTATES = [
  { id: "i95", ref: "95", label: "I-95", name: "Northeast Corridor" },
  { id: "i10", ref: "10", label: "I-10", name: "Southern Corridor" },
  { id: "i80", ref: "80", label: "I-80", name: "Transcontinental" },
  { id: "i75", ref: "75", label: "I-75", name: "Midwest → Southeast" },
  { id: "i35", ref: "35", label: "I-35", name: "Texas Triangle ↑" },
];

// Continental US bbox (south, west, north, east). Excludes AK/HI/PR.
const BBOX = { s: 24, w: -125, n: 49, e: -66 };

// SVG viewBox of the §6 map. Matches AnimatedMarketMap.tsx.
const VIEW_W = 800;
const VIEW_H = 480;

// Internal margin so paths don't kiss the edges.
const MARGIN_X = 20;
const MARGIN_Y = 30;

/** Equirectangular projection — fine at continental scale. */
function project(lon, lat) {
  const xRange = BBOX.e - BBOX.w;
  const yRange = BBOX.n - BBOX.s;
  const x =
    MARGIN_X + ((lon - BBOX.w) / xRange) * (VIEW_W - 2 * MARGIN_X);
  // Flip Y because SVG y grows down.
  const y =
    MARGIN_Y + ((BBOX.n - lat) / yRange) * (VIEW_H - 2 * MARGIN_Y);
  return [x, y];
}

/**
 * Ramer–Douglas–Peucker line simplification. Removes points whose
 * perpendicular distance from the line between the two anchors is
 * below `epsilon`. Returns a subset of the original points.
 */
function simplify(points, epsilon) {
  if (points.length < 3) return points;
  // Find the point with the max perpendicular distance.
  let maxDist = 0;
  let index = 0;
  const [x1, y1] = points[0];
  const [x2, y2] = points[points.length - 1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lineLen = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    // Perpendicular distance from point to line.
    const dist = Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / lineLen;
    if (dist > maxDist) {
      maxDist = dist;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = simplify(points.slice(0, index + 1), epsilon);
    const right = simplify(points.slice(index), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [points[0], points[points.length - 1]];
}

/** Convert a polyline to an SVG `d` attribute string. */
function toPathD(points) {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    d += `L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

// Several public Overpass mirrors — we round-robin on failure. Continental
// interstate queries are heavy, so any one mirror can refuse with 504.
// The main overpass-api.de endpoint returns 406 against fetch's default
// Accept header and even against curl, so we skip it. The openstreetmap.fr
// mirror is the most reliable for relation queries.
const OVERPASS_MIRRORS = [
  "https://overpass.openstreetmap.fr/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.osm.ch/api/interpreter",
];

/** Query Overpass for all motorway ways with the matching interstate ref.
 *  Tries each mirror with exponential backoff on transient failures.
 *  Cached results in scripts/.overpass-cache/ so reruns are instant. */
async function fetchInterstate(ref) {
  const cachePath = resolve(
    CACHE_DIR,
    `${ref.replace(/\s+/g, "-")}.json`,
  );
  if (existsSync(cachePath)) {
    console.log(`(cached) `);
    return JSON.parse(readFileSync(cachePath, "utf8"));
  }

  // Query the canonical OSM route relations for this interstate
  // (network=US:I, ref=<num>). One relation per state per direction.
  // `out geom` resolves each relation's member ways inline so we get
  // the full polyline geometry without a second round-trip.
  const query = `
    [out:json][timeout:300];
    relation["type"="route"]["route"="road"]["network"="US:I"]["ref"="${ref}"];
    out geom;
  `;
  const body = new URLSearchParams({ data: query }).toString();

  let lastErr;
  for (let attempt = 0; attempt < OVERPASS_MIRRORS.length * 2; attempt++) {
    const url = OVERPASS_MIRRORS[attempt % OVERPASS_MIRRORS.length];
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "endurance-ai-labs/1.0 (one-shot extraction)",
          Accept: "application/json",
        },
        body,
      });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`${res.status} from ${new URL(url).host}`);
      }
      // Overpass sometimes returns 200 with an XML error body when busy.
      if (text.includes("runtime error") || text.startsWith("<")) {
        throw new Error(`server-busy from ${new URL(url).host}`);
      }
      const json = JSON.parse(text);
      mkdirSync(CACHE_DIR, { recursive: true });
      writeFileSync(cachePath, JSON.stringify(json.elements ?? []));
      return json.elements ?? [];
    } catch (e) {
      lastErr = e;
      const wait = Math.min(30, 4 * Math.pow(1.6, Math.floor(attempt / OVERPASS_MIRRORS.length)));
      process.stdout.write(`(retry in ${wait}s: ${e.message}) `);
      await new Promise((r) => setTimeout(r, wait * 1000));
    }
  }
  throw lastErr ?? new Error(`all mirrors failed for ${ref}`);
}

/**
 * Stitch the ordered way-members of a single relation into one long
 * polyline. Each OSM "way" along a route relation is a short ~mile
 * segment; concatenating them gives one continuous polyline per
 * state-relation, which then simplifies cleanly with RDP.
 */
function stitchRelation(relation) {
  const points = [];
  for (const m of relation.members ?? []) {
    if (m.type !== "way" || !m.geometry) continue;
    for (let i = 0; i < m.geometry.length; i++) {
      const p = m.geometry[i];
      const last = points[points.length - 1];
      // Skip duplicate join points where one way ends and the next begins.
      if (last && last.lon === p.lon && last.lat === p.lat) continue;
      points.push(p);
    }
  }
  return points;
}

/**
 * Process a single relation (one state-direction segment of an interstate)
 * into a projected, simplified SVG polyline.
 */
function processRelation(relation) {
  const stitched = stitchRelation(relation);
  if (stitched.length < 2) return null;
  const projected = stitched.map((p) => project(p.lon, p.lat));
  // Epsilon ~3 SVG units ≈ ~12 miles — preserves the gross shape of
  // each state segment while collapsing thousands of micro-curves.
  const simplified = simplify(projected, 3);
  if (simplified.length < 2) return null;
  return simplified;
}

/**
 * Filter relations to one direction per state. North/south relations
 * cover the same geometry — keeping both doubles the path count for
 * no visual gain. Prefer direction=north; otherwise relations without
 * an explicit direction.
 */
function preferredDirection(relations) {
  // Group by state (rough heuristic — `is_in:state` tag).
  const byState = new Map();
  for (const r of relations) {
    if (r.type !== "relation") continue;
    const state =
      r.tags?.["is_in:state"] ??
      r.tags?.["is_in:state_code"] ??
      r.tags?.description ??
      "";
    if (!byState.has(state)) byState.set(state, []);
    byState.get(state).push(r);
  }
  const kept = [];
  for (const [, group] of byState) {
    // Prefer northbound, then no-direction, then any.
    const north = group.find((r) => r.tags?.direction === "north");
    const none = group.find((r) => !r.tags?.direction);
    kept.push(north ?? none ?? group[0]);
  }
  return kept;
}

async function main() {
  console.log("Extracting US interstate geometry from OpenStreetMap…");

  const results = [];
  for (const it of INTERSTATES) {
    process.stdout.write(`  ${it.label}… `);
    let elements;
    try {
      elements = await fetchInterstate(it.ref);
    } catch (e) {
      console.error(`\n  ! ${it.label} failed:`, e.message);
      throw e;
    }
    const oneDirectionPerState = preferredDirection(elements);
    const segments = oneDirectionPerState
      .map(processRelation)
      .filter((s) => s !== null);
    // Be polite — pause briefly between queries so we don't trip
    // Overpass's per-IP rate limit.
    await new Promise((r) => setTimeout(r, 1500));

    const ds = segments.map(toPathD);
    const totalPoints = segments.reduce((acc, s) => acc + s.length, 0);
    console.log(`${segments.length} ways, ${totalPoints} points`);
    results.push({ ...it, ds });
  }

  const ts = `// AUTO-GENERATED by scripts/extract-interstates.mjs — do not edit by hand.
// Source: OpenStreetMap contributors, ODbL 1.0.
// Re-run: \`node scripts/extract-interstates.mjs\` from the repo root.

export interface InterstateCorridor {
  id: string;
  ref: string;
  label: string;
  name: string;
  /** SVG path d-attributes — one per OSM way. */
  ds: readonly string[];
}

export const interstateCorridors: readonly InterstateCorridor[] = ${JSON.stringify(
    results,
    null,
    2,
  ).replace(/"([a-z0-9]+)":/gi, "$1:")} as const;

export const interstateViewBox = { width: ${VIEW_W}, height: ${VIEW_H} } as const;
`;

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, ts);
  console.log(`\nWrote ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

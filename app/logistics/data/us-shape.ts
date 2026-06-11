/**
 * Continental US outline + helpers, shared by the WebGL hero.
 *
 * The polygon is the same hand-traced perimeter used by §6's
 * AnimatedMarketMap (kept duplicated there on purpose — the map owns its
 * own copy so the two visuals can evolve independently). Coordinates are
 * projected into the same 800×480 SVG space as `market-map.ts` cities,
 * so the hero constellation and the §6 map share one geography.
 */

const BBOX = { s: 24, w: -125, n: 49, e: -66 } as const;
export const SVG_W = 800;
export const SVG_H = 480;
const MX = 20;
const MY = 30;

function proj(lon: number, lat: number): { x: number; y: number } {
  return {
    x: MX + ((lon - BBOX.w) / (BBOX.e - BBOX.w)) * (SVG_W - 2 * MX),
    y: MY + ((BBOX.n - lat) / (BBOX.n - BBOX.s)) * (SVG_H - 2 * MY),
  };
}

const US_PERIM: ReadonlyArray<readonly [number, number]> = [
  [-123.3, 49.0], [-117.0, 49.0], [-110.0, 49.0], [-104.0, 49.0],
  [-97.0, 49.0], [-95.15, 49.4], [-95.0, 49.0], [-89.5, 48.0],
  [-84.5, 46.5], [-83.0, 46.0], [-83.5, 45.0], [-82.5, 43.0],
  [-82.5, 42.3], [-79.0, 43.3], [-76.5, 43.4], [-75.0, 44.8],
  [-71.5, 45.0], [-69.0, 47.5], [-67.8, 45.7],
  // Atlantic coast
  [-67.3, 44.6], [-69.9, 43.7], [-70.8, 42.4], [-71.7, 41.5],
  [-72.7, 41.1], [-73.7, 40.7], [-74.2, 40.5], [-74.4, 39.5],
  [-75.1, 38.4], [-75.3, 37.0], [-76.4, 34.7], [-78.0, 33.8],
  [-80.5, 32.0], [-81.3, 30.8], [-80.8, 28.5], [-80.1, 25.8],
  [-81.2, 24.6],
  // Gulf coast
  [-82.0, 25.9], [-82.7, 27.7], [-83.7, 29.7], [-85.6, 29.7],
  [-87.2, 30.3], [-88.1, 30.3], [-89.4, 30.2], [-91.0, 29.2],
  [-92.1, 29.6], [-93.8, 29.7], [-95.0, 29.0], [-97.3, 27.8],
  [-97.4, 25.8],
  // TX-Mexico border
  [-99.5, 27.6], [-100.6, 29.0], [-103.0, 29.0], [-104.5, 30.4],
  [-106.5, 31.8], [-108.2, 31.3], [-111.0, 31.3], [-114.8, 32.5],
  // Pacific coast
  [-117.1, 32.5], [-117.7, 33.5], [-118.5, 34.0], [-120.6, 34.5],
  [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39.0], [-124.4, 40.4],
  [-124.0, 43.5], [-124.0, 46.3], [-123.3, 48.4], [-123.3, 49.0],
];

/** US perimeter projected into 800×480 SVG space. */
export const US_POLYGON: ReadonlyArray<{ x: number; y: number }> =
  US_PERIM.map(([lon, lat]) => proj(lon, lat));

/** Even-odd ray-cast point-in-polygon, in SVG space. */
export function insideUS(x: number, y: number): boolean {
  let inside = false;
  const pts = US_POLYGON;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i];
    const b = pts[j];
    if (
      a.y > y !== b.y > y &&
      x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x
    ) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * Evenly spaced dot grid covering the continent. `spacing` is in SVG
 * units; ~6.5 yields ≈3.5k dots — one WebGL draw call as a Points cloud.
 */
export function usGridPoints(spacing = 6.5): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let y = MY; y <= SVG_H - MY; y += spacing) {
    // offset alternate rows for a less mechanical lattice
    const offset = (Math.round(y / spacing) % 2) * spacing * 0.5;
    for (let x = MX + offset; x <= SVG_W - MX; x += spacing) {
      if (insideUS(x, y)) pts.push({ x, y });
    }
  }
  return pts;
}

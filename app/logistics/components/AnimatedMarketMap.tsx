"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";
import {
  interstateCorridors,
  interstateViewBox,
} from "../data/interstates";

/**
 * §6 Market — animated SVG continental US with real interstate geometry.
 *
 * Routes are extracted from OpenStreetMap via scripts/extract-interstates.mjs
 * and committed to app/logistics/data/interstates.ts. The page itself
 * never calls Overpass — the data is static.
 *
 * As the section scrolls into view, the corridors ignite one-by-one
 * (stroke-dashoffset draws each interstate's segments together) and
 * the city dots glow on.
 *
 * Data © OpenStreetMap contributors, ODbL 1.0.
 */

/**
 * Equirectangular projection — same constants as the extractor in
 * scripts/extract-interstates.mjs. Anyone adding a city: just provide
 * lon/lat and they land on the right spot.
 */
function project(lon: number, lat: number): { x: number; y: number } {
  const BBOX = { s: 24, w: -125, n: 49, e: -66 } as const;
  const VIEW_W = 800;
  const VIEW_H = 480;
  const MARGIN_X = 20;
  const MARGIN_Y = 30;
  const x =
    MARGIN_X +
    ((lon - BBOX.w) / (BBOX.e - BBOX.w)) * (VIEW_W - 2 * MARGIN_X);
  const y =
    MARGIN_Y + ((BBOX.n - lat) / (BBOX.n - BBOX.s)) * (VIEW_H - 2 * MARGIN_Y);
  return { x, y };
}

// City junction dots — coordinates from Wikipedia. Real lon/lat run
// through the same projection as the interstate geometry, so they
// land on the actual highway intersections.
const CITY_NODES = [
  { lon: -71.06, lat: 42.36, label: "BOS" },
  { lon: -74.01, lat: 40.71, label: "NYC" },
  { lon: -77.04, lat: 38.91, label: "DC" },
  { lon: -80.19, lat: 25.76, label: "MIA" },
  { lon: -118.24, lat: 34.05, label: "LA" },
  { lon: -81.66, lat: 30.33, label: "JAX" },
  { lon: -122.42, lat: 37.77, label: "SF" },
  { lon: -83.05, lat: 42.33, label: "DET" },
  { lon: -93.27, lat: 44.98, label: "MSP" },
  { lon: -95.37, lat: 29.76, label: "HOU" },
  { lon: -84.39, lat: 33.75, label: "ATL" },
  { lon: -90.05, lat: 35.15, label: "MEM" },
  { lon: -87.62, lat: 41.88, label: "CHI" },
  { lon: -104.99, lat: 39.74, label: "DEN" },
].map((c) => ({ ...c, ...project(c.lon, c.lat) }));

// Corridor labels — likewise projected from a representative lat/lon
// near the highway's most legible spot (often the north terminus).
const CORRIDOR_LABELS = [
  { label: "I-95", lon: -69.0, lat: 44.0 }, // ME
  { label: "I-10", lon: -116.0, lat: 33.0 }, // CA-AZ
  { label: "I-80", lon: -124.0, lat: 38.5 }, // CA
  { label: "I-75", lon: -84.5, lat: 45.5 }, // Northern MI
  { label: "I-35", lon: -97.0, lat: 46.5 }, // Northern MN
].map((c) => ({ ...c, ...project(c.lon, c.lat) }));

export function AnimatedMarketMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // One ignition group per interstate corridor. Each group contains
    // many short SVG paths (one per OSM way). We collect them all and
    // animate their stroke-dashoffset in unison.
    const corridorGroups = interstateCorridors.map(({ id }) => ({
      id,
      paths: Array.from(
        svg.querySelectorAll<SVGPathElement>(
          `[data-corridor="${id}"] path`,
        ),
      ),
    }));

    // Pre-compute stroke length per path so dashoffset works.
    for (const { paths } of corridorGroups) {
      for (const path of paths) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      }
    }

    const cities = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-market-city"),
    );

    if (prefersReducedMotion()) {
      for (const { paths } of corridorGroups) {
        for (const path of paths) path.style.strokeDashoffset = "0";
      }
      cities.forEach((g) => g.setAttribute("opacity", "1"));
      return;
    }

    cities.forEach((g) => g.setAttribute("opacity", "0"));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 75%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      // Each interstate's paths ignite together; the interstates stagger.
      corridorGroups.forEach(({ paths }, i) => {
        tl.to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          i * 0.22,
        );
      });

      // City dots pop in once the first couple of corridors are lit.
      tl.fromTo(
        cities,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.04,
          transformOrigin: "center",
        },
        0.6,
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${interstateViewBox.width} ${interstateViewBox.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="US freight corridors map — real interstate geometry from OpenStreetMap"
    >
      <defs>
        <pattern
          id="logi-market-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="rgba(245,242,236,0.04)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="logi-market-city-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        width={interstateViewBox.width}
        height={interstateViewBox.height}
        fill="url(#logi-market-grid)"
      />

      {/* Interstate corridors — real geometry, one group per highway,
          one path per OSM way. Width tapers slightly from I-95 down
          so the visual hierarchy reads. */}
      {interstateCorridors.map((corridor, i) => (
        <g
          key={corridor.id}
          data-corridor={corridor.id}
          fill="none"
          stroke="var(--logi-signal)"
          strokeWidth={2.8 - i * 0.15}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        >
          {corridor.ds.map((d, j) => (
            <path key={`${corridor.id}-${j}`} d={d} />
          ))}
        </g>
      ))}

      {/* City junction dots */}
      <g>
        {CITY_NODES.map((c, i) => (
          <g
            key={i}
            className="logi-market-city"
            transform={`translate(${c.x} ${c.y})`}
          >
            <circle r="10" fill="url(#logi-market-city-glow)" />
            <circle r="2.5" fill="var(--logi-signal)" />
          </g>
        ))}
      </g>

      {/* Corridor labels — same equirectangular projection so they
          land near each interstate's actual northern/coastal endpoint. */}
      <g
        fontFamily="var(--logi-font-mono, monospace)"
        fontSize="11"
        fill="var(--logi-fg-muted)"
        letterSpacing="0.1em"
      >
        {CORRIDOR_LABELS.map((l) => (
          <text key={l.label} x={l.x} y={l.y}>
            {l.label}
          </text>
        ))}
      </g>
    </svg>
  );
}

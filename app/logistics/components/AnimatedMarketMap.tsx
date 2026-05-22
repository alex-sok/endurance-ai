"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/animations";

/**
 * §6 Market — dark map SVG with an animated I-95 freight route.
 *
 * Visual story: a single truck runs NYC→MIA. The AI detects a missed
 * check-in at Charlotte and auto-escalates. That alert card slides in
 * as the route draws through CLT, then the route completes into Miami.
 *
 * No tiles, no API keys. The US land shape is a pre-projected SVG path
 * using the same equirectangular formula as the rest of the page.
 */

/* ── Projection ─────────────────────────────────────────────────────── */

const BBOX = { s: 24, w: -125, n: 49, e: -66 } as const;
const VW = 800, VH = 480, MX = 20, MY = 30;

function proj(lon: number, lat: number) {
  return {
    x: MX + ((lon - BBOX.w) / (BBOX.e - BBOX.w)) * (VW - 2 * MX),
    y: MY + ((BBOX.n - lat) / (BBOX.n - BBOX.s)) * (VH - 2 * MY),
  };
}

function closedPath(pts: ReadonlyArray<readonly [number, number]>): string {
  if (!pts.length) return "";
  const f = proj(pts[0][0], pts[0][1]);
  let d = `M${f.x.toFixed(1)},${f.y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = proj(pts[i][0], pts[i][1]);
    d += `L${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }
  return d + "Z";
}

/* ── US land outline (hand-traced, clockwise from Pacific NW) ──────── */

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

const US_D = closedPath(US_PERIM);

/* ── I-95 corridor route — NYC → DC → Charlotte → Atlanta → MIA ───── */

const RAW_WAYPOINTS = [
  { id: "nyc", label: "NYC", lon: -74.01, lat: 40.71, thresh: 0 },
  { id: "dc",  label: "DC",  lon: -77.04, lat: 38.91, thresh: 0.15 },
  /** Charlotte: check-in missed → alert fires here */
  { id: "clt", label: "CLT", lon: -80.84, lat: 35.23, thresh: 0.39, alert: true },
  { id: "atl", label: "ATL", lon: -84.39, lat: 33.75, thresh: 0.55 },
  { id: "jax", label: "JAX", lon: -81.66, lat: 30.33, thresh: 0.76 },
  { id: "mia", label: "MIA", lon: -80.19, lat: 25.76, thresh: 1.0 },
] as const;

const WAYPOINTS = RAW_WAYPOINTS.map((w) => ({ ...w, ...proj(w.lon, w.lat) }));

// M/L path that GSAP will drive with stroke-dashoffset
const ROUTE_D = WAYPOINTS.reduce(
  (d, w, i) =>
    i === 0
      ? `M${w.x.toFixed(1)},${w.y.toFixed(1)}`
      : `${d}L${w.x.toFixed(1)},${w.y.toFixed(1)}`,
  "",
);

const DRAW_DUR = 2.6; // seconds — total route draw time

/* ── Component ──────────────────────────────────────────────────────── */

export function AnimatedMarketMap() {
  const svgRef    = useRef<SVGSVGElement>(null);
  const routeRef  = useRef<SVGPathElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const svg    = svgRef.current;
    const route  = routeRef.current;
    const card   = cardRef.current;
    const replay = replayRef.current;
    if (!svg || !route || !card || !replay) return;

    const len = route.getTotalLength();
    route.style.strokeDasharray  = `${len}`;
    route.style.strokeDashoffset = `${len}`;

    // City dots — start invisible
    const dots = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-market-city"),
    );
    dots.forEach((g) => gsap.set(g, { opacity: 0, scale: 0 }));

    if (prefersReducedMotion()) {
      route.style.strokeDashoffset = "0";
      dots.forEach((g) => gsap.set(g, { opacity: 1, scale: 1 }));
      gsap.set(card, { opacity: 1, x: 0 });
      gsap.set(replay, { opacity: 1 });
      return;
    }

    gsap.set(card,   { opacity: 0, x: -16 });
    gsap.set(replay, { opacity: 0 });

    function buildTl() {
      const tl = gsap.timeline({ paused: true });

      // 1 — draw the route
      tl.to(route, {
        strokeDashoffset: 0,
        duration: DRAW_DUR,
        ease: "none",
      }, 0);

      // 2 — city dots pop in at each waypoint's threshold
      WAYPOINTS.forEach((w) => {
        const dot = svg!.querySelector<SVGGElement>(`[data-city="${w.id}"]`);
        if (!dot) return;
        tl.to(dot, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(2)",
          transformOrigin: "center",
        }, w.thresh * DRAW_DUR);
      });

      // 3 — alert card slides in at Charlotte threshold
      const cltThresh = WAYPOINTS.find((w) => "alert" in w && w.alert)?.thresh ?? 0.39;
      tl.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      }, cltThresh * DRAW_DUR + 0.1);

      // 4 — replay button fades in after route completes
      tl.to(replay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, DRAW_DUR + 0.4);

      return tl;
    }

    tlRef.current = buildTl();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 72%",
        onEnter: () => tlRef.current?.play(),
        onLeaveBack: () => {
          tlRef.current?.pause(0);
          // reset card/replay for re-entry
          gsap.set(card,   { opacity: 0, x: -16 });
          gsap.set(replay, { opacity: 0 });
        },
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  function handleReplay() {
    tlRef.current?.restart();
  }

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="I-95 freight corridor — NYC to Miami"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <defs>
          {/* Grid dots texture */}
          <pattern id="logi-map-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.6" fill="rgba(245,242,236,0.06)" />
          </pattern>
          {/* City glow */}
          <radialGradient id="logi-city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--logi-signal)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
          </radialGradient>
          {/* Route glow filter */}
          <filter id="logi-route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean background */}
        <rect width={VW} height={VH} fill="#060d18" />

        {/* US land */}
        <path
          d={US_D}
          fill="#0e1a26"
          stroke="#1c2e40"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Dot grid texture over land */}
        <rect width={VW} height={VH} fill="url(#logi-map-dots)" />

        {/* I-95 corridor — animated route */}
        <path
          ref={routeRef}
          d={ROUTE_D}
          fill="none"
          stroke="var(--logi-signal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logi-route-glow)"
          opacity="0.95"
        />

        {/* City waypoint dots */}
        {WAYPOINTS.map((w) => (
          <g
            key={w.id}
            data-city={w.id}
            className="logi-market-city"
            transform={`translate(${w.x.toFixed(1)},${w.y.toFixed(1)})`}
          >
            <circle r="12" fill="url(#logi-city-glow)" />
            <circle r="3" fill="var(--logi-signal)" />
            <text
              y={-13}
              textAnchor="middle"
              fontFamily="var(--logi-font-mono, monospace)"
              fontSize="9"
              letterSpacing="0.08em"
              fill="var(--logi-fg-muted)"
            >
              {w.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Alert card — absolutely positioned over the map (top-left corner) */}
      <div ref={cardRef} className="logi-market__alert" aria-live="polite">
        <div className="logi-market__alert-dot" aria-hidden="true" />
        <div className="logi-market__alert-body">
          <p className="logi-market__alert-headline">No check-in &middot; 4h 22m</p>
          <p className="logi-market__alert-detail">
            Load #4721 &middot; NYC&rarr;MIA &middot; $220K cargo
          </p>
          <p className="logi-market__alert-action">
            Endurance AI escalated &rarr; 3 min
          </p>
        </div>
      </div>

      {/* Replay button */}
      <button
        ref={replayRef}
        className="logi-market__replay logi-mono"
        onClick={handleReplay}
        aria-label="Replay animation"
      >
        <span aria-hidden="true">↺</span> Replay
      </button>
    </>
  );
}

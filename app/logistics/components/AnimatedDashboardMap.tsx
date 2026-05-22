"use client";

import { useEffect, useRef } from "react";
import { dispatcherKpis } from "../data/product";
import {
  gsap,
  pointOnPath,
  prefersReducedMotion,
} from "../lib/animations";

/**
 * §4 Product — the dashboard map.
 *
 * Static SVG map (Mapbox opt-in lives at app/logistics/components/MapboxDashboardMap.tsx,
 * auto-selected by Product.tsx when NEXT_PUBLIC_MAPBOX_TOKEN is set).
 *
 * 12 trucks loop along 3 SVG lane paths. Negative GSAP delay staggers
 * their start positions without needing GSAP's `modifier` or MotionPath
 * (which would pull in Club plugins). Truck orientation tracks the path
 * tangent so they always face forward.
 *
 * Reduced motion: trucks render at their static offset positions, no
 * tweens. The dashboard still reads as "12 live loads on the network."
 */

const LANE_PATHS = [
  { id: "logi-lane-1", d: "M80,360 C200,300 320,340 460,260 S680,200 740,160" },
  { id: "logi-lane-2", d: "M100,140 C220,200 360,180 480,240 S680,320 760,360" },
  { id: "logi-lane-3", d: "M120,260 L300,260 L380,180 L600,180" },
];

// lane: which path the truck rides
// offset: where on the path (0..1) it starts
// duration: seconds for one full pass — variation keeps the eye moving
const TRUCKS = [
  { lane: 0, offset: 0.0, duration: 14 },
  { lane: 0, offset: 0.28, duration: 16 },
  { lane: 0, offset: 0.55, duration: 13 },
  { lane: 0, offset: 0.82, duration: 15 },
  { lane: 1, offset: 0.1, duration: 17 },
  { lane: 1, offset: 0.4, duration: 14 },
  { lane: 1, offset: 0.66, duration: 16 },
  { lane: 1, offset: 0.9, duration: 13 },
  { lane: 2, offset: 0.0, duration: 11 },
  { lane: 2, offset: 0.3, duration: 13 },
  { lane: 2, offset: 0.6, duration: 12 },
  { lane: 2, offset: 0.85, duration: 14 },
];

export function AnimatedDashboardMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = LANE_PATHS.map(
      ({ id }) => svg.querySelector(`#${id}`) as SVGPathElement | null,
    );
    const trucks = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-dashboard-truck"),
    );
    const reduced = prefersReducedMotion();

    // Position trucks immediately at their starting offsets so there's
    // no first-frame flash at (0,0).
    trucks.forEach((g, i) => {
      const cfg = TRUCKS[i];
      const path = paths[cfg.lane];
      if (!path) return;
      const { x, y, angle } = pointOnPath(path, cfg.offset);
      g.setAttribute("transform", `translate(${x} ${y}) rotate(${angle})`);
    });

    if (reduced) return;

    const ctx = gsap.context(() => {
      trucks.forEach((g, i) => {
        const cfg = TRUCKS[i];
        const path = paths[cfg.lane];
        if (!path) return;
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          duration: cfg.duration,
          ease: "none",
          repeat: -1,
          // Negative delay starts the tween already in progress — that's
          // how we stagger trucks without a wrapping modifier.
          delay: -cfg.duration * cfg.offset,
          onUpdate: () => {
            const { x, y, angle } = pointOnPath(path, state.p);
            g.setAttribute("transform", `translate(${x} ${y}) rotate(${angle})`);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="logi-mapgrid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="rgba(245,242,236,0.05)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="logi-truck-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint grid */}
      <rect width="800" height="480" fill="url(#logi-mapgrid)" />

      {/* Lane paths */}
      <g
        stroke="var(--logi-signal-dim)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      >
        {LANE_PATHS.map(({ id, d }) => (
          <path key={id} id={id} d={d} />
        ))}
      </g>

      {/* Trucks. Each is a small group containing a glow halo + a tiny
          rectangle hull. The group's `transform` is driven by the
          requestAnimationFrame loop above. Initial transform set in
          effect to avoid a (0,0) flash. */}
      {TRUCKS.map((_, i) => (
        <g key={i} className="logi-dashboard-truck">
          <circle r="11" fill="url(#logi-truck-glow)" />
          <rect
            x="-5"
            y="-2.5"
            width="10"
            height="5"
            fill="var(--logi-signal)"
            rx="0.5"
          />
          <rect x="3" y="-1.25" width="2" height="2.5" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

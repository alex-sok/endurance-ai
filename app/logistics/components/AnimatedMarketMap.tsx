"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";

/**
 * §6 Market — animated SVG continental US.
 *
 * Five interstate corridors drawn as SVG paths. As the section scrolls
 * into view, the corridors ignite one-by-one (stroke-dashoffset draws
 * them in), then the major-city junction dots glow on. The whole thing
 * stays inside the existing logistics visual language (amber on near-
 * black), no Mapbox dependency.
 *
 * Reduced motion: all five corridors render fully lit immediately.
 */

const CORRIDORS = [
  {
    id: "logi-corr-i95",
    name: "I-95",
    label: "Northeast Corridor",
    d: "M740,98 Q745,140 720,180 T675,280 Q655,330 660,410",
  },
  {
    id: "logi-corr-i10",
    name: "I-10",
    label: "Southern Corridor",
    d: "M120,330 Q210,360 280,360 T440,378 Q560,388 680,380",
  },
  {
    id: "logi-corr-i80",
    name: "I-80",
    label: "Transcontinental",
    d: "M95,240 Q200,200 320,180 T540,150 Q650,140 745,130",
  },
  {
    id: "logi-corr-i75",
    name: "I-75",
    label: "Midwest → Southeast",
    d: "M520,150 Q540,220 570,280 T620,360 Q640,395 645,410",
  },
  {
    id: "logi-corr-i35",
    name: "I-35",
    label: "Texas Triangle ↑",
    d: "M430,140 Q420,220 405,280 T380,360 Q360,395 340,420",
  },
];

const CITY_NODES = [
  { x: 740, y: 98, label: "BOS" },
  { x: 730, y: 135, label: "NYC" },
  { x: 690, y: 230, label: "DC" },
  { x: 660, y: 410, label: "MIA" },
  { x: 130, y: 330, label: "LA" },
  { x: 680, y: 380, label: "JAX" },
  { x: 95, y: 240, label: "SF" },
  { x: 540, y: 150, label: "DET" },
  { x: 430, y: 140, label: "MSP" },
  { x: 380, y: 360, label: "HOU" },
  { x: 580, y: 320, label: "ATL" },
  { x: 490, y: 290, label: "MEM" },
];

export function AnimatedMarketMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const corridors = CORRIDORS.map(
      ({ id }) => svg.querySelector(`#${id}`) as SVGPathElement | null,
    ).filter((p): p is SVGPathElement => !!p);

    const cities = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-market-city"),
    );

    // Set initial state — corridors fully invisible via dashoffset,
    // cities at opacity 0 + small scale. Reduced motion gets the
    // final state immediately and bails.
    corridors.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    if (prefersReducedMotion()) {
      corridors.forEach((path) => {
        path.style.strokeDashoffset = "0";
      });
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
          // Set scrub:true for scroll-linked animation. We use a
          // soft-snap timeline that plays through once on enter so the
          // ignition feels intentional, not jittery on every wheel tick.
          toggleActions: "play none none reverse",
        },
      });

      // Corridors ignite one-by-one, ~0.6s each, slight overlap.
      tl.to(
        corridors,
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.18,
        },
        0,
      );

      // City dots fade up after the first couple of corridors are lit.
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
        0.5,
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="US freight corridors map"
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

      <rect width="800" height="480" fill="url(#logi-market-grid)" />

      {/* Subtle continental silhouette — a few rough lines suggesting
          the US outline. Decorative; the corridors carry the real
          information. */}
      <g
        stroke="rgba(245,242,236,0.08)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      >
        {/* Coastline / borders, very simplified */}
        <path d="M70,210 Q60,150 90,90 L240,80 L420,90 L600,85 L740,90 L760,150 L750,220 Q740,260 720,290 L700,360 Q690,400 660,420 L600,420 L500,425 L380,425 L300,430 Q200,420 150,400 L100,360 Q70,300 70,210 Z" />
      </g>

      {/* Corridors */}
      <g fill="none" strokeLinecap="round">
        {CORRIDORS.map(({ id, d }, i) => (
          <path
            key={id}
            id={id}
            d={d}
            stroke="var(--logi-signal)"
            strokeWidth={3 - i * 0.2}
            opacity={0.95}
          />
        ))}
      </g>

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

      {/* Corridor labels */}
      <g
        fontFamily="var(--logi-font-mono, monospace)"
        fontSize="10"
        fill="var(--logi-fg-muted)"
        letterSpacing="0.1em"
      >
        <text x="755" y="135">I-95</text>
        <text x="145" y="320">I-10</text>
        <text x="100" y="232">I-80</text>
        <text x="555" y="150">I-75</text>
        <text x="385" y="135">I-35</text>
      </g>
    </svg>
  );
}

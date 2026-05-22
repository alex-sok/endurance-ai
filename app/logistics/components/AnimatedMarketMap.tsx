"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";
import { marketMapCities, marketMapLines } from "../data/market-map";

/**
 * §6 Market — minimal animated SVG showing US logistics network.
 *
 * Lines connect cities to form a simplified network. No projection math,
 * no OSM data — just clean geometry that animates on scroll.
 *
 * As the section scrolls into view:
 * - Lines draw in via stroke-dashoffset
 * - City dots scale and fade in with back.out easing
 */

export function AnimatedMarketMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Query all line elements and city groups
    const lines = Array.from(
      svg.querySelectorAll<SVGLineElement>(".logi-market-line"),
    );
    const cities = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-market-city"),
    );

    // Pre-compute stroke length for each line so dashoffset animation works
    for (const line of lines) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
    }

    if (prefersReducedMotion()) {
      // No animation: just show everything
      for (const line of lines) line.style.strokeDashoffset = "0";
      cities.forEach((g) => g.setAttribute("opacity", "1"));
      return;
    }

    // Start with cities invisible
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

      // Lines draw in one-by-one
      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          i * 0.12,
        );
      });

      // Cities pop in once lines start appearing
      tl.fromTo(
        cities,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.05,
          transformOrigin: "center",
        },
        0.3,
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
      aria-label="US logistics network — cities and corridors"
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

      {/* Grid background */}
      <rect width="800" height="480" fill="url(#logi-market-grid)" />

      {/* Network lines — simple connectors between cities */}
      <g
        fill="none"
        stroke="var(--logi-signal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      >
        {marketMapLines.map((line, i) => {
          const fromCity = marketMapCities.find((c) => c.id === line.from);
          const toCity = marketMapCities.find((c) => c.id === line.to);
          if (!fromCity || !toCity) return null;

          return (
            <line
              key={i}
              className="logi-market-line"
              x1={fromCity.x}
              y1={fromCity.y}
              x2={toCity.x}
              y2={toCity.y}
            />
          );
        })}
      </g>

      {/* City junction dots */}
      <g>
        {marketMapCities.map((city) => (
          <g
            key={city.id}
            className="logi-market-city"
            transform={`translate(${city.x} ${city.y})`}
          >
            <circle r="10" fill="url(#logi-market-city-glow)" />
            <circle r="2.5" fill="var(--logi-signal)" />
          </g>
        ))}
      </g>

      {/* City labels */}
      <g
        fontFamily="var(--logi-font-mono, monospace)"
        fontSize="11"
        fill="var(--logi-fg-muted)"
        letterSpacing="0.1em"
      >
        {marketMapCities.map((city) => (
          <text
            key={`label-${city.id}`}
            x={city.x}
            y={city.y - 16}
            textAnchor="middle"
          >
            {city.label}
          </text>
        ))}
      </g>
    </svg>
  );
}

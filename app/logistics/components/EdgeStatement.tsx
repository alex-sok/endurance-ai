"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  prefersReducedMotion,
} from "../lib/v2-motion";

/**
 * §11 "The edge" showpiece — "capital seeds the network".
 *
 * A giant $150M is the visual anchor; behind it an amber network lights
 * up as energy flows OUT from the number into the nodes — the brokerage's
 * capital seeding Endurance. Per DESIGN-V2 the number HARD-CUTS to its
 * final value (no count-up — conviction, not theatre); it only rises in
 * with the reveal. The kicker fades plainly (the page's two scramble
 * slots are spent elsewhere). Line draws, node pops and particle flow
 * keep their behavior; entrances ride the house ease. Reduced-motion
 * jumps straight to the identical final state.
 */

const VW = 1000;
const VH = 560;

type P = { x: number; y: number };

// Source sits behind the number; the field fans up and to the right so the
// lower-left (statement + chips) stays clear and readable.
const S: P = { x: 300, y: 250 };
const N: Record<"a" | "b" | "c" | "d" | "e" | "f" | "g", P> = {
  a: { x: 470, y: 110 },
  b: { x: 520, y: 230 },
  c: { x: 690, y: 150 },
  d: { x: 740, y: 295 },
  e: { x: 625, y: 385 },
  f: { x: 880, y: 220 },
  g: { x: 865, y: 395 },
};

const NODES: P[] = [S, N.a, N.b, N.c, N.d, N.e, N.f, N.g];
const EDGES: [P, P][] = [
  [S, N.b], [S, N.a],
  [N.b, N.c], [N.b, N.d], [N.b, N.e],
  [N.c, N.f], [N.d, N.f], [N.d, N.g], [N.e, N.g],
];
// Edges that carry flowing "capital" particles outward from the source.
const FLOW: [P, P][] = [
  [S, N.b], [N.b, N.c], [N.b, N.d], [N.b, N.e], [N.d, N.f], [N.e, N.g],
];

const dEdge = (a: P, b: P) => `M${a.x},${a.y}L${b.x},${b.y}`;

export function EdgeStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    const lines = Array.from(
      svg.querySelectorAll<SVGPathElement>(".logi-edge-line"),
    );
    const nodes = Array.from(
      svg.querySelectorAll<SVGGElement>(".logi-edge-node"),
    );
    const particles = Array.from(
      svg.querySelectorAll<SVGCircleElement>(".logi-edge-particle"),
    );
    const kicker = root.querySelector<HTMLElement>(".logi-edge__kicker");
    const amount = root.querySelector<HTMLElement>(".logi-edge__amount");
    if (!kicker || !amount) return;

    // Initial state: lines undrawn, nodes + particles hidden, copy staged.
    // (Set at effect time, never in CSS — no-JS and LCP see final content.)
    lines.forEach((ln) => {
      const len = ln.getTotalLength();
      ln.style.strokeDasharray = `${len}`;
      ln.style.strokeDashoffset = `${len}`;
    });
    gsap.set(nodes, { opacity: 0, scale: 0, transformOrigin: "center" });
    gsap.set(particles, { opacity: 0 });
    gsap.set(kicker, { opacity: 0 });
    gsap.set(amount, { opacity: 0, y: 36 });

    if (prefersReducedMotion()) {
      // Identical final state, zero motion. Particles stay hidden.
      lines.forEach((ln) => (ln.style.strokeDashoffset = "0"));
      gsap.set(nodes, { opacity: 1, scale: 1 });
      gsap.set(kicker, { opacity: 1 });
      gsap.set(amount, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = gsap.timeline({ paused: true });
      reveal
        // Kicker fades plainly — no scramble (both page slots are spent).
        .to(kicker, { opacity: 1, duration: 0.7, ease: EASE.out }, 0)
        .to(lines, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: EASE.out,
          stagger: 0.07,
        }, 0)
        // The number never counts — already "150" in the markup, it just
        // rises into place. One confident static figure.
        .to(amount, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: EASE.out,
        }, 0.08)
        .to(nodes, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.06,
        }, 0.35);

      const flows = FLOW.map(([a, b], i) => {
        const dot = particles[i];
        return gsap
          .timeline({ repeat: -1, paused: true, delay: i * 0.42 })
          .set(dot, { attr: { cx: a.x, cy: a.y }, opacity: 0 })
          .to(dot, { opacity: 0.95, duration: 0.25 }, 0)
          .to(dot, { attr: { cx: b.x, cy: b.y }, duration: 1.7, ease: "none" }, 0)
          .to(dot, { opacity: 0, duration: 0.3 }, 1.4);
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top 78%",
        once: true,
        onEnter: () => {
          reveal.play();
          flows.forEach((f) => f.play());
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="logi-edge">
      <svg
        ref={svgRef}
        className="logi-edge__network"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="logi-edge-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
          </radialGradient>
          <filter
            id="logi-edge-line-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map(([a, b], i) => (
          <path
            key={`e${i}`}
            className="logi-edge-line"
            d={dEdge(a, b)}
            fill="none"
            stroke="var(--logi-signal)"
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            filter="url(#logi-edge-line-glow)"
          />
        ))}

        {FLOW.map(([a], i) => (
          <circle
            key={`p${i}`}
            className="logi-edge-particle"
            cx={a.x}
            cy={a.y}
            r="3.2"
            fill="var(--logi-road-line)"
          />
        ))}

        {NODES.map((n, i) => (
          <g
            key={`n${i}`}
            className="logi-edge-node"
            transform={`translate(${n.x},${n.y})`}
          >
            <circle r={i === 0 ? 28 : 16} fill="url(#logi-edge-glow)" />
            <circle r={i === 0 ? 5 : 3} fill="var(--logi-signal)" />
          </g>
        ))}
      </svg>

      <div className="logi-edge__copy">
        <p className="logi-edge__kicker">The best part?</p>
        <div className="logi-edge__amount" aria-label="$150M">
          <span className="logi-edge__cur" aria-hidden="true">$</span>
          <span aria-hidden="true">150</span>
          <span className="logi-edge__unit" aria-hidden="true">M</span>
        </div>
        <p className="logi-edge__caption">Logistics brokerage</p>
        <p className="logi-edge__statement">Seeding Endurance Logistics.</p>
        <div className="logi-edge__chips">
          <span className="logi-edge__chip">Partner</span>
          <span className="logi-edge__chip">Investor</span>
        </div>
      </div>
    </div>
  );
}

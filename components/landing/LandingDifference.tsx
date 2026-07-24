"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const ROWS: [string, string][] = [
  ["The same platform sold to everyone", "Infrastructure built around your operation"],
  ["You adapt to their software", "The software adapts to you"],
  ["Dozens in the room, none who ship", "Senior operators, end-to-end"],
  ["Recommendations deck", "Working system in production"],
  ["Generic model, generic outputs", "A private brain on your proprietary data"],
  ["Avoids regulated industries", "Built for them"],
  ["Generalist consultants", "AI engineers who ship"],
];

export function LandingDifference() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Pinned sequence: three lines surface then recede; the verdict stays.
        const lines = gsap.utils.toArray<HTMLElement>("[data-diff-line]");
        gsap.set(lines, { opacity: 0, y: 30 });
        gsap.set("[data-diff-verdict]", { opacity: 0, y: 36 });
        gsap.set("[data-diff-verdict-sub]", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-diff-pin]",
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.4,
          },
        });

        lines.forEach((line) => {
          tl.to(line, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }).to(
            line,
            { opacity: 0.22, duration: 0.7, ease: "none" },
            "+=0.25"
          );
        });

        tl.to("[data-diff-verdict]", { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" })
          .fromTo(
            "[data-diff-verdict-rule]",
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 1, ease: "power2.inOut" },
            "<+0.3"
          )
          .to("[data-diff-verdict-sub]", { opacity: 1, duration: 0.8 }, "<+0.3");

        // Ledger rows
        gsap.utils.toArray<HTMLElement>("[data-ledger-row]").forEach((row) => {
          gsap.from(row, {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="The difference">
      {/* Pinned positioning sequence */}
      <div data-diff-pin className="flex items-center" style={{ minHeight: "100svh" }}>
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-12">
            The Difference
          </p>

          <div className="space-y-3 md:space-y-4 mb-12">
            {["Consultants advise.", "Integrators implement.", "Enterprise vendors sell one-size software."].map((line) => (
              <p
                key={line}
                data-diff-line
                className="font-display text-bone/90"
                style={{ fontSize: "clamp(2rem, 5vw, 4.2rem)", lineHeight: 1.04 }}
              >
                {line}
              </p>
            ))}
          </div>

          <div data-diff-verdict>
            <p
              className="font-display italic text-bone"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1 }}
            >
              Operators <span className="text-flare">ship.</span>
            </p>
            <span
              data-diff-verdict-rule
              className="block h-px bg-flare/70 mt-8 mb-6 max-w-md"
            />
            <p data-diff-verdict-sub className="text-[15px] text-bone/70 max-w-md leading-relaxed">
              We build software that fits you — not a platform you're forced to
              adapt to. Strategy, architecture, and engineering, in one small,
              senior team.
            </p>
          </div>
        </div>
      </div>

      {/* Ledger: the old model versus ours */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-28 md:pb-36">
        <h2
          className="font-display text-bone mb-14"
          style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)", lineHeight: 1.1 }}
        >
          The old model, <em>versus ours.</em>
        </h2>

        <div
          className="hidden md:grid grid-cols-2 pb-4 gap-x-12 border-b"
          style={{ borderColor: "rgba(244,243,238,0.14)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
            The old model
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-flare">
            Endurance
          </span>
        </div>

        {ROWS.map(([old, ours]) => (
          <div
            key={old}
            data-ledger-row
            className="grid md:grid-cols-2 gap-x-12 gap-y-1 py-5 border-b"
            style={{ borderColor: "rgba(244,243,238,0.08)" }}
          >
            <p className="text-[15px] text-bone/55 line-through decoration-bone/40 decoration-1">
              {old}
            </p>
            <p className="text-[15px] text-bone/85">{ours}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

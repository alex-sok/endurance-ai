"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SEGMENTS = [
  {
    title: "Professional Services",
    body: "Law firms, wealth managers, accounting firms, and consulting firms looking for workflow leverage, knowledge systems, and AI-enabled service delivery without losing the client relationship.",
  },
  {
    title: "Mid-Market Operating Companies",
    body: "Organizations modernizing operations, eliminating friction, and improving scalability, often with disconnected data and limited internal AI capability to draw from.",
  },
  {
    title: "Venture-Backed Companies",
    body: "Founders and product teams building AI-enabled products or navigating build-versus-buy decisions. Speed matters. So does not creating long-term technical debt.",
  },
  {
    title: "Large Enterprises",
    body: "Complex transformation efforts that require focused outside execution capability. Situations where stakeholder complexity and organizational pace make internal-only approaches fail.",
  },
];

export function LandingWho() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-who-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-who-header]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-who-cell]").forEach((cell, i) => {
          gsap.from(cell, {
            autoAlpha: 0,
            y: 26,
            duration: 0.8,
            delay: (i % 2) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: cell, start: "top 88%" },
          });
        });

        gsap.from("[data-who-notfit]", {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-who-notfit]", start: "top 90%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="Who we help">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-who-header className="mb-16 md:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            Who We Help
          </p>
          <h2
            className="font-display text-bone"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            We work with leaders. <em>Not committees.</em>
          </h2>
        </div>

        <div
          className="grid md:grid-cols-2 border-t border-l"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          {SEGMENTS.map((seg, i) => (
            <div
              key={seg.title}
              data-who-cell
              className="border-b border-r p-8 md:p-12"
              style={{ borderColor: "rgba(244,243,238,0.08)" }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-flare block mb-6">
                {String.fromCharCode(65 + i)}
              </span>
              <h3 className="font-display text-bone text-2xl md:text-[1.7rem] mb-4">{seg.title}</h3>
              <p className="text-sm leading-relaxed text-bone/65">{seg.body}</p>
            </div>
          ))}
        </div>

        <div
          data-who-notfit
          className="mt-12 border border-flare/25 p-8 md:p-10"
          style={{ borderRadius: 4 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-flare mb-4">
            Not a fit for
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed text-bone/70 max-w-3xl">
            Generic AI experimentation. The lowest-cost vendor. Software
            shopping. Organizations without executive sponsorship or those not
            prepared to move once a direction is chosen. We work best with
            leaders who are serious about outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

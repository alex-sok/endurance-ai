"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PHASES = [
  {
    name: "Strategic Recon",
    goal: "Find where AI creates meaningful leverage.",
    body: "Understanding the real situation: goals, friction points, technology stack, data landscape, constraints, and previous attempts.",
  },
  {
    name: "Mission Definition",
    goal: "Move from vague ambition to a clear, executable path.",
    body: "Selecting priority opportunities, defining success criteria, clarifying scope, sequencing the work, and identifying architecture needs.",
  },
  {
    name: "Rapid Deployment",
    goal: "Visible operational progress.",
    body: "Building and deploying initial systems: prototypes, data pipelines, automations, AI-assisted workflows, orchestration logic, integrations.",
  },
  {
    name: "Embedding",
    goal: "Durable execution. Not a demo.",
    body: "Making the system work inside the organization: workflow refinement, training, governance, monitoring, feedback loops, and adoption support.",
  },
  {
    name: "Capability Transfer",
    goal: "Capability, not dependency.",
    body: "Internal enablement, documentation, operating rhythms, ownership transition, and roadmap extension so the work sustains itself.",
  },
];

export function LandingProtocol() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current?.querySelector<HTMLElement>("[data-protocol-track]");
        if (!track) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-protocol-pin]",
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-protocol-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-protocol-pin]",
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.5,
          },
        });
      });

      // Mobile / reduced motion: simple stacked reveals.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-phase-panel]").forEach((panel) => {
          gsap.from(panel, {
            autoAlpha: 0,
            y: 28,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%" },
          });
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="How we work">
      <div data-protocol-pin className="lg:h-svh lg:overflow-hidden flex flex-col justify-center py-24 lg:py-0">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 mb-12 lg:mb-16 shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-8">
            How We Work
          </p>
          <h2
            className="font-display text-bone"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Five phases. <em>Real outcomes.</em>
          </h2>
        </div>

        <div
          data-protocol-track
          className="flex flex-col lg:flex-row gap-12 lg:gap-0 lg:w-max lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[14vw] px-6 sm:px-10 lg:px-0"
        >
          {PHASES.map((phase, i) => (
            <article
              key={phase.name}
              data-phase-panel
              className="relative lg:w-[42vw] lg:max-w-2xl lg:shrink-0 lg:pr-20"
            >
              <span
                className="font-display block select-none"
                aria-hidden
                style={{
                  fontSize: "clamp(5rem, 11vw, 10rem)",
                  lineHeight: 0.9,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(244,243,238,0.18)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-6 max-w-md">
                <h3 className="font-display text-bone text-2xl md:text-3xl mb-3">{phase.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-flare mb-5 leading-relaxed">
                  {phase.goal}
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed text-bone/45">{phase.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Progress rule — desktop only */}
        <div className="hidden lg:block max-w-7xl mx-auto w-full px-6 sm:px-10 mt-16 shrink-0">
          <div className="h-px bg-bone/10 relative overflow-hidden">
            <span
              data-protocol-progress
              className="absolute inset-0 bg-flare origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone/30">
              Phase 01 — Recon
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone/30">
              Phase 05 — Transfer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const SERVICES = [
  {
    title: "AI Strategy & Leadership",
    body: "Practical AI roadmaps tied directly to business outcomes. Identifying leverage points, prioritizing high-impact opportunities, defining operating models, and establishing governance.",
  },
  {
    title: "Automation & Workflow Transformation",
    body: "Systems that eliminate bottlenecks and improve throughput. Workflow automation, document-heavy processes, customer operations, internal knowledge systems, decision-support.",
  },
  {
    title: "Architecture & Operating Layer",
    body: "Infrastructure for AI systems to work reliably inside real organizations. Data integration, retrieval, orchestration, model selection, safety, and iteration loops.",
  },
  {
    title: "Internal Capability Building",
    body: "Building the internal capability to sustain the work. Leadership education, team design, governance structures, internal playbooks, and tooling.",
  },
  {
    title: "Initiative Recovery",
    body: "Diagnosing and relaunching stalled or failed AI efforts. Root cause analysis, identifying salvageable assets, resetting scope, and relaunching with a realistic execution path.",
  },
];

export function LandingOperations({ onOpenChat }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-op-row]").forEach((row) => {
          gsap.from(row.querySelector("[data-op-rule]"), {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
          gsap.from(row.querySelectorAll("[data-op-content]"), {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 86%" },
          });
        });

        gsap.from("[data-op-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-op-header]", start: "top 85%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="What we do">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-op-header className="mb-16 md:mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-8">
            What We Do
          </p>
          <h2
            className="font-display text-bone"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Five areas of work. <em>One goal: execution.</em>
          </h2>
        </div>

        <div>
          {SERVICES.map((s, i) => (
            <div key={s.title} data-op-row className="group relative">
              <span data-op-rule className="block h-px w-full bg-bone/10" />
              <div className="grid md:grid-cols-12 gap-y-3 md:gap-x-10 py-9 md:py-12 transition-colors duration-300 group-hover:bg-bone/[0.025]">
                <span
                  data-op-content
                  className="md:col-span-1 font-mono text-[11px] tracking-[0.25em] text-flare/80 pt-1.5"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  data-op-content
                  className="md:col-span-5 font-display text-bone text-2xl md:text-[2rem] leading-tight transition-transform duration-300 md:group-hover:translate-x-2"
                >
                  {s.title}
                </h3>
                <p
                  data-op-content
                  className="md:col-span-6 text-sm md:text-[15px] leading-relaxed text-bone/45 max-w-xl"
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
          <span className="block h-px w-full bg-bone/10" />
        </div>

        <div className="mt-16">
          <Btn variant="light" onClick={onOpenChat}>
            Begin Mission Briefing →
          </Btn>
        </div>
      </div>
    </section>
  );
}

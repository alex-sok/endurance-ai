"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const CASES = [
  {
    before: "20 engineers. 1 year.",
    after: "2 weeks.",
    body: "A team at a major Fortune 500 travel company had been working on a specific problem for a year. We solved it in two weeks. That pattern has held across every major engagement since.",
  },
  {
    before: "6 months of waiting.",
    after: "4 days.",
    body: "A CEO had been waiting six months for his own team to deliver an agentic e-commerce experience. We built it in four days. He's now using it to open doors at Fortune 500 retailers and financial institutions.",
  },
  {
    before: "Regulated industries.",
    after: "Production-ready.",
    body: "Most AI firms quietly avoid regulated environments: pharma, financial services, healthcare. We don't. We've built production AI systems inside them, where breaking things is not an option and compliance is not a suggestion.",
  },
];

export function LandingProof({ onOpenChat }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-proof-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-proof-header]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-case-row]").forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 78%" },
            defaults: { ease: "power3.out" },
          });

          tl.from(row.querySelector("[data-case-before]"), { autoAlpha: 0, y: 18, duration: 0.7 })
            .fromTo(
              row.querySelector("[data-case-strike]"),
              { scaleX: 0 },
              { scaleX: 1, transformOrigin: "left", duration: 0.55, ease: "power2.inOut" },
              "+=0.15"
            )
            .from(
              row.querySelector("[data-case-after]"),
              { autoAlpha: 0, y: 26, duration: 0.8 },
              "-=0.1"
            )
            .from(row.querySelector("[data-case-body]"), { autoAlpha: 0, duration: 0.7 }, "-=0.4");
        });

        gsap.from("[data-proof-nda]", {
          autoAlpha: 0,
          duration: 0.9,
          scrollTrigger: { trigger: "[data-proof-nda]", start: "top 92%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="Proof">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-proof-header className="mb-16 md:mb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-8">
            Field Results
          </p>
          <h2
            className="font-display text-bone"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Results, <em>not presentations.</em>
          </h2>
        </div>

        <div className="space-y-20 md:space-y-28">
          {CASES.map((c) => (
            <div key={c.after} data-case-row className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start">
              <div className="lg:col-span-7">
                <p
                  data-case-before
                  className="relative inline-block font-display text-bone/40 mb-2"
                  style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", lineHeight: 1.1 }}
                >
                  {c.before}
                  <span
                    data-case-strike
                    className="absolute left-0 top-1/2 h-[2px] w-full bg-flare/80"
                    style={{ transform: "scaleX(0)" }}
                    aria-hidden
                  />
                </p>
                <p
                  data-case-after
                  className="font-display italic text-bone"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1 }}
                >
                  → {c.after}
                </p>
              </div>
              <p
                data-case-body
                className="lg:col-span-5 text-sm md:text-[15px] leading-relaxed text-bone/45 lg:pt-4"
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div
          data-proof-nda
          className="mt-20 md:mt-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t pt-10"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/30 max-w-sm leading-relaxed">
            Active engagements with Fortune 500 enterprises. Details shared under NDA.
          </p>
          <Btn variant="light" onClick={onOpenChat} className="shrink-0">
            Begin Mission Briefing →
          </Btn>
        </div>
      </div>
    </section>
  );
}

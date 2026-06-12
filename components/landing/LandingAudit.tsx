"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CALENDLY_URL } from "@/lib/conversation-flows";

interface Props {
  onCtaClick?: (label: string) => void;
}

const BULLETS = [
  "We look at what you're doing and what you're not",
  "We identify where AI generates real ROI, and where it's a waste of money",
  "You walk away with a prioritized roadmap",
  "Whether you work with us afterward or not",
];

export function LandingAudit({ onCtaClick }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-audit-panel]", {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-audit-panel]", start: "top 80%" },
        });
        gsap.from("[data-audit-price]", {
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.8,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-audit-panel]", start: "top 80%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="The AI Audit">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* The one light panel on the page — the briefing document */}
        <div
          data-audit-panel
          className="bg-bone text-ink p-8 sm:p-12 md:p-16 grid lg:grid-cols-12 gap-y-12 lg:gap-x-16"
          style={{ borderRadius: 4 }}
        >
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5f5e57] mb-8">
              Start Here
            </p>
            <h2
              className="font-display mb-8"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.6rem)", lineHeight: 1.05 }}
            >
              AI doesn’t have to be <em>open heart surgery.</em>
            </h2>
            <div className="space-y-5 text-[15px] leading-relaxed text-[#262510]/70 max-w-xl">
              <p>
                A dominant misconception paralyzes capable leadership teams:
                that AI deployment requires a massive enterprise transformation.
                Months of planning. Millions in investment. Everything disrupted
                at once.
              </p>
              <p>
                This belief is false, and it costs real money. AI can be as
                simple as a walk after dinner. Small. Low-risk. High-value.
                Something you do this week.
              </p>
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5f5e57]">
              Not ready for a full engagement? This is how most of ours start.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className="border border-[#262510]/15 p-8 md:p-10 h-full flex flex-col"
              style={{ borderRadius: 4 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5f5e57] mb-6">
                The AI Audit
              </p>
              <p
                data-audit-price
                className="font-display mb-2"
                style={{ fontSize: "clamp(3.4rem, 6vw, 5rem)", lineHeight: 1 }}
              >
                $999
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5f5e57] mb-8">
                Flat fee. One engagement. No retainer.
              </p>

              <ul className="space-y-3.5 mb-8">
                {BULLETS.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-[#262510]/75">
                    <span className="text-flare mt-px shrink-0" aria-hidden>
                      ✦
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-[#5f5e57] mb-8">
                Most companies spending on AI without this are guessing.
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick?.("audit-book")}
                className="mt-auto inline-flex items-center justify-center px-4 py-3 text-xs font-medium uppercase font-mono tracking-[0.1em] bg-ink text-bone hover:bg-[#141414] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                style={{ borderRadius: 4 }}
              >
                Book an AI Audit →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

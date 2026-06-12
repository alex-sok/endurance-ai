"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const FAQS = [
  {
    q: "How long does a typical engagement take?",
    a: "Depends on scope. The AI Audit is one engagement: a prioritized roadmap within a week. The Embedded AI Engineer tiers run 2 weeks, 2 months, or 6 months. We scope work into defined deliverables, not open-ended retainers.",
  },
  {
    q: "What size companies do you work with?",
    a: "Our sweet spot is the mid-market, companies doing $10M to $500M in revenue, but we work across the full range from venture-backed startups to Fortune 500 enterprises. The common thread is leadership that's serious about outcomes and prepared to move.",
  },
  {
    q: "How are you different from a Big 4 consulting firm?",
    a: "Big 4 firms produce recommendations. We produce systems. Their model is analysis and advisory, delivered by large teams, with implementation handled separately. Ours is a small senior team that does both: strategy and build, in the same engagement. We're also faster by an order of magnitude and don't require six-month discovery phases.",
  },
  {
    q: "We already have an internal AI team. Can you still help?",
    a: "Yes, and some of our most productive engagements are alongside internal teams, not instead of them. We're useful for initiatives that have stalled, architectural decisions that need an outside perspective, or situations where speed matters more than the team has capacity for.",
  },
  {
    q: "What does 'embedded' actually mean?",
    a: "It means working inside your organization: in your Slack, your standups, your codebase. Not at arm's length producing deliverables. The work moves faster because we're not waiting on weekly status calls to understand what's changed.",
  },
  {
    q: "We're in a regulated industry. Does that change what you can do?",
    a: "No. We've built production AI systems inside pharmaceuticals, financial services, healthcare, and insurance. Regulated environments require deliberation, not bravado. We build within compliance constraints without sacrificing the outcome.",
  },
  {
    q: "What if we're not sure we're ready for a full engagement?",
    a: "That's exactly what the AI Audit is for. $999 flat fee. We look at your operations, your data, and your goals, and give you a prioritized roadmap. You walk away with clarity, whether you work with us afterward or not.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-scope engagements at flat fees. No hourly billing, no open-ended retainers unless you want them. The AI Audit is $999. Embedded AI Engineer engagements range from $19K to $179K depending on scope and timeline. We price the scope. We deliver it.",
  },
];

export function LandingFAQ({ onOpenChat }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-faq-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-faq-header]", start: "top 85%" },
        });
        gsap.from("[data-faq-item]", {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-faq-list]", start: "top 85%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  function toggle(index: number) {
    setOpen((prev) => (prev === index ? null : index));
    // Accordion height changes shift everything below it.
    setTimeout(() => ScrollTrigger.refresh(), 350);
  }

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="Frequently asked questions">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div data-faq-header className="mb-14 md:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            Questions
          </p>
          <h2
            className="font-display text-bone"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Answered <em>before you have to ask.</em>
          </h2>
        </div>

        <div data-faq-list>
          <span className="block h-px w-full bg-bone/10" />
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} data-faq-item>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-baseline justify-between gap-6 py-6 text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flare"
                >
                  <span className="font-display text-bone text-lg md:text-xl leading-snug group-hover:text-white transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span
                    className="font-mono text-flare text-sm shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-out"
                  style={{ maxHeight: isOpen ? 320 : 0 }}
                >
                  <p className="pb-7 text-sm md:text-[15px] leading-relaxed text-bone/70 max-w-2xl">
                    {faq.a}
                  </p>
                </div>
                <span className="block h-px w-full bg-bone/10" />
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex items-center gap-6">
          <p className="text-sm text-bone/65">Still have questions?</p>
          <Btn variant="ghost-light" onClick={onOpenChat}>
            Ask Grace →
          </Btn>
        </div>
      </div>
    </section>
  );
}

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
    a: "Weeks to a few months, scoped into fixed deliverables — not open-ended retainers. A focused discovery first, then straight into building.",
  },
  {
    q: "What kind of companies do you work with?",
    a: "Large organizations in demanding, often regulated industries: construction, legal, capital markets, logistics, multi-unit operations. Infrastructure that has to work in production, not on a slide.",
  },
  {
    q: "How are you different from a Big 4 consulting firm?",
    a: "They produce recommendations. We produce systems. Strategy and build in the same engagement, by one senior team — and an order of magnitude faster.",
  },
  {
    q: "We already have an internal AI team. Can you still help?",
    a: "Yes. Our best engagements run alongside internal teams — for stalled initiatives, architecture decisions needing outside eyes, or when speed outruns capacity.",
  },
  {
    q: "What does 'embedded' actually mean?",
    a: "Inside your Slack, your standups, your codebase. Not at arm's length. Nothing waits on a weekly status call.",
  },
  {
    q: "We're in a regulated industry. Does that change what you can do?",
    a: "No. We've shipped production AI inside pharma, financial services, healthcare and insurance — within compliance constraints, without sacrificing the outcome.",
  },
  {
    q: "What if we're not sure where AI actually helps us?",
    a: "That's where we start. A focused discovery returns a prioritized plan for where custom infrastructure pays — and where it doesn't. Yours either way.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed scope, flat fee. No hourly billing, no open-ended retainers. We price the system, then deliver it.",
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
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/60 mb-8">
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

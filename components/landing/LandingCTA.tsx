"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";
import { EmailCapture } from "./EmailCapture";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
  onCtaClick?: (label: string) => void;
}

export function LandingCTA({ onOpenChat, onCtaClick }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText("[data-cta-headline]", { type: "words", mask: "words" });

        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-cta-headline]", start: "top 78%" },
            defaults: { ease: "power4.out" },
          })
          .from("[data-cta-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.7 })
          .from(split.words, { yPercent: 115, duration: 1.1, stagger: 0.07 }, 0.15)
          .from("[data-cta-body]", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.6)
          .from("[data-cta-buttons]", { autoAlpha: 0, y: 14, duration: 0.7 }, 0.8);

        gsap.from("[data-cta-capture]", {
          autoAlpha: 0,
          duration: 0.9,
          scrollTrigger: { trigger: "[data-cta-capture]", start: "top 90%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative" aria-label="Talk to Endurance">
      {/* Blend from the solid page back into the terrain */}
      <div
        className="absolute top-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0a08, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-40 md:pt-56 pb-24">
        <p
          data-cta-eyebrow
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-flare mb-10"
        >
          Ready?
        </p>

        <h2
          data-cta-headline
          className="font-display text-bone mb-10"
          style={{
            fontSize: "clamp(3rem, 9vw, 8.5rem)",
            lineHeight: 0.97,
            letterSpacing: "-0.015em",
            maxWidth: "11ch",
          }}
        >
          Brief us on a <em>mission.</em>
        </h2>

        <p data-cta-body className="text-[15px] sm:text-base leading-relaxed text-bone/55 max-w-md mb-12">
          The first conversation is a mission briefing, not a sales call. Tell
          us what you’re trying to accomplish. We’ll tell you if we’re the
          right fit.
        </p>

        <div data-cta-buttons className="flex flex-col sm:flex-row gap-3 mb-24 md:mb-32">
          <Btn variant="light" onClick={onOpenChat}>
            Begin Mission Briefing →
          </Btn>
          <Btn
            variant="ghost-light"
            as="a"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCtaClick?.("cta-book")}
          >
            Book a Call ↗
          </Btn>
        </div>

        <div data-cta-capture className="mb-28 md:mb-36">
          <EmailCapture />
        </div>

        {/* Footer */}
        <footer
          className="border-t pt-10 flex flex-col md:flex-row md:items-end justify-between gap-10"
          style={{ borderColor: "rgba(244,243,238,0.1)" }}
        >
          <div>
            <img
              src="/logo-endurance-white.svg"
              alt="Endurance AI Labs"
              className="h-3.5 w-auto opacity-70 mb-5"
            />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-sm text-bone/50 hover:text-bone transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="md:text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/25 mb-2">
              68°44′21″S · 52°19′47″W — Endurance, found intact after 107 years
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/25">
              © {new Date().getFullYear()} Endurance AI Labs
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

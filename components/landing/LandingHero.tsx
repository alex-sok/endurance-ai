"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
  onNavigate: (id: string) => void;
}

export function LandingHero({ onOpenChat, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText("[data-hero-headline]", {
          type: "words",
          mask: "words",
        });

        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.7 }, 0.15)
          .from(
            split.words,
            { yPercent: 115, duration: 1.15, stagger: 0.055 },
            0.3
          )
          .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.85)
          .from("[data-hero-ctas]", { autoAlpha: 0, y: 14, duration: 0.7 }, 1.0)
          .from("[data-hero-trust]", { autoAlpha: 0, duration: 0.9 }, 1.25)
          .from("[data-hero-scroll]", { autoAlpha: 0, duration: 0.9 }, 1.4);

        gsap.to("[data-hero-scroll-line]", {
          scaleY: 0.25,
          transformOrigin: "top",
          duration: 1.4,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Endurance AI Labs"
    >
      {/* Legibility scrims over the terrain — text side and base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,10,8,0.72) 0%, rgba(10,10,8,0.25) 48%, rgba(10,10,8,0) 75%)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a08)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-36 pb-28">
        <p
          data-hero-eyebrow
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/65 mb-10"
        >
          Operator-led AI execution
        </p>

        <h1
          data-hero-headline
          className="font-display text-bone mb-9"
          style={{
            fontSize: "clamp(3.3rem, 8.6vw, 8.25rem)",
            lineHeight: 0.97,
            letterSpacing: "-0.015em",
            maxWidth: "13ch",
          }}
        >
          Some initiatives <em className="not-italic md:italic">cannot afford to&nbsp;fail.</em>
        </h1>

        <p
          data-hero-sub
          className="text-[15px] sm:text-base leading-relaxed text-bone/70 max-w-md mb-11"
        >
          Endurance is the operator-led AI execution firm for leaders with
          serious outcomes at stake. Strategy through deployment — one small,
          senior team that ships.
        </p>

        <div data-hero-ctas className="flex flex-col sm:flex-row gap-3">
          <Btn variant="light" onClick={onOpenChat}>
            Begin Mission Briefing →
          </Btn>
          <Btn
            variant="ghost-light"
            as="a"
            href="#audit"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("audit");
            }}
          >
            The $999 AI Audit ↓
          </Btn>
        </div>

        <p
          data-hero-trust
          className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55"
        >
          Active engagements with Fortune 500 enterprises — built for the mid-market
        </p>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/55">Scroll</span>
        <span data-hero-scroll-line className="block w-px h-10 bg-bone/40" />
      </div>
    </section>
  );
}

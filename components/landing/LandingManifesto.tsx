"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

const FAILURES = [
  {
    title: "Organizational inertia.",
    body: "Teams default to familiar workflows. Without a forcing function, adoption stalls before it starts.",
  },
  {
    title: "Weak data foundations.",
    body: "AI is only as good as the data feeding it. Fragmented systems and dirty data make even strong models useless.",
  },
  {
    title: "No clear ownership.",
    body: "When AI is everyone's job, it's no one's job. Initiatives drift without a single accountable driver.",
  },
  {
    title: "Tool-first thinking.",
    body: "Buying software is not a strategy. Deploying tools without redesigning the workflow around them changes nothing.",
  },
  {
    title: "Poor change management.",
    body: "The technical build is the easy part. Getting people to actually change how they work is where most initiatives die.",
  },
  {
    title: "Lack of internal capability.",
    body: "External vendors deliver and leave. Without building internal knowledge, organizations can't maintain or scale what was built.",
  },
];

export function LandingManifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Pinned statement — each word surfaces as you scroll through it.
        const split = new SplitText("[data-manifesto-statement]", { type: "words" });
        gsap.set(split.words, { opacity: 0.13 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-manifesto-pin]",
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: 0.4,
            },
          })
          .to(split.words, { opacity: 1, stagger: 0.06, ease: "none" })
          .fromTo(
            "[data-manifesto-punch]",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" },
            ">-0.2"
          );

        // Failure-mode cells draw in as they enter.
        gsap.utils.toArray<HTMLElement>("[data-failure-cell]").forEach((cell, i) => {
          gsap.from(cell, {
            autoAlpha: 0,
            y: 26,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: cell, start: "top 88%" },
          });
        });

        gsap.from("[data-manifesto-resolution]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-manifesto-resolution]", start: "top 85%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="The problem">
      {/* Pinned statement */}
      <div data-manifesto-pin className="flex items-center" style={{ minHeight: "100svh" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/40 mb-10">
            The Problem
          </p>
          <p
            data-manifesto-statement
            className="font-display text-bone"
            style={{
              fontSize: "clamp(1.9rem, 4.2vw, 3.6rem)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
            }}
          >
            Your smartest people are experimenting. The consultants delivered a
            deck. The board wants a date. And nothing — nothing — is in
            production.
          </p>
          <p
            data-manifesto-punch
            className="font-display italic text-flare mt-10"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)", lineHeight: 1.1 }}
          >
            It was never a technology problem.
          </p>
        </div>
      </div>

      {/* Six failure modes */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-28 md:pb-36">
        <h2 className="sr-only">Most AI transformations fail for predictable reasons</h2>
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          {FAILURES.map((f, i) => (
            <div
              key={f.title}
              data-failure-cell
              className="border-b border-r p-8 md:p-10"
              style={{ borderColor: "rgba(244,243,238,0.08)" }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-flare/80 block mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-bone text-xl md:text-2xl mb-3">{f.title}</h3>
              <p className="text-sm leading-relaxed text-bone/45">{f.body}</p>
            </div>
          ))}
        </div>

        <div data-manifesto-resolution className="mt-20 md:mt-24 max-w-3xl">
          <p
            className="font-display text-bone mb-5"
            style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.9rem)", lineHeight: 1.12 }}
          >
            These are execution problems. <em>Not technology problems.</em>
          </p>
          <p className="text-[15px] leading-relaxed text-bone/50">
            Endurance was built to close the gap between ambition and execution.
          </p>
        </div>
      </div>
    </section>
  );
}

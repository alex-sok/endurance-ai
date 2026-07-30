"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The core thesis section: what a brain-powered operating system actually is.
 *
 * The pipeline is genuinely sequential — nothing can be routed before it is
 * ingested, nothing retrieved before it is filed — so the stages carry real
 * numbering rather than decorative markers.
 */
const STAGES = [
  {
    name: "Ingest",
    body: "Every meeting, document, drawing, invoice and thread — pulled from the systems you already run.",
  },
  {
    name: "Route",
    body: "Weighted scoring files each item to the right project, deal or job automatically.",
  },
  {
    name: "Store",
    body: "A structured workspace, not a document graveyard. Projects, areas, resources, archives.",
  },
  {
    name: "Retrieve",
    body: "Progressive context: the lean picture first, the deep detail only when the work needs it.",
  },
  {
    name: "Act",
    body: "The agent reasons, calls your tools, checks its work, and repeats — inside your permissions.",
  },
];

const PRINCIPLES = [
  {
    title: "Deterministic, not probabilistic.",
    body: "Ask twice, get the same answer. We use LLMs to build software that behaves predictably — not software that guesses.",
  },
  {
    title: "Anchored to your sources of truth.",
    body: "Every output traces back to your systems of record. No invented logic, no confident fiction.",
  },
  {
    title: "Built on LLMs, end to end.",
    body: "Not a chatbot bolted onto a database. The model is the operating layer.",
  },
  {
    title: "Context beats context length.",
    body: "Tiered loading keeps answers sharp. Dumping everything in degrades them.",
  },
  {
    title: "Composable, not locked.",
    body: "Workflows are plain, readable files. Your team extends them without us.",
  },
  {
    title: "Permissioned by default.",
    body: "The brain reaches only what each person is already allowed to see.",
  },
];

export function LandingBrain() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-brain-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-brain-header]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el, i) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
            delay: (i % 5) * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-stage-row]", start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-principle]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="Brain-powered operating systems">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-brain-header className="mb-16 md:mb-20 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            The Core
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            We build brain-powered <em>operating systems.</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-bone/65 max-w-xl">
            Deep experience building world-class large language models sits at
            the core of the company. We use them to build{" "}
            <span className="text-bone">deterministic software</span> — systems
            anchored to your sources of truth, not invented logic.
          </p>
        </div>

        {/* The pipeline */}
        <div
          data-stage-row
          className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          {STAGES.map((s, i) => (
            <div
              key={s.name}
              data-stage
              className="border-b border-r p-7 md:p-8"
              style={{ borderColor: "rgba(244,243,238,0.08)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-flare block mb-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-bone text-xl md:text-2xl mb-3">{s.name}</h3>
              <p className="text-sm leading-relaxed text-bone/65">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Design principles */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-16 md:mt-20">
          {PRINCIPLES.map((p) => (
            <div key={p.title} data-principle className="border-t pt-6" style={{ borderColor: "rgba(244,243,238,0.18)" }}>
              <h3 className="font-display text-bone text-lg md:text-xl mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed text-bone/65 max-w-md">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

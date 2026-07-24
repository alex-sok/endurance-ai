"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const BUILDS = [
  {
    industry: "Legal",
    problem: "Decades of matter files, expertise locked in people's heads, no institutional memory.",
    built: "A private knowledge base and retrieval brain over the firm's entire document corpus.",
  },
  {
    industry: "Real estate & capital markets",
    problem: "Deal underwriting done by hand, one spreadsheet at a time.",
    built: "Automated underwriting, an investment-memo pipeline, and a proprietary deal brain.",
  },
  {
    industry: "Logistics & freight",
    problem: "Operations fragmented across disconnected systems and manual handoffs.",
    built: "A unified transportation-management and settlement layer built to their workflow.",
  },
  {
    industry: "Multi-unit operations",
    problem: "Many locations, each with its own systems, none of them sharing what they know.",
    built: "One operational brain consolidating the entire group into a single source of truth.",
  },
  {
    industry: "Consumer & brokerage",
    problem: "Commission and settlement math done manually — slow, opaque, error-prone.",
    built: "A penny-accurate commissions and settlement engine wired into their data.",
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

        gsap.utils.toArray<HTMLElement>("[data-build-row]").forEach((row) => {
          gsap.from(row.querySelector("[data-build-rule]"), {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
          gsap.from(row.querySelectorAll("[data-build-content]"), {
            autoAlpha: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        });

        gsap.from("[data-proof-thread], [data-proof-nda]", {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-proof-thread]", start: "top 90%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="What we build">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-proof-header className="mb-16 md:mb-24 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            Built in the field
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Custom infrastructure, <em>built one industry at a time.</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-bone/65 max-w-xl">
            We don't sell a product you adopt. We study how your business runs
            and build the AI systems it needs — inside legal, capital markets,
            logistics, and beyond.
          </p>
        </div>

        {/* Industry × solution matrix */}
        <div>
          <div
            className="hidden md:grid grid-cols-12 gap-x-10 pb-4 border-b"
            style={{ borderColor: "rgba(244,243,238,0.14)" }}
          >
            <span className="col-span-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              Industry
            </span>
            <span className="col-span-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              The operational problem
            </span>
            <span className="col-span-5 font-mono text-[10px] uppercase tracking-[0.25em] text-flare">
              What we built
            </span>
          </div>

          {BUILDS.map((b) => (
            <div key={b.industry} data-build-row className="group relative">
              <span data-build-rule className="block h-px w-full bg-bone/10" />
              <div className="grid md:grid-cols-12 gap-y-3 md:gap-x-10 py-8 md:py-10 transition-colors duration-300 group-hover:bg-bone/[0.025]">
                <h3
                  data-build-content
                  className="md:col-span-3 font-display text-bone text-xl md:text-2xl leading-tight"
                >
                  {b.industry}
                </h3>
                <p
                  data-build-content
                  className="md:col-span-4 text-sm md:text-[15px] leading-relaxed text-bone/55"
                >
                  {b.problem}
                </p>
                <p
                  data-build-content
                  className="md:col-span-5 text-sm md:text-[15px] leading-relaxed text-bone/85"
                >
                  {b.built}
                </p>
              </div>
            </div>
          ))}
          <span className="block h-px w-full bg-bone/10" />
        </div>

        <p
          data-proof-thread
          className="font-display text-bone/85 mt-16 md:mt-20 max-w-4xl"
          style={{ fontSize: "clamp(1.3rem, 2.6vw, 2rem)", lineHeight: 1.3 }}
        >
          The common thread: a private <span className="text-flare">brain</span>{" "}
          built on your proprietary data —{" "}
          <em className="text-bone/65">
            reshaped for how each business actually runs.
          </em>
        </p>

        <div
          data-proof-nda
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t pt-10"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55 max-w-md leading-relaxed">
            Client names and details held in confidence. We'll walk your team
            through the relevant work under NDA.
          </p>
          <Btn variant="light" onClick={onOpenChat} className="shrink-0">
            Tell us how your business runs →
          </Btn>
        </div>
      </div>
    </section>
  );
}

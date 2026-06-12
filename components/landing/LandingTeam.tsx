"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const FOUNDERS = [
  {
    name: "Alex Sok",
    role: "Founder & CEO",
    bio: "Leads Endurance engagements from strategy through deployment.",
  },
  {
    name: "Sid Bhambhani",
    role: "Co-Founder & CTO",
    bio: "Co-founded Summatti, an AI company acquired by PartnerHero. Over 20 years of technology leadership.",
  },
  {
    name: "Nick Maxwell",
    role: "Co-Founder & Chief AI Officer",
    bio: "Founding engineer at TALA, acquired by Intuit. Computer Science, Cornell.",
  },
];

export function LandingTeam() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-team-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-team-header]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-team-row]").forEach((row, i) => {
          gsap.from(row, {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
        });

        gsap.from("[data-team-closing]", {
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: { trigger: "[data-team-closing]", start: "top 92%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="The team">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-team-header className="mb-16 md:mb-20 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            The Team
          </p>
          <h2
            className="font-display text-bone mb-8"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Built by <em>operators.</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-bone/70">
            Our backgrounds span AI engineering, enterprise architecture,
            product design, and operational execution across regulated,
            high-growth, and complex environments.
          </p>
        </div>

        <div>
          <span className="block h-px w-full bg-bone/10" />
          {FOUNDERS.map((f) => (
            <div key={f.name}>
              <div
                data-team-row
                className="grid md:grid-cols-12 gap-y-2 md:gap-x-10 py-9 md:py-11 group"
              >
                <h3 className="md:col-span-4 font-display text-bone text-3xl md:text-4xl transition-transform duration-300 md:group-hover:translate-x-2">
                  {f.name}
                </h3>
                <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-flare pt-2.5">
                  {f.role}
                </p>
                <p className="md:col-span-5 text-sm leading-relaxed text-bone/65 pt-1">{f.bio}</p>
              </div>
              <span className="block h-px w-full bg-bone/10" />
            </div>
          ))}
        </div>

        <p
          data-team-closing
          className="font-display italic text-bone/70 mt-16 max-w-2xl"
          style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.3 }}
        >
          We are operators. Built to execute in environments where the
          initiative is too important to drift.
        </p>
      </div>
    </section>
  );
}

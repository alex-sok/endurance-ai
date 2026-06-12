"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  {
    value: 4,
    decimals: 0,
    label: "OpenAI implementation fund",
    sub: "Partnering with Bain, McKinsey & Goldman",
  },
  {
    value: 2.5,
    decimals: 1,
    label: "Anthropic implementation fund",
    sub: "Same directive. Fortune 500 focus.",
  },
];

export function LandingWindow() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-window-header], [data-window-copy]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-window-header]", start: "top 82%" },
        });

        // Count the fund figures up once they enter.
        gsap.utils.toArray<HTMLElement>("[data-stat-figure]").forEach((el) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = parseInt(el.dataset.decimals ?? "0", 10);
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
              el.textContent = `$${counter.value.toFixed(decimals)}B`;
            },
          });
        });

        gsap.from("[data-window-closing]", {
          autoAlpha: 0,
          y: 22,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-window-closing]", start: "top 88%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="Why now">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-16">
          <div className="lg:col-span-7">
            <div data-window-header>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
                Why Now
              </p>
              <h2
                className="font-display text-bone mb-10"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
              >
                The window is open. <em>For about 18&nbsp;months.</em>
              </h2>
            </div>
            <div data-window-copy className="space-y-5 text-[15px] leading-relaxed text-bone/70 max-w-xl">
              <p>
                OpenAI announced a $4 billion fund for AI implementation,
                partnering with Bain, McKinsey, and Goldman Sachs. Anthropic
                announced $2.5 billion for the same purpose. For the next 12 to
                18 months, every frontier lab will focus almost entirely on
                Fortune 500. The mid-market — companies doing $10M to $500M in
                revenue — will be mostly left to figure it out on their own.
              </p>
              <p>
                That is our market. We are building in it now, with the
                experience, tools, and reputation to serve it well. Before the
                big players arrive and triple the price.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-px bg-bone/10 border border-bone/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[#0a0a08] p-8 md:p-10">
                <p
                  data-stat-figure
                  data-value={stat.value}
                  data-decimals={stat.decimals}
                  className="font-display text-bone mb-4"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)", lineHeight: 1 }}
                >
                  ${stat.value}B
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-flare mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-bone/60">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <p
          data-window-closing
          className="font-display text-bone/85 mt-20 max-w-4xl"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", lineHeight: 1.25 }}
        >
          Organizations that move in the next 18 months will build a compounding
          advantage their competitors cannot close.{" "}
          <em className="text-bone/65">
            The ones that wait will pay three times the price to the same firms.
          </em>
        </p>
      </div>
    </section>
  );
}

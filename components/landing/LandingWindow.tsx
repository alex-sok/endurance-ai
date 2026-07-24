"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TILES = [
  {
    label: "Your data",
    body: "A private brain built on your corpus — not the public internet.",
  },
  {
    label: "Your workflow",
    body: "Systems shaped to how your team actually operates.",
  },
  {
    label: "Your moat",
    body: "Infrastructure competitors can't buy off a shelf.",
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

        gsap.from("[data-window-tile]", {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-window-tiles]", start: "top 85%" },
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
                The models got powerful. <em>Most software didn't get personal.</em>
              </h2>
            </div>
            <div data-window-copy className="space-y-5 text-[15px] leading-relaxed text-bone/70 max-w-xl">
              <p>
                Frontier models are finally capable enough to run core
                operations — not just demos. But the enterprise software market
                is racing to package that capability into the same one-size
                platform sold to every one of your competitors. Adopt it, and
                you inherit everyone else's workflow.
              </p>
              <p>
                Build around your own operation instead — on your data, shaped to
                your processes — and you get something they can't buy off a
                shelf. That advantage compounds. The window to build it before
                everyone else does is open now.
              </p>
            </div>
          </div>

          <div
            data-window-tiles
            className="lg:col-span-5 flex flex-col gap-px bg-bone/10 border border-bone/10"
          >
            {TILES.map((tile) => (
              <div key={tile.label} data-window-tile className="bg-[#0a0a08] p-8 md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-flare mb-3">
                  {tile.label}
                </p>
                <p
                  className="font-display text-bone"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.6rem)", lineHeight: 1.2 }}
                >
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p
          data-window-closing
          className="font-display text-bone/85 mt-20 max-w-4xl"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", lineHeight: 1.25 }}
        >
          Off-the-shelf gets you parity.{" "}
          <em className="text-bone/65">Custom infrastructure gets you distance.</em>
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  riseIn,
  blockReveal,
  countUp,
  prefersReducedMotion,
  EASE,
} from "../lib/v2-motion";

/**
 * §2 Problem — stat theatre choreography (DESIGN-V2.md).
 *
 * Desktop ≥1024px (motion OK): the section pins for 130vh
 * (anticipatePin: 1). The headline masked-rises on approach, then the
 * page's ONLY strike-through draws across "phone calls" — a verdict.
 * Inside the pin the three stats stage in one at a time at progress
 * beats; each value counts up on its own ≤800ms timer (never
 * scrub-linked), and everything ENDS side-by-side in the grid —
 * nothing dims, shrinks, or leaves. The pull quote rises last.
 *
 * Mobile/tablet: no pin — per-block reveals + one-shot count-ups.
 * Reduced motion: nothing registers; SSR markup is the final state.
 *
 * Count-up hygiene: values are strings like "$87B" / "35%" / "$1.8T".
 * We parse prefix/number/suffix from data-stat-value so the final
 * rendered string is byte-identical to SSR.
 */

interface ParsedStat {
  prefix: string;
  num: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
}

function parseStatValue(value: string): ParsedStat | null {
  const m = value.match(/^([^0-9]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  const num = parseFloat(raw.replace(/,/g, ""));
  if (!Number.isFinite(num)) return null;
  return {
    prefix: m[1],
    num,
    decimals: (raw.split(".")[1] ?? "").length,
    grouped: raw.includes(","),
    suffix: m[3],
  };
}

function formatStat(p: ParsedStat, n: number): string {
  const body = p.grouped
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : n.toFixed(p.decimals);
  return p.prefix + body + p.suffix;
}

export function ProblemTheatre() {
  useEffect(() => {
    const section = document.getElementById("problem");
    if (!section) return;

    let mm: ReturnType<typeof gsap.matchMedia> | undefined;

    // The callback receives the context as `self` — the outer `ctx`
    // const is still in its TDZ while this callback runs synchronously,
    // and the pinned trigger's onUpdate can fire during creation (page
    // restored mid-scroll), reaching play() before `ctx` exists.
    const ctx = gsap.context((self) => {
      const headline = section.querySelector<HTMLElement>(
        ".v2-problem__headline",
      );
      const strike = section.querySelector<SVGPathElement>(
        ".v2-problem__strike-line",
      );
      const statBlocks = gsap.utils.toArray<HTMLElement>(
        ".v2-problem__stat",
        section,
      );
      const quote = section.querySelector<HTMLElement>(".v2-problem__quote");

      // Count-ups mutate textContent; restore the SSR string if a
      // matchMedia context reverts mid-count (e.g. resize across 1024px).
      const restoreValues = () => {
        statBlocks.forEach((block) => {
          const valueEl = block.querySelector<HTMLElement>(
            ".v2-problem__value",
          );
          const ssr = block.dataset.statValue;
          if (valueEl && ssr) valueEl.textContent = ssr;
        });
      };

      // Headline masked-rise (helper self-guards reduced motion).
      if (headline) riseIn(headline, { start: "top 78%" });

      // The verdict: the page's only strike-through. Triggers a beat
      // after the headline rise (deeper start position) and completes
      // ≤1s later on a fixed timer — never scrub-linked, so a
      // mid-scroll abandon still leaves it fully drawn.
      if (strike && !prefersReducedMotion()) {
        gsap.set(strike, { drawSVG: "0%" });
        gsap.to(strike, {
          drawSVG: "100%",
          duration: 0.6,
          ease: EASE.inOut,
          delay: 0.35,
          scrollTrigger: {
            trigger: headline ?? section,
            start: "top 55%",
            once: true,
          },
        });
      }

      mm = gsap.matchMedia();

      // ── Desktop: pinned stat theatre (130vh of the page's pin budget) ──
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const beats: {
            fired: boolean;
            at: number;
            play: (delay: number) => void;
          }[] = [];

          statBlocks.forEach((block, i) => {
            const valueEl = block.querySelector<HTMLElement>(
              ".v2-problem__value",
            );
            const parsed = parseStatValue(block.dataset.statValue ?? "");
            gsap.set(block, { autoAlpha: 0, y: 64 });
            beats.push({
              fired: false,
              at: 0.16 + i * 0.24,
              play(delay) {
                // Fires at scroll time, after the context callback has
                // returned — self.add() records the tweens so revert()
                // still kills them on unmount.
                self.add(() => {
                  gsap.to(block, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9,
                    ease: EASE.out,
                    delay,
                  });
                  if (valueEl && parsed) {
                    // One-shot count, fixed timer (≤800ms), never scrubbed.
                    const state = { v: 0 };
                    valueEl.textContent = formatStat(parsed, 0);
                    gsap.to(state, {
                      v: parsed.num,
                      duration: 0.7,
                      ease: "power2.out",
                      delay,
                      onUpdate() {
                        valueEl.textContent = formatStat(parsed, state.v);
                      },
                    });
                  }
                });
              },
            });
          });

          if (quote) {
            gsap.set(quote, { autoAlpha: 0, y: 56 });
            beats.push({
              fired: false,
              at: 0.86,
              play(delay) {
                self.add(() => {
                  gsap.to(quote, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.1,
                    ease: EASE.out,
                    delay,
                  });
                });
              },
            });
          }

          // Beats fire once at progress thresholds; if several thresholds
          // are crossed in one jump (fast scroll, restored scroll
          // position) they cascade with a short relay delay.
          const fire = (progress: number) => {
            let queued = 0;
            for (const b of beats) {
              if (!b.fired && progress >= b.at) {
                b.fired = true;
                b.play(queued * 0.14);
                queued += 1;
              }
            }
          };

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: true,
            anticipatePin: 1,
            onUpdate(self) {
              fire(self.progress);
            },
          });
          // Page may load/restore already past (or inside) the pin.
          fire(st.progress);

          return restoreValues;
        },
      );

      // ── Mobile / tablet: no pin — staggered reveals, same data rules ──
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          statBlocks.forEach((block) => {
            const valueEl = block.querySelector<HTMLElement>(
              ".v2-problem__value",
            );
            const parsed = parseStatValue(block.dataset.statValue ?? "");
            blockReveal(block, { start: "top 85%" });
            if (valueEl && parsed) {
              countUp(valueEl, parsed.num, {
                trigger: block,
                start: "top 85%",
                duration: 0.7,
                format: (n) => formatStat(parsed, n),
              });
            }
          });
          if (quote) blockReveal(quote, { start: "top 85%" });

          return restoreValues;
        },
      );
    }, section);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return null;
}

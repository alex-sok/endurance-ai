"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  gsap,
  riseIn,
  blockReveal,
  countUp,
  prefersReducedMotion,
  EASE,
} from "../lib/v2-motion";
import { fmtUSD } from "../lib/formatters";

interface AskRevealClientProps {
  /** Unmasked round size in USD; null when PRIVATE_METRICS or zero. */
  roundValue: number | null;
  children: ReactNode;
}

/**
 * §10 Ask choreography (DESIGN-V2.md — "readable first").
 *
 * - Headline: house masked line-rise.
 * - Content blocks: ONE blockReveal — the legend (names, %, blurbs)
 *   arrives whole; no per-item gating.
 * - Bar segments: the only per-item motion — grow from scaleX 0 once,
 *   expo.inOut, 0.12 stagger, ≤900ms total.
 * - Round size: counts once ≤800ms when a real number exists; masked
 *   "$ — — —" shimmer is pure CSS (see ask.css), no JS.
 *
 * Reduced motion: helpers no-op and the custom bar tween is skipped —
 * the SSR final state is the only state.
 */
export function AskRevealClient({ roundValue, children }: AskRevealClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const headline = root.querySelector(".v2-ask__headline");
      if (headline) riseIn(headline);

      // One reveal for everything below the headline — legend included,
      // as a single unit. Animation never gates reading.
      const blocks = root.querySelectorAll(".v2-ask__block");
      if (blocks.length) blockReveal(blocks, { stagger: 0.08, y: 40 });

      // Bar segments grow once. 0.48s + 3 × 0.12s stagger = 0.84s total.
      const bar = root.querySelector(".v2-ask__bar");
      const segs = root.querySelectorAll(".v2-ask__bar-seg");
      if (bar && segs.length && !prefersReducedMotion()) {
        gsap.from(segs, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.48,
          ease: EASE.inOut,
          stagger: 0.12,
          scrollTrigger: { trigger: bar, start: "top 85%", once: true },
        });
      }

      // Round size resolves fast when a real number is wired in.
      const amount = root.querySelector(".v2-ask__amount-value");
      if (amount && roundValue !== null && roundValue > 0) {
        countUp(amount, roundValue, {
          duration: 0.7,
          format: (n) => fmtUSD(n, { compact: true }),
        });
      }
    }, root);

    return () => ctx.revert();
  }, [roundValue]);

  return (
    <div ref={rootRef} className="v2-ask__content">
      {children}
    </div>
  );
}

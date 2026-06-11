"use client";

import { useEffect, useRef } from "react";
import { gsap, blockReveal } from "../lib/v2-motion";
import { shiftSplit } from "../data/shift";

/**
 * §3 Shift client island — the incumbent/Endurance split stacks.
 *
 * Quiet section (DESIGN-V2.md §3): exactly ONE blockReveal entrance per
 * column (a single staggered tween), then silence. The incumbent dim is
 * static CSS, not animation — the contrast IS the design. No scrub, no
 * counters, no strike-throughs (§2 owns the strike gesture).
 */
export function ShiftRevealClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      blockReveal(root.querySelectorAll(".v2-shift__col"), {
        trigger: root,
        stagger: 0.14,
        y: 48,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="v2-shift__split">
      <div className="v2-shift__col v2-shift__col--incumbent">
        <div className="logi-tag">Incumbent</div>
        <ul className="v2-shift__stack">
          {shiftSplit.incumbent.map((label, i) => (
            <li key={`${label}-${i}`} className="logi-mono">
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="v2-shift__col v2-shift__col--endurance">
        <div className="logi-tag">Endurance</div>
        <ul className="v2-shift__stack">
          {shiftSplit.endurance.map((label) => (
            <li key={label} className="logi-mono">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

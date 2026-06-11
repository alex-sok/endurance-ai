"use client";

import { useEffect, useRef } from "react";
import { gsap, blockReveal } from "../lib/v2-motion";
import { SectionShell } from "../components/SectionShell";
import { moatColumns, moatClose } from "../data/moat";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §7 — Moat. QUIET (DESIGN-V2.md §7).
 *
 * Exactly one blockReveal carries the entire block — headline, comparison
 * matrix, and the moatClose line ride the same weighted entrance. No row
 * wipes, no scrubs, no counters. The Endurance column's amber edge and
 * persistent glow are pure static CSS (styles/v2/moat.css): lit before,
 * during, and after the reveal. Reduced motion: blockReveal no-ops and the
 * final state is identical with zero motion.
 */
export function Moat() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      blockReveal(root.querySelectorAll(".v2-moat__reveal"), {
        trigger: root,
        stagger: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const rowKeys = Object.keys(moatColumns[0].cells) as Array<
    keyof (typeof moatColumns)[number]["cells"]
  >;

  return (
    <SectionShell id="moat" index="07" eyebrow="Why we win">
      <div ref={rootRef} className="v2-moat">
        <h2 className="logi-display-md v2-moat__headline v2-moat__reveal">
          Why <span className="v2-moat__accent">AI-native</span> wins.
        </h2>

        <div className="v2-moat__table v2-moat__reveal" role="table">
          <div className="v2-moat__row v2-moat__row--header" role="row">
            <div
              className="v2-moat__cell v2-moat__cell--label"
              role="columnheader"
            />
            {moatColumns.map((col) => (
              <div
                key={col.name}
                className={`v2-moat__cell v2-moat__cell--header${
                  col.tone === "signal" ? " v2-moat__cell--signal" : ""
                }`}
                role="columnheader"
              >
                <div className="logi-mono v2-moat__col-eyebrow">
                  {col.tone === "signal" ? "Endurance" : "Status quo"}
                </div>
                <div className="logi-display-sm v2-moat__col-name">
                  {col.name}
                </div>
              </div>
            ))}
          </div>

          {rowKeys.map((rowKey) => (
            <div key={rowKey} className="v2-moat__row" role="row">
              <div
                className="v2-moat__cell v2-moat__cell--label logi-mono"
                role="rowheader"
              >
                {rowKey}
              </div>
              {moatColumns.map((col) => (
                <div
                  key={`${col.name}-${rowKey}`}
                  className={`v2-moat__cell${
                    col.tone === "signal" ? " v2-moat__cell--signal" : ""
                  }`}
                  role="cell"
                >
                  {/* Column name resurfaces on mobile, where rows stack. */}
                  <span
                    className="logi-mono v2-moat__cell-col"
                    aria-hidden="true"
                  >
                    {col.name}
                  </span>
                  {col.cells[rowKey]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {isPlaceholder(moatClose) ? null : (
          <p className="logi-display-sm v2-moat__close v2-moat__reveal">
            {moatClose}
          </p>
        )}
      </div>
    </SectionShell>
  );
}

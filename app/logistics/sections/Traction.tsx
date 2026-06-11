"use client";

import { useEffect, useRef } from "react";
import { SectionShell } from "../components/SectionShell";
import { gsap, blockReveal } from "../lib/v2-motion";
import { headlineStat, customerQuotes } from "../data/traction";
import { closeCTAs } from "../data/close";
import { PRIVATE_METRICS } from "../lib/config";
import { fmtUSD } from "../lib/formatters";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §5 — Traction. Quiet + honest (DESIGN-V2.md).
 *
 * Exactly ONE blockReveal over the section's blocks — no parallax, no
 * scrub, no counters. Data hygiene (hard rule #8): the charts render
 * empty axes + gridlines with a "Full figures in the deck →" note —
 * never a fabricated curve. The headline stat masks to "$ — — —" with
 * a static CSS shimmer when PRIVATE_METRICS is on or the value is
 * unset. Quotes hide entirely while their copy is placeholder.
 */

const GRID_ROWS = [40, 80, 120, 160];
const GRID_TICKS = Array.from({ length: 11 }, (_, i) => (i + 1) * 40);

/** Empty chart frame: axes + gridlines only. Honest about missing data. */
function EmptyChartGrid() {
  return (
    <svg
      viewBox="0 0 480 200"
      className="v2-traction__chart-svg"
      aria-hidden="true"
      focusable="false"
    >
      {GRID_ROWS.map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="480"
          y2={y}
          stroke="var(--logi-divider)"
          strokeWidth="1"
        />
      ))}
      {GRID_TICKS.map((x) => (
        <line
          key={x}
          x1={x}
          y1="194"
          x2={x}
          y2="200"
          stroke="var(--logi-fg-faint)"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      ))}
      {/* Axes */}
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="200"
        stroke="var(--logi-fg-faint)"
        strokeOpacity="0.9"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="199.5"
        x2="480"
        y2="199.5"
        stroke="var(--logi-fg-faint)"
        strokeOpacity="0.9"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Traction() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      // The section's single entrance (quiet section — nothing else).
      blockReveal(root.querySelectorAll(".v2-traction__block"), {
        trigger: root,
        stagger: 0.1,
        y: 48,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const masked = PRIVATE_METRICS || headlineStat.value === 0;

  const quotes = customerQuotes.filter(
    (q) => !isPlaceholder(q.body) && !isPlaceholder(q.attribution),
  );

  return (
    <SectionShell id="traction" index="05" eyebrow="Traction">
      <div ref={rootRef} className="v2-traction">
        <h2 className="logi-display-md v2-traction__headline v2-traction__block">
          The <span className="v2-traction__accent">receipts</span>.
        </h2>

        <div className="v2-traction__stat v2-traction__block">
          <div
            className={`logi-stat v2-traction__big${
              masked ? " v2-traction__big--masked" : ""
            }`}
          >
            {masked
              ? "$ — — —"
              : `${headlineStat.prefix}${fmtUSD(headlineStat.value, {
                  compact: true,
                }).replace("$", "")}`}
          </div>
          <p className="logi-stat__label">
            {headlineStat.label}
            {masked ? (
              <span className="logi-mono"> · masked — see deck</span>
            ) : null}
          </p>
        </div>

        <div className="v2-traction__charts v2-traction__block">
          <div className="logi-panel v2-traction__chart">
            <div className="logi-mono v2-traction__chart-label">
              Revenue / GMV by month
            </div>
            <EmptyChartGrid />
          </div>

          <div className="logi-panel v2-traction__chart">
            <div className="logi-mono v2-traction__chart-label">
              Loads moved per week
            </div>
            <EmptyChartGrid />
          </div>
        </div>

        <p className="logi-mono v2-traction__note v2-traction__block">
          <a href={`mailto:${closeCTAs.contactEmail}`}>
            Full figures in the deck <span aria-hidden="true">→</span>
          </a>
        </p>

        {quotes.length > 0 ? (
          <div className="v2-traction__quotes v2-traction__block">
            {quotes.map((q) => (
              <figure key={q.attribution} className="v2-traction__quote">
                <blockquote className="logi-display-sm">
                  &ldquo;{q.body}&rdquo;
                </blockquote>
                <figcaption className="logi-mono logi-body-muted">
                  — {q.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

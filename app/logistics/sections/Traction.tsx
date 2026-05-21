import { SectionShell } from "../components/SectionShell";
import {
  headlineStat,
  customerQuotes,
  revenueByMonth,
} from "../data/traction";
import { PRIVATE_METRICS } from "../lib/config";
import { fmtUSD } from "../lib/formatters";

/**
 * §5 — Traction.
 *
 * Phase 1: One enormous headline number + simple bar/line stubs +
 * customer pull quotes. All real numbers live in /data/traction.ts.
 * Phase 3: Big number counts up digit-by-digit, charts draw on scroll
 * via Visx + GSAP drawSVG.
 *
 * When PRIVATE_METRICS is on, every sensitive number renders masked
 * so the page is safe to share with a public link.
 */
export function Traction() {
  const masked = PRIVATE_METRICS || headlineStat.value === 0;

  return (
    <SectionShell
      id="traction"
      index="05"
      eyebrow="Traction"
    >
      <h2 className="logi-display-md logi-traction__headline">
        The <span className="logi-traction__accent">receipts</span>.
      </h2>

      <div className="logi-traction__headline-stat">
        <div className="logi-stat logi-traction__big">
          {masked
            ? "$ — — — — — —"
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

      <div className="logi-traction__charts">
        {/* Revenue placeholder. Phase 3: Visx line chart, drawn on
            scroll, with annotation pins at inflection points. */}
        <div className="logi-panel logi-traction__chart">
          <div className="logi-mono logi-traction__chart-label">
            Revenue / GMV by month
          </div>
          <svg viewBox="0 0 480 200" className="logi-traction__chart-svg">
            <defs>
              <linearGradient id="grad-rev" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,160 L60,140 L120,135 L180,110 L240,100 L300,75 L360,55 L420,30 L480,20 L480,200 L0,200 Z"
              fill="url(#grad-rev)"
            />
            <path
              d="M0,160 L60,140 L120,135 L180,110 L240,100 L300,75 L360,55 L420,30 L480,20"
              fill="none"
              stroke="var(--logi-signal)"
              strokeWidth="2"
            />
          </svg>
          <div className="logi-mono logi-traction__chart-foot">
            {revenueByMonth.length} months · TODO(alex): real data
          </div>
        </div>

        <div className="logi-panel logi-traction__chart">
          <div className="logi-mono logi-traction__chart-label">
            Loads moved per week
          </div>
          <svg viewBox="0 0 480 200" className="logi-traction__chart-svg">
            {[12, 18, 22, 30, 38, 44, 56, 62, 78, 92, 110, 134].map((h, i) => (
              <rect
                key={i}
                x={i * 38 + 12}
                y={200 - h}
                width="28"
                height={h}
                fill="var(--logi-signal)"
                opacity="0.85"
              />
            ))}
          </svg>
          <div className="logi-mono logi-traction__chart-foot">
            Trailing 12 weeks · TODO(alex): real data
          </div>
        </div>
      </div>

      <div className="logi-traction__quotes">
        {customerQuotes.map((q) => (
          <figure key={q.attribution} className="logi-traction__quote">
            <blockquote className="logi-display-sm">
              &ldquo;{q.body}&rdquo;
            </blockquote>
            <figcaption className="logi-mono logi-body-muted">
              — {q.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

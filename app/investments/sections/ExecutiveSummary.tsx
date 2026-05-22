import { SectionShell } from "../components/SectionShell";
import {
  summaryStats,
  summaryPullQuote,
  summaryLead,
  summaryBody,
} from "../data/summary";

/**
 * §2 — Executive summary.
 *
 * The "set the stakes" beat. Lead narrative, four big TAM numbers in a
 * row, supporting body, founding-note pull quote.
 */
export function ExecutiveSummary() {
  return (
    <SectionShell id="summary" index="02" eyebrow="Executive summary">
      <h2 className="inv-display-md inv-summary__headline">
        The operating system for the{" "}
        <span className="inv-summary__accent">modern operator</span>.
      </h2>

      <p className="inv-body inv-summary__lead">{summaryLead}</p>

      <div className="inv-summary__grid">
        {summaryStats.map((s) => (
          <div className="inv-summary__stat" key={s.value}>
            <div className="inv-stat" aria-label={`${s.value} — ${s.label}`}>
              {s.value}
            </div>
            <p className="inv-stat__label">{s.label}</p>
          </div>
        ))}
      </div>

      <p className="inv-body inv-body-muted inv-summary__body">
        {summaryBody}
      </p>

      <figure className="inv-summary__quote">
        <blockquote className="inv-display-sm">
          &ldquo;{summaryPullQuote.body}&rdquo;
        </blockquote>
        <figcaption className="inv-mono inv-body-muted">
          — {summaryPullQuote.attribution}
        </figcaption>
      </figure>
    </SectionShell>
  );
}

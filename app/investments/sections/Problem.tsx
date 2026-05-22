import { SectionShell } from "../components/SectionShell";
import {
  problemLead,
  problemBreakdowns,
  problemHiddenCost,
  problemStats,
  problemPullQuote,
} from "../data/problem";

/**
 * §3 — The problem.
 *
 * Five-row breakdown of where the workflow falls apart, three big
 * "hidden cost" numbers, pull quote.
 */
export function Problem() {
  return (
    <SectionShell id="problem" index="03" eyebrow="The problem">
      <h2 className="inv-display-md inv-problem__headline">
        An industry running on{" "}
        <span className="inv-problem__strike">spreadsheets</span>.
      </h2>

      <p className="inv-body inv-problem__lead">{problemLead}</p>

      <ul className="inv-problem__breakdown" role="list">
        {problemBreakdowns.map((b) => (
          <li key={b.title} className="inv-problem__row">
            <div className="inv-mono inv-problem__row-label">{b.title}</div>
            <p className="inv-problem__row-body">{b.body}</p>
          </li>
        ))}
      </ul>

      <div className="inv-problem__cost">
        <div className="inv-tag">{problemHiddenCost.headline}</div>
        <p className="inv-display-sm inv-problem__cost-body">
          {problemHiddenCost.body}
        </p>
      </div>

      <div className="inv-problem__stats">
        {problemStats.map((s) => (
          <div className="inv-problem__stat" key={s.value}>
            <div className="inv-stat" aria-label={`${s.value} — ${s.label}`}>
              {s.value}
            </div>
            <p className="inv-stat__label">{s.label}</p>
          </div>
        ))}
      </div>

      <figure className="inv-problem__quote">
        <blockquote className="inv-display-sm">
          &ldquo;{problemPullQuote.body}&rdquo;
        </blockquote>
        <figcaption className="inv-mono inv-body-muted">
          — {problemPullQuote.attribution}
        </figcaption>
      </figure>
    </SectionShell>
  );
}

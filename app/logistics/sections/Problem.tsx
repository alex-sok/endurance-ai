import { SectionShell } from "../components/SectionShell";
import { problemStats, problemPullQuote } from "../data/problem";

/**
 * §2 — The problem.
 *
 * Phase 1: Three big stats in a row, pull-quote below.
 * Phase 3: Stats count up on scroll-into-view, chaos of phone/fax
 * lines animates behind, collapses to a single dot at the section end.
 */
export function Problem() {
  return (
    <SectionShell
      id="problem"
      index="02"
      eyebrow="The problem"
    >
      <h2 className="logi-display-md logi-problem__headline">
        An industry running on{" "}
        <span className="logi-problem__strike">phone calls</span>.
      </h2>

      <div className="logi-problem__grid">
        {problemStats.map((s) => (
          <div className="logi-problem__stat" key={s.value}>
            <div className="logi-stat" aria-label={`${s.value} — ${s.label}`}>
              {s.value}
            </div>
            <p className="logi-stat__label">{s.label}</p>
          </div>
        ))}
      </div>

      <figure className="logi-problem__quote">
        <blockquote className="logi-display-sm">
          &ldquo;{problemPullQuote.body}&rdquo;
        </blockquote>
        <figcaption className="logi-mono logi-body-muted">
          — {problemPullQuote.attribution}
        </figcaption>
      </figure>
    </SectionShell>
  );
}

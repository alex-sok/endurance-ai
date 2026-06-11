import { SectionShell } from "../components/SectionShell";
import { ProblemTheatre } from "../components/ProblemTheatre";
import { problemStats, problemPullQuote } from "../data/problem";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §2 — The problem. Stat theatre, honest version (DESIGN-V2.md).
 *
 * Server component: SSR renders the complete final state — headline
 * with the strike fully drawn (no-JS / reduced-motion / LCP all see
 * the verdict), all three stats at their real values, pull quote
 * visible. ProblemTheatre (client island) layers the desktop pin,
 * the strike draw, and the one-shot count-ups on top.
 *
 * The strike SVG is inline so DrawSVG can draw it left-to-right;
 * it is decorative (aria-hidden) — the muted text color carries the
 * meaning visually and the copy reads fine without it.
 */
export function Problem() {
  const stats = problemStats.filter(
    (s) => !isPlaceholder(s.value) && !isPlaceholder(s.label),
  );
  const showQuote =
    !isPlaceholder(problemPullQuote.body) &&
    !isPlaceholder(problemPullQuote.attribution);

  return (
    <SectionShell
      id="problem"
      index="02"
      eyebrow="The problem"
      className="v2-problem"
    >
      <ProblemTheatre />

      <h2 className="logi-display-md v2-problem__headline">
        An industry running on{" "}
        <span className="v2-problem__strike">
          phone calls
          <svg
            className="v2-problem__strike-svg"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="v2-problem__strike-line"
              d="M0 8 L100 2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
        .
      </h2>

      <div className="v2-problem__grid">
        {stats.map((s) => (
          <div
            className="v2-problem__stat"
            key={s.value}
            data-stat-value={s.value}
          >
            <div
              className="logi-stat v2-problem__value"
              aria-label={`${s.value} — ${s.label}`}
            >
              {s.value}
            </div>
            <p className="logi-stat__label">{s.label}</p>
          </div>
        ))}
      </div>

      {showQuote ? (
        <figure className="v2-problem__quote">
          <blockquote className="logi-display-sm">
            &ldquo;{problemPullQuote.body}&rdquo;
          </blockquote>
          <figcaption className="logi-mono logi-body-muted">
            — {problemPullQuote.attribution}
          </figcaption>
        </figure>
      ) : null}
    </SectionShell>
  );
}

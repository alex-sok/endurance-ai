import { SectionShell } from "../components/SectionShell";
import {
  solutionLead,
  solutionPrinciples,
  solutionClose,
} from "../data/solution";

/**
 * §4 — The solution.
 *
 * Lead narrative + five design-principle pillars in a grid + closing
 * statement.
 */
export function Solution() {
  return (
    <SectionShell id="solution" index="04" eyebrow="The solution">
      <h2 className="inv-display-md inv-solution__headline">
        A single, intelligent{" "}
        <span className="inv-solution__accent">command center</span>.
      </h2>

      <p className="inv-body inv-solution__lead">{solutionLead}</p>

      <div className="inv-solution__principles">
        <div className="inv-tag inv-solution__principles-eyebrow">
          Core design principles
        </div>
        <div className="inv-solution__grid">
          {solutionPrinciples.map((p, i) => (
            <article className="inv-solution__pillar" key={p.title}>
              <div className="inv-mono inv-solution__pillar-num">
                0{i + 1}
              </div>
              <h3 className="inv-display-sm">{p.title}</h3>
              <p className="inv-body inv-body-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="inv-display-sm inv-solution__close">{solutionClose}</p>
    </SectionShell>
  );
}

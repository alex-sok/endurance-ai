import { SectionShell } from "../components/SectionShell";
import { roadmapMilestones } from "../data/roadmap";

/**
 * §9 — Roadmap.
 *
 * Phase 1: Horizontal timeline as a 4-column grid. On mobile it stacks.
 * Phase 3: Scroll-pinned horizontal scroll; truck SVG drives left-to-right
 * along the timeline path, unlocking milestones as it passes.
 */
export function Roadmap() {
  return (
    <SectionShell
      id="roadmap"
      index="09"
      eyebrow="Roadmap"
    >
      <h2 className="logi-display-md logi-roadmap__headline">
        The next <span className="logi-roadmap__accent">24 months</span>.
      </h2>

      <div className="logi-roadmap__track" aria-hidden="true">
        <div className="logi-roadmap__rail" />
      </div>

      <div className="logi-roadmap__grid">
        {roadmapMilestones.map((m, i) => (
          <article key={m.window} className="logi-roadmap__milestone">
            <div className="logi-roadmap__node" aria-hidden="true" />
            <div className="logi-mono logi-roadmap__window">
              0{i + 1} · {m.window}
            </div>
            <ul className="logi-roadmap__deliverables">
              {m.deliverables.map((d) => (
                <li key={d} className="logi-body">
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

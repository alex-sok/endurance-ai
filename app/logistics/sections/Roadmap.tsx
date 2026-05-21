import { SectionShell } from "../components/SectionShell";
import { RoadmapTruckClient } from "../components/RoadmapTruckClient";
import { roadmapMilestones } from "../data/roadmap";

/**
 * §9 Roadmap.
 *
 * A horizontal timeline with four milestone windows. As the user
 * scrolls through the section, a truck SVG drives left-to-right along
 * the rail. Each milestone node "unlocks" (color + scale + a check
 * stamp) as the truck passes it.
 *
 * Mobile: the timeline collapses to a vertical stack and the truck
 * animation is suppressed — the milestone unlocks still fire on
 * scroll-into-view.
 */
export function Roadmap() {
  return (
    <SectionShell id="roadmap" index="09" eyebrow="Roadmap">
      <h2 className="logi-display-md logi-roadmap__headline">
        The next <span className="logi-roadmap__accent">24 months</span>.
      </h2>

      <div className="logi-roadmap__track" aria-hidden="true">
        <div className="logi-roadmap__rail">
          <div className="logi-roadmap__rail-fill" data-roadmap-rail-fill />
        </div>
        <div className="logi-roadmap__truck" data-roadmap-truck>
          <svg viewBox="0 0 36 16" width="36" height="16">
            {/* Trailer */}
            <rect x="0" y="3" width="22" height="10" fill="var(--logi-signal)" rx="1" />
            {/* Cab */}
            <rect x="22" y="5" width="9" height="8" fill="var(--logi-signal)" rx="1" />
            {/* Windshield */}
            <rect x="28" y="6.5" width="2" height="3" fill="#0a0b0d" />
            {/* Wheels */}
            <circle cx="6" cy="14" r="1.5" fill="#0a0b0d" />
            <circle cx="16" cy="14" r="1.5" fill="#0a0b0d" />
            <circle cx="26" cy="14" r="1.5" fill="#0a0b0d" />
            {/* Headlight glow */}
            <circle cx="32" cy="9" r="2" fill="var(--logi-signal)" opacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="logi-roadmap__grid">
        {roadmapMilestones.map((m, i) => (
          <article
            key={m.window}
            className="logi-roadmap__milestone"
            data-roadmap-milestone={i}
          >
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

      <RoadmapTruckClient milestoneCount={roadmapMilestones.length} />
    </SectionShell>
  );
}

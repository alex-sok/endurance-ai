import { SectionShell } from "../components/SectionShell";
import { RoadmapTruckClient } from "../components/RoadmapTruckClient";
import { roadmapMilestones } from "../data/roadmap";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §9 Roadmap — "the long haul" (DESIGN-V2.md).
 *
 * A horizontal timeline with four milestone windows. As the user
 * scrolls, a truck drives left-to-right along the rail (scrub: true —
 * Lenis is the only smoothing layer). Each column unlocks with a
 * one-shot headlight sweep as the truck passes it.
 *
 * Data hygiene: deliverable bullets failing isPlaceholder() are
 * filtered out server-side — milestones render only real bullets.
 *
 * Mobile: the timeline collapses to a vertical stack, the truck is
 * suppressed, and cards slide in on scroll (RoadmapTruckClient).
 */
export function Roadmap() {
  return (
    <SectionShell id="roadmap" index="09" eyebrow="Roadmap">
      <h2 className="logi-display-md v2-roadmap__headline">
        The next <span className="v2-roadmap__accent">24 months</span>.
      </h2>

      <div className="v2-roadmap__track" data-roadmap-track aria-hidden="true">
        <div className="v2-roadmap__rail">
          <div className="v2-roadmap__rail-fill" data-roadmap-rail-fill />
        </div>
        <div className="v2-roadmap__truck" data-roadmap-truck>
          <svg viewBox="0 0 56 16" width="56" height="16">
            <defs>
              {/* Pre-rendered headlight beam — gradient, never a filter. */}
              <linearGradient id="v2-roadmap-beam">
                <stop offset="0" stopColor="var(--logi-signal)" stopOpacity="0.45" />
                <stop offset="1" stopColor="var(--logi-signal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Beam */}
            <polygon points="31,9 53,4 53,14" fill="url(#v2-roadmap-beam)" />
            {/* Trailer */}
            <rect x="0" y="3" width="22" height="10" rx="1" fill="var(--logi-signal)" />
            {/* Cab */}
            <rect x="22" y="5" width="9" height="8" rx="1" fill="var(--logi-signal)" />
            {/* Windshield */}
            <rect x="28" y="6.5" width="2" height="3" fill="#0a0b0d" />
            {/* Wheels */}
            <circle cx="6" cy="14" r="1.5" fill="#0a0b0d" />
            <circle cx="16" cy="14" r="1.5" fill="#0a0b0d" />
            <circle cx="26" cy="14" r="1.5" fill="#0a0b0d" />
          </svg>
        </div>
      </div>

      <div className="v2-roadmap__grid" data-roadmap-grid>
        {roadmapMilestones.map((m, i) => (
          <article
            key={m.window}
            className="v2-roadmap__milestone"
            data-roadmap-milestone={i}
          >
            <div className="v2-roadmap__node" aria-hidden="true" />
            <div className="logi-mono v2-roadmap__window">
              0{i + 1} · {m.window}
            </div>
            <ul className="v2-roadmap__deliverables">
              {m.deliverables
                .filter((d) => !isPlaceholder(d))
                .map((d) => (
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

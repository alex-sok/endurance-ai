import { SectionShell } from "../components/SectionShell";
import { shiftPillars, shiftSplit } from "../data/shift";

/**
 * §3 — The shift.
 *
 * Phase 1: Static split-screen + three pillars.
 * Phase 3: Pinned scrub timeline — incumbent stack desaturates, AI stack
 * ignites in the accent color as the user scrolls through.
 */
export function Shift() {
  return (
    <SectionShell
      id="shift"
      index="03"
      eyebrow="Why now"
    >
      <h2 className="logi-display-md logi-shift__headline">
        Why <em className="logi-shift__em">now</em>.
      </h2>

      <div className="logi-shift__split">
        <div className="logi-shift__col logi-shift__col--incumbent">
          <div className="logi-tag" style={{ color: "var(--logi-fg-muted)" }}>
            Incumbent
          </div>
          <ul className="logi-shift__stack">
            {shiftSplit.incumbent.map((label, i) => (
              <li key={`${label}-${i}`} className="logi-mono">
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="logi-shift__col logi-shift__col--endurance">
          <div className="logi-tag">Endurance</div>
          <ul className="logi-shift__stack">
            {shiftSplit.endurance.map((label) => (
              <li key={label} className="logi-mono">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="logi-shift__pillars">
        {shiftPillars.map((p, i) => (
          <article className="logi-shift__pillar" key={p.title}>
            <div className="logi-mono logi-shift__pillar-num">
              0{i + 1}
            </div>
            <h3 className="logi-display-sm">{p.title}</h3>
            <p className="logi-body logi-body-muted">{p.body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

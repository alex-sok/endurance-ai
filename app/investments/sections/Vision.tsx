import { SectionShell } from "../components/SectionShell";
import {
  visionLead,
  visionMilestones,
  visionClose,
} from "../data/vision";

/**
 * §9 — Long-term vision.
 *
 * Three milestone windows (Year 1–2, 2–3, 3–5), each with a headline
 * theme and deliverables list. Closing Bloomberg-comparison statement.
 */
export function Vision() {
  return (
    <SectionShell id="vision" index="09" eyebrow="The vision">
      <h2 className="inv-display-md inv-vision__headline">
        The OS for{" "}
        <span className="inv-vision__accent">real estate investment</span>.
      </h2>

      <p className="inv-body inv-vision__lead">{visionLead}</p>

      <div className="inv-vision__grid">
        {visionMilestones.map((m, i) => (
          <article key={m.window} className="inv-vision__milestone">
            <div className="inv-vision__milestone-head">
              <div className="inv-mono inv-vision__milestone-window">
                0{i + 1} · {m.window}
              </div>
              <h3 className="inv-display-sm inv-vision__milestone-name">
                {m.headline}
              </h3>
            </div>
            <ul className="inv-vision__milestone-deliverables">
              {m.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="inv-display-sm inv-vision__close">{visionClose}</p>
    </SectionShell>
  );
}

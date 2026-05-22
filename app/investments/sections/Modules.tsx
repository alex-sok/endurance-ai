import { SectionShell } from "../components/SectionShell";
import { modules } from "../data/modules";

/**
 * §5 — Product modules.
 *
 * Six integrated modules, each in its own card. Two-column grid on
 * desktop, single-column on mobile.
 */
export function Modules() {
  return (
    <SectionShell id="modules" index="05" eyebrow="The product">
      <h2 className="inv-display-md inv-modules__headline">
        Six modules.{" "}
        <span className="inv-modules__accent">One platform</span>.
      </h2>

      <div className="inv-modules__grid">
        {modules.map((m) => (
          <article key={m.num} className="inv-panel inv-modules__card">
            <div className="inv-modules__card-head">
              <div className="inv-mono inv-modules__card-num">{m.num}</div>
              <div className="inv-mono inv-modules__card-eyebrow">Module</div>
            </div>
            <h3 className="inv-display-sm inv-modules__card-name">
              {m.name}
            </h3>
            <p className="inv-body inv-modules__card-tagline">
              {m.tagline}
            </p>
            <p className="inv-body inv-body-muted inv-modules__card-body">
              {m.body}
            </p>
            <ul className="inv-modules__card-bullets">
              {m.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

import { SectionShell } from "../components/SectionShell";
import {
  competitiveColumns,
  competitiveAdvantages,
} from "../data/competitive";

/**
 * §7 — Competitive positioning.
 *
 * 11-row × 4-column comparison table (Endurance vs Excel, Argus, generic
 * CRM) + advantages list below.
 */
function CellIcon({ value }: { value: string }) {
  if (value === "yes")
    return (
      <span className="inv-comp__check" aria-label="yes">
        ✓
      </span>
    );
  if (value === "no")
    return (
      <span className="inv-comp__x" aria-label="no">
        ✗
      </span>
    );
  if (value === "partial" || value === "soon") {
    return (
      <span className="inv-comp__partial inv-mono" aria-label={value}>
        {value === "partial" ? "Partial" : "Soon"}
      </span>
    );
  }
  return <span className="inv-mono">{value}</span>;
}

export function Competitive() {
  const rowKeys = Object.keys(competitiveColumns[0].cells);

  return (
    <SectionShell id="competitive" index="07" eyebrow="Competitive positioning">
      <h2 className="inv-display-md inv-comp__headline">
        We don&rsquo;t replace one tool.{" "}
        <span className="inv-comp__accent">We replace the stack</span>.
      </h2>

      <div className="inv-comp__table" role="table">
        <div className="inv-comp__row inv-comp__row--header" role="row">
          <div className="inv-comp__cell inv-comp__cell--label" />
          {competitiveColumns.map((col) => (
            <div
              key={col.name}
              className={`inv-comp__cell inv-comp__cell--header ${
                col.tone === "signal" ? "is-signal" : ""
              }`}
            >
              <div className="inv-mono inv-comp__col-eyebrow">
                {col.tone === "signal" ? "Endurance" : "Status quo"}
              </div>
              <div className="inv-display-sm">{col.name}</div>
            </div>
          ))}
        </div>

        {rowKeys.map((rowKey) => (
          <div key={rowKey} className="inv-comp__row" role="row">
            <div className="inv-comp__cell inv-comp__cell--label inv-mono">
              {rowKey}
            </div>
            {competitiveColumns.map((col) => (
              <div
                key={`${col.name}-${rowKey}`}
                className={`inv-comp__cell ${
                  col.tone === "signal" ? "is-signal" : ""
                }`}
              >
                <CellIcon value={col.cells[rowKey] as string} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="inv-comp__advantages">
        <div className="inv-tag">Why Endurance wins</div>
        <ul className="inv-comp__advantages-list">
          {competitiveAdvantages.map((a) => (
            <li key={a.title} className="inv-comp__advantage">
              <h4 className="inv-display-sm">{a.title}</h4>
              <p className="inv-body inv-body-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

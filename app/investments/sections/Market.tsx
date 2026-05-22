import { SectionShell } from "../components/SectionShell";
import {
  marketLead,
  marketSegments,
  marketHeadline,
  marketDrivers,
  marketClose,
} from "../data/market";

/**
 * §6 — Market opportunity.
 *
 * TAM segments as a horizontal bar + table breakdown, big $240B stat,
 * "why now" drivers as a list, closing statement.
 */
export function Market() {
  return (
    <SectionShell id="market" index="06" eyebrow="Market opportunity">
      <h2 className="inv-display-md inv-market__headline">
        The largest single{" "}
        <span className="inv-market__accent">asset class</span>.
      </h2>

      <p className="inv-body inv-market__lead">{marketLead}</p>

      <div className="inv-market__headline-stat">
        <div className="inv-stat inv-market__big">{marketHeadline.big}</div>
        <p className="inv-stat__label">{marketHeadline.label}</p>
      </div>

      <div className="inv-market__table">
        <div className="inv-market__table-header">
          <div className="inv-mono">Segment</div>
          <div className="inv-mono">Firms</div>
          <div className="inv-mono">Annual platform value</div>
        </div>
        {marketSegments.map((s) => (
          <div
            key={s.label}
            className={`inv-market__row ${
              "highlight" in s && s.highlight ? "is-highlight" : ""
            }`}
          >
            <div className="inv-market__cell">
              <div className="inv-display-sm">{s.label}</div>
              <p className="inv-body inv-body-muted">{s.range}</p>
            </div>
            <div className="inv-market__cell inv-mono">{s.firms}</div>
            <div className="inv-market__cell inv-mono">{s.price}</div>
          </div>
        ))}
      </div>

      <div className="inv-market__drivers">
        <div className="inv-tag">Why this market, why now</div>
        <ul className="inv-market__drivers-list">
          {marketDrivers.map((d) => (
            <li key={d.title} className="inv-market__driver">
              <h4 className="inv-display-sm inv-market__driver-title">
                {d.title}
              </h4>
              <p className="inv-body inv-body-muted">{d.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="inv-display-sm inv-market__close">{marketClose}</p>
    </SectionShell>
  );
}

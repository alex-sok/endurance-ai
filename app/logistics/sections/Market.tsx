import { SectionShell } from "../components/SectionShell";
import { marketSize, spendBreakdown, laneCorridors } from "../data/market";

/**
 * §6 — Market.
 *
 * Phase 1: TAM/SAM/SOM block + static spend-breakdown bar + corridor list.
 * Phase 3: US map lights up lane-by-lane via Mapbox setPaintProperty;
 * spend breakdown animates as a stacked bar drawing in.
 */
export function Market() {
  return (
    <SectionShell
      id="market"
      index="06"
      eyebrow="Market"
    >
      <h2 className="logi-display-md logi-market__headline">
        <span className="logi-market__accent">$1.8 trillion</span>,
        <br />
        line by line.
      </h2>

      <div className="logi-market__breakdown" aria-label="US logistics spend breakdown">
        {spendBreakdown.map((s) => (
          <div
            key={s.segment}
            className={`logi-market__slice ${"highlight" in s && s.highlight ? "is-highlight" : ""}`}
            style={{ flex: s.value }}
            title={`${s.segment} — ${Math.round(s.value * 100)}%`}
          >
            <div className="logi-mono logi-market__slice-label">
              {s.segment}
            </div>
            <div className="logi-mono logi-market__slice-pct">
              {Math.round(s.value * 100)}%
            </div>
          </div>
        ))}
      </div>

      <div className="logi-market__lanes">
        <div className="logi-tag">Beachhead corridors</div>
        <ul className="logi-market__lane-list">
          {laneCorridors.map((lane) => (
            <li key={lane.name} className="logi-market__lane">
              <span className="logi-mono logi-market__lane-name">
                {lane.name}
              </span>
              <span
                className="logi-market__lane-bar"
                style={{ width: `${lane.weight * 100}%` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="logi-market__sizes">
        {[marketSize.tam, marketSize.sam, marketSize.som].map((m) => (
          <div className="logi-market__size" key={m.value}>
            <div className="logi-stat">{m.value}</div>
            <p className="logi-stat__label">{m.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

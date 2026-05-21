import { SectionShell } from "../components/SectionShell";
import { moatColumns, moatClose } from "../data/moat";

/**
 * §7 — Moat.
 *
 * Phase 1: 3-column comparison table.
 * Phase 3: Horizontal scroll-pinned rail; rows reveal one-by-one as you
 * scroll horizontally; Endurance column cumulatively ignites. Mobile
 * collapses to this vertical stack (which is what Phase 1 ships).
 */
export function Moat() {
  const rowKeys = Object.keys(moatColumns[0].cells) as Array<
    keyof (typeof moatColumns)[number]["cells"]
  >;

  return (
    <SectionShell
      id="moat"
      index="07"
      eyebrow="Why we win"
    >
      <h2 className="logi-display-md logi-moat__headline">
        Why <span className="logi-moat__accent">AI-native</span> wins.
      </h2>

      <div className="logi-moat__table" role="table">
        <div className="logi-moat__row logi-moat__row--header" role="row">
          <div className="logi-moat__cell logi-moat__cell--label" role="columnheader" />
          {moatColumns.map((col) => (
            <div
              key={col.name}
              className={`logi-moat__cell logi-moat__cell--header ${
                col.tone === "signal" ? "is-signal" : ""
              }`}
              role="columnheader"
            >
              <div className="logi-mono logi-moat__col-eyebrow">
                {col.tone === "signal" ? "Endurance" : "Status quo"}
              </div>
              <div className="logi-display-sm">{col.name}</div>
            </div>
          ))}
        </div>

        {rowKeys.map((rowKey) => (
          <div key={rowKey} className="logi-moat__row" role="row">
            <div
              className="logi-moat__cell logi-moat__cell--label logi-mono"
              role="rowheader"
            >
              {rowKey}
            </div>
            {moatColumns.map((col) => (
              <div
                key={`${col.name}-${rowKey}`}
                className={`logi-moat__cell ${col.tone === "signal" ? "is-signal" : ""}`}
                role="cell"
              >
                {col.cells[rowKey]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="logi-display-sm logi-moat__close">{moatClose}</p>
    </SectionShell>
  );
}

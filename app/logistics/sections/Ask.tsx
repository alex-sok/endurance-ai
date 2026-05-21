import { SectionShell } from "../components/SectionShell";
import { ask } from "../data/ask";
import { PRIVATE_METRICS } from "../lib/config";
import { fmtUSD } from "../lib/formatters";

/**
 * §10 — The ask.
 *
 * Phase 1: Big round-size number, allocation as horizontal bar (slices
 * label inline), unlocks list, committed investor row.
 * Phase 3: Donut chart with each slice drawing in sequence; round size
 * counts up.
 */
export function Ask() {
  const masked = PRIVATE_METRICS || ask.roundSize.value === 0;

  return (
    <SectionShell
      id="ask"
      index="10"
      eyebrow="The ask"
    >
      <h2 className="logi-display-md logi-ask__headline">
        What we&rsquo;re raising{" "}
        <span className="logi-ask__accent">and why</span>.
      </h2>

      <div className="logi-ask__round">
        <div className="logi-stat logi-ask__amount">
          {masked
            ? "$ — — —"
            : fmtUSD(ask.roundSize.value, { compact: true })}
        </div>
        <p className="logi-stat__label">{ask.roundSize.label}</p>
      </div>

      <div className="logi-ask__alloc" aria-label="Use of funds">
        <div className="logi-ask__alloc-bar">
          {ask.allocation.map((a) => (
            <div
              key={a.slice}
              className="logi-ask__alloc-slice"
              style={{ flex: a.pct }}
              title={`${a.slice} — ${Math.round(a.pct * 100)}%`}
            />
          ))}
        </div>
        <ul className="logi-ask__alloc-legend">
          {ask.allocation.map((a) => (
            <li key={a.slice}>
              <span className="logi-mono logi-ask__alloc-pct">
                {Math.round(a.pct * 100)}%
              </span>
              <div>
                <div className="logi-display-sm logi-ask__alloc-slice-name">
                  {a.slice}
                </div>
                <p className="logi-body logi-body-muted">{a.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="logi-ask__unlocks">
        <div className="logi-tag">18-month unlocks</div>
        <ul>
          {ask.unlocks.map((u) => (
            <li key={u} className="logi-display-sm">
              {u}
            </li>
          ))}
        </ul>
      </div>

      {ask.committed.length > 0 ? (
        <div className="logi-ask__committed">
          <div className="logi-tag">Committed</div>
          <div className="logi-ask__committed-logos">
            {ask.committed.map((c) => (
              <span key={c.name} className="logi-mono">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="logi-body logi-body-muted logi-mono">
          // TODO(alex): committed investor logos when ready.
        </p>
      )}
    </SectionShell>
  );
}

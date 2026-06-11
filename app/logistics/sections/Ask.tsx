import { SectionShell } from "../components/SectionShell";
import { AskRevealClient } from "../components/AskRevealClient";
import { ask } from "../data/ask";
import { PRIVATE_METRICS } from "../lib/config";
import { fmtUSD } from "../lib/formatters";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §10 — The ask. "Readable first" (DESIGN-V2.md).
 *
 * Round size and use-of-funds sit side by side on desktop so the whole
 * ask reads in one viewport on a 13" laptop. The legend is fully
 * visible on entry; only the bar segments animate (AskRevealClient).
 *
 * Data hygiene: unlocks and committed investors hide entirely while
 * their data is placeholder — no TODO strings in display type, no
 * fallback copy.
 */
export function Ask() {
  const masked = PRIVATE_METRICS || ask.roundSize.value === 0;
  const unlocks = ask.unlocks.filter((u) => !isPlaceholder(u));
  const committed = ask.committed.filter((c) => !isPlaceholder(c.name));

  return (
    <SectionShell id="ask" index="10" eyebrow="The ask" className="v2-ask">
      <AskRevealClient roundValue={masked ? null : ask.roundSize.value}>
        <h2 className="logi-display-md v2-ask__headline">
          What we&rsquo;re raising{" "}
          <span className="v2-ask__accent">and why</span>.
        </h2>

        <div className="v2-ask__grid">
          <div className="v2-ask__round v2-ask__block">
            <div className="logi-stat v2-ask__amount">
              <span
                className={
                  masked
                    ? "v2-ask__amount-value v2-ask__amount-value--masked"
                    : "v2-ask__amount-value"
                }
              >
                {masked
                  ? "$ — — —"
                  : fmtUSD(ask.roundSize.value, { compact: true })}
              </span>
            </div>
            <p className="logi-stat__label v2-ask__round-label">
              {ask.roundSize.label}
            </p>
          </div>

          {/* Readable-first (spec §10): the legend never reveals — only
              the bar segments animate. No v2-ask__block here. */}
          <div className="v2-ask__alloc">
            <div className="v2-ask__bar" aria-hidden="true">
              {ask.allocation.map((a) => (
                <div
                  key={a.slice}
                  className="v2-ask__bar-seg"
                  style={{ flex: a.pct }}
                />
              ))}
            </div>
            <ul className="v2-ask__legend" aria-label="Use of funds">
              {ask.allocation.map((a) => (
                <li key={a.slice} className="v2-ask__legend-item">
                  <span className="logi-mono v2-ask__legend-pct">
                    {Math.round(a.pct * 100)}%
                  </span>
                  <div className="v2-ask__legend-copy">
                    <div className="v2-ask__legend-name">{a.slice}</div>
                    <p className="v2-ask__legend-blurb">{a.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {unlocks.length > 0 ? (
          <div className="v2-ask__unlocks v2-ask__block">
            <div className="logi-tag">18-month unlocks</div>
            <ul>
              {unlocks.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {committed.length > 0 ? (
          <div className="v2-ask__committed v2-ask__block">
            <div className="logi-tag">Committed</div>
            <div className="v2-ask__committed-names">
              {committed.map((c) => (
                <span key={c.name} className="logi-mono">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </AskRevealClient>
    </SectionShell>
  );
}

import { SectionShell } from "../components/SectionShell";
import { AnimatedMarketMap } from "../components/AnimatedMarketMap";
import { MarketRevealClient } from "../components/MarketRevealClient";
import { marketSize, spendBreakdown } from "../data/market";

/**
 * §6 Market.
 *
 * The map is the centerpiece — five interstate corridors light up
 * one-by-one as the section scrolls into view. The spend-breakdown
 * bar fills in below; the TAM/SAM/SOM block stamps in.
 *
 * The corridor list that used to live here is gone — it duplicated
 * what the map now shows. Names are labeled on the map itself.
 */
export function Market() {
  return (
    <SectionShell id="market" index="06" eyebrow="Market">
      <MarketRevealClient />

      <h2 className="logi-display-md logi-market__headline" data-reveal>
        <span className="logi-market__accent">$1.8 trillion</span>,
        <br />
        line by line.
      </h2>

      <div className="logi-market__map" aria-hidden="false">
        <AnimatedMarketMap />
      </div>

      <div
        className="logi-market__breakdown"
        aria-label="US logistics spend breakdown"
        data-reveal-bar
      >
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

      <div className="logi-market__sizes">
        {[marketSize.tam, marketSize.sam, marketSize.som].map((m) => (
          <div className="logi-market__size" key={m.value} data-reveal-stat>
            <div className="logi-stat">{m.value}</div>
            <p className="logi-stat__label">{m.label}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

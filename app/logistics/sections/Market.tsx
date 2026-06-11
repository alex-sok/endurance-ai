import { SectionShell } from "../components/SectionShell";
import { MarketRevealClient } from "../components/MarketRevealClient";
import { marketSize, spendBreakdown } from "../data/market";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §6 Market — "the funnel line" (DESIGN-V2.md, Vectr-style journey).
 *
 * The headline is taken literally: one continuous amber line draws down
 * the section as you scroll, weaving through three numbered scenes —
 * 01 Total market ($1.8T) → 02 Serviceable ($400B) → 03 Beachhead
 * ($12B) — narrowing at each gate exactly like the market does, then
 * diving into the map frame, where the existing I-95 corridor story is
 * its continuation: the whole market, funneled to one corridor.
 *
 * The line is pure decoration (scrubbed); every stat reveals once on
 * entry and is fully readable mid-scroll (hard rule #1). The geometry
 * is measured from the real DOM at runtime in MarketRevealClient, so
 * the curve always passes exactly through the scene nodes.
 *
 * The Charlotte-alert map (AnimatedMarketMap) stays untouched inside
 * its zoom frame.
 */

const SCENE_META = {
  tam: { kicker: "01 — Total market", side: "right" },
  sam: { kicker: "02 — Serviceable", side: "left" },
  som: { kicker: "03 — Beachhead · where we start", side: "right" },
} as const;

export function Market() {
  const sizes = (
    [
      ["tam", marketSize.tam],
      ["sam", marketSize.sam],
      ["som", marketSize.som],
    ] as const
  ).filter(([, m]) => !isPlaceholder(m.value) && !isPlaceholder(m.label));

  const segments = spendBreakdown.filter((s) => !isPlaceholder(s.segment));
  // start → each scene node: one path segment per hop.
  const segmentCount = sizes.length;

  return (
    <SectionShell id="market" index="06" eyebrow="Market">
      <MarketRevealClient />

      <h2 className="logi-display-md v2-market__headline">
        <span className="v2-market__accent">$1.8 trillion</span>,
        <br />
        line by line.
      </h2>

      <div className="v2-market__journey">
        {/* The continuous line — geometry set at runtime from real node
            positions. Glow twin under each segment (no SVG filters: the
            line redraws per scroll frame). Desktop only; mobile gets a
            CSS rail per scene. */}
        <svg className="v2-market__line-svg" aria-hidden="true">
          {Array.from({ length: segmentCount }, (_, i) => (
            <path key={`g${i}`} className="v2-market__line-glow" data-seg={i} />
          ))}
          {Array.from({ length: segmentCount }, (_, i) => (
            <path key={`s${i}`} className="v2-market__line-seg" data-seg={i} />
          ))}
          <circle className="v2-market__line-head" r="5" />
        </svg>

        {sizes.map(([tier, m]) => {
          const meta = SCENE_META[tier];
          return (
            <div
              key={tier}
              className={`v2-market__scene v2-market__scene--${meta.side} v2-market__scene--${tier}`}
            >
              <span className="v2-market__node" aria-hidden="true" />
              <div className="v2-market__scene-body">
                <div className="logi-tag v2-market__kicker">{meta.kicker}</div>
                <div className={`logi-stat v2-market__stat v2-market__stat--${tier}`}>
                  {m.value}
                </div>
                <p className="logi-stat__label v2-market__label">{m.label}</p>

                {tier === "tam" && segments.length > 0 ? (
                  <div
                    className="v2-market__breakdown"
                    aria-label="US logistics spend breakdown"
                  >
                    {segments.map((s) => (
                      <div
                        key={s.segment}
                        className={`v2-market__slice ${"highlight" in s && s.highlight ? "v2-market__slice--highlight" : ""}`}
                        style={{ flex: s.value }}
                        title={`${s.segment} — ${Math.round(s.value * 100)}%`}
                      >
                        <div className="logi-mono v2-market__slice-label">
                          {s.segment}
                        </div>
                        <div className="logi-mono v2-market__slice-pct">
                          {Math.round(s.value * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}

      </div>
    </SectionShell>
  );
}

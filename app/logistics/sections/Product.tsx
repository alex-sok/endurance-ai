import { SectionShell } from "../components/SectionShell";
import { dispatcherTranscript, dispatcherKpis } from "../data/product";

/**
 * §4 — Product (centerpiece).
 *
 * Phase 1: Static dashboard mock — KPI strip, map placeholder with
 * stylized lanes + truck pips, scripted dispatcher transcript.
 * Phase 3: Pinned section, real Mapbox dark style, animated truck along
 * a GeoJSON route, typewriter rendering of the transcript, camera-zoom
 * into a single load.
 *
 * The transcript is scripted, NOT a live LLM call — investors who pause
 * mid-scroll need to see the same thing every time.
 */
export function Product() {
  return (
    <SectionShell
      id="product"
      index="04"
      eyebrow="The product"
    >
      <h2 className="logi-display-md logi-product__headline">
        Meet the dispatcher that{" "}
        <span className="logi-product__accent">never sleeps</span>.
      </h2>

      <div className="logi-panel logi-product__dashboard">
        {/* KPI strip */}
        <div className="logi-product__kpis" role="list">
          {dispatcherKpis.map((kpi) => (
            <div
              key={kpi.label}
              className="logi-product__kpi"
              role="listitem"
            >
              <div className="logi-mono logi-product__kpi-label">
                {kpi.label}
              </div>
              <div className="logi-product__kpi-value">{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="logi-product__body">
          {/* Map placeholder. Phase 3: Mapbox dark style + live truck
              positions driven from a GeoJSON route. */}
          <div className="logi-product__map" aria-hidden="true">
            <svg viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice">
              {/* Faint grid */}
              <defs>
                <pattern
                  id="mapgrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M40 0H0V40"
                    fill="none"
                    stroke="rgba(245,242,236,0.05)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="800" height="480" fill="url(#mapgrid)" />

              {/* Lane paths */}
              <g
                stroke="var(--logi-signal-dim)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              >
                <path d="M80,360 C200,300 320,340 460,260 S680,200 740,160" />
                <path d="M100,140 C220,200 360,180 480,240 S680,320 760,360" />
                <path d="M120,260 L300,260 L380,180 L600,180" />
              </g>

              {/* Truck pips (active loads) */}
              {[
                [200, 320],
                [340, 260],
                [460, 220],
                [560, 200],
                [380, 180],
                [600, 180],
                [260, 230],
                [700, 340],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="10" fill="var(--logi-signal-glow)" />
                  <rect
                    x={x - 4}
                    y={y - 3}
                    width="8"
                    height="6"
                    fill="var(--logi-signal)"
                  />
                </g>
              ))}
            </svg>

            <div className="logi-product__map-overlay logi-mono">
              <span>SOUTHEAST · LIVE</span>
              <span>{dispatcherKpis[0].value} loads</span>
            </div>
          </div>

          {/* Transcript panel */}
          <aside className="logi-panel--inset logi-product__transcript">
            <header className="logi-product__transcript-header logi-mono">
              <span className="logi-product__pulse" aria-hidden="true" />
              Dispatcher · live
            </header>
            <ol className="logi-product__transcript-feed">
              {dispatcherTranscript.map((line, i) => (
                <li
                  key={i}
                  data-kind={line.kind}
                  className={`logi-product__line logi-product__line--${line.kind}`}
                >
                  <span className="logi-mono logi-product__line-tag">
                    {line.kind === "system"
                      ? "SYS"
                      : line.kind === "thinking"
                        ? "→"
                        : "✓"}
                  </span>
                  <span className="logi-product__line-body">{line.body}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>

      <p className="logi-body logi-body-muted logi-product__caption">
        Live dashboard. Every load above is a real active route on the
        Endurance network.{" "}
        <span className="logi-mono">// TODO(alex): swap for real load IDs</span>
      </p>
    </SectionShell>
  );
}

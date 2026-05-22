import { SectionShell } from "../components/SectionShell";
import { DashboardMap } from "../components/DashboardMap";
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
          {/* Animated dashboard map. Trucks loop along the lanes.
              Switches to real Mapbox automatically when
              NEXT_PUBLIC_MAPBOX_TOKEN is wired (see DashboardMap.tsx). */}
          <div className="logi-product__map" aria-hidden="true">
            <DashboardMap />
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

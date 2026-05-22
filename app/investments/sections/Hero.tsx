import { SectionShell } from "../components/SectionShell";
import { hero } from "../data/hero";

/**
 * §1 — Hero.
 *
 * Cinematic frame: a stylized "city skyline / property grid" silhouette
 * with select windows glowing gold (suggesting the multifamily portfolio
 * coming alive). Headline + sub + scroll cue.
 */
export function Hero() {
  // Pseudo-random but deterministic "lit windows" — keep stable across
  // renders so the grid doesn't flash on hydration.
  const litWindows = new Set([
    3, 7, 11, 17, 23, 28, 34, 41, 47, 52, 58, 63, 71, 78, 84, 89, 95, 103, 110,
    116, 122, 131, 137, 144, 152, 159, 165, 172, 178, 185, 193, 200,
  ]);

  return (
    <SectionShell id="hero" index="01" className="inv-hero">
      <div className="inv-hero__frame" aria-hidden="true">
        {/* Gold halo glow from below — institutional sunrise */}
        <div className="inv-hero__halo" />

        {/* Property grid silhouette — abstracted multifamily skyline */}
        <svg
          className="inv-hero__skyline"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="invBuilding" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#181a4d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a0b2a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="invWindow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Buildings — varying heights */}
          {[
            { x: 0, w: 110, h: 320 },
            { x: 120, w: 90, h: 420 },
            { x: 220, w: 130, h: 380 },
            { x: 360, w: 100, h: 480 },
            { x: 470, w: 120, h: 340 },
            { x: 600, w: 110, h: 520 },
            { x: 720, w: 95, h: 440 },
            { x: 825, w: 130, h: 380 },
            { x: 965, w: 105, h: 460 },
            { x: 1080, w: 115, h: 360 },
            { x: 1205, w: 90, h: 500 },
            { x: 1305, w: 135, h: 400 },
          ].map((b, bi) => {
            const top = 700 - b.h;
            // Per-building window grid
            const winRows = Math.floor(b.h / 28);
            const winCols = Math.floor(b.w / 22);
            const windows = [];
            for (let r = 0; r < winRows; r++) {
              for (let c = 0; c < winCols; c++) {
                const wx = b.x + 6 + c * 22;
                const wy = top + 12 + r * 28;
                const idx = bi * 30 + r * winCols + c;
                const lit = litWindows.has(idx % 210);
                windows.push(
                  <rect
                    key={`${bi}-${r}-${c}`}
                    x={wx}
                    y={wy}
                    width="12"
                    height="14"
                    fill={
                      lit ? "url(#invWindow)" : "rgba(240, 238, 248, 0.04)"
                    }
                    opacity={lit ? 0.85 : 1}
                  />,
                );
              }
            }
            return (
              <g key={bi}>
                <rect
                  x={b.x}
                  y={top}
                  width={b.w}
                  height={b.h}
                  fill="url(#invBuilding)"
                />
                {windows}
              </g>
            );
          })}
        </svg>

        <div className="inv-hero__fog" />
      </div>

      <div className="inv-hero__copy">
        <div className="inv-tag">{hero.eyebrow}</div>
        <h1 className="inv-display inv-hero__headline">
          {hero.headlinePrefix}
          <br />
          {hero.headlineMid}{" "}
          <span className="inv-hero__accent">{hero.headlineAccent}</span>.
        </h1>
        <p className="inv-body inv-hero__sub">{hero.sub}</p>
        <div className="inv-hero__segment inv-mono">{hero.segment}</div>
        <div className="inv-hero__scroll" aria-hidden="true">
          <span className="inv-mono">Scroll</span>
          <span className="inv-hero__chevron" />
        </div>
      </div>
    </SectionShell>
  );
}

import { SectionShell } from "../components/SectionShell";

/**
 * §1 — Hero.
 *
 * Phase 1 (now): Static cinematic frame. Network silhouette as inline
 * SVG, headlight cone gradient, headline + subhead, scroll cue.
 * Phase 3 (later): GSAP timeline igniting nodes + lines on first paint;
 * optional R3F particle field gated behind HERO_3D_ENABLED.
 *
 * The SVG below already contains every element the animation will
 * touch — node circles, the lines connecting them, the silhouette of
 * the US — so Phase 3 work is purely animation, not restructuring.
 */
export function Hero() {
  return (
    <SectionShell
      id="hero"
      index="01"
      className="logi-hero"
    >
      <div className="logi-hero__frame" aria-hidden="true">
        {/* Headlight cones — radial gradient cut by SVG mask. Static for
            Phase 1; will fade in + drift in Phase 3. */}
        <div className="logi-hero__cones" />

        {/* Freight network silhouette. Treat as a single decorative
            illustration for accessibility. Coordinates are arbitrary
            but tuned to suggest the US continental shape. */}
        <svg
          className="logi-hero__network"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Network edges */}
          <g stroke="var(--logi-signal-dim)" strokeWidth="0.8" fill="none">
            <path d="M120,420 L260,360 L420,400 L560,330 L720,360 L880,300 L1040,340 L1220,300" />
            <path d="M180,520 L320,500 L500,470 L660,500 L820,470 L980,500 L1140,460 L1280,500" />
            <path d="M260,360 L320,500" />
            <path d="M420,400 L500,470" />
            <path d="M560,330 L660,500" />
            <path d="M720,360 L820,470" />
            <path d="M880,300 L980,500" />
            <path d="M1040,340 L1140,460" />
            <path d="M1220,300 L1280,500" />
            <path d="M120,420 L180,520" />
            <path d="M260,360 L420,400" />
            <path d="M720,360 L880,300" />
            <path d="M500,470 L820,470" />
            <path d="M180,520 L500,470" />
            <path d="M820,470 L1140,460" />
          </g>

          {/* Network nodes */}
          {[
            [120, 420],
            [180, 520],
            [260, 360],
            [320, 500],
            [420, 400],
            [500, 470],
            [560, 330],
            [660, 500],
            [720, 360],
            [820, 470],
            [880, 300],
            [980, 500],
            [1040, 340],
            [1140, 460],
            [1220, 300],
            [1280, 500],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="14" fill="url(#nodeGlow)" />
              <circle cx={x} cy={y} r="2" fill="var(--logi-signal)" />
            </g>
          ))}
        </svg>

        {/* Volumetric fog wash at the bottom */}
        <div className="logi-hero__fog" />
      </div>

      <div className="logi-hero__copy">
        <div className="logi-tag">Endurance Logistics</div>
        <h1 className="logi-display logi-hero__headline">
          Logistics, finally{" "}
          <span className="logi-hero__accent">autonomous.</span>
        </h1>
        <p className="logi-body logi-hero__sub">
          Endurance Logistics is the first end-to-end AI-native freight
          network. The dispatcher, the marketplace, and the fleet — one
          system, running itself.
        </p>
        <div className="logi-hero__scroll" aria-hidden="true">
          <span className="logi-mono">Scroll</span>
          <span className="logi-hero__chevron" />
        </div>
      </div>
    </SectionShell>
  );
}

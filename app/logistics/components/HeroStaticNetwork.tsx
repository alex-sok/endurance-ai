/**
 * The hero's static network art (the original Phase-1 SVG). Renders
 * unconditionally as the hero's base visual layer: it IS the LCP-safe
 * first frame, and the WebGL canvas crossfades over it once its first
 * frame is ready — no pop-in, and a no-WebGL fallback for free.
 */
export function HeroStaticNetwork() {
  return (
    <>
      <div className="logi-hero__cones" />
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

        {[
          [120, 420], [180, 520], [260, 360], [320, 500],
          [420, 400], [500, 470], [560, 330], [660, 500],
          [720, 360], [820, 470], [880, 300], [980, 500],
          [1040, 340], [1140, 460], [1220, 300], [1280, 500],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="14" fill="url(#nodeGlow)" />
            <circle cx={x} cy={y} r="2" fill="var(--logi-signal)" />
          </g>
        ))}
      </svg>
    </>
  );
}

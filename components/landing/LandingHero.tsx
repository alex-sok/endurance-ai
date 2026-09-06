"use client";

interface Props {
  onOpenChat: () => void;
}

export function LandingHero({ onOpenChat }: Props) {
  return (
    <header className="lp-hero is-center is-tall" id="top" data-section="hero">
      {/* The ship. The 12-segment ring of the Endurance, drawn at the edge of
          visibility — the same geometry as the brand mark, unmodified, held
          at a whisper. You only see it if you look. */}
      <svg
        className="lp-hero-ring"
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="32"
          cy="32"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray="8.4 2.5956"
          strokeDashoffset="4.2"
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="lp-hero-copy">
        <p className="lp-kicker">Research · Engineering · Vertical software</p>
        <h1>
          We research. We build. <em>We ship.</em>
        </h1>
        <p className="lp-hero-lede">
          Endurance is an R&amp;D AI lab based in Silicon Valley. We sit in
          your operation and ship the system it was missing: built for
          operators, not categories, so you set the standard your competitors
          are measured against.
        </p>
        <p className="lp-hero-verticals">
          Brain OS · Foundations · Multiplayer Developer Tool · Micro SaaS
        </p>
        <div className="lp-hero-actions">
          <button type="button" className="lp-btn-quiet" onClick={onOpenChat}>
            See what we&rsquo;d build for you
          </button>
        </div>
      </div>
    </header>
  );
}

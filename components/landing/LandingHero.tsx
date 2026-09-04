"use client";

interface Props {
  onOpenChat: () => void;
}

export function LandingHero({ onOpenChat }: Props) {
  return (
    <header className="lp-hero is-center is-tall" id="top" data-section="hero">
      <div className="lp-hero-copy">
        <p className="lp-kicker">Research · Engineering · Vertical software</p>
        <h1>We research the work. Then we write the software.</h1>
        <p className="lp-hero-lede">
          Endurance is a lab. We sit in the operation, then we ship the system
          it was missing.
        </p>
        <p className="lp-hero-verticals">
          Brain OS · Foundations · IDE · Micro SaaS
        </p>
        <div className="lp-hero-actions">
          <button type="button" className="lp-btn-quiet" onClick={onOpenChat}>
            Invitation to Learn More
          </button>
        </div>
      </div>
    </header>
  );
}

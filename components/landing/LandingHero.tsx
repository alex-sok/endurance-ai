"use client";

interface Props {
  onOpenChat: () => void;
}

export function LandingHero({ onOpenChat }: Props) {
  return (
    <header className="lp-hero" id="top" data-section="hero">
      <div className="lp-hero-copy">
        <p className="lp-kicker">Research · Engineering · Vertical software</p>
        <h1>
          We research the work.
          <em>Then we write the software.</em>
        </h1>
        <p className="lp-hero-lede">
          Endurance is a lab. We sit in the operation, then we ship the system
          it was missing.
        </p>
        <div className="lp-hero-actions">
          <a className="lp-btn lp-btn-fill" href="/margins">
            See Margins
          </a>
          <button type="button" className="lp-btn lp-btn-line" onClick={onOpenChat}>
            Talk to us
          </button>
        </div>
      </div>
    </header>
  );
}

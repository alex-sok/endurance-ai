"use client";

interface Props {
  onOpenChat: () => void;
  onNavigate: (id: string) => void;
}

export function LandingHero({ onOpenChat, onNavigate }: Props) {
  return (
    <header className="lp-hero" id="top" data-section="hero">
      <div className="lp-hero-copy">
        <p className="lp-kicker">Research · Engineering · Vertical&nbsp;software</p>
        <h1>
          We research the work.
          <em>Then we write the software.</em>
        </h1>
        <p className="lp-hero-lede">
          Endurance is a lab. We study how construction, logistics, capital
          markets, and professional services actually run. Then we ship the
          vertical systems those operations have been missing.
        </p>
        <div className="lp-hero-actions">
          <button type="button" className="lp-btn lp-btn-fill" onClick={onOpenChat}>
            Talk to us
          </button>
          <a
            className="lp-btn lp-btn-line"
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("work");
            }}
          >
            See the work
          </a>
        </div>
      </div>
    </header>
  );
}

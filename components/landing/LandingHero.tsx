"use client";

interface Props {
  onOpenChat: () => void;
}

export function LandingHero({ onOpenChat }: Props) {
  return (
    <header className="lp-hero" id="top" data-section="hero">
      <div className="lp-hero-copy">
        <h1>
          Most AI is a chat window.
          <em>The advantage is a system that runs the week.</em>
        </h1>
        <p className="lp-hero-lede">
          A copilot sits on top of the mess. We sit in the operation, then we
          write the software that does the work: cites its sources, settles the
          money, leaves Friday proven.
        </p>
        <p className="lp-hero-lede">
          We are Endurance. A lab. We study how a business actually runs —
          freight, construction, capital, the functions where a week can break —
          then we write the vertical system it was missing.
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

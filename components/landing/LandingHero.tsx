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
          Endurance is a lab. We sit in your operation and ship the system it
          was missing: built for operators, not categories, so you set the
          standard your competitors are measured against.
        </p>
        <p className="lp-hero-verticals">
          Brain OS · Foundations · IDE · Micro SaaS
        </p>
        <div className="lp-hero-actions">
          <button type="button" className="lp-btn-quiet" onClick={onOpenChat}>
            See what we&rsquo;d build for you
          </button>
        </div>
        <p className="lp-hero-proof">
          <b>$4.02M</b> settled · <b>200,000</b> loads of data ·
          systems live in <b>7</b> industries · first screen by <b>day 4</b>
        </p>
      </div>
    </header>
  );
}

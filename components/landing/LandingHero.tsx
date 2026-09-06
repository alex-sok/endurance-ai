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
        viewBox="0 0 400 340"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <g transform="rotate(15 200.0 168.0)"><line x1="197.0" y1="148.0" x2="197.0" y2="64.0" /><line x1="203.0" y1="148.0" x2="203.0" y2="64.0" /><rect x="194.0" y="56.0" width="12" height="9" rx="2" /></g>
          <g transform="rotate(105 200.0 168.0)"><line x1="197.0" y1="148.0" x2="197.0" y2="64.0" /><line x1="203.0" y1="148.0" x2="203.0" y2="64.0" /><rect x="194.0" y="56.0" width="12" height="9" rx="2" /></g>
          <g transform="rotate(195 200.0 168.0)"><line x1="197.0" y1="148.0" x2="197.0" y2="64.0" /><line x1="203.0" y1="148.0" x2="203.0" y2="64.0" /><rect x="194.0" y="56.0" width="12" height="9" rx="2" /></g>
          <g transform="rotate(285 200.0 168.0)"><line x1="197.0" y1="148.0" x2="197.0" y2="64.0" /><line x1="203.0" y1="148.0" x2="203.0" y2="64.0" /><rect x="194.0" y="56.0" width="12" height="9" rx="2" /></g>
          <circle cx="200.0" cy="168.0" r="17" /><circle cx="200.0" cy="168.0" r="7" />
          <rect x="174.0" y="163.0" width="52" height="10" rx="3" />
          <g transform="translate(171.5 53.5) rotate(-14.0)"><rect x="-12.9" y="-8.4" width="25.8" height="16.8" rx="3" /><line x1="-12.9" y1="-2.8" x2="12.9" y2="-2.8" /><line x1="-4.3" y1="-8.4" x2="-4.3" y2="8.4" /><rect x="-9.5" y="1.4" width="5.0" height="3.4" rx="1" /></g>
          <g transform="translate(242.2 52.2) rotate(16.0)"><rect x="-13.6" y="-8.8" width="27.1" height="17.7" rx="3" /><line x1="-13.6" y1="-2.9" x2="13.6" y2="-2.9" /><line x1="-4.5" y1="-8.8" x2="-4.5" y2="8.8" /><rect x="-10.0" y="1.5" width="5.3" height="3.5" rx="1" /></g>
          <g transform="translate(108.3 85.5) rotate(316.0)"><rect x="-13.6" y="-8.8" width="27.1" height="17.7" rx="3" /><line x1="-13.6" y1="-2.9" x2="13.6" y2="-2.9" /><line x1="-4.5" y1="-8.8" x2="-4.5" y2="8.8" /><rect x="-10.0" y="1.5" width="5.3" height="3.5" rx="1" /></g>
          <g transform="translate(69.8 139.7) rotate(286.0)"><rect x="-15.4" y="-10.1" width="30.8" height="20.1" rx="3" /><line x1="-15.4" y1="-3.4" x2="15.4" y2="-3.4" /><line x1="-5.1" y1="-10.1" x2="-5.1" y2="10.1" /><rect x="-11.4" y="1.7" width="6.0" height="4.0" rx="1" /></g>
          <g transform="translate(301.7 81.8) rotate(46.0)"><rect x="-15.4" y="-10.1" width="30.8" height="20.1" rx="3" /><line x1="-15.4" y1="-3.4" x2="15.4" y2="-3.4" /><line x1="-5.1" y1="-10.1" x2="-5.1" y2="10.1" /><rect x="-11.4" y="1.7" width="6.0" height="4.0" rx="1" /></g>
          <g transform="translate(333.9 134.6) rotate(76.0)"><rect x="-17.9" y="-11.7" width="35.9" height="23.4" rx="3" /><line x1="-17.9" y1="-3.9" x2="17.9" y2="-3.9" /><line x1="-6.0" y1="-11.7" x2="-6.0" y2="11.7" /><rect x="-13.3" y="2.0" width="7.0" height="4.7" rx="1" /></g>
          <g transform="translate(66.1 201.4) rotate(256.0)"><rect x="-17.9" y="-11.7" width="35.9" height="23.4" rx="3" /><line x1="-17.9" y1="-3.9" x2="17.9" y2="-3.9" /><line x1="-6.0" y1="-11.7" x2="-6.0" y2="11.7" /><rect x="-13.3" y="2.0" width="7.0" height="4.7" rx="1" /></g>
          <g transform="translate(330.2 196.3) rotate(106.0)"><rect x="-20.5" y="-13.3" width="40.9" height="26.7" rx="3" /><line x1="-20.5" y1="-4.5" x2="20.5" y2="-4.5" /><line x1="-6.8" y1="-13.3" x2="-6.8" y2="13.3" /><rect x="-15.1" y="2.2" width="8.0" height="5.3" rx="1" /></g>
          <g transform="translate(98.3 254.2) rotate(226.0)"><rect x="-20.5" y="-13.3" width="40.9" height="26.7" rx="3" /><line x1="-20.5" y1="-4.5" x2="20.5" y2="-4.5" /><line x1="-6.8" y1="-13.3" x2="-6.8" y2="13.3" /><rect x="-15.1" y="2.2" width="8.0" height="5.3" rx="1" /></g>
          <g transform="translate(291.7 250.5) rotate(136.0)"><rect x="-22.3" y="-14.6" width="44.6" height="29.1" rx="3" /><line x1="-22.3" y1="-4.9" x2="22.3" y2="-4.9" /><line x1="-7.4" y1="-14.6" x2="-7.4" y2="14.6" /><rect x="-16.5" y="2.4" width="8.7" height="5.8" rx="1" /></g>
          <g transform="translate(157.8 283.8) rotate(196.0)"><rect x="-22.3" y="-14.6" width="44.6" height="29.1" rx="3" /><line x1="-22.3" y1="-4.9" x2="22.3" y2="-4.9" /><line x1="-7.4" y1="-14.6" x2="-7.4" y2="14.6" /><rect x="-16.5" y="2.4" width="8.7" height="5.8" rx="1" /></g>
          <g transform="translate(228.5 282.5) rotate(166.0)"><rect x="-23.0" y="-15.0" width="46.0" height="30.0" rx="3" /><line x1="-23.0" y1="-5.0" x2="23.0" y2="-5.0" /><line x1="-7.7" y1="-15.0" x2="-7.7" y2="15.0" /><rect x="-17.0" y="2.5" width="9.0" height="6.0" rx="1" /></g>
        </g>
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

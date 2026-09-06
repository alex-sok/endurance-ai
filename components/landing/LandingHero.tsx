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
        viewBox="0 0 400 400"
        aria-hidden="true"
        focusable="false"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(9 200 200)"
        >
          <g transform="rotate(0 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(30 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(60 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(90 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(120 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(150 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(180 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(210 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(240 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(270 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(300 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <g transform="rotate(330 200.0 200.0) translate(200.0 60.0)"><rect x="-26" y="-17" width="52" height="34" rx="3" /><line x1="-26" y1="-5" x2="26" y2="-5" /><line x1="-10" y1="-17" x2="-10" y2="17" /><line x1="10" y1="-17" x2="10" y2="17" /><rect x="-19" y="4" width="10" height="6" rx="1" /></g>
          <line x1="230.3" y1="63.3" x2="242.1" y2="66.5" />
          <line x1="294.6" y1="96.8" x2="303.2" y2="105.4" />
          <line x1="333.5" y1="157.9" x2="336.7" y2="169.7" />
          <line x1="336.7" y1="230.3" x2="333.5" y2="242.1" />
          <line x1="303.2" y1="294.6" x2="294.6" y2="303.2" />
          <line x1="242.1" y1="333.5" x2="230.3" y2="336.7" />
          <line x1="169.7" y1="336.7" x2="157.9" y2="333.5" />
          <line x1="105.4" y1="303.2" x2="96.8" y2="294.6" />
          <line x1="66.5" y1="242.1" x2="63.3" y2="230.3" />
          <line x1="63.3" y1="169.7" x2="66.5" y2="157.9" />
          <line x1="96.8" y1="105.4" x2="105.4" y2="96.8" />
          <line x1="157.9" y1="66.5" x2="169.7" y2="63.3" />
          <g transform="rotate(0 200.0 200.0)"><line x1="200.0" y1="176.0" x2="200.0" y2="78.0" /><line x1="196.5" y1="166.0" x2="196.5" y2="86.0" /><line x1="203.5" y1="166.0" x2="203.5" y2="86.0" /><rect x="193.0" y="70.0" width="14" height="10" rx="2" /></g>
          <g transform="rotate(90 200.0 200.0)"><line x1="200.0" y1="176.0" x2="200.0" y2="78.0" /><line x1="196.5" y1="166.0" x2="196.5" y2="86.0" /><line x1="203.5" y1="166.0" x2="203.5" y2="86.0" /><rect x="193.0" y="70.0" width="14" height="10" rx="2" /></g>
          <g transform="rotate(180 200.0 200.0)"><line x1="200.0" y1="176.0" x2="200.0" y2="78.0" /><line x1="196.5" y1="166.0" x2="196.5" y2="86.0" /><line x1="203.5" y1="166.0" x2="203.5" y2="86.0" /><rect x="193.0" y="70.0" width="14" height="10" rx="2" /></g>
          <g transform="rotate(270 200.0 200.0)"><line x1="200.0" y1="176.0" x2="200.0" y2="78.0" /><line x1="196.5" y1="166.0" x2="196.5" y2="86.0" /><line x1="203.5" y1="166.0" x2="203.5" y2="86.0" /><rect x="193.0" y="70.0" width="14" height="10" rx="2" /></g>
          <circle cx="200.0" cy="200.0" r="20" />
          <circle cx="200.0" cy="200.0" r="9" />
          <rect x="170.0" y="194.0" width="60" height="12" rx="3" />
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

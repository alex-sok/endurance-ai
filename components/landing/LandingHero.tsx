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
      {/* The planet. Ocean, clouds and the atmosphere line, drawn in SVG —
          no image, just gradients and turbulence — faded into the page. */}
      <svg className="lp-hero-earth" viewBox="0 0 1200 300" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="eh-ocean" cx="50%" cy="0%" r="120%">
            <stop offset="0%" stopColor="#9dc2e8" />
            <stop offset="38%" stopColor="#6ea3d8" />
            <stop offset="100%" stopColor="#2b5d9e" />
          </radialGradient>
          <linearGradient id="eh-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbfaf8" stopOpacity="1" />
            <stop offset="55%" stopColor="#fbfaf8" stopOpacity="0" />
          </linearGradient>
          <filter id="eh-clouds" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.028" numOctaves="3" seed="11" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -0.55" result="c" />
            <feComposite in="c" in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="eh-streaks" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0045 0.05" numOctaves="2" seed="4" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.5 -0.6" result="c" />
            <feComposite in="c" in2="SourceGraphic" operator="in" />
          </filter>
          <radialGradient id="eh-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#e6f0fc" stopOpacity="0.5" />
            <stop offset="62%" stopColor="#bcd7f2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#bcd7f2" stopOpacity="0" />
          </radialGradient>
          <filter id="eh-soft"><feGaussianBlur stdDeviation="1.4" /></filter>
          <filter id="eh-glow"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="eh-line"><feGaussianBlur stdDeviation="2.2" /></filter>
        </defs>
        {/* the planet, tilted as in the photograph */}
        <g transform="rotate(-8 600 250)">
          <circle cx="600" cy="1520" r="1332" fill="none" stroke="#cfe4fa" strokeWidth="34" filter="url(#eh-glow)" opacity="0.85" />
          <circle cx="600" cy="1520" r="1318" fill="none" stroke="#eef6ff" strokeWidth="7" filter="url(#eh-line)" opacity="0.95" />
          <circle cx="600" cy="1520" r="1310" fill="url(#eh-ocean)" />
          <g fill="#39688f" opacity="0.42" filter="url(#eh-soft)">
            <path d="M 205 262 q 38 -18 84 -10 q 52 8 60 26 q -30 14 -86 10 q -52 -4 -58 -26 Z" />
            <path d="M 442 236 q 46 -14 96 -4 q 44 8 38 22 q -36 16 -92 12 q -48 -4 -42 -30 Z" />
            <path d="M 690 250 q 58 -20 118 -8 q 40 8 28 24 q -44 18 -104 12 q -48 -6 -42 -28 Z" />
            <path d="M 928 276 q 40 -14 84 -6 q 34 6 26 18 q -32 12 -78 8 q -38 -4 -32 -20 Z" />
            <path d="M 84 300 q 44 -16 96 -8 q 40 6 34 18 l -130 0 Z" />
            <path d="M 1078 300 q 36 -12 76 -6 q 28 4 24 12 l -100 0 Z" />
          </g>
          {/* city lights along the land */}
          <g fill="#e6c17e">
            <circle cx="270" cy="260" r="1.4" opacity="0.35" />
            <circle cx="211" cy="274" r="0.9" opacity="0.65" />
            <circle cx="239" cy="260" r="1.1" opacity="0.35" />
            <circle cx="251" cy="260" r="1.1" opacity="0.65" />
            <circle cx="271" cy="270" r="1.1" opacity="0.5" />
            <circle cx="262" cy="276" r="0.9" opacity="0.35" />
            <circle cx="278" cy="266" r="1.1" opacity="0.35" />
            <circle cx="314" cy="266" r="0.9" opacity="0.5" />
            <circle cx="194" cy="277" r="1.4" opacity="0.35" />
            <circle cx="282" cy="270" r="1.8" opacity="0.35" />
            <circle cx="257" cy="276" r="1.4" opacity="0.65" />
            <circle cx="207" cy="260" r="1.1" opacity="0.5" />
            <circle cx="318" cy="277" r="0.9" opacity="0.5" />
            <circle cx="219" cy="272" r="1.4" opacity="0.35" />
            <circle cx="471" cy="241" r="1.4" opacity="0.65" />
            <circle cx="555" cy="251" r="1.1" opacity="0.65" />
            <circle cx="524" cy="240" r="1.8" opacity="0.5" />
            <circle cx="562" cy="250" r="1.1" opacity="0.65" />
            <circle cx="464" cy="253" r="0.9" opacity="0.35" />
            <circle cx="538" cy="254" r="1.8" opacity="0.5" />
            <circle cx="426" cy="256" r="1.4" opacity="0.35" />
            <circle cx="513" cy="245" r="1.8" opacity="0.35" />
            <circle cx="455" cy="242" r="1.4" opacity="0.65" />
            <circle cx="503" cy="256" r="1.8" opacity="0.5" />
            <circle cx="448" cy="258" r="1.8" opacity="0.35" />
            <circle cx="528" cy="255" r="1.1" opacity="0.65" />
            <circle cx="696" cy="265" r="0.9" opacity="0.5" />
            <circle cx="731" cy="272" r="1.4" opacity="0.65" />
            <circle cx="808" cy="251" r="0.9" opacity="0.65" />
            <circle cx="812" cy="267" r="1.4" opacity="0.35" />
            <circle cx="717" cy="254" r="0.9" opacity="0.65" />
            <circle cx="810" cy="257" r="1.1" opacity="0.65" />
            <circle cx="816" cy="269" r="1.4" opacity="0.65" />
            <circle cx="751" cy="255" r="1.4" opacity="0.35" />
            <circle cx="756" cy="267" r="0.9" opacity="0.65" />
            <circle cx="722" cy="251" r="1.4" opacity="0.5" />
            <circle cx="708" cy="256" r="0.9" opacity="0.35" />
            <circle cx="787" cy="268" r="1.1" opacity="0.35" />
            <circle cx="776" cy="271" r="1.1" opacity="0.5" />
            <circle cx="971" cy="288" r="1.1" opacity="0.65" />
            <circle cx="998" cy="289" r="1.4" opacity="0.5" />
            <circle cx="1025" cy="289" r="1.8" opacity="0.65" />
            <circle cx="962" cy="280" r="0.9" opacity="0.5" />
            <circle cx="912" cy="287" r="1.1" opacity="0.35" />
            <circle cx="918" cy="288" r="1.1" opacity="0.35" />
            <circle cx="1015" cy="293" r="0.9" opacity="0.65" />
            <circle cx="938" cy="289" r="1.1" opacity="0.65" />
            <circle cx="925" cy="295" r="1.8" opacity="0.35" />
            <circle cx="164" cy="302" r="1.1" opacity="0.35" />
            <circle cx="82" cy="294" r="1.8" opacity="0.5" />
            <circle cx="126" cy="300" r="0.9" opacity="0.35" />
            <circle cx="118" cy="292" r="0.9" opacity="0.35" />
            <circle cx="93" cy="296" r="1.1" opacity="0.5" />
            <circle cx="92" cy="295" r="0.9" opacity="0.5" />
            <circle cx="167" cy="303" r="0.9" opacity="0.35" />
            <circle cx="1127" cy="298" r="0.9" opacity="0.35" />
            <circle cx="1153" cy="305" r="1.1" opacity="0.5" />
            <circle cx="1111" cy="291" r="1.8" opacity="0.35" />
            <circle cx="1080" cy="287" r="1.8" opacity="0.5" />
            <circle cx="1153" cy="303" r="1.4" opacity="0.5" />
            <circle cx="1131" cy="302" r="1.8" opacity="0.35" />
          </g>
          <g fill="none" stroke="#ffffff" opacity="0.12">
            <circle cx="600" cy="1520" r="1262" strokeWidth="1.6" />
            <circle cx="600" cy="1520" r="1208" strokeWidth="1.3" />
            <circle cx="600" cy="1520" r="1148" strokeWidth="1" />
          </g>
          <circle cx="600" cy="1520" r="1310" fill="#ffffff" filter="url(#eh-streaks)" opacity="0.4" />
          <circle cx="600" cy="1520" r="1310" fill="#ffffff" filter="url(#eh-clouds)" opacity="0.55" />
          {/* the sun cresting the limb */}
          <circle cx="418" cy="208" r="130" fill="url(#eh-flare)" />
          <circle cx="418" cy="209" r="12" fill="#ffffff" filter="url(#eh-line)" opacity="0.9" />
        </g>
        {/* fade the top of the limb into the page */}
        <rect x="0" y="0" width="1200" height="300" fill="url(#eh-fade)" />
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

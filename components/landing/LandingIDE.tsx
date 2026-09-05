/* Section 03 — the multiplayer development platform. Copy at full measure,
   then the live session spanning the band as tiles. */

const SESSION = [
  {
    name: "Models",
    value: "Pooled",
    sub: "Claude, Gemini, Grok — every seat, one harness.",
  },
  {
    name: "Claude Code",
    value: "Live",
    sub: "3 sessions running against live data.",
  },
  {
    name: "Slack + Teams",
    value: "Synced",
    sub: "The build thread, wired into the session.",
  },
  {
    name: "Projects",
    value: "Green",
    sub: "12 repos on one deploy path.",
  },
];

export function LandingIDE() {
  return (
    <section className="lp-chapter is-showcase" aria-labelledby="work-ide" id="ide" data-section="ide">
      <div className="lp-chapter-copy">
        <p className="lp-eyebrow">03 · Multiplayer Developer Tool</p>
        <p className="lp-pain">
          &ldquo;Every build waits on a vendor, and nobody inside can see it
          happening.&rdquo;
        </p>
        <p className="lp-solve">How Endurance solves it —</p>
        <h2 id="work-ide">Where your whole company builds together.</h2>
        <p className="lp-lead">
          Every model you use — Claude, Gemini, Grok, whatever ships next —
          and every tool you run, built into one harness. Your whole
          organization, building together in real time.
        </p>
        <p className="lp-body">
          Not a copilot in a corner. A multiplayer environment where your
          repos, your data, your Slack and Teams, your subscriptions and your
          people share one live surface: sales builds with ops, ops with
          engineering, anyone opens a session and shapes the same system at
          the same moment, and everyone watches it happen. Whatever you can
          describe, your team can build, together. What used to take a vendor
          and a quarter takes an afternoon and the people who already know
          the work. It is the bench our own lab works at; select clients run
          it with us.
        </p>
        <a className="lp-feature-cta" href="#close">
          Ask about early access
        </a>
      </div>

      <div className="lp-showcase-head">
        <p className="lp-showcase-title">Live session</p>
        <p className="lp-showcase-meta">7 people · 3 teams · building live</p>
      </div>
      <div className="lp-showcase lp-showcase-4">
        {SESSION.map((m) => (
          <div className="lp-tile" key={m.name}>
            <div className="lp-tile-row">
              <p className="lp-tile-q">{m.name}</p>
              <p className="lp-tile-v">{m.value}</p>
            </div>
            <p className="lp-tile-a">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

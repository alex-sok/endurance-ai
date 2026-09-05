import { Exhibit } from "./Exhibit";

/* Section 03 — the multiplayer development platform. Hybrid framing: the
   internal advantage first, early access for select clients second. */
export function LandingIDE() {
  return (
    <section className="lp-chapter" aria-labelledby="work-ide" id="ide" data-section="ide">
      <div className="lp-chapter-copy">
        <p className="lp-eyebrow">03 · IDE</p>
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
      <Exhibit
        exhibit={{
          caption: "One environment",
          head: "Live session",
          meta: "7 people · 3 teams · building live",
          rows: [
            { label: "Models", sub: "Claude, Gemini, Grok — every seat, one harness", value: "Pooled" },
            { label: "Claude Code", sub: "3 sessions against live data", value: "Live" },
            { label: "Slack + Teams", sub: "the build thread, wired in", value: "Synced" },
            { label: "Projects", sub: "12 repos, one deploy path", value: "Green" },
          ],
        }}
      />
    </section>
  );
}

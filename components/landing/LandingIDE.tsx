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
          A multiplayer development platform: every AI subscription, every
          project, every Slack and Teams thread your business runs, wired into
          one live environment.
        </p>
        <p className="lp-body">
          It is a harness for the whole operation. Your repos, your data, your
          conversations and your Claude Code sessions in one place, so anyone
          on the team can sit down and build against the real thing, together,
          in real time. What used to take a vendor and a quarter takes an
          afternoon and the people who already know the work. It is the bench
          our own lab works at; select clients run it with us.
        </p>
        <a className="lp-feature-cta" href="#close">
          Ask about early access
        </a>
      </div>
      <Exhibit
        exhibit={{
          caption: "One environment",
          head: "Live session",
          meta: "4 people building · one harness",
          rows: [
            { label: "Claude Code", sub: "3 sessions against live data", value: "Live" },
            { label: "Slack + Teams", sub: "the build thread, wired in", value: "Synced" },
            { label: "Projects", sub: "12 repos, one deploy path", value: "Green" },
            { label: "AI subscriptions", sub: "every seat, pooled in one place", value: "Ready" },
          ],
        }}
      />
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import "../landing.css";

export const metadata: Metadata = {
  title: "Core Values — Endurance AI Labs",
  description:
    "Three values, said plainly: always learning, be of service, finish the job.",
};

/* The three values, in the homepage's own skin: the gradient sky, the wash
   cards, the plum and the violet. Written the way we say them out loud. */

const VALUES = [
  {
    id: "always-learning",
    n: "01",
    name: "Always learning.",
    creed: "Humility and curiosity, every day.",
    body: [
      "We build inside other people's industries — freight desks, law firms, kitchens, capital markets — so learning fast isn't a virtue here, it's the job. Nobody has it all figured out, and trying to act smart shuts down the listening the work depends on.",
      "Stay humble, ask more questions, and end every day a little less dumb than you started it. The systems we ship work the same way: every document, every correction, every operator conversation makes them smarter.",
    ],
    practice: [
      "Ask more questions than you answer — a great second meeting is earned by the questions asked in the first.",
      "“I don't know yet” is a complete sentence — followed by going and finding out.",
      "Listen before you build — what the operator says shapes the system.",
    ],
  },
  {
    id: "be-of-service",
    n: "02",
    name: "Be of service.",
    creed: "Jump in. Make it happen.",
    body: [
      "Service here means motion: see the problem, take the problem — don't wait to be asked and don't route it through a layer. Inside the team, everyone has direct access to everyone; when you need someone, you get them.",
      "Outside the team, everyone is busy — the question is whether our partners can tell they're a priority. They can, by how fast we move.",
    ],
    practice: [
      "See it, own it — jump in without waiting to be asked.",
      "Direct access, no layers — when a teammate needs you, they get you.",
      "When a partner or client calls, they get a fast, real answer — busy is never the excuse.",
    ],
  },
  {
    id: "finish-the-job",
    n: "03",
    name: "Finish the job.",
    creed: "Shipped isn't finished. Used is.",
    body: [
      "In our business the demo is the easy part — two exciting weeks, then the long middle: messy data, changed requirements, the third revision of the thing everyone thought was done. The job was never the code; it's a system the operator runs their morning on without us in the room.",
      "We stay until it's that, and we finish it properly — numbers reconciled to zero, edge cases handled, root causes fixed instead of patched. We're named after a ship whose crew finished the expedition. Every man came home.",
    ],
    practice: [
      "Launch is the midpoint — we stay until the system runs the client's day without us.",
      "The last 5% — edge cases, empty states, the awkward export — is the job, not extra credit.",
      "Reconcile to zero and fix the root cause — a patch that hides a problem is a debt, not a fix.",
    ],
  },
];

export default function ValuesPage() {
  return (
    <div className="theme-paper vals-page">
      <header className="vals-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> Endurance AI Labs
        </Link>
        <Link className="bos-cta" href="/#close">
          See what we&rsquo;d build for you
        </Link>
      </header>

      <main>
        <section className="lp-hero is-center is-tall vals-hero">
          <div className="lp-hero-copy">
            <p className="lp-kicker">Endurance · Core Values</p>
            <h1>
              Three values, <em>said plainly.</em>
            </h1>
            <p className="lp-hero-lede">
              We don&rsquo;t do poster values: no &ldquo;heart,&rdquo; no
              &ldquo;resilience,&rdquo; no &ldquo;be a lion.&rdquo; These are
              the three rules we actually run on, written the way we say them
              out loud.
            </p>
          </div>
        </section>

        <div className="lp-seq vals-seq">
          {VALUES.map((v, i) => (
            <section
              key={v.id}
              id={v.id}
              className={`lp-block lp-split vals-card${i % 2 ? " vals-alt" : ""}`}
              aria-labelledby={`${v.id}-h`}
            >
              <div className="lp-split-copy">
                <p className="lp-eyebrow">{v.n} · Core value</p>
                <h2 className="lp-h2" id={`${v.id}-h`}>
                  {v.name}
                </h2>
                <p className="lp-lead">{v.creed}</p>
                {v.body.map((b) => (
                  <p className="lp-body" key={b.slice(0, 24)}>
                    {b}
                  </p>
                ))}
              </div>
              <ul className="lp-split-list">
                <li className="vals-practice-label">In practice</li>
                {v.practice.map((x) => (
                  <li key={x.slice(0, 24)}>{x}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="vals-coda">
          <p className="vals-coda-line">
            We research. We build. <em>We ship.</em>
          </p>
          <p className="vals-coda-sig">Endurance AI Labs · endurancelabs.ai</p>
        </footer>
      </main>
    </div>
  );
}

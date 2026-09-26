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
      "A freight desk, a law firm, and a kitchen each have rules that are easy to miss from the outside. We begin by listening to the people who work there. Their explanations, and especially their corrections, tell us what the software needs to do.",
      "We want to leave each conversation understanding something we did not understand before. The systems we build should make that learning useful: a documented rule or a corrected answer can help the next person who encounters the same problem.",
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
      "Service begins with noticing what someone needs and taking responsibility for helping. Within the team, that means direct access to one another and a clear owner for the work.",
      "For a customer, it means knowing who is working on the problem, what happens next, and when they will hear from us. We aim to make those things clear, even while the answer is still taking shape.",
    ],
    practice: [
      "See it, own it — jump in without waiting to be asked.",
      "Direct access, no layers — when a teammate needs you, they get you.",
      "Acknowledge a partner’s question promptly, take ownership, and agree on the next update.",
    ],
  },
  {
    id: "finish-the-job",
    n: "03",
    name: "Finish the job.",
    creed: "Shipped isn't finished. Used is.",
    body: [
      "A demo shows what is possible. Daily use reveals what still needs work: messy data, an exception nobody mentioned, a report that almost fits. We keep working toward a system the operator can run their morning on without us in the room.",
      "That means reconciling the numbers, handling the exceptions, and finding the cause of a recurring problem. Our name recalls the Endurance expedition and the effort to bring its crew home. It is a reminder to keep responsibility for the people who depend on the work.",
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
        <Link className="bos-cta" href="/#contact">
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
              These values guide how we learn a business, work with its people,
              and see a project through to daily use.
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

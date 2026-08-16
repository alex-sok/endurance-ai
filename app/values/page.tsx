import type { Metadata } from "next";
import Link from "next/link";
import "./values.css";

const TITLE = "Core Values — Endurance AI Labs";
const DESCRIPTION =
  "Endurance, empathy, craft, candor, crew — the five commitments behind every system we build.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://endurancelabs.ai/values" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://endurancelabs.ai/values",
  },
};

type Value = {
  id: string;
  name: string;
  creed: string;
  body: React.ReactNode;
  practices: string[];
};

const VALUES: Value[] = [
  {
    id: "endurance",
    name: "Endurance",
    creed: "We stay through the hard middle.",
    body: (
      <p>
        We took the name from the ship. The <em>Endurance</em> was crushed by
        the ice, and the expedition became something harder and more important
        — getting every member of the crew home. Every one of them made it. The
        exciting part of any build is the first two weeks; the part that
        matters is the long middle — messy data, changed requirements, the
        third revision of the thing everyone thought was done.{" "}
        <strong>We don&apos;t hand off and disappear.</strong> We stay until
        the system is part of how the business runs.
      </p>
    ),
    practices: [
      "Launch is the midpoint of an engagement, not the end of it.",
      "We iterate until the system is used daily without us in the room.",
      "Hard problems get worked, not re-scoped away.",
    ],
  },
  {
    id: "empathy",
    name: "Empathy",
    creed: "We build for the person on the other side of the screen.",
    body: (
      <p>
        Every system we ship lands on someone&apos;s desk at 7 a.m. — a
        dispatcher, an analyst, a controller closing the month. If it
        doesn&apos;t fit the way they actually work, it doesn&apos;t matter how
        clever it is.{" "}
        <strong>Understanding the operator comes before writing the code</strong>,
        and it stays the measure after launch.
      </p>
    ),
    practices: [
      "We sit with the people who'll use the system before we design it — their workflow shapes the software, not the other way around.",
      "Success is measured on the operator's first Tuesday, not the demo day.",
      "We name things the way our users say them, not the way the schema does.",
    ],
  },
  {
    id: "craft",
    name: "Craft",
    creed: "Bespoke every time — no templates.",
    body: (
      <p>
        Enterprise vendors ship the same product to everyone and call the gaps
        &quot;configuration.&quot; We build the thing that fits — and that
        means the details have to be right.{" "}
        <strong>
          Penny-accurate, reconciled to zero, finished past the point where
          most people stop.
        </strong>
      </p>
    ),
    practices: [
      "Numbers reconcile exactly. A total that's off by a cent is a bug, not a rounding note.",
      "Every build starts from the client's world, not from our last project.",
      "The last 5% — edge cases, empty states, the awkward export — gets the same attention as the demo path.",
    ],
  },
  {
    id: "candor",
    name: "Candor",
    creed: "Plain answers, cited sources.",
    body: (
      <p>
        We work inside clients&apos; proprietary data, so trust is the whole
        product. That means <strong>we never fabricate</strong> — not a number,
        not a contact, not a comp — and we say &quot;we don&apos;t know
        yet&quot; out loud instead of papering over it. Bad news travels
        fastest here.
      </p>
    ),
    practices: [
      "Real data or no data. Every figure traces to a source someone can open.",
      "Risks and misses get flagged the day we see them, not in the retro.",
      "We write the way we talk — no hedge words doing the work honesty should.",
    ],
  },
  {
    id: "crew",
    name: "Crew",
    creed: "Four people, every rope.",
    body: (
      <p>
        Shackleton chose a small crew deliberately, and every man pulled every
        rope. So do we. There&apos;s no layer to escalate to and no one to hand
        the awkward part of a problem to —{" "}
        <strong>whoever builds a system is responsible for it working</strong>,
        end to end, in production, for real people.
      </p>
    ),
    practices: [
      "End-to-end responsibility: design, build, deploy, and the 11 p.m. fix all belong to the same person.",
      "We fix root causes, not symptoms — a patch that hides a problem is a debt, not a fix.",
      "“Not my job” isn't a sentence anyone here says.",
    ],
  },
];

export default function ValuesPage() {
  return (
    <main className="values-page">
      <div className="v-wrap">
        <nav className="v-nav" aria-label="Site">
          <Link href="/">
            <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" />
          </Link>
          <span className="v-nav-label">Core Values</span>
        </nav>
      </div>

      <header className="v-hero">
        <div className="v-wrap">
          <p className="v-eyebrow">
            Endurance AI Labs <span className="v-amp">///</span> Core Values
          </p>
          <h1>
            By endurance <em>we conquer.</em>
          </h1>
          <p className="v-motto">Fortitudine Vincimus — the Shackleton motto</p>
          <p className="v-lede">
            We build private AI infrastructure inside other people&apos;s
            businesses — embedded with their operators, on their data, for
            their daily work. The name comes from the ship.{" "}
            <strong>The values come from the crew.</strong>
          </p>
        </div>
      </header>

      <div className="v-wrap">
        <nav className="v-index" aria-label="Values">
          {VALUES.map((v) => (
            <a key={v.id} href={`#${v.id}`}>
              {v.name}
            </a>
          ))}
        </nav>

        {VALUES.map((v) => (
          <section className="v-value" id={v.id} key={v.id}>
            <div>
              <h2>{v.name}</h2>
              <p className="v-creed">{v.creed}</p>
            </div>
            <div className="v-body">
              {v.body}
              <p className="v-practice-label">In practice</p>
              <ul className="v-practice">
                {v.practices.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <footer className="v-coda">
          <p className="v-coda-line">
            Enterprise vendors make you fit their software.{" "}
            <em>We build software that fits you.</em>
          </p>
          <p className="v-coda-sig">
            Fortitudine Vincimus &middot; Endurance AI Labs
          </p>
        </footer>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./values.css";

const display = Archivo({
  subsets: ["latin"],
  variable: "--vf-display",
  weight: ["500", "600"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--vf-sans",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--vf-mono",
  weight: ["400", "500"],
});

const TITLE = "Core Values — Endurance AI Labs";
const DESCRIPTION =
  "Always learning. Be of service. Finish the job. The three rules Endurance AI Labs actually runs on.";

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

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#ide", label: "IDE" },
  { href: "/#builds", label: "Builds" },
  { href: "/#research", label: "Lab" },
  { href: "/#team", label: "Team" },
];

type Value = {
  id: string;
  num: string;
  short: string;
  name: React.ReactNode;
  creed: string;
  body: React.ReactNode;
  practices: string[];
};

const VALUES: Value[] = [
  {
    id: "always-learning",
    num: "01",
    short: "Always learning",
    name: (
      <>
        Always <span className="v-accent">learning</span>.
      </>
    ),
    creed: "Humility and curiosity, every day.",
    body: (
      <p>
        We build inside other people&apos;s industries — freight desks, law
        firms, kitchens, capital markets — so learning fast isn&apos;t a
        virtue here, it&apos;s the job. Nobody has it all figured out, and
        trying to act smart shuts down the listening the work depends on.{" "}
        <strong>
          Stay humble, ask more questions, and end every day a little less
          dumb than you started it.
        </strong>{" "}
        The systems we ship work the same way: every document, every
        correction, every operator conversation makes them smarter.
      </p>
    ),
    practices: [
      "Ask more questions than you answer — a great second meeting is earned by the questions asked in the first.",
      "\"I don't know yet\" is a complete sentence — followed by going and finding out.",
      "Listen before you build — what the operator says shapes the system.",
    ],
  },
  {
    id: "be-of-service",
    num: "02",
    short: "Be of service",
    name: (
      <>
        Be of <span className="v-accent">service</span>.
      </>
    ),
    creed: "Jump in. Make it happen.",
    body: (
      <p>
        Service here means motion: see the problem, take the problem —
        don&apos;t wait to be asked and don&apos;t route it through a layer.
        Inside the team, everyone has direct access to everyone; when you
        need someone, you get them. Outside the team, everyone is busy — the
        question is whether our partners can tell they&apos;re a priority.{" "}
        <strong>They can, by how fast we move.</strong>
      </p>
    ),
    practices: [
      "See it, own it — jump in without waiting to be asked.",
      "Direct access, no layers — when a teammate needs you, they get you.",
      "When a partner or client calls, they get a fast, real answer — busy is never the excuse.",
    ],
  },
  {
    id: "finish-the-job",
    num: "03",
    short: "Finish the job",
    name: (
      <>
        Finish the <span className="v-accent">job</span>.
      </>
    ),
    creed: "Shipped isn't finished. Used is.",
    body: (
      <p>
        In our business the demo is the easy part — two exciting weeks, then
        the long middle: messy data, changed requirements, the third revision
        of the thing everyone thought was done. The job was never the code;
        it&apos;s a system the operator runs their morning on without us in
        the room. <strong>We stay until it&apos;s that, and we finish it
        properly</strong> — numbers reconciled to zero, edge cases handled,
        root causes fixed instead of patched. We&apos;re named after a ship
        whose crew finished the expedition. Every man came home.
      </p>
    ),
    practices: [
      "Launch is the midpoint — we stay until the system runs the client's day without us.",
      "The last 5% — edge cases, empty states, the awkward export — is the job, not extra credit.",
      "Reconcile to zero and fix the root cause — a patch that hides a problem is a debt, not a fix.",
    ],
  },
];

export default function ValuesPage() {
  return (
    <main
      className={`values-page ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <nav className="v-nav" aria-label="Primary">
        <div className="v-nav-inner">
          <Link className="v-wordmark" href="/" aria-label="Endurance AI Labs">
            <img src="/logo-endurance.svg" alt="" />
          </Link>
          <div className="v-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
            <Link className="v-nav-page" href="/values" aria-current="page">
              Core Values
            </Link>
            <a className="v-nav-talk" href="mailto:hello@endurancelabs.ai">
              Talk
            </a>
          </div>
        </div>
      </nav>

      <header className="v-hero">
        <div className="v-wrap">
          <p className="v-kicker">Endurance · Core Values</p>
          <h1>
            Three values, <em>said plainly.</em>
          </h1>
          <p className="v-lede">
            We don&apos;t do poster values — no &quot;heart,&quot; no
            &quot;resilience,&quot; no &quot;be a lion.&quot; These are the
            three rules we actually run on, written the way we say them out
            loud.
          </p>
          <div className="v-cta-row">
            <a className="v-btn v-btn-fill" href="#always-learning">
              Read the values
            </a>
            <a className="v-btn v-btn-line" href="mailto:hello@endurancelabs.ai">
              Talk to us
            </a>
          </div>
        </div>
      </header>

      <div className="v-wrap">
        <nav className="v-band" aria-label="Values">
          {VALUES.map((v) => (
            <a className="v-band-item" key={v.id} href={`#${v.id}`}>
              <span className="v-band-num">{v.num}</span>
              <span className="v-band-caption">{v.short}</span>
            </a>
          ))}
        </nav>
        <p className="v-band-note">
          Set by the founders. Nothing here was written by a committee.
        </p>

        {VALUES.map((v) => (
          <section className="v-value" id={v.id} key={v.id}>
            <div>
              <p className="v-num">{v.num}</p>
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
            We research. We build. We grind. <em>We ship.</em>
          </p>
          <div className="v-cta-row">
            <a className="v-btn v-btn-fill" href="mailto:hello@endurancelabs.ai">
              Work with us
            </a>
          </div>
          <p className="v-coda-sig">Endurance AI Labs · endurancelabs.ai</p>
        </footer>
      </div>
    </main>
  );
}

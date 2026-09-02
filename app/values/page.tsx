import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./values.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--vf-serif",
  weight: ["400"],
  style: ["normal", "italic"],
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
  "Be less dumb every day. Be of service. Do your job. The three rules Endurance AI Labs actually runs on.";

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
  num: string;
  name: React.ReactNode;
  creed: string;
  body: React.ReactNode;
  practices: string[];
};

const VALUES: Value[] = [
  {
    id: "less-dumb",
    num: "01",
    name: (
      <>
        Be <span className="v-accent">less dumb</span> every day.
      </>
    ),
    creed: "Humility and curiosity, first and foremost.",
    body: (
      <p>
        Nobody here has it all figured out — if we did, there would be a
        billion dollars in the bank account. Trying to act smart shuts down
        listening, and listening is where the work starts.{" "}
        <strong>
          Stay humble, stay curious, and get a little less dumb every day.
        </strong>{" "}
        This is where empathy lives too: ask more questions, listen harder,
        and let what you hear shape what you build.
      </p>
    ),
    practices: [
      "Ask more questions than you answer — a great second meeting is earned by the questions asked in the first.",
      "Don't act smart. Say \"I don't know yet\" and then go find out.",
      "Listen before you build — what the operator says shapes the system.",
    ],
  },
  {
    id: "be-of-service",
    num: "02",
    name: (
      <>
        Be of <span className="v-accent">service</span>.
      </>
    ),
    creed: "To each other, and to the people we build for.",
    body: (
      <p>
        Inside the team, everyone has direct access to everyone — when you
        need someone, you get them, not a gatekeeper. Everyone has the
        autonomy to take on what they want and pull in who they need. Outside
        the team, everyone is busy; the question is whether our partners are a
        priority.{" "}
        <strong>They are, and they can tell by how fast we answer.</strong>
      </p>
    ),
    practices: [
      "Direct access, no layers — when a teammate needs you, they get you.",
      "When a partner or client calls, they get a fast, real response.",
      "Take on what you want to own, and pull each other in freely.",
    ],
  },
  {
    id: "do-your-job",
    num: "03",
    name: (
      <>
        Do your <span className="v-accent">job</span>.
      </>
    ),
    creed: "Done well, and never alone.",
    body: (
      <p>
        If everyone does their job and does it well, we have the makings of a
        great team. And doing your job here means being collaborative —{" "}
        <strong>nobody works a deal or a project in isolation.</strong> Lean
        on whoever knows the system best, share what you learn, and challenge
        each other to raise the level.
      </p>
    ),
    practices: [
      "No solo projects — every deal gets more than one set of eyes.",
      "Lean on the person who knows it best, whoever built it.",
      "Share more: what you learned, what broke, what worked.",
    ],
  },
];

export default function ValuesPage() {
  return (
    <main
      className={`values-page ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <div className="v-wrap">
        <nav className="v-nav" aria-label="Site">
          <Link href="/">
            <img src="/logo-endurance.svg" alt="Endurance AI Labs" />
          </Link>
          <span className="v-nav-label">Core Values</span>
        </nav>
      </div>

      <header className="v-hero">
        <div className="v-wrap">
          <p className="v-eyebrow">Endurance AI Labs · Core Values</p>
          <h1>
            Three values, <em>said plainly.</em>
          </h1>
          <p className="v-lede">
            We don&apos;t do poster values — no &quot;heart,&quot; no
            &quot;resilience,&quot; no &quot;be a lion.&quot; These are the
            three rules we actually run on,{" "}
            <strong>written the way we say them out loud.</strong>
          </p>
        </div>
      </header>

      <div className="v-wrap">
        <nav className="v-index" aria-label="Values">
          {VALUES.map((v) => (
            <a key={v.id} href={`#${v.id}`}>
              {v.num} · {v.creed}
            </a>
          ))}
        </nav>

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
            The name comes from the ship — a crew that stayed.{" "}
            <em>The values come from the crew.</em>
          </p>
          <p className="v-coda-sig">Endurance AI Labs · endurancelabs.ai</p>
        </footer>
      </div>
    </main>
  );
}

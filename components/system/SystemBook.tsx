"use client";

import { useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { CONTACT_EMAIL } from "@/lib/conversation-flows";

const NAV = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "parts", label: "Parts" },
  { id: "recipes", label: "Recipes" },
];

const COLORS = [
  {
    name: "Field",
    hex: "#faf9f6",
    token: "--lp-field",
    use: "The canvas. White, with one light wash from the top.",
    swatch: "var(--lp-field)",
  },
  {
    name: "Paper",
    hex: "#ffffff",
    token: "--lp-paper",
    use: "Sheets. Content lands here.",
    swatch: "var(--lp-paper)",
  },
  {
    name: "Ink",
    hex: "#1c1916",
    token: "--lp-ink",
    use: "Text, fill buttons, wordmark.",
    swatch: "var(--lp-ink)",
  },
  {
    name: "Muted",
    hex: "#5c574e",
    token: "--lp-muted",
    use: "Secondary text and kickers.",
    swatch: "var(--lp-muted)",
  },
  {
    name: "Line",
    hex: "#1c19161f",
    token: "--lp-line",
    use: "Hairlines only.",
    swatch: "var(--lp-line)",
  },
  {
    name: "Flare",
    hex: "#c2410c",
    token: "--lp-flare",
    use: "Proof numbers. Nowhere else.",
    swatch: "var(--lp-flare)",
  },
  {
    name: "Night",
    hex: "#161412",
    token: "--lp-night",
    use: "The close.",
    swatch: "var(--lp-night)",
  },
  {
    name: "Snow",
    hex: "#f6f4ef",
    token: "--lp-snow",
    use: "Type and buttons on night.",
    swatch: "var(--lp-snow)",
  },
];

const PART_STEPS = [
  {
    n: "01",
    title: "A sheet",
    body: "Paper on the field. Radius 8. Max 920. Leave the field around it. One claim, then the evidence.",
  },
  {
    n: "02",
    title: "A kicker",
    body: "IBM Plex Mono, 11px, tracked 0.14em, uppercase. Names the section. Not the headline.",
  },
  {
    n: "03",
    title: "A close",
    body: "Night sheet. Snow type. One sentence, then the ask.",
  },
  {
    n: "04",
    title: "A receipt",
    body: "Mono flare figure, fine label, hairline above. Proof attached to the claim it backs. Where flare lives, with the claim's one word.",
  },
  {
    n: "05",
    title: "A wash",
    body: "A light wash of the field, angled, with a whisper of ember in one corner. Copy on one side, the evidence on the other and bleeding off the edge. Radius 12. A two-up row of proof beneath it: the receipt, and a door into the demo.",
  },
];

const RECIPES = [
  {
    n: "01",
    title: "Lab homepage",
    body: "Field canvas, one light wash. Hero on the field. Sheets in sequence. Night close. This is endurancelabs.ai.",
  },
  {
    n: "02",
    title: "Product landing",
    body: "Same tokens. Hero centered on the field, one word of the claim in flare, the product stage beneath it fading into the page. Chapters are washed cards that alternate sides: a quote in the operator's voice, the fix, the evidence bleeding off the edge; beneath each, a receipt and a door into the demo. The ledger carries the full proof. Night still owns Talk and Book.",
  },
  {
    n: "03",
    title: "One-pager",
    body: "One sheet. Claim, evidence, who to talk to. A leave-behind, not a site.",
  },
];

const FAQ_SPECIMEN = [
  {
    q: "What is this file?",
    a: "The marketing system. Landing CSS, these tokens, these parts. Product UI lives in a different file.",
  },
  {
    q: "Does a client demo use this?",
    a: "No. Client demos keep the client identity. Do not restyle them onto this system.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SystemBook() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="theme-paper relative min-h-svh">
      <div className="lp-canvas" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <nav className={scrolled ? "lp-nav is-scrolled" : "lp-nav"} aria-label="Marketing system">
        <div className="lp-nav-inner">
          <a className="lp-wordmark" href="/" aria-label="Endurance AI Labs">
            <img src="/logo-endurance.svg" alt="" />
          </a>
          <div className="lp-nav-links">
            {NAV.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
            <button type="button" className="lp-nav-talk" onClick={() => setChatOpen(true)}>
              Talk
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        <header className="lp-hero" id="top" style={{ minHeight: "100svh" }}>
          <div className="lp-hero-copy">
            <p className="lp-kicker">Marketing system</p>
            <h1>
              One language.
              <em>Every page.</em>
            </h1>
            <p className="lp-hero-lede">
              The system for all Endurance marketing. Product UI is a
              different file. Client demos keep the client identity.
            </p>
            <div className="lp-hero-actions">
              <a
                className="lp-btn lp-btn-fill"
                href="#color"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("color");
                }}
              >
                Read the palette
              </a>
              <a
                className="lp-btn lp-btn-line"
                href="#recipes"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("recipes");
                }}
              >
                See the recipes
              </a>
            </div>
          </div>
        </header>

        <section className="lp-sheet" id="color" aria-label="Color">
          <p className="lp-kicker">Color</p>
          <h2 className="lp-h2">The live tokens.</h2>
          <p className="lp-lede">
            These are the --lp-* values in landing CSS. Use them. Do not
            invent neighbors.
          </p>
          <ul className="lp-grid-3">
            {COLORS.map((c) => (
              <li key={c.token} className="lp-card">
                <div
                  aria-hidden="true"
                  style={{
                    height: 72,
                    borderRadius: 8,
                    background: c.swatch,
                    border: "1px solid var(--lp-line)",
                    marginBottom: 16,
                  }}
                />
                <p className="lp-num">
                  {c.hex} · {c.token}
                </p>
                <h3>{c.name}</h3>
                <p>{c.use}</p>
              </li>
            ))}
          </ul>
          <p className="lp-note">
            Defined on .theme-paper in app/landing.css. Product-app tokens
            stay in app/globals.css.
          </p>
        </section>

        <section className="lp-sheet" id="type" aria-label="Type">
          <p className="lp-kicker">Type</p>
          <h2 className="lp-h2">Three faces.</h2>
          <p className="lp-lede">
            The Public-minimal pairing. One editorial serif on claims, one
            grotesque on body and nav, the same grotesque's mono on labels.
          </p>
          <div className="lp-team">
            <div className="lp-team-row">
              <h3>Display</h3>
              <p className="lp-role">Source Serif 4</p>
              <p className="lp-bio">
                The claim. Regular, then italic. Air around the second line.
                Tracking −0.03em.
              </p>
            </div>
            <div className="lp-hero-copy" style={{ padding: 0, maxWidth: "none" }}>
              <h1>
                One language.
                <em>Every page.</em>
              </h1>
            </div>
            <div className="lp-team-row">
              <h3>Sans</h3>
              <p className="lp-role">IBM Plex Sans</p>
              <p className="lp-bio">
                Body 16 / 1.55. Nav 14. Wordmark 16. This paragraph is the body.
              </p>
            </div>
            <div className="lp-team-row">
              <h3>Mono</h3>
              <p className="lp-role">IBM Plex Mono</p>
              <p className="lp-bio">
                Kickers. 11px, 0.14em, uppercase. Section names, not headlines.
              </p>
            </div>
            <p className="lp-kicker" style={{ marginBottom: 0 }}>
              Marketing system
            </p>
            <div className="lp-team-row">
              <h3>Proof</h3>
              <p className="lp-role">Italic + flare</p>
              <p className="lp-bio">The only place flare is used.</p>
            </div>
            <p className="lp-proof-before">A year, twenty engineers.</p>
            <p className="lp-proof-after">Two weeks.</p>
          </div>
        </section>

        <section className="lp-sheet" id="parts" aria-label="Parts">
          <p className="lp-kicker">Parts</p>
          <h2 className="lp-h2">What a page is made of.</h2>
          <p className="lp-lede">
            These are the live classes. Use them. Do not redraw them.
          </p>

          <div className="lp-cta-actions">
            <button type="button" className="lp-btn lp-btn-fill">
              Fill
            </button>
            <button type="button" className="lp-btn lp-btn-line">
              Line
            </button>
            <button type="button" className="lp-nav-talk">
              Talk
            </button>
          </div>

          <ul className="lp-chips">
            <li>Construction</li>
            <li>Freight &amp; logistics</li>
            <li>Capital markets</li>
          </ul>

          <ol className="lp-team">
            {PART_STEPS.map((step) => (
              <li key={step.n} className="lp-team-row is-index">
                <p className="lp-num">{step.n}</p>
                <h3>{step.title}</h3>
                <p className="lp-bio">{step.body}</p>
              </li>
            ))}
          </ol>

          <ul className="lp-receipt">
            <li>
              <p className="lp-figure">$4.02M</p>
              <p className="lp-fine">Figure in mono flare, tabular.</p>
            </li>
            <li>
              <p className="lp-figure">605</p>
              <p className="lp-fine">Label in fine muted sans, under it.</p>
            </li>
          </ul>

          <div className="lp-team">
            <div className="lp-team-row">
              <h3>Alex Sok</h3>
              <p className="lp-role">CEO</p>
              <p className="lp-bio">
                Name in serif. Role in mono. Bio in muted sans.
              </p>
            </div>
          </div>

          <div className="lp-faq">
            {FAQ_SPECIMEN.map((faq, i) => (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setFaqOpen(i === faqOpen ? -1 : i)}
                  aria-expanded={i === faqOpen}
                >
                  {faq.q}
                  <span aria-hidden="true">{i === faqOpen ? "–" : "+"}</span>
                </button>
                {i === faqOpen ? <p>{faq.a}</p> : null}
              </div>
            ))}
          </div>

          <form
            className="lp-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Input specimen"
          >
            <p>Bottom border. No box.</p>
            <input type="text" placeholder="Name" name="specimen-name" />
            <input type="email" placeholder="Email address" name="specimen-email" />
          </form>
        </section>

        <section className="lp-sheet" id="recipes" aria-label="Recipes">
          <p className="lp-kicker">Recipes</p>
          <h2 className="lp-h2">Three pages.</h2>
          <p className="lp-lede">Same system. Different length.</p>
          <ol className="lp-team">
            {RECIPES.map((recipe) => (
              <li key={recipe.n} className="lp-team-row is-index">
                <p className="lp-num">{recipe.n}</p>
                <h3>{recipe.title}</h3>
                <p className="lp-bio">{recipe.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-sheet" id="rules" aria-label="Rules">
          <p className="lp-kicker">Rules</p>
          <h2 className="lp-h2">Do, and do not.</h2>
          <div className="lp-proof-grid">
            <article>
              <p className="lp-kicker">Do</p>
              <h3 className="lp-h2">Stay on the tokens.</h3>
              <p className="lp-lede">
                Let the field read. Regular + italic only. Air around the
                second line. Hairline rows, not 3-ups. Product frames are
                the only dense color. One light wash on the field. Night owns
                Talk and Book. Flare on proof numbers and one word of the claim.
              </p>
            </article>
            <article>
              <p className="lp-kicker">Do not</p>
              <h3 className="lp-h2">Invent a second system.</h3>
              <p className="lp-lede">
                No heavy washes. No rust radial. No frame lift. No
                second Talk on paper. No 3-up grids. No louder CTAs. No
                spacecraft still as the identity. No stock people. No
                product-app tokens.
              </p>
            </article>
          </div>
        </section>

        <footer className="lp-sheet lp-close" id="close">
          <div className="lp-close-inner">
            <img
              className="lp-close-logo"
              src="/logo-endurance-white.svg"
              alt="Endurance AI Labs"
            />
            <p className="lp-kicker">Start here</p>
            <h2 className="lp-h2">The work, then the software.</h2>
            <p className="lp-lede">
              If there is a system worth building, we will say so.
            </p>
            <div className="lp-cta-actions">
              <button
                type="button"
                className="lp-btn lp-btn-fill"
                onClick={() => setChatOpen(true)}
              >
                Talk to us
              </button>
              <a className="lp-btn lp-btn-line" href="/">
                Lab homepage
              </a>
            </div>
            <div className="lp-foot">
              <span>
                © {new Date().getFullYear()}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
              <span>
                <a href="/">Home</a>
                {" · "}
                <a href="/system">System</a>
              </span>
            </div>
          </div>
        </footer>
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { EmailCapture } from "@/components/landing/EmailCapture";
import { Exhibit } from "@/components/landing/Exhibit";
import { ProductFrame } from "@/components/landing/ProductFrames";
import { RunDiagram } from "@/components/landing/RunDiagram";
import { CHAPTERS, LEDGER } from "@/components/margins/proof-content";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";

// The book shows the system by being written in it: a document, numbered,
// on paper white, with each part rendered by its live class.

const NAV = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "parts", label: "Parts" },
  { id: "recipes", label: "Recipes" },
];

const COLORS = [
  { name: "Paper", token: "--lp-paper", hex: "#ffffff", use: "The ground. Every page, edge to edge. No wash, no gradient." },
  { name: "Ink", token: "--lp-ink", hex: "#1b1a22", use: "Claims, headings, figures, the filled button, link underlines." },
  { name: "Muted", token: "--lp-muted", hex: "#4d4b57", use: "Body, decks, labels, captions." },
  { name: "Line", token: "--lp-line", hex: "rgba(27, 26, 34, 0.12)", use: "Rows and frames. Section dividers use the same ink at 0.22." },
  { name: "Oxblood", token: "--lp-flare", hex: "#b03a5e", use: "Means held. The exception count and the gate in the drawing, a negative margin in the spreadsheet. Nowhere else." },
  { name: "Night", token: "--lp-night", hex: "#141319", use: "The close." },
  { name: "Snow", token: "--lp-snow", hex: "#f7f6fb", use: "Type and the filled button on night." },
];

const SCALE = [
  { size: "68", role: "The claim", note: "Display, one per page. Tracking −0.04em, leading 1." },
  { size: "56", role: "The number", note: "The ledger's head figure. Tabular lining, tracking −0.035em." },
  { size: "36", role: "The heading", note: "One per section. Also the closing statement." },
  { size: "21", role: "The deck", note: "One step above the body, in muted. Follows the heading." },
  { size: "17", role: "The body", note: "Leading 1.66, measure 34rem." },
  { size: "14", role: "The caption", note: "Sub-labels, captions, the colophon." },
  { size: "12", role: "The label", note: "Sans, tracked 0.14em, uppercase. Numbered." },
];

const RECIPES = [
  {
    title: "A product page",
    body: "The scene, then the ledger. Then numbered chapters: heading, deck, body, and the evidence beside it, an exhibit with its proof line or a margin note. The product itself, rebuilt in markup, under the chapter that needs it. The run drawn once. A method section, the closing statement standing alone, the pilot as a ruled list, then night. This is endurancelabs.ai/margins.",
  },
  {
    title: "The lab homepage",
    body: "A type-only hero, roman, no scene. Two product chapters with exhibits. The lab as prose, the method as the closing statement, the team as ruled rows. Night. This is endurancelabs.ai.",
  },
  {
    title: "A one-pager",
    body: "One column. Claim, ledger, who to talk to. A leave-behind, not a site.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SystemBook() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const deals = CHAPTERS[0];

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-64px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="theme-paper relative min-h-svh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <nav className={scrolled ? "lp-nav is-scrolled" : "lp-nav"} aria-label="Marketing system">
        <div className="lp-nav-inner">
          <Link className="lp-wordmark" href="/" aria-label="Endurance AI Labs">
            <img src="/logo-endurance.svg" alt="" />
          </Link>
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
        <header className="lp-hero" id="top">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">Marketing system</p>
            <h1>
              One language.
              <em>Every page.</em>
            </h1>
            <p className="lp-hero-lede">
              The system for all Endurance marketing, written in itself. Product UI is a different file.
              Client demos keep the client identity.
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
                className="lp-btn-quiet"
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

        <div className="lp-seq">
          <section className="lp-block" id="color" aria-labelledby="color-title">
            <p className="lp-eyebrow">01 · Color</p>
            <h2 className="lp-h2" id="color-title">
              Seven tokens, one accent.
            </h2>
            <p className="lp-block-lede">
              The live values on <code>.theme-paper</code> in landing CSS. Paper is the ground; ink does the
              work; oxblood has one meaning. Do not invent neighbours.
            </p>
            <ul className="lp-ledger sb-swatches">
              {COLORS.map((c) => (
                <li key={c.token}>
                  <div className="sb-swatch-row">
                    <span className="sb-swatch" style={{ background: `var(${c.token})` }} aria-hidden="true" />
                    <div>
                      <p>{c.name}</p>
                      <p className="lp-fine">{c.use}</p>
                    </div>
                  </div>
                  <p className="lp-figure sb-token">
                    {c.token} · {c.hex}
                  </p>
                </li>
              ))}
            </ul>
            <p className="lp-colophon">
              Product frames carry the product&rsquo;s own red for a blocker; that is the product&rsquo;s
              colour, quoted, not ours. Product-app tokens stay in app/globals.css.
            </p>
          </section>

          <section className="lp-block" id="type" aria-labelledby="type-title">
            <p className="lp-eyebrow">02 · Type</p>
            <h2 className="lp-h2" id="type-title">
              Two faces, seven sizes.
            </h2>
            <p className="lp-block-lede">
              Archivo on claims, headings, the closing statement, and every figure, in its tabular lining
              set so a column of numbers stacks. An American grotesque drawn for print, not a literary
              serif: a serif claim over a mono eyebrow is what every lab site converged on, and this is a
              freight ledger. IBM Plex Sans on everything else, including labels. Mono is not a voice of
              the site; it appears once, as the spreadsheet&rsquo;s formula inside the hero scene.
            </p>
            <ul className="lp-ledger sb-scale">
              {SCALE.map((s) => (
                <li key={s.size}>
                  <div>
                    <p>{s.role}</p>
                    <p className="lp-fine">{s.note}</p>
                  </div>
                  <p className="lp-figure">{s.size}</p>
                </li>
              ))}
            </ul>
            <div className="sb-specimen">
              <p className="lp-eyebrow">The claim, then its deck</p>
              <h2 className="lp-h2">One language, every page.</h2>
              <p className="lp-lead">Roman everywhere. Weight and size carry the hierarchy, so nothing is set in italic.</p>
              <p className="lp-body">
                Body runs at seventeen on a 34rem measure. Headings balance their own line breaks. Widows are
                the browser&rsquo;s problem, and it handles them.
              </p>
            </div>
          </section>

          <section className="lp-block" id="parts" aria-labelledby="parts-title">
            <p className="lp-eyebrow">03 · Parts</p>
            <h2 className="lp-h2" id="parts-title">
              What a page is made of.
            </h2>
            <p className="lp-block-lede">
              Each part below is rendered by its live class, with the data the pages use. Use them. Do not
              redraw them.
            </p>

            <div className="sb-part">
              <p className="lp-eyebrow">The scene</p>
              <h3 className="lp-h3">A hero that is a place.</h3>
              <p className="lp-body">
                One per site. A photographed desk, and on its display a typeset spreadsheet of the work the
                product replaces. Over two screens of scroll the cells peel off, scatter, rush together, and the
                run assembles where they were, landing on Ready for review. Scroll drives five numbers on the
                stage; the cells carry their own flight plans as custom properties. Reduced motion shows the
                finished state, unpinned. The backdrop is the only photograph on the site.
              </p>
              <Link className="lp-feature-cta" href="/margins">
                See it on Margins
              </Link>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">The ledger</p>
              <h3 className="lp-h3">The proof, before the argument.</h3>
              <p className="lp-body">
                The head figure at 56, then label and value on one grid line, one hairline per row, and the
                colophon that names where the figures came from. Values in the serif&rsquo;s tabular set.
              </p>
              <p className="lp-headfigure">{LEDGER.rows[0].figure}</p>
              <p className="lp-headfigure-label">{LEDGER.rows[0].label}</p>
              <ul className="lp-ledger">
                {LEDGER.rows.slice(1, 4).map((row) => (
                  <li key={row.label}>
                    <div>
                      <p>{row.label}</p>
                      {row.qualifier ? <p className="lp-fine">{row.qualifier}</p> : null}
                    </div>
                    <p className="lp-figure">{row.figure}</p>
                  </li>
                ))}
              </ul>
              <p className="lp-colophon">{LEDGER.colophon}</p>
            </div>

            <div className="sb-part sb-two">
              <div>
                <p className="lp-eyebrow">The exhibit and its proof line</p>
                <h3 className="lp-h3">The product&rsquo;s data, in our hand.</h3>
                <p className="lp-body">
                  A caption, a serif head, a sub, then rows. It sits in the right column beside the copy, top
                  on the heading, and the chapter&rsquo;s figures follow it as one line of running text with
                  serif numerals. Never a card with a shadow.
                </p>
              </div>
              {deals.exhibit ? (
                <div className="lp-aside">
                  <Exhibit exhibit={deals.exhibit} />
                  <p className="lp-proofline">
                    {deals.receipts.map((figure, i) => (
                      <span key={figure.label}>
                        {i > 0 ? " · " : ""}
                        <b>{figure.value}</b> {figure.label}
                      </span>
                    ))}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="sb-part sb-two">
              <div>
                <p className="lp-eyebrow">The margin note</p>
                <h3 className="lp-h3">A story that hangs beside the argument.</h3>
                <p className="lp-body">
                  When a chapter&rsquo;s evidence is a sentence rather than a table, it hangs in the right
                  column off a single hairline. Bold lead-in, then the account.
                </p>
              </div>
              <div className="lp-margin-note">
                <p className="lp-note">
                  <strong>Caught before it paid.</strong> An audit found two people sharing one agent code.
                  Every run was still a draft, so nothing had been disbursed, and the book went back to the
                  broker who earned it.
                </p>
              </div>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">The product frame</p>
              <h3 className="lp-h3">The screen, rebuilt in markup.</h3>
              <p className="lp-body">
                Never a bitmap. The product&rsquo;s structure and palette, set in our sans with real text, so it
                reflows on a phone and stays crisp at any density. Full column, hairline frame, a caption
                beneath in our voice. The product&rsquo;s own strings, verbatim.
              </p>
              <figure className="lp-realframe">
                <ProductFrame kind="held" />
                <figcaption>The same week in the product. One blocker holds the pay step.</figcaption>
              </figure>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">The drawing</p>
              <h3 className="lp-h3">The mechanism, once.</h3>
              <p className="lp-body">
                One per page. Hairlines and the page&rsquo;s own numerals, equal stations, no icons. Oxblood on
                the one thing that is held.
              </p>
              <RunDiagram />
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">The closing statement</p>
              <h3 className="lp-h3">A pause between sections.</h3>
              <p className="lp-body">
                Roman, at heading size, on a 30ch measure, standing alone between two rules. Not a quotation:
                no marks, no italic, no attribution, because it is the firm speaking.
              </p>
              <div className="lp-interstitial sb-inline">
                <p className="lp-closer">{LEDGER.closer}</p>
              </div>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">Rows</p>
              <h3 className="lp-h3">Outcomes, people, unlocks.</h3>
              <p className="lp-body">
                Every list is the same object as the ledger: one hairline per row, label left, the rest on the
                grid line. Numbered outcomes carry their numeral inline. A person is name and role left, bio
                right.
              </p>
              <ol className="lp-outcomes">
                <li>
                  <h3>
                    <span className="lp-outcome-n">01</span>
                    The numbers match.
                  </h3>
                  <p>Margins is proven correct, and the spreadsheet is now redundant.</p>
                </li>
                <li>
                  <h3>
                    <span className="lp-outcome-n">02</span>
                    Margins finds a difference.
                  </h3>
                  <p>That difference is the return on investment conversation, in your own dollars.</p>
                </li>
              </ol>
              <div className="lp-team">
                <div className="lp-team-row is-person">
                  <h3>Alex Sok</h3>
                  <p className="lp-role">CEO</p>
                  <p className="lp-bio">Name in the serif, role as a label beneath it, the bio given the width.</p>
                </div>
              </div>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">Controls</p>
              <h3 className="lp-h3">One button, one link.</h3>
              <p className="lp-body">
                The filled button at radius 6, the same radius as every frame. Beside it the quiet action: an
                ink underline, no box. In running text, links underline in ink. The outlined pill is legacy: the form
                submit on night, and the Brain page&rsquo;s second action.
              </p>
              <div className="lp-hero-actions sb-controls">
                <button type="button" className="lp-btn lp-btn-fill">
                  Open the live demo
                </button>
                <button type="button" className="lp-btn-quiet">
                  Book a call
                </button>
                <a className="lp-feature-cta" href="#parts">
                  Open Margins
                </a>
              </div>
            </div>

            <div className="sb-part">
              <p className="lp-eyebrow">The sheet</p>
              <h3 className="lp-h3">Still on the Brain page.</h3>
              <p className="lp-body">
                Paper with a lift, 920 wide, radius 6. The Brain page is still built from sheets. Margins and
                the homepage are not: they run as one document on the grid above, and new pages should too.
              </p>
            </div>
          </section>

          <section className="lp-block" id="recipes" aria-labelledby="recipes-title">
            <p className="lp-eyebrow">04 · Recipes</p>
            <h2 className="lp-h2" id="recipes-title">
              Three pages.
            </h2>
            <p className="lp-block-lede">Same system. Different length.</p>
            <ol className="lp-outcomes">
              {RECIPES.map((recipe, i) => (
                <li key={recipe.title}>
                  <h3>
                    <span className="lp-outcome-n">{String(i + 1).padStart(2, "0")}</span>
                    {recipe.title}
                  </h3>
                  <p>{recipe.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="lp-block" id="rules" aria-labelledby="rules-title">
            <p className="lp-eyebrow">05 · Rules</p>
            <h2 className="lp-h2" id="rules-title">
              Do, and do not.
            </h2>
            <div className="lp-unlocks">
              <div>
                <p className="lp-eyebrow">Do</p>
                <p className="lp-body">
                  Paper white, edge to edge. One grid line for every right-hand element. Two faces, seven
                  sizes; figures in the serif&rsquo;s tabular set. Oxblood means held and nothing else. One
                  hairline per row, a heavier one between sections. Evidence as exhibits and ledgers. The
                  product rebuilt in markup. One drawing per page, one scene per site. Every figure names its
                  source and date.
                </p>
              </div>
              <div>
                <p className="lp-eyebrow">Do not</p>
                <p className="lp-body">
                  No gradients or washes. No floating frames, no tilt, no shadows under evidence. No bitmap
                  screenshots. No generated illustration; the scene&rsquo;s backdrop is the only photograph.
                  No mono labels. No cards in grids. No accent word in the claim. No italic, and no serif. No
                  second Talk on paper. No product-app tokens.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="lp-close" id="close">
          <div className="lp-close-inner">
            <img className="lp-close-logo" src="/logo-endurance-white.svg" alt="Endurance AI Labs" />
            <h2 className="lp-h2">The work, then the software.</h2>
            <p className="lp-lede">If there is a system worth building, we will say so.</p>
            <div className="lp-cta-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={() => setChatOpen(true)}>
                Talk to us
              </button>
            </div>
            <EmailCapture />
            <div className="lp-foot">
              <span>
                © {new Date().getFullYear()} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
              <span>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a call
                </a>
                {" · "}
                <Link href="/margins">Margins</Link>
                {" · "}
                <Link href="/brain">Brain</Link>
              </span>
            </div>
          </div>
        </footer>
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

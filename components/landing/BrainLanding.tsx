"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChatOverlay } from "./ChatOverlay";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import { CONTACT_EMAIL } from "@/lib/conversation-flows";

const SOURCES = [
  "Email",
  "Slack",
  "Drive",
  "Deal rooms",
  "Meetings",
  "CRM",
  "Code",
  "Wikis",
];

const PROOF = [
  {
    before: "A search box over folders.",
    after: "A cited answer.",
    body: "Ask a question. Every claim links to the email, thread, or document it came from. If the source is thin, the system says so.",
  },
  {
    before: "Knowledge leaves with the person.",
    after: "The firm keeps the record.",
    body: "Mail, chat, documents, meetings, deals, and code compile into pages the next person can ask. The record does not walk out.",
  },
];

export function BrainLanding() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { onChatOpen, getSessionId } = useSiteAnalytics();

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

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
    <div className="theme-paper lp-product-page relative min-h-svh">
      <div className="lp-canvas" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <nav className={scrolled ? "lp-nav is-scrolled" : "lp-nav"} aria-label="Primary">
        <div className="lp-nav-inner">
          <Link className="lp-wordmark" href="/" aria-label="Endurance AI Labs">
            <img src="/logo-endurance.svg" alt="" />
          </Link>
          <div className="lp-nav-links">
            <a href="/brain/reel">Reel</a>
            <button type="button" className="lp-nav-talk" onClick={openChat}>
              Talk
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        <header className="lp-hero" id="top">
          <div className="lp-hero-copy">
            <p className="lp-kicker">Brain</p>
            <h1>
              Institutional memory
              <em>that cites its sources.</em>
            </h1>
            <p className="lp-hero-lede">
              Everything the firm already produces, compiled into a living
              knowledge base. Every claim cites a source. Nothing is invented.
            </p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={openChat}>
                Talk to us
              </button>
              <a className="lp-feature-cta" href="/brain/reel">
                Watch the reel
              </a>
            </div>
          </div>
        </header>

        <section className="lp-sheet" aria-label="What Brain is" id="what">
          <p className="lp-kicker">What it is</p>
          <div className="lp-product">
            <div className="lp-feature-copy">
              <h2>Ask the firm. Check the source.</h2>
              <p className="lp-lede">
                Connectors ingest mail, chat, documents, meetings, deals, and
                code. The system writes entity and synthesis pages, and will
                not publish a claim without a citation.
              </p>
              <ul className="lp-chips">
                {SOURCES.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <a className="lp-feature-frame" href="/brain/reel">
              <img src="/landing/brain.png" alt="Ask Brain console" />
            </a>
          </div>
        </section>

        <section className="lp-sheet" aria-label="Citations" id="citations">
          <p className="lp-kicker">Citations</p>
          <h2 className="lp-h2">If it cannot cite it, it does not claim it.</h2>
          <p className="lp-lede">
            The schema rejects unsourced synthesis. Thin evidence is marked as
            thin. Every answer is one click from the primary record.
          </p>
          <div className="lp-proof-grid">
            {PROOF.map((c) => (
              <article key={c.after}>
                <p className="lp-proof-before">{c.before}</p>
                <p className="lp-proof-after">{c.after}</p>
                <p className="lp-card-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="lp-close">
          <div className="lp-close-inner">
            <img
              className="lp-close-logo"
              src="/logo-endurance-white.svg"
              alt="Endurance AI Labs"
            />
            <h2 className="lp-h2">Every claim cites a source.</h2>
            <div className="lp-cta-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={openChat}>
                Talk to us
              </button>
            </div>
            <div className="lp-foot">
              <span>
                © {new Date().getFullYear()}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
              <span>
                <Link href="/">Home</Link>
                {" · "}
                <a href="/brain/reel">Reel</a>
              </span>
            </div>
          </div>
        </footer>
      </main>

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

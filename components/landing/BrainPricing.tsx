"use client";

import { useCallback, useState } from "react";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import { ChatOverlay } from "./ChatOverlay";
import { Exhibit } from "./Exhibit";
import { LandingClose } from "./LandingClose";
import { LandingNav } from "./LandingNav";
import { BRAIN_ANSWERS } from "./product-content";
import {
  BRAIN_ANSWERS_BLOCK,
  BRAIN_BANDS,
  BRAIN_FAQ,
  BRAIN_LEDGER,
  BRAIN_LINE_BLOCK,
  BRAIN_PRICE_BLOCK,
  BRAIN_PRICING_HERO,
} from "./brain-pricing-content";

export function BrainPricing() {
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const openChat = () => setChatOpen(true);
  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="theme-paper relative min-h-svh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} />

      <main id="main-content">
        <header className="lp-hero" id="top">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">{BRAIN_PRICING_HERO.kicker}</p>
            <h1>
              {BRAIN_PRICING_HERO.h1}
              <em>{BRAIN_PRICING_HERO.h1Em}</em>
            </h1>
            <p className="lp-hero-lede">{BRAIN_PRICING_HERO.lede}</p>
            <div className="lp-hero-actions">
              <a className="lp-btn lp-btn-fill" href={BRAIN_PRICING_HERO.fillHref}>
                {BRAIN_PRICING_HERO.fillLabel}
              </a>
              <a
                className="lp-btn-quiet"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BRAIN_PRICING_HERO.lineLabel}
              </a>
            </div>
          </div>
        </header>

        <div className="lp-seq">
          <section className="lp-block" id="price" aria-labelledby="bp-price">
            <p className="lp-eyebrow">{BRAIN_PRICE_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="bp-price">
              {BRAIN_PRICE_BLOCK.title}
            </h2>
            <table className="lp-rate">
              <thead>
                <tr>
                  <th scope="col">People who can ask</th>
                  <th scope="col">Monthly</th>
                  <th scope="col">Annual</th>
                </tr>
              </thead>
              <tbody>
                {BRAIN_BANDS.map((band) => (
                  <tr key={band.range}>
                    <th scope="row">{band.range}</th>
                    <td>{band.monthly}</td>
                    <td>{band.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="lp-note">{BRAIN_PRICE_BLOCK.note}</p>
          </section>

          <section className="lp-block" id="field" aria-labelledby="bp-field">
            <p className="lp-eyebrow">{BRAIN_LEDGER.kicker}</p>
            <h2 className="lp-h2" id="bp-field">
              {BRAIN_LEDGER.title}
            </h2>
            <p className="lp-block-lede">{BRAIN_LEDGER.lede}</p>
            <ul className="lp-ledger">
              {BRAIN_LEDGER.rows.map((row) => (
                <li key={row.label}>
                  <div>
                    <p>{row.label}</p>
                    {row.qualifier ? <p className="lp-fine">{row.qualifier}</p> : null}
                  </div>
                  <p className="lp-figure">{row.figure}</p>
                </li>
              ))}
            </ul>
            <p className="lp-colophon">{BRAIN_LEDGER.colophon}</p>
          </section>

          <section className="lp-block" id="answers" aria-labelledby="bp-answers">
            <p className="lp-eyebrow">{BRAIN_ANSWERS_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="bp-answers">
              {BRAIN_ANSWERS_BLOCK.title}
            </h2>
            <div className="lp-buys">
              <figure>
                <Exhibit
                  exhibit={{
                    caption: "Recent answers",
                    head: "Ask Brain",
                    meta: "Last 24 hours · documents behind each answer",
                    rows: BRAIN_ANSWERS,
                  }}
                />
                <figcaption>{BRAIN_ANSWERS_BLOCK.caption}</figcaption>
              </figure>
            </div>
          </section>

          <section className="lp-block" id="line" aria-labelledby="bp-line">
            <p className="lp-eyebrow">{BRAIN_LINE_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="bp-line">
              {BRAIN_LINE_BLOCK.title}
            </h2>
            <p className="lp-body">{BRAIN_LINE_BLOCK.body}</p>
          </section>

          <section className="lp-block" id="faq" aria-labelledby="bp-faq">
            <p className="lp-eyebrow">{BRAIN_FAQ.kicker}</p>
            <h2 className="lp-h2" id="bp-faq">
              {BRAIN_FAQ.title}
            </h2>
            <div className="lp-faq">
              {BRAIN_FAQ.items.map((item, i) => (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(i === openFaq ? -1 : i)}
                    aria-expanded={i === openFaq}
                  >
                    {item.q}
                    <span aria-hidden="true">{i === openFaq ? "–" : "+"}</span>
                  </button>
                  {i === openFaq ? <p>{item.a}</p> : null}
                </div>
              ))}
            </div>
          </section>
        </div>

        <LandingClose onOpenChat={openChat} />
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

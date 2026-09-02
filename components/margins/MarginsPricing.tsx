"use client";

import { useCallback, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import {
  BANDS,
  FAQ,
  LINE_BLOCK,
  PILOT_BLOCK,
  PRICE_BLOCK,
  PRICING_HERO,
  START_BLOCK,
  WARRANTY_BLOCK,
} from "./pricing-content";

export function MarginsPricing() {
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const { onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

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

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content">
        <header className="lp-hero" id="top">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">{PRICING_HERO.kicker}</p>
            <h1>
              {PRICING_HERO.h1}
              <em>{PRICING_HERO.h1Em}</em>
            </h1>
            <p className="lp-hero-lede">{PRICING_HERO.lede}</p>
            <div className="lp-hero-actions">
              <a
                className="lp-btn lp-btn-fill"
                href={PRICING_HERO.fillHref}
                onClick={() => onCtaClick(PRICING_HERO.fillLabel)}
              >
                {PRICING_HERO.fillLabel}
              </a>
              <a
                className="lp-btn-quiet"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick(PRICING_HERO.lineLabel)}
              >
                {PRICING_HERO.lineLabel}
              </a>
            </div>
          </div>
        </header>

        <div className="lp-seq">
          <section className="lp-block" id="price" aria-labelledby="price-title">
            <p className="lp-eyebrow">{PRICE_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="price-title">
              {PRICE_BLOCK.title}
            </h2>
            <p className="lp-block-lede">{PRICE_BLOCK.lede}</p>
            <table className="lp-rate">
              <thead>
                <tr>
                  <th scope="col">People paid in a typical week</th>
                  <th scope="col">Monthly</th>
                  <th scope="col">Annual</th>
                </tr>
              </thead>
              <tbody>
                {BANDS.map((band) => (
                  <tr key={band.range}>
                    <th scope="row">{band.range}</th>
                    <td>{band.monthly}</td>
                    <td>{band.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="lp-body">{PRICE_BLOCK.fixed}</p>
            <p className="lp-note">{PRICE_BLOCK.note}</p>
            <p className="lp-colophon">{PRICE_BLOCK.colophon}</p>
          </section>

          <section className="lp-block" id="start" aria-labelledby="start-title">
            <p className="lp-eyebrow">{START_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="start-title">
              {START_BLOCK.title}
            </h2>
            <p className="lp-block-lede">{START_BLOCK.lede}</p>
            {START_BLOCK.body.map((paragraph) => (
              <p className="lp-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <ul className="lp-ledger lp-ledger-prose">
              {START_BLOCK.rows.map((row) => (
                <li key={row.label}>
                  <div>
                    <p>{row.label}</p>
                  </div>
                  <p className="lp-included-body">{row.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="lp-block" id="pilot" aria-labelledby="pilot-title">
            <p className="lp-eyebrow">{PILOT_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="pilot-title">
              {PILOT_BLOCK.title}
            </h2>
            <p className="lp-block-lede">{PILOT_BLOCK.lede}</p>
            <ol className="lp-outcomes">
              {PILOT_BLOCK.outcomes.map((outcome, i) => (
                <li key={outcome.title}>
                  <h3>
                    <span className="lp-outcome-n">{String(i + 1).padStart(2, "0")}</span>
                    {outcome.title}
                  </h3>
                  <p>{outcome.body}</p>
                </li>
              ))}
            </ol>
            <p className="lp-note">{PILOT_BLOCK.note}</p>
            <p className="lp-note">{PILOT_BLOCK.scarcity}</p>
          </section>

          <section className="lp-block" id="warranty" aria-labelledby="warranty-title">
            <p className="lp-eyebrow">{WARRANTY_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="warranty-title">
              {WARRANTY_BLOCK.title}
            </h2>
            <p className="lp-block-lede">{WARRANTY_BLOCK.lede}</p>
            {WARRANTY_BLOCK.body.map((paragraph) => (
              <p className="lp-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className="lp-block" id="line" aria-labelledby="line-title">
            <p className="lp-eyebrow">{LINE_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="line-title">
              {LINE_BLOCK.title}
            </h2>
            {LINE_BLOCK.body.map((paragraph) => (
              <p className="lp-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className="lp-block" id="faq" aria-labelledby="faq-title">
            <p className="lp-eyebrow">{FAQ.kicker}</p>
            <h2 className="lp-h2" id="faq-title">
              {FAQ.title}
            </h2>
            <div className="lp-faq">
              {FAQ.items.map((item, i) => (
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

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} getSessionId={getSessionId} />
    </div>
  );
}

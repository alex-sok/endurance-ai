"use client";

import { useCallback, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import {
  FAQ,
  INCLUDED,
  LINE_BLOCK,
  PILOT_BLOCK,
  PRICE,
  PRICE_NOTE,
  PRICE_ROWS,
  PRICING_HERO,
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
            <p className="lp-eyebrow">01 · The price</p>
            <h2 className="lp-h2" id="price-title">
              Two numbers, both of them plain.
            </h2>
            <p className="lp-block-lede">
              No seat tiers, no modules to unlock, and nothing priced on a percentage of what you pay
              out.
            </p>
            <ul className="lp-ledger">
              {PRICE_ROWS.map((row) => {
                const value = PRICE[row.key];
                return (
                  <li key={row.label}>
                    <div>
                      <p>{row.label}</p>
                      <p className="lp-fine">{row.qualifier}</p>
                    </div>
                    {value ? (
                      <p className="lp-figure">{value}</p>
                    ) : (
                      <p className="lp-figure is-unset">Not set</p>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="lp-note">{PRICE_NOTE}</p>
            <p className="lp-colophon">
              List price, effective {PRICE.effective}. Production figures on this page are drawn from
              the brokerage where Margins was built and were queried on August 24, 2026.
            </p>
          </section>

          <section className="lp-block" id="included" aria-labelledby="included-title">
            <p className="lp-eyebrow">{INCLUDED.kicker}</p>
            <h2 className="lp-h2" id="included-title">
              {INCLUDED.title}
            </h2>
            <p className="lp-block-lede">{INCLUDED.lede}</p>
            <ul className="lp-ledger lp-ledger-prose">
              {INCLUDED.rows.map((row) => (
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
            <p className="lp-note">{PILOT_BLOCK.closer}</p>
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

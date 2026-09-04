"use client";

import { useCallback, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import { ProductFrame } from "@/components/landing/ProductFrames";
import { PricePlan } from "./PricePlan";
import {
  BANDS,
  BUYS_BLOCK,
  FAQ,
  LINE_BLOCK,
  PRICE_BLOCK,
  PRICING_HERO,
  TRUST_BLOCK,
  YEAR_BLOCK,
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
            <p className="lp-note">{PRICE_BLOCK.note}</p>
            <p className="lp-colophon">{PRICE_BLOCK.colophon}</p>
          </section>

          <section className="lp-block" id="year" aria-labelledby="year-title">
            <p className="lp-eyebrow">{YEAR_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="year-title">
              {YEAR_BLOCK.title}
            </h2>
            <PricePlan />
            <p className="lp-note">{YEAR_BLOCK.note}</p>
          </section>

          <section className="lp-block" id="buys" aria-labelledby="buys-title">
            <p className="lp-eyebrow">{BUYS_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="buys-title">
              {BUYS_BLOCK.title}
            </h2>
            <div className="lp-buys">
              {BUYS_BLOCK.frames.map((frame) => (
                <figure key={frame.kind}>
                  <ProductFrame kind={frame.kind} />
                  <figcaption>{frame.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="lp-note">{BUYS_BLOCK.note}</p>
          </section>

          <section className="lp-block" id="trust" aria-labelledby="trust-title">
            <p className="lp-eyebrow">{TRUST_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="trust-title">
              {TRUST_BLOCK.title}
            </h2>
            <ul className="lp-ledger lp-ledger-prose">
              {TRUST_BLOCK.points.map((point) => (
                <li key={point.label}>
                  <div>
                    <p>{point.label}</p>
                  </div>
                  <p className="lp-included-body">{point.body}</p>
                </li>
              ))}
            </ul>
            <div className="lp-hero-actions lp-block-actions">
              <a
                className="lp-btn lp-btn-fill"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book the pilot
              </a>
              <a className="lp-btn-quiet" href="/margins">
                See how it works
              </a>
            </div>
          </section>

          <section className="lp-block" id="line" aria-labelledby="line-title">
            <p className="lp-eyebrow">{LINE_BLOCK.kicker}</p>
            <h2 className="lp-h2" id="line-title">
              {LINE_BLOCK.title}
            </h2>
            <p className="lp-body">{LINE_BLOCK.body}</p>
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

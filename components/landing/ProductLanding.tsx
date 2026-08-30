"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "./ChatOverlay";
import { LandingClose } from "./LandingClose";
import { LandingNav } from "./LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import type { ProductContent } from "./product-content";

export function ProductLanding(product: ProductContent) {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-section");
            if (slug) onSectionEnter(slug);
          }
        }
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSectionEnter]);

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content">
        <header className="lp-hero" id="top" data-section="hero">
          <div className="lp-hero-copy">
            <p className="lp-kicker">{product.kicker}</p>
            <h1>
              {product.title}
              <em>{product.italic}</em>
            </h1>
            <p className="lp-hero-lede">{product.lede}</p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={openChat}>
                Talk to us
              </button>
              <a
                className="lp-btn lp-btn-line"
                href={product.lineHref}
                target={product.lineHref.startsWith("http") ? "_blank" : undefined}
                rel={product.lineHref.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => onCtaClick?.(product.lineLabel)}
              >
                {product.lineLabel}
              </a>
            </div>
          </div>
        </header>

        <section className="lp-sheet" data-section="product" aria-label="Product">
          <div className="lp-feature-frame">
            <img src={product.frameSrc} alt={product.frameAlt} />
          </div>
          <ul className="lp-chips">
            {product.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <ol className="lp-grid-3">
            {product.steps.map((step) => (
              <li key={step.n} className="lp-card">
                <p className="lp-num">{step.n}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-sheet" data-section="proof" aria-label="In the field">
          <p className="lp-kicker">In the field</p>
          <h2 className="lp-h2">{product.proofTitle}</h2>
          <div className="lp-proof-grid">
            {product.proofs.map((c) => (
              <article key={c.after}>
                <p className="lp-proof-before">{c.before}</p>
                <p className="lp-proof-after">{c.after}</p>
                <p className="lp-card-body">{c.body}</p>
              </article>
            ))}
          </div>
          {product.note ? (
            <p className="lp-note">
              {product.note.text}{" "}
              <a className="lp-link" href={product.note.href}>
                {product.note.link}
              </a>
            </p>
          ) : null}
        </section>

        <LandingClose onOpenChat={openChat} />
      </main>

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

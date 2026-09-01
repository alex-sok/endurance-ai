"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "./ChatOverlay";
import { LandingClose } from "./LandingClose";
import { LandingNav } from "./LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import type { ProductContent, ProductRecipe, ProductSolve } from "./product-content";

function SolveFrame({ block }: { block: ProductSolve }) {
  return (
    <div className="lp-feature-frame">
      <img src={block.frameSrc} alt={block.frameAlt} />
    </div>
  );
}

function RecipeBand({ recipe }: { recipe: ProductRecipe }) {
  return (
    <section
      className="lp-sheet"
      data-section="recipe"
      id="recipe"
      aria-label={recipe.solve}
    >
      <div className="lp-product">
        <div className="lp-feature-copy">
          <p className="lp-kicker">{recipe.pain}</p>
          <h2>{recipe.solve}</h2>
          <p className="lp-recipe-line">{recipe.line}</p>
          <p className="lp-lede">{recipe.body}</p>
        </div>
        <div className="lp-feature-frame">
          <img src={recipe.frameSrc} alt={recipe.frameAlt} />
        </div>
      </div>
    </section>
  );
}

function SolveSheet({
  block,
  flip,
  hideFrame,
}: {
  block: ProductSolve;
  flip: boolean;
  hideFrame?: boolean;
}) {
  const typeOnly = hideFrame || !block.frameSrc || block.framePending;
  return (
    <section className="lp-sheet" data-section={block.id} id={block.id} aria-label={block.solve}>
      <div className={flip && !typeOnly ? "lp-product is-flip" : typeOnly ? "lp-product is-solo" : "lp-product"}>
        {flip && !typeOnly ? <SolveFrame block={block} /> : null}
        <div className="lp-feature-copy">
          <p className="lp-kicker">{block.pain}</p>
          <h2>{block.solve}</h2>
          <p className="lp-lede">{block.body}</p>
        </div>
        {!flip && !typeOnly ? <SolveFrame block={block} /> : null}
      </div>
    </section>
  );
}

export function ProductLanding(product: ProductContent) {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();
  const talkLabel = product.talkLabel ?? "Talk to us";
  const solves = product.solves ?? [];
  const hasSolves = solves.length > 0;
  const isMargins = Boolean(hasSolves || product.proofStrip);
  const firstSolve = hasSolves ? solves[0] : null;
  const laterSolves = hasSolves ? solves.slice(1) : [];

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
    <div className={isMargins ? "theme-snow is-margins relative min-h-svh" : "theme-paper relative min-h-svh"}>
      {isMargins ? null : <div className="lp-canvas" aria-hidden="true" />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content">
        <header className={firstSolve ? "lp-hero lp-fold" : "lp-hero"} id="top" data-section="hero">
          <div className="lp-hero-copy">
            {product.kicker ? <p className="lp-kicker">{product.kicker}</p> : null}
            {product.italic && product.italicAsKicker ? (
              <p className="lp-hero-kicker">{product.italic}</p>
            ) : null}
            <h1>{product.title}</h1>
            {product.italic && !product.italicAsKicker ? (
              <p className="lp-hero-display-em">
                <em>{product.italic}</em>
              </p>
            ) : null}
            <p className="lp-hero-lede">{product.lede}</p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn lp-btn-fill" onClick={openChat}>
                {talkLabel}
              </button>
              <a
                className={isMargins ? "lp-hero-line" : "lp-btn lp-btn-line"}
                href={product.lineHref}
                target={product.lineHref.startsWith("http") ? "_blank" : undefined}
                rel={product.lineHref.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => onCtaClick?.(product.lineLabel)}
              >
                {product.lineLabel}
              </a>
            </div>
          </div>
          {firstSolve ? (
            <figure className="lp-fold-instrument" aria-label={product.frameAlt}>
              <img src={product.frameSrc} alt={product.frameAlt} />
            </figure>
          ) : null}
        </header>

        {!hasSolves ? (
          <figure className="lp-object" data-section="product" aria-label={product.frameAlt}>
            <div className="lp-feature-frame">
              <img src={product.frameSrc} alt={product.frameAlt} />
            </div>
          </figure>
        ) : null}

        {!hasSolves && product.steps.length > 0 ? (
          <section className="lp-sheet" data-section="how" aria-label="How it runs">
            <ol className="lp-team">
              {product.steps.map((step) => (
                <li key={step.n} className="lp-team-row is-index">
                  <p className="lp-num">{step.n}</p>
                  <h3>{step.title}</h3>
                  <p className="lp-bio">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {product.recipe ? <RecipeBand recipe={product.recipe} /> : null}

        {product.proofStrip ? (
          <section className="lp-strip" data-section="proof-strip" aria-label="In production">
            <p className="lp-lede">{product.proofStrip}</p>
            {product.proofPair ? (
              <>
                <p className="lp-proof-before">{product.proofPair.before}</p>
                <p className="lp-proof-after">{product.proofPair.after}</p>
              </>
            ) : null}
            {product.chips?.length ? (
              <ul className="lp-chips" aria-label="Fit">
                {product.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {firstSolve ? <SolveSheet block={firstSolve} flip={false} hideFrame /> : null}

        {laterSolves.length ? (
          <div className="lp-solves">
            {laterSolves.map((block, i) => (
              <SolveSheet key={block.id} block={block} flip={i % 2 === 0} />
            ))}
          </div>
        ) : null}

        {product.proofFacts ? (
          <section
            className="lp-proof-band"
            data-section="proof-band"
            aria-label={product.proofFacts.heading}
          >
            <h2>{product.proofFacts.heading}</h2>
            <ul>
              {product.proofFacts.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {!product.proofStrip ? (
          <section className="lp-sheet" data-section="proof" aria-label="In the field">
            <p className="lp-lede">{product.proofLede}</p>
            <h2 className="lp-h2">{product.proofTitle}</h2>
            <p className="lp-lede">{product.proofNote}</p>
            {product.note ? (
              <p className="lp-note">
                {product.note.text}{" "}
                <a className="lp-link" href={product.note.href}>
                  {product.note.link}
                </a>
              </p>
            ) : null}
          </section>
        ) : null}

        <LandingClose onOpenChat={openChat} close={product.close} />
      </main>

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

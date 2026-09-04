"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { Exhibit } from "@/components/landing/Exhibit";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { ProductFrame } from "@/components/landing/ProductFrames";
import { RunDiagram } from "@/components/landing/RunDiagram";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import {
  CHAPTERS,
  LEDGER,
  PROOF_CLOSE,
  PROOF_HERO,
  type MarginsChapter,
} from "./proof-content";

function Chapter({ chapter }: { chapter: MarginsChapter }) {
  const titleId = `${chapter.slug}-title`;
  return (
    <section className="lp-chapter" data-section={chapter.slug} aria-labelledby={titleId}>
      <div className="lp-chapter-copy">
        <p className="lp-eyebrow">{chapter.kicker}</p>
        <h2 id={titleId}>{chapter.title}</h2>
        <p className="lp-lead">{chapter.statement}</p>
        {chapter.body.map((paragraph) => (
          <p className="lp-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {chapter.exhibit ? null : (
          <p className="lp-proofline">
            {chapter.receipts.map((figure, i) => (
              <span key={figure.label}>
                {i > 0 ? " · " : ""}
                <b>{figure.value}</b> {figure.label}
              </span>
            ))}
          </p>
        )}
        {chapter.demo ? (
          <a className="lp-feature-cta" href={chapter.demo.href}>
            {chapter.demo.label}
          </a>
        ) : null}
      </div>
      {chapter.note ? (
        <div className="lp-margin-note">
          <p className="lp-note">
            <strong>{chapter.note.title}</strong> {chapter.note.body}
          </p>
        </div>
      ) : null}
      {chapter.exhibit ? (
        <div className="lp-aside">
          <Exhibit exhibit={chapter.exhibit} />
          <p className="lp-proofline">
            {chapter.receipts.map((figure, i) => (
              <span key={figure.label}>
                {i > 0 ? " · " : ""}
                <b>{figure.value}</b> {figure.label}
              </span>
            ))}
          </p>
        </div>
      ) : null}
      {chapter.frame ? (
        <figure className="lp-realframe">
          <ProductFrame kind={chapter.frame} />
          <figcaption>{chapter.frameCaption}</figcaption>
        </figure>
      ) : null}
    </section>
  );
}

// The ledger leads: the money, the count, and where the figures came from,
// before anything else is claimed.
function Ledger() {
  const [head, ...rest] = LEDGER.rows;
  return (
    <section className="lp-block" data-section={LEDGER.slug} aria-labelledby="ledger-title">
      <p className="lp-eyebrow">{LEDGER.kicker}</p>
      <h2 className="lp-h2" id="ledger-title">
        {LEDGER.title}
      </h2>
      <p className="lp-block-lede">{LEDGER.lede}</p>
      <p className="lp-headfigure">{head.figure}</p>
      <p className="lp-headfigure-label">{head.label}</p>
      <ul className="lp-ledger">
        {rest.map((row) => (
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
      <a className="lp-feature-cta" href={LEDGER.demo.href}>
        {LEDGER.demo.label}
      </a>
    </section>
  );
}

function Method() {
  return (
    <section className="lp-block" data-section="method" aria-labelledby="method-title">
      <p className="lp-eyebrow">{LEDGER.methodKicker}</p>
      <h2 className="lp-h2" id="method-title">
        {LEDGER.methodTitle}
      </h2>
      {LEDGER.methodBody.map((paragraph) => (
        <p className="lp-body" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export function MarginsProof() {
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
    document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onSectionEnter]);

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
        <div className="lp-seq">
          <header className="lp-block lp-proofhead" id="top" data-section="proof-hero">
            <p className="lp-eyebrow">{PROOF_HERO.kicker}</p>
            <h1 className="lp-h2">{PROOF_HERO.title}</h1>
            <p className="lp-block-lede">{PROOF_HERO.lede}</p>
            <a
              className="lp-feature-cta"
              href={PROOF_HERO.back.href}
              onClick={() => onCtaClick(PROOF_HERO.back.label)}
            >
              {PROOF_HERO.back.label}
            </a>
          </header>

          <Ledger />
          {CHAPTERS.map((chapter) => (
            <Chapter key={chapter.slug} chapter={chapter} />
          ))}
          <section className="lp-block" data-section="run" aria-label="The run, end to end">
            <RunDiagram />
          </section>
          <Method />
          <section className="lp-interstitial" data-section="closer">
            <p className="lp-closer">{LEDGER.closer}</p>
          </section>

          <section className="lp-block" data-section="proof-close" aria-labelledby="proof-close-title">
            <p className="lp-eyebrow">{PROOF_CLOSE.kicker}</p>
            <h2 className="lp-h2" id="proof-close-title">
              {PROOF_CLOSE.title}
            </h2>
            <p className="lp-block-lede">{PROOF_CLOSE.lede}</p>
            <div className="lp-cta-actions">
              <a
                className="lp-btn lp-btn-fill"
                href={PROOF_CLOSE.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick(PROOF_CLOSE.primary.label)}
              >
                {PROOF_CLOSE.primary.label}
              </a>
              <a
                className="lp-btn lp-btn-line"
                href={PROOF_CLOSE.secondary.href}
                onClick={() => onCtaClick(PROOF_CLOSE.secondary.label)}
              >
                {PROOF_CLOSE.secondary.label}
              </a>
            </div>
          </section>
        </div>

        <LandingClose onOpenChat={openChat} />
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} getSessionId={getSessionId} />
    </div>
  );
}

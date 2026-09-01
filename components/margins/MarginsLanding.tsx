"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import {
  BAND,
  BAND_PROVENANCE,
  CHAPTERS,
  HERO,
  HERO_FRAME,
  LEDGER,
  PILOT,
  type MarginsChapter,
  type MarginsFigure,
} from "./content";

// Real pixel dimensions, so the frames reserve their space before the
// screenshot lands. Every shot on this page is at its own proportions.
const SHOT_SIZES: Record<string, [number, number]> = {
  "/landing/margins-load.jpg": [2200, 1013],
  "/landing/margins-exceptions.jpg": [2200, 1330],
  "/landing/margins-statement.jpg": [2200, 1123],
  "/landing/margins-reconcile.jpg": [2200, 1330],
};

function Figures({
  className,
  items,
}: {
  className: string;
  items: MarginsFigure[];
}) {
  return (
    <ul className={className}>
      {items.map((figure) => (
        <li key={figure.label}>
          <p className="lp-figure">{figure.value}</p>
          <p className="lp-fine">{figure.label}</p>
        </li>
      ))}
    </ul>
  );
}

function Shot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const [width, height] = SHOT_SIZES[src];
  return (
    <figure className="lp-shot">
      <div className="lp-feature-frame">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ aspectRatio: `${width} / ${height}` }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="lp-fine lp-shotcap">{caption}</figcaption>
    </figure>
  );
}

function Chapter({ chapter }: { chapter: MarginsChapter }) {
  const titleId = `${chapter.slug}-title`;
  return (
    <section
      className="lp-sheet"
      data-section={chapter.slug}
      aria-labelledby={titleId}
    >
      <p className="lp-kicker">{chapter.kicker}</p>
      <p className="lp-pain">{chapter.pain}</p>
      <p className="lp-kicker">{chapter.answerKicker}</p>
      <h2 className="lp-h2" id={titleId}>
        {chapter.title}
      </h2>
      {chapter.body.map((paragraph) => (
        <p className="lp-lede" key={paragraph}>
          {paragraph}
        </p>
      ))}
      <Shot
        src={chapter.frameSrc}
        alt={chapter.frameAlt}
        caption={chapter.frameCaption}
      />
      <Figures className="lp-receipt" items={chapter.receipts} />
      <a className="lp-feature-cta" href={chapter.demoHref}>
        {chapter.demoLabel}
      </a>
      {chapter.note ? (
        <p className="lp-note">
          <strong>{chapter.note.title}</strong> {chapter.note.body}
        </p>
      ) : null}
    </section>
  );
}

function Ledger() {
  return (
    <section
      className="lp-sheet"
      data-section={LEDGER.slug}
      aria-labelledby="ledger-title"
    >
      <p className="lp-kicker">{LEDGER.kicker}</p>
      <h2 className="lp-h2" id="ledger-title">
        {LEDGER.title}
      </h2>
      <p className="lp-lede">{LEDGER.lede}</p>
      <ul className="lp-ledger">
        {LEDGER.rows.map((row) => (
          <li key={row.label}>
            <div>
              <p>{row.label}</p>
              {row.qualifier ? (
                <p className="lp-fine">{row.qualifier}</p>
              ) : null}
            </div>
            <p className="lp-figure">{row.figure}</p>
          </li>
        ))}
      </ul>
      <p className="lp-kicker">{LEDGER.methodKicker}</p>
      <h3 className="lp-h3">{LEDGER.methodTitle}</h3>
      {LEDGER.methodBody.map((paragraph) => (
        <p className="lp-lede" key={paragraph}>
          {paragraph}
        </p>
      ))}
      <p className="lp-closer">{LEDGER.closer}</p>
      <p className="lp-colophon">{LEDGER.colophon}</p>
    </section>
  );
}

function Pilot() {
  return (
    <section
      className="lp-sheet"
      data-section={PILOT.slug}
      aria-labelledby="pilot-title"
    >
      <p className="lp-kicker">{PILOT.kicker}</p>
      <h2 className="lp-h2" id="pilot-title">
        {PILOT.title}
      </h2>
      <p className="lp-lede">{PILOT.lede}</p>
      <ol className="lp-team">
        {PILOT.outcomes.map((outcome, i) => (
          <li key={outcome.title} className="lp-team-row is-index">
            <p className="lp-num">{String(i + 1).padStart(2, "0")}</p>
            <h3>{outcome.title}</h3>
            <p className="lp-bio">{outcome.body}</p>
          </li>
        ))}
      </ol>
      <div className="lp-team">
        {PILOT.buyers.map((buyer) => (
          <div key={buyer.role} className="lp-team-row is-pair">
            <p className="lp-role">{buyer.role}</p>
            <p className="lp-bio">{buyer.unlock}</p>
          </div>
        ))}
      </div>
      <Shot
        src={PILOT.frameSrc}
        alt={PILOT.frameAlt}
        caption={PILOT.frameCaption}
      />
      <a className="lp-feature-cta" href={PILOT.demoHref}>
        {PILOT.demoLabel}
      </a>
      <p className="lp-note">{PILOT.note}</p>
    </section>
  );
}

export function MarginsLanding() {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } =
    useSiteAnalytics();

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
        <header className="lp-hero is-center" id="top" data-section="hero">
          <div className="lp-hero-copy">
            <p className="lp-kicker">{HERO.kicker}</p>
            <h1>
              {HERO.h1}
              <em>{HERO.h1Em}</em>
            </h1>
            <p className="lp-hero-lede">{HERO.lede}</p>
            <div className="lp-hero-actions">
              <a
                className="lp-btn lp-btn-fill"
                href={HERO.fillHref}
                onClick={() => onCtaClick(HERO.fillLabel)}
              >
                {HERO.fillLabel}
              </a>
              <a
                className="lp-btn lp-btn-line"
                href={HERO.lineHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCtaClick(HERO.lineLabel)}
              >
                {HERO.lineLabel}
              </a>
            </div>
            <div className="lp-band">
              <Figures className="lp-band-figures" items={BAND} />
              <p className="lp-fine lp-band-note">{BAND_PROVENANCE}</p>
            </div>
          </div>
        </header>

        <figure className="lp-stage" data-section="product">
          <div className="lp-feature-frame">
            <img
              src={HERO_FRAME.src}
              alt={HERO_FRAME.alt}
              width={2880}
              height={1800}
              decoding="async"
            />
          </div>
          {/* Card crops from the same dashboard; decorative duplicates,
              so they stay out of the accessibility tree. */}
          <div className="lp-stage-float is-left" aria-hidden="true">
            <img
              src="/landing/margins-card-ready.jpg"
              alt=""
              width={1064}
              height={508}
              decoding="async"
            />
          </div>
          <div className="lp-stage-float is-right" aria-hidden="true">
            <img
              src="/landing/margins-card-blocker.jpg"
              alt=""
              width={508}
              height={232}
              decoding="async"
            />
          </div>
        </figure>

        {CHAPTERS.map((chapter) => (
          <Chapter key={chapter.slug} chapter={chapter} />
        ))}

        <Ledger />
        <Pilot />

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

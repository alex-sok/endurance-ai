"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { FieldShader } from "@/components/landing/FieldShader";
import { StageTilt } from "@/components/landing/StageTilt";
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

// Real pixel dimensions, so every frame reserves its box before the image
// lands. The chapter fragments are cut from the demo at their own ratios.
const SHOT_SIZES: Record<string, [number, number]> = {
  "/landing/margins-frag-deals.jpg": [1848, 941],
  "/landing/margins-frag-catches.jpg": [1848, 1258],
  "/landing/margins-frag-portal.jpg": [1300, 1003],
  "/landing/margins-statements.jpg": [1280, 720],
};

// Each washed card turns its light one step further than the last, and the
// evidence changes sides, so the page reads as a rhythm rather than a stack.
const WASH_ANGLES = [65, 101, 137, 173];
const FLIPS = [false, true, false, true];

function washStyle(index: number): CSSProperties {
  return { "--wash-angle": `${WASH_ANGLES[index % WASH_ANGLES.length]}deg` } as CSSProperties;
}

function Claim({ text, accent }: { text: string; accent: string }) {
  const at = text.indexOf(accent);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="lp-accent">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

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

function Bleed({ src, alt }: { src: string; alt: string }) {
  const [width, height] = SHOT_SIZES[src];
  return (
    <div className="lp-split-shot">
      <div className="lp-bleed">
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
    </div>
  );
}

function DemoDoor({ href, label }: { href: string; label: string }) {
  return (
    <a className="lp-proofcard lp-democard" href={href}>
      <span className="lp-democard-kicker">Live demo · No login</span>
      <span className="lp-democard-title">{label}</span>
      <span className="lp-democard-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

function Chapter({ chapter, index }: { chapter: MarginsChapter; index: number }) {
  const titleId = `${chapter.slug}-title`;
  const flip = FLIPS[index % FLIPS.length];
  return (
    <div className="lp-chapter" data-section={chapter.slug}>
      <section
        className={`lp-wash lp-split${flip ? " is-flip" : ""}`}
        style={washStyle(index)}
        aria-labelledby={titleId}
      >
        <div className="lp-split-copy">
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
        </div>
        <Bleed src={chapter.frameSrc} alt={chapter.frameAlt} />
      </section>
      <div className="lp-proofrow">
        <article className="lp-proofcard">
          <Figures className="lp-receipt is-card" items={chapter.receipts} />
        </article>
        <DemoDoor href={chapter.demoHref} label={chapter.demoLabel} />
      </div>
      {chapter.note ? (
        <p className="lp-note lp-note-row">
          <strong>{chapter.note.title}</strong> {chapter.note.body}
        </p>
      ) : null}
    </div>
  );
}

function Ledger() {
  return (
    <section
      className="lp-sheet is-wide"
      data-section={LEDGER.slug}
      aria-labelledby="ledger-title"
    >
      <figure className="lp-sheet-art">
        <img
          src="/landing/margins-ledger-art.jpg"
          alt="Paper collage: a laurelled marble bust holding a ruled paper ledger, with an ember circle and bar"
          width={1248}
          height={640}
          loading="lazy"
          decoding="async"
        />
      </figure>
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
    <div className="lp-chapter" data-section={PILOT.slug}>
      <section
        className="lp-wash lp-split is-flip"
        style={washStyle(3)}
        aria-labelledby="pilot-title"
      >
        <div className="lp-split-copy">
          <p className="lp-kicker">{PILOT.kicker}</p>
          <h2 className="lp-h2" id="pilot-title">
            {PILOT.title}
          </h2>
          <p className="lp-lede">{PILOT.lede}</p>
          <ol className="lp-team lp-team-tight">
            {PILOT.outcomes.map((outcome, i) => (
              <li key={outcome.title} className="lp-team-row is-index">
                <p className="lp-num">{String(i + 1).padStart(2, "0")}</p>
                <h3>{outcome.title}</h3>
                <p className="lp-bio">{outcome.body}</p>
              </li>
            ))}
          </ol>
          <div className="lp-team lp-team-tight">
            {PILOT.buyers.map((buyer) => (
              <div key={buyer.role} className="lp-team-row is-pair">
                <p className="lp-role">{buyer.role}</p>
                <p className="lp-bio">{buyer.unlock}</p>
              </div>
            ))}
          </div>
          <a className="lp-feature-cta" href={PILOT.demoHref}>
            {PILOT.demoLabel}
          </a>
        </div>
        <Bleed src={PILOT.frameSrc} alt={PILOT.frameAlt} />
      </section>
      <p className="lp-note lp-note-row">{PILOT.note}</p>
    </div>
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
      <div className="lp-canvas" aria-hidden="true">
        <FieldShader />
      </div>
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
              <Claim text={HERO.h1} accent={HERO.h1Accent} />
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

        <StageTilt>
        <figure className="lp-stage" data-section="product">
          <div className="lp-feature-frame lp-stage-main">
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
        </StageTilt>

        {CHAPTERS.map((chapter, index) => (
          <Chapter key={chapter.slug} chapter={chapter} index={index} />
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

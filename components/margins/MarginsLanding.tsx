"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { Exhibit } from "@/components/landing/Exhibit";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { MorphHero } from "./MorphHero";
import { ProductFrame } from "@/components/landing/ProductFrames";
import { RunDiagram } from "@/components/landing/RunDiagram";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import { CHAPTERS, HERO, LEDGER, PILOT, type MarginsChapter } from "./content";

function Chapter({ chapter }: { chapter: MarginsChapter }) {
  const titleId = `${chapter.slug}-title`;
  return (
    <section
      className="lp-chapter"
      data-section={chapter.slug}
      aria-labelledby={titleId}
    >
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

function Pilot() {
  return (
    <section className="lp-block" data-section={PILOT.slug} aria-labelledby="pilot-title">
      <p className="lp-eyebrow">{PILOT.kicker}</p>
      <h2 className="lp-h2" id="pilot-title">
        {PILOT.title}
      </h2>
      <p className="lp-block-lede">{PILOT.lede}</p>
      <ol className="lp-outcomes">
        {PILOT.outcomes.map((outcome, i) => (
          <li key={outcome.title}>
            <h3>
              <span className="lp-outcome-n">{String(i + 1).padStart(2, "0")}</span>
              {outcome.title}
            </h3>
            <p>{outcome.body}</p>
          </li>
        ))}
      </ol>
      <div className="lp-unlocks">
        {PILOT.buyers.map((buyer) => (
          <div key={buyer.role}>
            <p className="lp-eyebrow">{buyer.role}</p>
            <p className="lp-body">{buyer.unlock}</p>
          </div>
        ))}
      </div>
      <p className="lp-note">{PILOT.note}</p>
      <a className="lp-feature-cta" href="/margins/pricing">
        See what it costs
      </a>
    </section>
  );
}

export function MarginsLanding() {
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
        <MorphHero onCtaClick={onCtaClick} />

        <div className="lp-seq">
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
          <Pilot />
        </div>

        <LandingClose onOpenChat={openChat} />
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} getSessionId={getSessionId} />
    </div>
  );
}

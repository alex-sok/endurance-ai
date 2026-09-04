"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatOverlay } from "@/components/landing/ChatOverlay";
import { LandingClose } from "@/components/landing/LandingClose";
import { LandingNav } from "@/components/landing/LandingNav";
import { MorphHero } from "./MorphHero";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";
import {
  BAND,
  BEATS,
  CHAMPION,
  CLOSER,
  PILOT,
  REFUSALS,
  type MarginsBeat,
  type MarginsFigure,
} from "./content";

function Receipts({ figures }: { figures: MarginsFigure[] }) {
  return (
    <ul className="lp-receipt">
      {figures.map((figure) => (
        <li key={figure.label}>
          <p className="lp-figure">{figure.value}</p>
          <p className="lp-fine">{figure.label}</p>
        </li>
      ))}
    </ul>
  );
}

// One beat of the Friday. The claim in the reading column, a door into the
// demo view that shows this beat running, the figures that back it, and the
// champion's note hanging in the margin of the first beat, where it is read
// before anyone reaches the pilot.
function Beat({
  beat,
  onCtaClick,
  aside,
}: {
  beat: MarginsBeat;
  onCtaClick: (label: string) => void;
  aside?: { title: string; body: string };
}) {
  const titleId = `${beat.slug}-title`;
  return (
    <section className="lp-chapter" data-section={beat.slug} aria-labelledby={titleId}>
      <div className="lp-chapter-copy">
        <p className="lp-eyebrow">{beat.kicker}</p>
        <h2 id={titleId}>{beat.title}</h2>
        {beat.body.map((paragraph) => (
          <p className="lp-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
        {beat.demo ? (
          <a
            className="lp-feature-cta"
            href={beat.demo.href}
            onClick={() => onCtaClick(beat.demo!.label)}
          >
            {beat.demo.label}
          </a>
        ) : null}
        {beat.receipts ? <Receipts figures={beat.receipts} /> : null}
      </div>
      {aside ? (
        <div className="lp-margin-note">
          <p className="lp-note">
            <strong>{aside.title}</strong> {aside.body}
          </p>
        </div>
      ) : null}
    </section>
  );
}

// The honesty, gathered and placed high. Four refusals in a row read as
// confidence; the same four scattered through the page read as caveats.
function Refusals() {
  return (
    <section className="lp-block" data-section={REFUSALS.slug} aria-labelledby="refusals-title">
      <p className="lp-eyebrow">{REFUSALS.kicker}</p>
      <h2 className="lp-h2" id="refusals-title">
        {REFUSALS.title}
      </h2>
      <ul className="lp-refusals">
        {REFUSALS.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Pilot({ onCtaClick }: { onCtaClick: (label: string) => void }) {
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
      <p className="lp-note">{PILOT.note}</p>
      <div className="lp-hero-actions lp-block-actions">
        <a
          className="lp-btn lp-btn-fill"
          href={PILOT.primary.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onCtaClick(PILOT.primary.label)}
        >
          {PILOT.primary.label}
        </a>
        <a
          className="lp-btn-quiet"
          href={PILOT.secondary.href}
          onClick={() => onCtaClick(PILOT.secondary.label)}
        >
          {PILOT.secondary.label}
        </a>
      </div>
    </section>
  );
}

// The factual footer: what the page rests on, and the door to the long version.
function Band({ onCtaClick }: { onCtaClick: (label: string) => void }) {
  return (
    <section className="lp-block" data-section={BAND.slug} aria-label="The record">
      <ul className="lp-band-figures">
        {BAND.figures.map((figure) => (
          <li key={figure.label}>
            <p className="lp-figure">{figure.value}</p>
            <p className="lp-fine">{figure.label}</p>
          </li>
        ))}
      </ul>
      <p className="lp-band-note lp-colophon">{BAND.note}</p>
      <a
        className="lp-feature-cta"
        href={BAND.cta.href}
        onClick={() => onCtaClick(BAND.cta.label)}
      >
        {BAND.cta.label}
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
          {BEATS.map((beat) => (
            <Beat
              key={beat.slug}
              beat={beat}
              onCtaClick={onCtaClick}
              aside={beat.slug === "sheet" ? CHAMPION : undefined}
            />
          ))}
          <Refusals />
          <section className="lp-interstitial" data-section="closer">
            <p className="lp-closer">{CLOSER}</p>
          </section>
          <Pilot onCtaClick={onCtaClick} />
          <Band onCtaClick={onCtaClick} />
        </div>

        <LandingClose onOpenChat={openChat} />
      </main>

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} getSessionId={getSessionId} />
    </div>
  );
}

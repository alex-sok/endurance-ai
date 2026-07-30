"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LandingNav } from "./LandingNav";
import { LandingHero } from "./LandingHero";
import { LandingTicker } from "./LandingTicker";
import { LandingManifesto } from "./LandingManifesto";
import { LandingDifference } from "./LandingDifference";
import { LandingBrain } from "./LandingBrain";
import { LandingOperations } from "./LandingOperations";
import { LandingProtocol } from "./LandingProtocol";
import { LandingProof } from "./LandingProof";
import { LandingResults } from "./LandingResults";
import { LandingAudit } from "./LandingAudit";
import { LandingWindow } from "./LandingWindow";
import { LandingWho } from "./LandingWho";
import { LandingTeam } from "./LandingTeam";
import { LandingFAQ } from "./LandingFAQ";
import { LandingCTA } from "./LandingCTA";
import { ChatOverlay } from "./ChatOverlay";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";

const TerrainCanvas = dynamic(
  () => import("./TerrainCanvas").then((m) => m.TerrainCanvas),
  { ssr: false }
);

const SECTIONS = [
  "hero",
  "marquee",
  "problem",
  "comparison",
  "core",
  "services",
  "how-we-work",
  "proof",
  "results",
  "why-now",
  "who-we-help",
  "audit",
  "team",
  "faq",
  "cta",
] as const;

export function LandingShell() {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lenisRef = useRef<Lenis | null>(null);

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

  // Smooth scroll — Lenis drives ScrollTrigger via the GSAP ticker.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.15 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Trigger positions are measured from page height, and this page keeps
    // growing after first paint — the WebGL canvas mounts, images decode, the
    // FAQ accordion shifts everything below it. Stale positions mean reveals
    // get skipped entirely and their elements freeze in the start state
    // (translated down, sometimes invisible), which reads as overlapping text.
    // Re-measure whenever the document actually changes size.
    let refreshTimer: number | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    document.fonts?.ready.then(scheduleRefresh).catch(() => {});
    window.addEventListener("load", scheduleRefresh);

    const ro = new ResizeObserver(scheduleRefresh);
    ro.observe(document.body);

    // Fail-safe. Reveals start hidden and translated, so a trigger that never
    // fires leaves copy invisible or sitting on top of its neighbour. Anything
    // well inside the viewport has had its chance: snap it to the final state.
    let sweepQueued = false;
    const sweep = () => {
      sweepQueued = false;
      const limit = window.innerHeight * 0.6;
      const main = document.getElementById("main-content");
      if (!main) return;
      main
        .querySelectorAll<HTMLElement>('[style*="opacity: 0"], [style*="visibility: hidden"]')
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.height > 0 && r.top < limit) {
            gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
          }
        });
    };
    const onScrollSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };
    // Bind to both: Lenis drives normal scrolling, but anchor jumps, keyboard
    // paging and restored scroll positions only surface as a native event.
    lenis.on("scroll", onScrollSweep);
    window.addEventListener("scroll", onScrollSweep, { passive: true });
    const sweepTimer = window.setTimeout(sweep, 1500);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(sweepTimer);
      window.removeEventListener("scroll", onScrollSweep);
      window.removeEventListener("load", scheduleRefresh);
      ro.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze the page behind the chat overlay.
  useEffect(() => {
    if (chatOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [chatOpen]);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -56 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

  // IntersectionObserver — fires onSectionEnter when a section crosses 40% visible
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

    for (const slug of SECTIONS) {
      const el = sectionRefs.current[slug];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [onSectionEnter]);

  function sectionRef(slug: string) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[slug] = el;
    };
  }

  // Middle sections are translucent rather than solid, so the manifold stays
  // visible the whole way down the page. The tint is heavy enough to keep body
  // copy and the dense capability chips legible over a moving field.
  const solid = "relative bg-[#0a0a08]";

  return (
    <div className="theme-abyss relative bg-[#0a0a08] text-bone min-h-svh overflow-x-clip">
      <TerrainCanvas />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-bone focus:text-[#0a0a08] focus:text-sm"
      >
        Skip to content
      </a>

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content" className="relative z-10">
        <div ref={sectionRef("hero")} data-section="hero" className="relative">
          <LandingHero onOpenChat={openChat} onNavigate={scrollToId} />
        </div>

        <div ref={sectionRef("marquee")} data-section="marquee" className={solid}>
          <LandingTicker />
        </div>

        <div ref={sectionRef("problem")} data-section="problem" id="problem" className={solid}>
          <LandingManifesto />
        </div>

        <div ref={sectionRef("comparison")} data-section="comparison" id="difference" className={solid}>
          <LandingDifference />
        </div>

        <div ref={sectionRef("core")} data-section="core" id="core" className={solid}>
          <LandingBrain />
        </div>

        <div ref={sectionRef("services")} data-section="services" id="services" className={solid}>
          <LandingOperations onOpenChat={openChat} />
        </div>

        <div ref={sectionRef("how-we-work")} data-section="how-we-work" id="method" className={solid}>
          <LandingProtocol />
        </div>

        <div ref={sectionRef("proof")} data-section="proof" id="proof" className={solid}>
          <LandingProof onOpenChat={openChat} />
        </div>

        <div ref={sectionRef("results")} data-section="results" id="results" className={solid}>
          <LandingResults onOpenChat={openChat} />
        </div>

        <div ref={sectionRef("why-now")} data-section="why-now" id="window" className={solid}>
          <LandingWindow />
        </div>

        <div ref={sectionRef("who-we-help")} data-section="who-we-help" id="fit" className={solid}>
          <LandingWho />
        </div>

        <div ref={sectionRef("audit")} data-section="audit" id="audit" className={solid}>
          <LandingAudit onCtaClick={onCtaClick} />
        </div>

        <div ref={sectionRef("team")} data-section="team" id="team" className={solid}>
          <LandingTeam />
        </div>

        <div ref={sectionRef("faq")} data-section="faq" id="faq" className={solid}>
          <LandingFAQ onOpenChat={openChat} />
        </div>

        <div ref={sectionRef("cta")} data-section="cta" id="cta" className="relative">
          <LandingCTA onOpenChat={openChat} onCtaClick={onCtaClick} />
        </div>
      </main>

      {/* Edge glow — a cool rim light around the viewport, so the manifold
          reads as lit from the frame rather than floating in flat dark. */}
      <div
        aria-hidden
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 170px rgba(244,243,238,0.07), inset 0 0 55px rgba(244,243,238,0.04), inset 0 0 2px rgba(244,243,238,0.10)",
        }}
      />

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

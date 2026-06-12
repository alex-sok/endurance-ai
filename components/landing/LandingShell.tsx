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
import { LandingOperations } from "./LandingOperations";
import { LandingProtocol } from "./LandingProtocol";
import { LandingProof } from "./LandingProof";
import { LandingWindow } from "./LandingWindow";
import { LandingWho } from "./LandingWho";
import { LandingAudit } from "./LandingAudit";
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
  "services",
  "how-we-work",
  "proof",
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

    // Re-measure pinned sections once webfonts settle.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
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

  // Middle sections sit on solid ground so the fixed terrain only shows
  // through behind the hero and the final CTA.
  const solid = "relative bg-[#0a0a08]";

  return (
    <div className="theme-abyss relative bg-[#0a0a08] text-bone min-h-svh overflow-x-clip">
      <TerrainCanvas />

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main className="relative z-10">
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

        <div ref={sectionRef("services")} data-section="services" id="services" className={solid}>
          <LandingOperations onOpenChat={openChat} />
        </div>

        <div ref={sectionRef("how-we-work")} data-section="how-we-work" id="method" className={solid}>
          <LandingProtocol />
        </div>

        <div ref={sectionRef("proof")} data-section="proof" id="proof" className={solid}>
          <LandingProof onOpenChat={openChat} />
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

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

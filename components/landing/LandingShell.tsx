"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LandingNav } from "./LandingNav";
import { LandingHero } from "./LandingHero";
import { LandingRoots } from "./LandingRoots";
import { LandingProducts } from "./LandingProducts";
import { LandingMethod } from "./LandingMethod";
import { LandingProof } from "./LandingProof";
import { LandingTeam } from "./LandingTeam";
import { LandingFAQ } from "./LandingFAQ";
import { LandingCTA } from "./LandingCTA";
import { ChatOverlay } from "./ChatOverlay";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";

export function LandingShell() {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick, getSessionId } = useSiteAnalytics();

  const lenisRef = useRef<Lenis | null>(null);

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.05 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    const deck = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".lp-slide");
      slides.forEach((slide, i) => {
        const next = slides[i + 1];
        if (!next) return;

        ScrollTrigger.create({
          trigger: slide,
          start: "top top",
          endTrigger: next,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.fromTo(
          slide,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -32,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      deck.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (chatOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [chatOpen]);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

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

      <main id="main-content" className="lp-deck">
        <div className="lp-slide" data-section="hero">
          <LandingHero onOpenChat={openChat} onNavigate={scrollToId} />
        </div>
        <LandingProducts onNavigate={scrollToId} />
        <div className="lp-slide" data-section="research" id="research">
          <LandingRoots />
        </div>
        <div className="lp-slide" data-section="method" id="method">
          <LandingMethod />
        </div>
        <div className="lp-slide" data-section="proof" id="proof">
          <LandingProof />
        </div>
        <div className="lp-slide" data-section="team" id="team">
          <LandingTeam />
        </div>
        <div className="lp-slide" data-section="faq" id="faq">
          <LandingFAQ onOpenChat={openChat} />
        </div>
        <LandingCTA onOpenChat={openChat} onCtaClick={onCtaClick} />
      </main>

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        getSessionId={getSessionId}
      />
    </div>
  );
}

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

const SECTIONS = [
  "hero",
  "work",
  "research",
  "method",
  "proof",
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

    const parallax = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-parallax-root]") ?? el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      parallax.revert();
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
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -64 });
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

  return (
    <div className="theme-paper relative min-h-svh overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content" className="relative">
        <div ref={sectionRef("hero")} data-section="hero">
          <LandingHero onOpenChat={openChat} onNavigate={scrollToId} />
        </div>
        <div ref={sectionRef("work")} data-section="work">
          <LandingProducts onNavigate={scrollToId} />
        </div>
        <div ref={sectionRef("research")} data-section="research">
          <LandingRoots />
        </div>
        <div ref={sectionRef("method")} data-section="method">
          <LandingMethod />
        </div>
        <div ref={sectionRef("proof")} data-section="proof">
          <LandingProof />
        </div>
        <div ref={sectionRef("team")} data-section="team">
          <LandingTeam />
        </div>
        <div ref={sectionRef("faq")} data-section="faq">
          <LandingFAQ onOpenChat={openChat} />
        </div>
        <div ref={sectionRef("cta")} data-section="cta">
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

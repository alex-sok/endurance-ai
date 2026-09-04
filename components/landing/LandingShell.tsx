"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { LandingNav } from "./LandingNav";
import { LandingHero } from "./LandingHero";
import { LandingRoots } from "./LandingRoots";
import { LandingProducts } from "./LandingProducts";
import { LandingTeam } from "./LandingTeam";
import { LandingClose } from "./LandingClose";
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

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const t = window.setTimeout(() => scrollToId(id), 50);
    return () => window.clearTimeout(t);
  }, [scrollToId]);

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-paper)] focus:text-sm"
      >
        Skip to content
      </a>

      <LandingNav onOpenChat={openChat} onNavigate={scrollToId} onCtaClick={onCtaClick} />

      <main id="main-content">
        <LandingHero onOpenChat={openChat} />

        <div className="lp-seq">
          <LandingProducts />
          <LandingRoots />
          <section className="lp-interstitial" data-section="method">
            <p className="lp-closer">
              That is the method. Sit in the operation. Ship the system.
            </p>
          </section>
          <LandingTeam />
        </div>

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

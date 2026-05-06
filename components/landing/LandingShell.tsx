"use client";

import { useState, useEffect, useRef } from "react";
import { LandingHero } from "./LandingHero";
import { LandingProblem } from "./LandingProblem";
import { LandingServices } from "./LandingServices";
import { LandingProof } from "./LandingProof";
import { LandingHowWeWork } from "./LandingHowWeWork";
import { LandingWhoWeHelp } from "./LandingWhoWeHelp";
import { LandingTeam } from "./LandingTeam";
import { LandingCTA } from "./LandingCTA";
import { ChatOverlay } from "./ChatOverlay";
import { useSiteAnalytics } from "@/hooks/useSiteAnalytics";

const SECTIONS = [
  "hero",
  "problem",
  "services",
  "proof",
  "how-we-work",
  "who-we-help",
  "team",
  "cta",
] as const;

export function LandingShell() {
  const [chatOpen, setChatOpen] = useState(false);
  const { onSectionEnter, onChatOpen, onCtaClick } = useSiteAnalytics();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const openChat = () => {
    setChatOpen(true);
    onChatOpen();
  };

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

  return (
    <>
      <div ref={sectionRef("hero")}         data-section="hero">
        <LandingHero onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("problem")}      data-section="problem">
        <LandingProblem onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("services")}     data-section="services">
        <LandingServices onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("proof")}        data-section="proof">
        <LandingProof onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("how-we-work")}  data-section="how-we-work">
        <LandingHowWeWork onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("who-we-help")}  data-section="who-we-help">
        <LandingWhoWeHelp onOpenChat={openChat} />
      </div>
      <div ref={sectionRef("team")}         data-section="team">
        <LandingTeam />
      </div>
      <div ref={sectionRef("cta")}          data-section="cta">
        <LandingCTA onOpenChat={openChat} />
      </div>

      <ChatOverlay
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}

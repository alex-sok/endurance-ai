"use client";

import { useEffect, useState } from "react";
import { CALENDLY_URL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
  onNavigate: (id: string) => void;
  onCtaClick?: (label: string) => void;
}

const LINKS = [
  { id: "services", label: "What we do" },
  { id: "method", label: "Method" },
  { id: "proof", label: "Proof" },
  { id: "audit", label: "The Audit" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
];

export function LandingNav({ onOpenChat, onNavigate, onCtaClick }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,8,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(244,243,238,0.07)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 sm:px-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Endurance AI Labs — top"
          className="shrink-0"
        >
          <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" className="h-3.5 w-auto opacity-90" />
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
              className="text-[10px] uppercase tracking-[0.25em] font-mono text-bone/40 hover:text-bone transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] font-mono text-bone/60 border border-bone/15 hover:text-bone hover:border-bone/40 transition-colors duration-200"
            style={{ borderRadius: 4 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flare opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flare" />
            </span>
            Ask Grace
          </button>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCtaClick?.("nav-book")}
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] font-mono bg-bone text-[#0a0a08] hover:bg-white transition-colors duration-200"
            style={{ borderRadius: 4 }}
          >
            Book a briefing
          </a>
        </div>
      </div>
    </header>
  );
}

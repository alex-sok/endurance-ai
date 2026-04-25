"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Portal, PortalSection } from "@/types/portal";

interface Props {
  portal: Portal;
  sections: PortalSection[];
  activeSection: string | null;
  onSelectSection: (slug: string) => void;
  onOpenChat: () => void;
}

export function PortalNav({ portal, sections, activeSection, onSelectSection, onOpenChat }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 transition-all duration-300"
      // On desktop, nav spans only the main content area (left of chat rail).
      // On mobile, nav spans full width.
      style={{
        left: 0,
        right: 0,
        background: scrolled ? "rgba(18,24,41,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--steel-700)" : "1px solid transparent",
      }}
    >
      {/* Inner container — on desktop, inset from the right by the chat width */}
      <div className="lg:pr-[380px]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Left: Endurance wordmark + client name */}
          <div className="flex items-center gap-3">
            <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" className="h-4 w-auto" />
            <span style={{ color: "var(--steel-700)" }}>×</span>
            <span className="text-sm font-medium" style={{ color: "var(--bone)", fontFamily: "var(--font-figtree)" }}>
              {portal.client_name}
            </span>
          </div>

          {/* Center: Section tabs (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.slug}
                onClick={() => onSelectSection(section.slug)}
                className="relative px-3 py-1.5 text-xs tracking-widest uppercase transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: activeSection === section.slug
                    ? "var(--signal)"
                    : "var(--steel-400)",
                }}
              >
                {section.title}
                {activeSection === section.slug && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 inset-x-3 h-px"
                    style={{ background: "var(--signal)" }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Mobile-only chat toggle. Desktop chat is always visible. */}
          <button
            onClick={onOpenChat}
            className="lg:hidden flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase font-medium transition-all duration-150"
            style={{
              fontFamily: "var(--font-jetbrains)",
              border: "1px solid var(--signal)",
              color: "var(--signal)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(199,167,108,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Mission AI
          </button>

        </div>
      </div>
    </header>
  );
}

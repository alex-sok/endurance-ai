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
        background: scrolled ? "rgba(15,17,21,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      {/* Inner container — on desktop, inset from the right by the chat width */}
      <div className="lg:pr-[380px]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Left: Endurance wordmark + client name */}
          <div className="flex items-center gap-3">
            <span className="text-white text-xs tracking-[0.2em] uppercase">
              Endurance AI Labs
            </span>
            <span className="text-white text-xs">×</span>
            <span className="text-white text-sm font-medium tracking-wide">
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
                  color: activeSection === section.slug
                    ? portal.accent_color
                    : "rgba(255,255,255,0.4)",
                }}
              >
                {section.title}
                {activeSection === section.slug && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 inset-x-3 h-px"
                    style={{ background: portal.accent_color }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Mobile-only chat toggle. Desktop chat is always visible. */}
          <button
            onClick={onOpenChat}
            className="lg:hidden flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-150"
            style={{
              border: `1px solid ${portal.accent_color}40`,
              color: portal.accent_color,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${portal.accent_color}12`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${portal.accent_color}80`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${portal.accent_color}40`;
            }}
          >
            Mission AI
          </button>

        </div>
      </div>
    </header>
  );
}

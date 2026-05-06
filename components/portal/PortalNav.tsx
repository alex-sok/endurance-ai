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
      style={{
        left: 0, right: 0,
        background: scrolled ? "rgba(247,247,244,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e6e5e0" : "1px solid transparent",
      }}
    >
      <div className="lg:pr-[380px]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Left: wordmark + client */}
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-endurance.svg"
              alt="Endurance AI Labs"
              className="block w-auto"
              style={{ height: "13px", position: "relative", top: "-1px" }}
            />
            <span className="text-xs select-none" style={{ color: "#cdcdc9", lineHeight: 1, position: "relative", top: "1px" }}>×</span>
            <span className="text-sm font-medium" style={{ color: "#262510", lineHeight: 1, position: "relative", top: "1px" }}>
              {portal.client_name}
            </span>
          </div>

          {/* Center: section tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.slug}
                onClick={() => onSelectSection(section.slug)}
                className="relative px-3 py-1.5 text-xs uppercase tracking-widest transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: activeSection === section.slug ? "#262510" : "#4a4940",
                }}
              >
                {section.title}
                {activeSection === section.slug && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 inset-x-3 h-px"
                    style={{ background: "#262510" }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: mobile chat toggle */}
          <button
            onClick={onOpenChat}
            className="lg:hidden flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-widest font-medium transition-all duration-150 text-[#262510] hover:bg-[#e6e5e0]"
            style={{
              fontFamily: "var(--font-jetbrains)",
              border: "1px solid #cdcdc9",
              borderRadius: "4px",
            }}
          >
            Ask Grace
          </button>

        </div>
      </div>
    </header>
  );
}

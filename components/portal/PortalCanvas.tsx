"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Portal, PortalSection } from "@/types/portal";
import { SectionContent } from "./SectionContent";

interface Props {
  portal: Portal;
  sections: PortalSection[];
  activeSection: string | null;
  onSelectSection: (slug: string) => void;
}

export function PortalCanvas({ portal, sections, activeSection, onSelectSection }: Props) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to section when selected from nav
  useEffect(() => {
    if (!activeSection) return;
    const el = sectionRefs.current[activeSection];
    if (el) {
      const offset = 80; // nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeSection]);

  return (
    <section className="relative">
      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {sections.map((section, index) => (
        <div
          key={section.slug}
          ref={(el) => { sectionRefs.current[section.slug] = el; }}
          id={`section-${section.slug}`}
        >
          <SectionPanel
            section={section}
            portal={portal}
            index={index}
            isActive={activeSection === section.slug}
            onSelect={() => onSelectSection(section.slug)}
          />
        </div>
      ))}
    </section>
  );
}

// ── Individual section panel ──────────────────────────────────────────────────

interface PanelProps {
  section: PortalSection;
  portal: Portal;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function SectionPanel({ section, portal, index, isActive, onSelect }: PanelProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-[280px_1fr] gap-12">

        {/* Left: section label */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] text-white/20 uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-white/08" />
          </div>
          <h2
            className="text-2xl font-semibold tracking-tight cursor-pointer transition-colors duration-150"
            style={{ color: isActive ? portal.accent_color : "rgba(255,255,255,0.85)" }}
            onClick={onSelect}
          >
            {section.title}
          </h2>
          {typeof section.content?.summary === "string" && (
            <p className="text-sm text-white/35 leading-relaxed tracking-wide">
              {section.content.summary as string}
            </p>
          )}
        </div>

        {/* Right: section content */}
        <div className="relative">
          <SectionContent section={section} portal={portal} />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

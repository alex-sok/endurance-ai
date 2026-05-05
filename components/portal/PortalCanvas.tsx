"use client";

import { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (!activeSection) return;
    const el = sectionRefs.current[activeSection];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeSection]);

  return (
    <section className="relative">
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

interface PanelProps {
  section: PortalSection;
  portal: Portal;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function SectionPanel({ section, portal, index, isActive, onSelect }: PanelProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">

      {/* Section header */}
      <div className="mb-12">
        <span
          className="block text-xs tracking-[0.3em] uppercase font-medium mb-3"
          style={{ color: `${portal.accent_color}70` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-end gap-6">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight cursor-pointer transition-colors duration-200 leading-none"
            style={{ color: isActive ? portal.accent_color : "#262510" }}
            onClick={onSelect}
          >
            {section.title}
          </h2>
          <div className="h-px flex-1 mb-1.5 bg-[#e6e5e0]" />
        </div>
      </div>

      {/* Content */}
      <div>
        <SectionContent section={section} portal={portal} />
      </div>

      {/* Bottom divider */}
      <div className="mt-20 md:mt-28 h-px bg-gradient-to-r from-transparent via-[#e6e5e0] to-transparent" />
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import type { Portal, PortalSection } from "@/types/portal";
import { PortalNav } from "./PortalNav";
import { PortalHero } from "./PortalHero";
import { PortalCanvas } from "./PortalCanvas";
import { PortalChat } from "./PortalChat";
import { usePortalAnalytics } from "@/hooks/usePortalAnalytics";

interface Props {
  portal: Portal;
  sections: PortalSection[];
}

export function PortalShell({ portal, sections }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  usePortalAnalytics(portal.slug, activeSection);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f7f7f4",
        fontFamily: "var(--font-figtree)",
        color: "#262510",
        // Portal accent is set once here and cascades to all children via CSS
        // inheritance. Components reference var(--portal-accent) instead of
        // receiving portal.accent_color as a prop.
        "--portal-accent": portal.accent_color,
      } as React.CSSProperties}
    >

      <PortalNav
        portal={portal}
        sections={sections}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenChat={() => setMobileOpen(true)}
      />

      <div className="lg:pr-[380px]">
        <PortalHero
          portal={portal}
          sections={sections}
          onSelectSection={(slug) => setActiveSection(slug)}
          onOpenChat={() => setMobileOpen(true)}
        />
        <div ref={canvasRef}>
          <PortalCanvas
            portal={portal}
            sections={sections}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />
        </div>
      </div>

      <PortalChat
        portal={portal}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
    </div>
  );
}

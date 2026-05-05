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
    <div className="min-h-screen text-[var(--bone)]" style={{ background: "var(--ink)", fontFamily: "var(--font-figtree)" }}>

      {/* ── Top navigation bar ─────────────────────────────────────────────── */}
      <PortalNav
        portal={portal}
        sections={sections}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenChat={() => setMobileOpen(true)}
      />

      {/* ── Main content — right-padded on desktop to clear the chat rail ──── */}
      <div className="lg:pr-[380px]">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <PortalHero
          portal={portal}
          sections={sections}
          onSelectSection={(slug) => setActiveSection(slug)}
          onOpenChat={() => setMobileOpen(true)}
        />

        {/* ── Visual Canvas ────────────────────────────────────────────────── */}
        <div ref={canvasRef}>
          <PortalCanvas
            portal={portal}
            sections={sections}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />
        </div>

      </div>

      {/* ── Chat — always visible on desktop, toggled on mobile ────────────── */}
      <PortalChat
        portal={portal}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import type { Portal, PortalSection } from "@/types/portal";
import { PortalNav } from "./PortalNav";
import { PortalHero } from "./PortalHero";
import { PortalCanvas } from "./PortalCanvas";
import { PortalChat } from "./PortalChat";

interface Props {
  portal: Portal;
  sections: PortalSection[];
}

export function PortalShell({ portal, sections }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // mobileOpen controls the chat on small screens only.
  // On desktop (lg+) the chat panel is always visible via CSS.
  const [mobileOpen, setMobileOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white" style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}>

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

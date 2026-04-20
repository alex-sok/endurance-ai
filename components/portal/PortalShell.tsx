"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [chatOpen, setChatOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scroll to canvas when a section is selected
  useEffect(() => {
    if (activeSection && canvasRef.current) {
      canvasRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#0F1115] text-white" style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}>

      {/* ── Top navigation bar ─────────────────────────────────────────────── */}
      <PortalNav
        portal={portal}
        sections={sections}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <PortalHero
        portal={portal}
        sections={sections}
        onSelectSection={(slug) => {
          setActiveSection(slug);
        }}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* ── Visual Canvas ──────────────────────────────────────────────────── */}
      <div ref={canvasRef}>
        <PortalCanvas
          portal={portal}
          sections={sections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>

      {/* ── Chat Drawer ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <PortalChat
            portal={portal}
            onClose={() => setChatOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Floating chat button ───────────────────────────────────────────── */}
      {!chatOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium tracking-wide text-white transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${portal.accent_color}22, ${portal.accent_color}11)`,
            border: `1px solid ${portal.accent_color}40`,
            boxShadow: `0 0 24px ${portal.accent_color}20`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 32px ${portal.accent_color}40`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${portal.accent_color}80`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${portal.accent_color}20`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${portal.accent_color}40`;
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: portal.accent_color }} />
          Ask our AI
        </motion.button>
      )}
    </div>
  );
}

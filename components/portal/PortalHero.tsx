"use client";

import { motion } from "framer-motion";
import type { Portal, PortalSection } from "@/types/portal";

interface Props {
  portal: Portal;
  sections: PortalSection[];
  onSelectSection: (slug: string) => void;
  onOpenChat: () => void;
}

export function PortalHero({ portal, sections, onSelectSection, onOpenChat }: Props) {
  return (
    <section className="relative flex flex-col px-6 pt-20 pb-0 overflow-hidden" style={{ height: "100svh", minHeight: "700px" }}>

      {/* Deep glow — top center, more visible */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${portal.accent_color}22 0%, ${portal.accent_color}08 35%, transparent 70%)`,
          filter: "blur(1px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center flex-1 justify-center pb-8">

        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            border: `1px solid ${portal.accent_color}30`,
            background: `${portal.accent_color}08`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: portal.accent_color }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: portal.accent_color }}>
            Mission Briefing
          </span>
        </motion.div>

        {/* Client name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4"
        >
          {portal.client_name}
        </motion.p>

        {/* Hero title — split treatment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-semibold tracking-tight leading-[0.95] text-white">
            {portal.hero_title ?? "Your Mission Briefing"}
          </h1>
        </motion.div>

        {/* Tagline + divider */}
        {portal.tagline && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="h-px w-8 bg-white/10" />
            <p className="text-white/45 text-sm tracking-[0.15em] uppercase">{portal.tagline}</p>
            <div className="h-px w-8 bg-white/10" />
          </motion.div>
        )}

        {/* Body */}
        {portal.hero_body && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-sm text-white/35 leading-relaxed tracking-wide mb-8"
          >
            {portal.hero_body}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={() => sections[0] && onSelectSection(sections[0].slug)}
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase text-[#0f1115] transition-all duration-200"
            style={{ background: portal.accent_color }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px ${portal.accent_color}55`;
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
          >
            Explore the Briefing →
          </button>
          <button
            onClick={onOpenChat}
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "white";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            Ask our AI
          </button>
        </motion.div>
      </div>

      {/* ── Section grid — flush to bottom ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Top border line */}
        <div className="h-px bg-white/[0.08] mb-0" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {sections.map((section, i) => (
            <button
              key={section.slug}
              onClick={() => onSelectSection(section.slug)}
              className="group relative text-left px-5 py-8 transition-all duration-200"
              style={{ borderRight: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${portal.accent_color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {/* Hover top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: portal.accent_color }}
              />
              <span
                className="block text-[10px] tracking-[0.25em] uppercase mb-3 transition-colors duration-200"
                style={{ color: `${portal.accent_color}60` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block text-sm font-medium tracking-wide leading-snug text-white/45 group-hover:text-white/85 transition-colors duration-200">
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

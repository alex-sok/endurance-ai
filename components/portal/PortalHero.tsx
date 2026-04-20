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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${portal.accent_color}08 0%, transparent 70%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-white/10" />
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: portal.accent_color }}
          >
            Mission Briefing
          </span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        {/* Client name */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-sm tracking-[0.2em] uppercase mb-3"
        >
          {portal.client_name}
        </motion.p>

        {/* Hero title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.1]"
        >
          {portal.hero_title ?? "Your Mission Briefing"}
        </motion.h1>

        {/* Tagline */}
        {portal.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-white/50 tracking-wide mb-4"
          >
            {portal.tagline}
          </motion.p>
        )}

        {/* Hero body */}
        {portal.hero_body && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-sm text-white/40 leading-relaxed tracking-wide mb-12"
          >
            {portal.hero_body}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => sections[0] && onSelectSection(sections[0].slug)}
            className="px-7 py-3 rounded-full text-sm font-medium tracking-widest uppercase text-[#0f1115] transition-all duration-200"
            style={{ background: portal.accent_color }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 32px ${portal.accent_color}50`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Explore the Briefing →
          </button>
          <button
            onClick={onOpenChat}
            className="px-7 py-3 rounded-full text-sm font-medium tracking-widest uppercase text-white/70 transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "white";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Ask our AI
          </button>
        </motion.div>

        {/* Section nav grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto"
        >
          {sections.map((section, i) => (
            <button
              key={section.slug}
              onClick={() => onSelectSection(section.slug)}
              className="group relative text-left px-4 py-4 rounded-xl border border-white/[0.07] bg-white/[0.02] transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <span className="block text-xs tracking-[0.2em] uppercase text-white/25 mb-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-150">
                {section.title}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}

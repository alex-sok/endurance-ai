"use client";

import { motion } from "framer-motion";
import type { Portal, PortalSection } from "@/types/portal";
import { PortalHeroGeometry } from "./PortalHeroGeometry";

interface Props {
  portal: Portal;
  sections: PortalSection[];
  onSelectSection: (slug: string) => void;
  onOpenChat: () => void;
}

export function PortalHero({ portal, sections, onSelectSection, onOpenChat }: Props) {
  return (
    <section
      className="relative flex flex-col px-6 overflow-hidden"
      style={{ paddingTop: "calc(56px + 48px)", paddingBottom: 0, background: "#f7f7f4" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* Rotating icosahedron wireframe */}
      <PortalHeroGeometry />

      {/* Accent color wash */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--portal-accent) 8%, transparent) 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center pb-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-1.5 mb-6"
          style={{ border: "1px solid #e6e5e0", borderRadius: "4px", background: "#f7f7f4" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--portal-accent)" }} />
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
          >
            Mission Briefing
          </span>
        </motion.div>

        {/* Client name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.3em] mb-4 text-[#7a7974]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {portal.client_name}
        </motion.p>

        {/* Hero title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-[#262510]"
            style={{ letterSpacing: "-1.5px" }}
          >
            {portal.hero_title ?? portal.client_name}
          </h1>
        </motion.div>

        {/* Tagline */}
        {portal.tagline && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="h-px w-8 bg-[#e6e5e0]" />
            <p className="text-sm tracking-[0.15em] uppercase text-[#7a7974]">{portal.tagline}</p>
            <div className="h-px w-8 bg-[#e6e5e0]" />
          </motion.div>
        )}

        {/* Body */}
        {portal.hero_body && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-sm leading-relaxed mb-8 text-[#7a7974]"
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
            className="px-6 py-2.5 text-sm font-medium text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150"
            style={{ borderRadius: "4px" }}
          >
            Explore the Briefing →
          </button>
          <button
            onClick={onOpenChat}
            className="lg:hidden px-6 py-2.5 text-sm font-medium transition-all duration-150"
            style={{
              border: "1px solid color-mix(in srgb, var(--portal-accent) 60%, transparent)",
              borderRadius: "4px",
              color: "var(--portal-accent)",
            }}
          >
            Ask our AI
          </button>
        </motion.div>
      </div>

      {/* Section nav grid flush to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        <div className="h-px bg-[#e6e5e0]" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {sections.map((section, i) => (
            <button
              key={section.slug}
              onClick={() => onSelectSection(section.slug)}
              className="group relative text-left px-5 py-6 transition-all duration-200 hover:bg-[#e6e5e0]/50"
              style={{ borderRight: i < sections.length - 1 ? "1px solid #e6e5e0" : "none" }}
            >
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "var(--portal-accent)" }}
              />
              <span
                className="block text-[10px] tracking-[0.25em] uppercase mb-2 text-[#cdcdc9]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block text-sm font-medium text-[#7a7974] group-hover:text-[#262510] transition-colors duration-200">
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

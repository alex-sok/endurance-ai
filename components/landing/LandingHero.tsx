"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";
import { PortalHeroGeometry } from "@/components/portal/PortalHeroGeometry";

interface Props {
  onOpenChat: () => void;
}

export function LandingHero({ onOpenChat }: Props) {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh", background: "#080d17" }}
    >
      {/* Dot grid — very faint architectural texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Vertical column lines — suggestion of architecture */}
      {[18, 36, 55, 73, 91].map((pct) => (
        <div
          key={pct}
          className="absolute inset-y-0 w-px pointer-events-none"
          style={{ left: `${pct}%`, background: "rgba(255,255,255,0.022)" }}
        />
      ))}

      {/* Rotating icosahedron wireframe */}
      <PortalHeroGeometry color="rgba(148,163,184,0.9)" opacity={0.55} />

      {/* Blue light bloom — breathing, right-center (like the photo) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 68% 48%, rgba(59,130,246,0.09) 0%, rgba(29,78,216,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Darker vignette on the left — pushes eye to center/right, text on left is clear */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.35), transparent)" }}
      />

      {/* Floor line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 w-full py-28 md:py-36">

        {/* Logo + eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" className="h-4 w-auto opacity-70" />
          <div className="h-px w-6" style={{ background: "rgba(255,255,255,0.15)" }} />
          <MonoLabel style={{ color: "rgba(247,247,244,0.4)" }}>AI Execution</MonoLabel>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold leading-[1.0] mb-8"
          style={{
            fontSize: "clamp(52px, 8vw, 112px)",
            letterSpacing: "clamp(-1.5px, -0.03em, -3.5px)",
            color: "#f7f7f4",
            maxWidth: "900px",
          }}
        >
          Execute the initiative that cannot afford to fail.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.17, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base leading-relaxed mb-12 max-w-md"
          style={{ color: "rgba(247,247,244,0.48)" }}
        >
          Operator-led AI execution for leaders with serious outcomes at stake.
          Strategy through deployment. One small, senior team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Btn variant="light" onClick={onOpenChat}>
            Begin Mission Briefing →
          </Btn>
          <Btn variant="ghost-light" as="a" href="#services">
            See how we work ↓
          </Btn>
        </motion.div>

        {/* Fortune 500 credibility signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-xs"
          style={{ color: "rgba(247,247,244,0.28)", fontFamily: "var(--font-jetbrains)", letterSpacing: "0.12em" }}
        >
          Active engagements with Fortune 500 enterprises. Built for the mid-market.
        </motion.p>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080d17)" }}
      />
    </section>
  );
}

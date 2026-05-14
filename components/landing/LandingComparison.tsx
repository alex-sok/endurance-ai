"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";

const rows = [
  {
    old: "6-month discovery phase",
    ours: "Audit delivered in one week",
  },
  {
    old: "Dozens in the room, none who ship",
    ours: "3 senior operators, end-to-end",
  },
  {
    old: "Recommendations deck",
    ours: "Working system in production",
  },
  {
    old: "Hourly billing, open retainer",
    ours: "Fixed scope, flat fee",
  },
  {
    old: "Avoids regulated industries",
    ours: "Built for them",
  },
  {
    old: "Generalist consultants",
    ours: "AI engineers who ship",
  },
];

export function LandingComparison() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#09101e" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Purple glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "55%",
          height: "80%",
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <MonoLabel className="block mb-4" style={{ color: "rgba(247,247,244,0.4)" }}>
            The Difference
          </MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "#f7f7f4", letterSpacing: "-0.5px" }}
          >
            The old model versus ours.
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Column headers */}
          <div
            className="grid grid-cols-2 mb-2 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(247,247,244,0.25)", fontFamily: "var(--font-jetbrains)" }}
            >
              The old model
            </div>
            <div
              className="text-xs uppercase tracking-widest pl-6 sm:pl-10"
              style={{ color: "#7c3aed", fontFamily: "var(--font-jetbrains)" }}
            >
              Endurance
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="grid grid-cols-2 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Old way */}
              <div className="flex items-start gap-3 pr-4 sm:pr-8">
                <span
                  className="flex-shrink-0 mt-0.5 text-xs font-mono"
                  style={{ color: "rgba(247,247,244,0.18)" }}
                >
                  ✕
                </span>
                <span
                  className="text-sm leading-snug"
                  style={{
                    color: "rgba(247,247,244,0.28)",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(247,247,244,0.12)",
                  }}
                >
                  {row.old}
                </span>
              </div>

              {/* Our way */}
              <div className="flex items-start gap-3 pl-6 sm:pl-10" style={{ borderLeft: "1px solid rgba(124,58,237,0.25)" }}>
                <span
                  className="flex-shrink-0 mt-0.5 text-xs"
                  style={{ color: "#7c3aed" }}
                >
                  →
                </span>
                <span
                  className="text-sm font-medium leading-snug"
                  style={{ color: "#f7f7f4" }}
                >
                  {row.ours}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

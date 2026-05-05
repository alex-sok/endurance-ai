"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

const phases = [
  {
    n: "01",
    name: "Strategic Recon",
    goal: "Find where AI creates meaningful leverage.",
    body: "Understanding the real situation: goals, friction points, technology stack, data landscape, constraints, and previous attempts.",
  },
  {
    n: "02",
    name: "Mission Definition",
    goal: "Move from vague ambition to a clear, executable path.",
    body: "Selecting priority opportunities, defining success criteria, clarifying scope, sequencing the work, and identifying architecture needs.",
  },
  {
    n: "03",
    name: "Rapid Deployment",
    goal: "Visible operational progress.",
    body: "Building and deploying initial systems: prototypes, data pipelines, automations, AI-assisted workflows, orchestration logic, integrations.",
  },
  {
    n: "04",
    name: "Embedding",
    goal: "Durable execution. Not a demo.",
    body: "Making the system work inside the organization: workflow refinement, training, governance, monitoring, feedback loops, and adoption support.",
  },
  {
    n: "05",
    name: "Capability Transfer",
    goal: "Capability, not dependency.",
    body: "Internal enablement, documentation, operating rhythms, ownership transition, and roadmap extension so the work sustains itself.",
  },
];

interface Props {
  onOpenChat: () => void;
}

export function LandingHowWeWork({ onOpenChat }: Props) {
  return (
    <section id="how-we-work" className="py-24 md:py-32" style={{ background: "#f0efe9" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <MonoLabel className="block mb-4">How We Work</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px", maxWidth: "480px" }}
          >
            Five phases. Real outcomes.
          </h2>
        </motion.div>

        {/* Phases — vertical timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="relative"
        >
          {/* Vertical connector line */}
          <div
            className="absolute left-[18px] top-8 bottom-8 w-px hidden sm:block"
            style={{ background: "#e6e5e0" }}
          />

          <div className="space-y-0">
            {phases.map((p, i) => (
              <motion.div
                key={p.n}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="relative flex gap-6 sm:gap-10 py-8"
                style={{ borderBottom: i < phases.length - 1 ? "1px solid #e6e5e0" : "none" }}
              >
                {/* Phase number — sits on the connector line */}
                <div className="flex-shrink-0 w-9 flex flex-col items-center">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: "#f0efe9",
                      border: "1px solid #e6e5e0",
                      borderRadius: "4px",
                    }}
                  >
                    <MonoLabel>{p.n}</MonoLabel>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                    <h3
                      className="text-base font-semibold text-ink"
                      style={{ letterSpacing: "-0.2px" }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="text-xs mt-1 sm:mt-0"
                      style={{
                        color: "#7c3aed",
                        fontFamily: "var(--font-jetbrains)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Goal: {p.goal}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-ash">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12"
        >
          <Btn onClick={onOpenChat}>Begin Mission Briefing →</Btn>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

const services = [
  {
    n: "01",
    title: "AI Strategy & Leadership",
    body: "Practical AI roadmaps tied directly to business outcomes. Identifying leverage points, prioritizing high-impact opportunities, defining operating models, and establishing governance.",
  },
  {
    n: "02",
    title: "Automation & Workflow Transformation",
    body: "Systems that eliminate bottlenecks and improve throughput. Workflow automation, document-heavy processes, customer operations, internal knowledge systems, decision-support.",
  },
  {
    n: "03",
    title: "Architecture & Operating Layer",
    body: "Infrastructure for AI systems to work reliably inside real organizations. Data integration, retrieval, orchestration, model selection, safety, and iteration loops.",
  },
  {
    n: "04",
    title: "Internal Capability Building",
    body: "Building the internal capability to sustain the work. Leadership education, team design, governance structures, internal playbooks, and tooling.",
  },
  {
    n: "05",
    title: "Initiative Recovery",
    body: "Diagnosing and relaunching stalled or failed AI efforts. Root cause analysis, identifying salvageable assets, resetting scope, and relaunching with a realistic execution path.",
  },
];

interface Props {
  onOpenChat: () => void;
}

export function LandingServices({ onOpenChat }: Props) {
  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "#f7f7f4" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <MonoLabel className="block mb-4">What We Do</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px", maxWidth: "520px" }}
          >
            Five areas of work. One goal: execution.
          </h2>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid #e6e5e0", borderLeft: "1px solid #e6e5e0" }}
        >
          {services.map((s) => (
            <motion.div
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="group p-8 relative transition-colors duration-200 hover:bg-[#e6e5e0]/40"
              style={{ borderRight: "1px solid #e6e5e0", borderBottom: "1px solid #e6e5e0" }}
            >
              {/* Accent top bar on hover */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "#f54e00" }}
              />

              <MonoLabel className="block mb-4">{s.n}</MonoLabel>
              <h3
                className="text-base font-semibold text-ink mb-3"
                style={{ letterSpacing: "-0.2px" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-ash">
                {s.body}
              </p>
            </motion.div>
          ))}

          {/* Empty filler cell to complete the grid on desktop (5 items, 3-col = 2 rows) */}
          <div
            className="hidden lg:block"
            style={{ borderRight: "1px solid #e6e5e0", borderBottom: "1px solid #e6e5e0" }}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <Btn onClick={onOpenChat}>Begin Mission Briefing →</Btn>
        </motion.div>

      </div>
    </section>
  );
}

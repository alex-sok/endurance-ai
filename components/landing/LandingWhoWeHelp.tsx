"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

const segments = [
  {
    title: "Professional Services",
    body: "Law firms, wealth managers, accounting firms, and consulting firms looking for workflow leverage, knowledge systems, and AI-enabled service delivery without losing the client relationship.",
  },
  {
    title: "Mid-Market Operating Companies",
    body: "Organizations modernizing operations, eliminating friction, and improving scalability — often with disconnected data and limited internal AI capability to draw from.",
  },
  {
    title: "Venture-Backed Companies",
    body: "Founders and product teams building AI-enabled products or navigating build-versus-buy decisions. Speed matters. So does not creating long-term technical debt.",
  },
  {
    title: "Large Enterprises",
    body: "Complex transformation efforts that require focused outside execution capability — situations where stakeholder complexity and organizational pace make internal-only approaches fail.",
  },
];

interface Props {
  onOpenChat: () => void;
}

export function LandingWhoWeHelp({ onOpenChat }: Props) {
  return (
    <section className="py-24 md:py-32" style={{ background: "#f7f7f4" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <MonoLabel className="block mb-4">Who We Help</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px" }}
          >
            We work with leaders. Not committees.
          </h2>
        </motion.div>

        {/* Segments — 2×2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-0 mb-14"
          style={{ border: "1px solid #e6e5e0" }}
        >
          {segments.map((s, i) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="p-8 group relative transition-colors duration-200 hover:bg-[#e6e5e0]/40"
              style={{
                borderRight: i % 2 === 0 ? "1px solid #e6e5e0" : "none",
                borderBottom: i < 2 ? "1px solid #e6e5e0" : "none",
              }}
            >
              <h3
                className="text-sm font-semibold text-ink mb-3"
                style={{ letterSpacing: "-0.1px" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-ash">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Not a fit — honest signal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 pl-5"
          style={{ borderLeft: "2px solid #e6e5e0" }}
        >
          <MonoLabel className="block mb-2">Not a fit for</MonoLabel>
          <p className="text-sm leading-relaxed text-muted-ash max-w-xl">
            Generic AI experimentation. The lowest-cost vendor. Software shopping.
            Organizations without executive sponsorship or those not prepared to move
            once a direction is chosen. We work best with leaders who are serious about outcomes.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Btn onClick={onOpenChat}>Begin Mission Briefing →</Btn>
        </motion.div>

      </div>
    </section>
  );
}

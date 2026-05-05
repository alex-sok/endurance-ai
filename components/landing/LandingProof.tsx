"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

const cases = [
  {
    stat: "9 months",
    result: "→ 3 days",
    body: "A software startup had been wrestling with a critical problem for nine months. We fixed it in three days, enabling them to go to market faster and secure more deals.",
  },
  {
    stat: "$5B",
    result: "distribution business",
    body: "A major distribution company needed to streamline operations as tariffs eroded their margins. We supported a mission-critical objective that protected their bottom line.",
  },
  {
    stat: "1 year",
    result: "→ 2 weeks",
    body: "A massive e-commerce group had been tinkering with a new feature for over a year, going nowhere fast. We rearchitected the solution from the ground up and shipped in under two weeks.",
  },
];

interface Props {
  onOpenChat: () => void;
}

export function LandingProof({ onOpenChat }: Props) {
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
          <MonoLabel className="block mb-4">The Work</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px" }}
          >
            Results, not presentations.
          </h2>
        </motion.div>

        {/* Horizontal rule */}
        <div className="h-px bg-[#e6e5e0] mb-0" />

        {/* Cases — 3-col on desktop, stacked on mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderBottom: "1px solid #e6e5e0" }}
        >
          {cases.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="py-10 md:py-12 px-0 md:px-8 first:md:pl-0 last:md:pr-0"
              style={{
                borderRight: i < cases.length - 1 ? "1px solid #e6e5e0" : "none",
                borderBottom: "1px solid transparent", // visual rhythm on mobile
              }}
            >
              {/* Stat */}
              <div className="mb-5">
                <p
                  className="font-semibold leading-none mb-1 text-muted-ash"
                  style={{ fontSize: "clamp(13px, 2vw, 15px)", fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}
                >
                  {c.stat}
                </p>
                <p
                  className="font-semibold leading-none text-ink"
                  style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px" }}
                >
                  {c.result}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e6e5e0] mb-5" />

              {/* Body */}
              <p className="text-sm leading-relaxed text-muted-ash">
                {c.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Confidentiality note + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-jetbrains)" }}>
            Engagements are confidential. Details shared under NDA.
          </p>
          <Btn onClick={onOpenChat}>Begin Mission Briefing →</Btn>
        </motion.div>

      </div>
    </section>
  );
}

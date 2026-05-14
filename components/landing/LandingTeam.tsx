"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";

export function LandingTeam() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#f0efe9" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <MonoLabel className="block mb-4">The Team</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px" }}
          >
            Built by operators.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
          style={{ borderLeft: "2px solid #e6e5e0", paddingLeft: "20px" }}
        >
          <p className="text-base leading-relaxed text-muted-ash">
            Endurance AI Labs is led by <span className="text-ink font-medium">Alex Sok</span>,{" "}
            <span className="text-ink font-medium">Sid Bhambhani</span>, and{" "}
            <span className="text-ink font-medium">Nick Maxwell</span>. Our backgrounds span AI
            engineering, enterprise architecture, product design, and operational execution across
            regulated, high-growth, and complex environments.
          </p>
          <p className="text-base leading-relaxed text-muted-ash mt-4">
            Sid co-founded Summatti, an AI company acquired by PartnerHero, and brings over 20
            years of technology leadership. Nick was a founding engineer at TALA, acquired by
            Intuit, and holds a Computer Science degree from Cornell.
          </p>
          <p className="text-base leading-relaxed text-muted-ash mt-4">
            We are operators. Built to execute in environments where the initiative is too
            important to drift.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

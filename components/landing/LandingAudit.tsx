"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const auditIncludes = [
  "We look at what you're doing and what you're not",
  "We identify where AI generates real ROI, and where it's a waste of money",
  "You walk away with a prioritized roadmap",
  "Whether you work with us afterward or not",
];

export function LandingAudit({ onOpenChat }: Props) {
  return (
    <section className="py-24 md:py-32" style={{ background: "#080d17" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl"
        >
          <MonoLabel className="block mb-4" style={{ color: "rgba(247,247,244,0.4)" }}>Start Here</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "#f7f7f4", letterSpacing: "-0.5px" }}
          >
            AI doesn't have to be open heart surgery.
          </h2>
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-base leading-relaxed max-w-3xl mb-14"
          style={{ color: "rgba(247,247,244,0.55)" }}
        >
          A dominant misconception paralyzes capable leadership teams: that AI deployment requires a massive enterprise transformation. Months of planning. Millions in investment. Everything disrupted at once. This belief is false, and it costs real money. AI can be as simple as a walk after dinner. Small. Low-risk. High-value. Something you do this week.
        </motion.p>

        {/* Card + aside */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Audit card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl p-8 flex-shrink-0 w-full lg:max-w-md"
            style={{ background: "#f7f7f4", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Card header */}
            <div className="mb-6">
              <MonoLabel className="block mb-4">The AI Audit</MonoLabel>
              <p
                className="font-semibold text-ink leading-none mb-1"
                style={{ fontSize: "clamp(40px, 6vw, 60px)", letterSpacing: "-1.5px" }}
              >
                $999
              </p>
              <p className="text-sm text-muted-ash">Flat fee. One engagement. No retainer.</p>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: "#e6e5e0" }} />

            {/* Bullets */}
            <ul className="space-y-3 mb-6">
              {auditIncludes.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-muted-ash leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Note */}
            <p
              className="text-xs mb-6"
              style={{ color: "#a8a89e", fontFamily: "var(--font-jetbrains)" }}
            >
              Most companies spending on AI without this are guessing.
            </p>

            {/* CTA */}
            <Btn onClick={onOpenChat} className="w-full justify-center">
              Book an AI Audit →
            </Btn>
          </motion.div>

          {/* Aside text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm leading-relaxed lg:pt-4"
            style={{ color: "rgba(247,247,244,0.35)", fontFamily: "var(--font-jetbrains)", letterSpacing: "0.02em" }}
          >
            Not ready for a full engagement. This is how most of ours start.
          </motion.p>

        </div>
      </div>
    </section>
  );
}

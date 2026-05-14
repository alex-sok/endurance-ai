"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";

const bullets = [
  "Your AI initiative has stalled. Smart people are experimenting. Nothing is in production.",
  "You've spent money on consultants. They delivered a deck. Not a system.",
  "You have a board deadline. You're six months out. Nothing is shipped.",
  "You're watching competitors move faster and you don't know why.",
  "You're in a regulated industry. Every AI vendor you've talked to doesn't understand that.",
  "You believe AI is important. You just haven't found anyone who can actually execute it.",
];

export function LandingIsThisYou() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <MonoLabel style={{ color: "rgba(247,247,244,0.4)" }}>Sound Familiar</MonoLabel>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-semibold mb-12"
            style={{ color: "#f7f7f4", letterSpacing: "-0.5px" }}
          >
            If any of this is you, we should talk.
          </motion.h2>

          {/* Bullets */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-col gap-4"
          >
            {bullets.map((text, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex gap-4 items-start pl-4"
                style={{ borderLeft: "2px solid #7c3aed" }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(247,247,244,0.7)" }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

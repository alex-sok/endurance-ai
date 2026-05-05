"use client";

import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";

const failures = [
  "Organizational inertia.",
  "Weak data foundations.",
  "No clear ownership.",
  "Tool-first thinking.",
  "Poor change management.",
  "Lack of internal capability.",
];

interface Props {
  onOpenChat: () => void;
}

export function LandingProblem({ onOpenChat }: Props) {
  return (
    <section style={{ background: "#262510" }} className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl">

          {/* Opening statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-semibold leading-snug mb-10"
            style={{ color: "#f7f7f4", letterSpacing: "-0.4px" }}
          >
            Most AI transformations fail for predictable reasons.
          </motion.p>

          {/* Failure list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="mb-12 space-y-0"
          >
            {failures.map((f) => (
              <motion.p
                key={f}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-base md:text-lg py-3 border-b"
                style={{
                  color: "rgba(247,247,244,0.55)",
                  borderColor: "rgba(247,247,244,0.06)",
                }}
              >
                {f}
              </motion.p>
            ))}
          </motion.div>

          {/* Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-lg md:text-xl font-medium mb-2"
              style={{ color: "rgba(247,247,244,0.9)", letterSpacing: "-0.2px" }}
            >
              These are execution problems. Not technology problems.
            </p>
            <p
              className="text-base mb-10"
              style={{ color: "rgba(247,247,244,0.45)" }}
            >
              Endurance was built to close the gap between ambition and execution.
            </p>

            <Btn variant="signal" onClick={onOpenChat}>
              Begin Mission Briefing →
            </Btn>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

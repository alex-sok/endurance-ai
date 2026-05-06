"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { MonoLabel } from "@/components/ui/MonoLabel";

const failures = [
  {
    title: "Organizational inertia.",
    body: "Teams default to familiar workflows. Without a forcing function, adoption stalls before it starts.",
  },
  {
    title: "Weak data foundations.",
    body: "AI is only as good as the data feeding it. Fragmented systems and dirty data make even strong models useless.",
  },
  {
    title: "No clear ownership.",
    body: "When AI is everyone's job, it's no one's job. Initiatives drift without a single accountable driver.",
  },
  {
    title: "Tool-first thinking.",
    body: "Buying software is not a strategy. Deploying tools without redesigning the workflow around them changes nothing.",
  },
  {
    title: "Poor change management.",
    body: "The technical build is the easy part. Getting people to actually change how they work is where most initiatives die.",
  },
  {
    title: "Lack of internal capability.",
    body: "External vendors deliver and leave. Without building internal knowledge, organizations can't maintain or scale what was built.",
  },
];

interface Props {
  onOpenChat: () => void;
}

export function LandingProblem({ onOpenChat }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#f7f7f4" }} className="py-24 md:py-32">
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
            <MonoLabel>The Problem</MonoLabel>
          </motion.div>

          {/* Opening statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-semibold leading-snug mb-12 text-ink"
            style={{ letterSpacing: "-0.4px" }}
          >
            Most AI transformations fail for predictable reasons.
          </motion.p>

          {/* Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.055 } },
            }}
            className="mb-12"
          >
            {failures.map((f, i) => (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="border-b border-surface"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <span className="text-base md:text-lg text-muted-ash group-hover:text-ink transition-colors duration-150">
                    {f.title}
                  </span>
                  <span
                    className="flex-shrink-0 w-4 h-4 flex items-center justify-center transition-transform duration-200"
                    style={{
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                      color: "#cdcdc9",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="text-sm text-muted-ash leading-relaxed pb-4 max-w-xl">
                        {f.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-lg md:text-xl font-semibold text-ink mb-2"
              style={{ letterSpacing: "-0.2px" }}
            >
              These are execution problems. Not technology problems.
            </p>
            <p className="text-base text-muted-ash mb-10">
              Endurance was built to close the gap between ambition and execution.
            </p>

            <Btn onClick={onOpenChat}>
              Begin Mission Briefing →
            </Btn>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

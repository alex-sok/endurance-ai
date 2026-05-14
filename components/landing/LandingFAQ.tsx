"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

const faqs = [
  {
    q: "How long does a typical engagement take?",
    a: "Depends on scope. The AI Audit is one engagement: a prioritized roadmap within a week. The Embedded AI Engineer tiers run 2 weeks, 2 months, or 6 months. We scope work into defined deliverables, not open-ended retainers.",
  },
  {
    q: "What size companies do you work with?",
    a: "Our sweet spot is the mid-market, companies doing $10M to $500M in revenue, but we work across the full range from venture-backed startups to Fortune 500 enterprises. The common thread is leadership that's serious about outcomes and prepared to move.",
  },
  {
    q: "How are you different from a Big 4 consulting firm?",
    a: "Big 4 firms produce recommendations. We produce systems. Their model is analysis and advisory, delivered by large teams, with implementation handled separately. Ours is a small senior team that does both: strategy and build, in the same engagement. We're also faster by an order of magnitude and don't require six-month discovery phases.",
  },
  {
    q: "We already have an internal AI team. Can you still help?",
    a: "Yes, and some of our most productive engagements are alongside internal teams, not instead of them. We're useful for initiatives that have stalled, architectural decisions that need an outside perspective, or situations where speed matters more than the team has capacity for.",
  },
  {
    q: "What does 'embedded' actually mean?",
    a: "It means working inside your organization: in your Slack, your standups, your codebase. Not at arm's length producing deliverables. The work moves faster because we're not waiting on weekly status calls to understand what's changed.",
  },
  {
    q: "We're in a regulated industry. Does that change what you can do?",
    a: "No. We've built production AI systems inside pharmaceuticals, financial services, healthcare, and insurance. Regulated environments require deliberation, not bravado. We build within compliance constraints without sacrificing the outcome.",
  },
  {
    q: "What if we're not sure we're ready for a full engagement?",
    a: "That's exactly what the AI Audit is for. $999 flat fee. We look at your operations, your data, and your goals, and give you a prioritized roadmap. You walk away with clarity, whether you work with us afterward or not.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-scope engagements at flat fees. No hourly billing, no open-ended retainers unless you want them. The AI Audit is $999. Embedded AI Engineer engagements range from $19K to $179K depending on scope and timeline. We price the scope. We deliver it.",
  },
];

export function LandingFAQ({ onOpenChat }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32" style={{ background: "#f7f7f4" }}>
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
            <MonoLabel>Questions</MonoLabel>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-semibold text-ink mb-12"
            style={{ letterSpacing: "-0.5px" }}
          >
            Answered before you have to ask.
          </motion.h2>

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
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
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
                    {faq.q}
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
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <p className="text-base text-muted-ash">Still have questions?</p>
            <Btn onClick={onOpenChat} variant="outline">
              Ask Grace →
            </Btn>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

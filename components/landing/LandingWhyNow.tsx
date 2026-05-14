"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";

export function LandingWhyNow() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#f0efe9" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl"
        >
          <MonoLabel className="block mb-4">Why Now</MonoLabel>
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink"
            style={{ letterSpacing: "-0.5px" }}
          >
            The window is open. For about 18 months.
          </h2>
        </motion.div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 space-y-5"
        >
          <p className="text-base leading-relaxed text-muted-ash">
            OpenAI announced a $4 billion fund for AI implementation, partnering with Bain, McKinsey, and Goldman Sachs. Anthropic announced $2.5 billion for the same purpose. For the next 12 to 18 months, every frontier lab will focus almost entirely on Fortune 500. The mid-market, companies doing $10M to $500M in revenue, will be mostly left to figure it out on their own.
          </p>
          <p className="text-base leading-relaxed text-muted-ash">
            That is our market. We are building in it now, with the experience, tools, and reputation to serve it well. Before the big players arrive and triple the price.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl"
        >
          {[
            {
              figure: "$4B",
              label: "OpenAI implementation fund",
              sub: "Partnering with Bain, McKinsey & Goldman",
            },
            {
              figure: "$2.5B",
              label: "Anthropic implementation fund",
              sub: "Same directive. Fortune 500 focus.",
            },
          ].map((stat) => (
            <motion.div
              key={stat.figure}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="bg-white rounded-lg p-6"
              style={{ border: "1px solid #e6e5e0" }}
            >
              <p
                className="font-semibold text-ink mb-1"
                style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-1px", lineHeight: 1 }}
              >
                {stat.figure}
              </p>
              <p className="text-sm font-medium text-ink mb-1">{stat.label}</p>
              <p className="text-xs text-muted-ash">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg font-semibold text-ink max-w-3xl"
          style={{ letterSpacing: "-0.2px" }}
        >
          Organizations that move in the next 18 months will build a compounding advantage their competitors cannot close. The ones that wait will pay three times the price to the same firms.
        </motion.p>

      </div>
    </section>
  );
}

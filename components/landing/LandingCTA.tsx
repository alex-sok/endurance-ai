"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Btn } from "@/components/ui/Btn";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/conversation-flows";

interface Props {
  onOpenChat: () => void;
}

export function LandingCTA({ onOpenChat }: Props) {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "#f7f7f4", borderTop: "1px solid #e6e5e0" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <MonoLabel className="block mb-6">Ready?</MonoLabel>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6"
            style={{ letterSpacing: "-1px", lineHeight: 1.0 }}
          >
            Brief us on a mission.
          </h2>

          <p className="text-base leading-relaxed text-muted-ash mb-10 max-w-md">
            The first conversation is a mission briefing, not a sales call. Tell us what you're
            trying to accomplish. We'll tell you if we're the right fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Btn onClick={onOpenChat}>
              Begin Mission Briefing →
            </Btn>
            <Btn variant="signal" as="a" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Call
            </Btn>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <div
        className="max-w-6xl mx-auto px-6 sm:px-10 mt-24 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ borderTop: "1px solid #e6e5e0" }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo-endurance.svg" alt="Endurance AI Labs" className="h-4 w-auto opacity-60" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xs text-muted-ash hover:text-ink transition-colors"
            style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.08em" }}
          >
            {CONTACT_EMAIL}
          </a>
          <MonoLabel className="hidden sm:block" style={{ color: "#cdcdc9" }}>·</MonoLabel>
          <MonoLabel style={{ color: "#cdcdc9" }}>
            © {new Date().getFullYear()} Endurance AI Labs
          </MonoLabel>
        </div>
      </div>
    </section>
  );
}

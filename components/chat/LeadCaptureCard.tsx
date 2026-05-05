"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LeadCaptureCardProps {
  onSubmit: (name: string, email: string, company: string) => void;
  onSkip: () => void;
}

export function LeadCaptureCard({ onSubmit, onSkip }: LeadCaptureCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    await onSubmit(name.trim(), email.trim(), company.trim());
    setSubmitted(true);
    setLoading(false);
  }

  // Auto-dismiss after confirmation
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => onSkip(), 1800);
    return () => clearTimeout(t);
  }, [submitted, onSkip]);

  const inputClass = "w-full bg-[#0c0c0b] border border-[#1f2228] rounded-[24px] px-4 py-2.5 text-sm text-white placeholder:text-[#7d8187] focus:outline-none focus:shadow-[rgb(113,113,122)_0px_0px_0px_2px] transition-all duration-150";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-start"
      >
        <div
          className="max-w-[85%] sm:max-w-[75%] px-5 py-4"
          style={{ background: "#1f2228", border: "1px solid #474747" }}
        >
          <p className="text-white text-sm font-normal" style={{ letterSpacing: "-0.025em" }}>
            Got it. Now, how can we help?
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex justify-start"
    >
      <div
        className="w-full max-w-[85%] sm:max-w-[75%] px-5 py-4"
        style={{ background: "#1f2228", border: "1px solid #474747" }}
      >
        <p className="text-white text-sm font-normal mb-1" style={{ letterSpacing: "-0.025em" }}>
          Before we begin — who are we speaking with?
        </p>
        <p className="text-[#7d8187] text-xs tracking-wide mb-4">
          We&apos;ll use this to follow up if it&apos;s a fit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading || !name.trim() || !email.trim()}
              className="px-5 py-2 text-xs tracking-widest uppercase font-medium text-[#0c0c0b] bg-white hover:bg-[#e5e7eb] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderRadius: "9999px", fontFamily: "var(--font-jetbrains)" }}
            >
              {loading ? "Sending…" : "Send →"}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-[#7d8187] hover:text-white tracking-wide transition-colors duration-150"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

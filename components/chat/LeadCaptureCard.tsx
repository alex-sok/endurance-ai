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

  // Auto-dismiss after showing the confirmation briefly
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => onSkip(), 1800);
    return () => clearTimeout(t);
  }, [submitted, onSkip]);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-start"
      >
        <div className="max-w-[85%] sm:max-w-[75%] bg-[#0d1525] border border-[#5b8dee]/30 rounded-xl px-5 py-4">
          <p className="text-white text-sm font-medium tracking-wide">
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
      <div className="w-full max-w-[85%] sm:max-w-[75%] bg-[#0d1525] border border-[#5b8dee]/30 rounded-xl px-5 py-4">
        <p className="text-white text-sm font-medium tracking-wide mb-1">
          Before we begin — who are we speaking with?
        </p>
        <p className="text-white/40 text-xs tracking-wide mb-4">
          We'll use this to follow up if it's a fit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[#111a2e] border border-[#2a3a55] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#5b8dee]/60 transition-colors duration-150"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#111a2e] border border-[#2a3a55] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#5b8dee]/60 transition-colors duration-150"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-[#111a2e] border border-[#2a3a55] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#5b8dee]/60 transition-colors duration-150"
          />

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading || !name.trim() || !email.trim()}
              className="px-4 py-2 text-xs tracking-widest uppercase bg-[#5b8dee] text-[#0f1115] font-medium rounded-full hover:bg-[#7aa9f5] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send →"}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-white/30 hover:text-white/60 tracking-wide transition-colors duration-150"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

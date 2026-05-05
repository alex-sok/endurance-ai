"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LeadCaptureCardProps {
  onSubmit: (name: string, email: string, company: string) => void;
  onSkip: () => void;
}

export function LeadCaptureCard({ onSubmit, onSkip }: LeadCaptureCardProps) {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [company,   setCompany]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    await onSubmit(name.trim(), email.trim(), company.trim());
    setSubmitted(true);
    setLoading(false);
  }

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => onSkip(), 1800);
    return () => clearTimeout(t);
  }, [submitted, onSkip]);

  const inputClass = "w-full bg-transparent border-b border-[#cdcdc9] px-0 py-2 text-sm text-[#262510] placeholder:text-[#7a7974] focus:outline-none focus:border-[#262510] transition-colors duration-150";

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
          className="max-w-[85%] sm:max-w-[75%] px-4 py-3"
          style={{ background: "#e6e5e0", border: "1px solid #cdcdc9", borderRadius: "4px" }}
        >
          <p className="text-sm text-[#262510]">Got it. Now, how can we help?</p>
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
        style={{ background: "#e6e5e0", border: "1px solid #cdcdc9", borderRadius: "4px" }}
      >
        <p className="text-sm text-[#262510] font-medium mb-0.5">
          Before we begin. Who are we speaking with?
        </p>
        <p className="text-xs text-[#7a7974] mb-4">
          We&apos;ll follow up if it&apos;s a fit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text"    placeholder="Name"    value={name}    onChange={(e) => setName(e.target.value)}    required className={inputClass} />
          <input type="email"   placeholder="Email"   value={email}   onChange={(e) => setEmail(e.target.value)}   required className={inputClass} />
          <input type="text"    placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)}          className={inputClass} />

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading || !name.trim() || !email.trim()}
              className="px-4 py-2 text-xs uppercase tracking-widest text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderRadius: "4px" }}
            >
              {loading ? "Sending…" : "Send →"}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-[#7a7974] hover:text-[#262510] tracking-wide transition-colors duration-150"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

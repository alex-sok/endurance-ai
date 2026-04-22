"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  slug: string;
}

export function PortalPasswordGate({ slug }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`/api/portal/${slug}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Cookie is set — reload to show the portal
        window.location.reload();
      } else {
        setError(true);
        setPassword("");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col items-center justify-center px-6" style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(91,141,238,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Wordmark */}
        <p className="text-white/25 text-xs tracking-[0.3em] uppercase text-center mb-10">
          Endurance AI Labs
        </p>

        {/* Card */}
        <div
          className="rounded-2xl px-8 py-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h1 className="text-xl font-semibold text-white tracking-tight mb-1">
            Private Briefing
          </h1>
          <p className="text-sm text-white/35 tracking-wide mb-8">
            Enter your access code to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Access code"
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: error
                    ? "1px solid rgba(239,68,68,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  caretColor: "#5b8dee",
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "rgba(91,141,238,0.5)";
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-red-400/80 tracking-wide"
                >
                  Incorrect access code. Try again.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password.trim() || loading}
              className="w-full py-3 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-150 disabled:opacity-30"
              style={{
                background: "#5b8dee",
                color: "#0f1115",
              }}
            >
              {loading ? "Verifying…" : "Enter →"}
            </button>
          </form>
        </div>

        <p className="text-white/15 text-xs tracking-wide text-center mt-6">
          Contact <a href="mailto:hello@endurancelabs.ai" className="hover:text-white/40 transition-colors">hello@endurancelabs.ai</a> for access.
        </p>
      </motion.div>
    </div>
  );
}

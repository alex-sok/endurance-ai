"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  slug: string;
}

export function PortalPasswordGate({ slug }: Props) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/portal/${slug}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });

      if (res.ok) {
        window.location.reload();
      } else if (res.status === 401) {
        setError("Incorrect access code. Try again.");
        setPassword("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "#0c0c0b",
    border: "1px solid #1f2228",
    borderRadius: "24px",
    color: "#ffffff",
    caretColor: "#2563eb",
  } as const;

  const inputFocusStyle = { border: "1px solid #2563eb" };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#0c0c0b", fontFamily: "var(--font-figtree)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Wordmark */}
        <div className="flex justify-center mb-10">
          <img src="/logo-endurance-white.svg" alt="Endurance AI Labs" className="h-4 w-auto opacity-40" />
        </div>

        {/* Card */}
        <div style={{ background: "#1f2228", border: "1px solid #474747" }} className="px-8 py-10">
          <h1
            className="text-xl font-semibold text-white mb-1"
            style={{ letterSpacing: "-0.025em" }}
          >
            Private Briefing
          </h1>
          <p className="text-sm mb-8" style={{ color: "#7d8187" }}>
            Identify yourself and enter your access code to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 text-sm placeholder:text-[#474747] outline-none transition-all duration-150"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
              onBlur={(e)  => Object.assign(e.currentTarget.style, { border: "1px solid #1f2228" })}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="Your email"
              required
              autoFocus
              className="w-full px-4 py-3 text-sm placeholder:text-[#474747] outline-none transition-all duration-150"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
              onBlur={(e)  => Object.assign(e.currentTarget.style, { border: "1px solid #1f2228" })}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              placeholder="Access code"
              required
              className="w-full px-4 py-3 text-sm placeholder:text-[#474747] outline-none transition-all duration-150"
              style={error ? { ...inputStyle, border: "1px solid rgba(239,68,68,0.6)" } : inputStyle}
              onFocus={(e) => { if (!error) Object.assign(e.currentTarget.style, inputFocusStyle); }}
              onBlur={(e)  => { if (!error) Object.assign(e.currentTarget.style, { border: "1px solid #1f2228" }); }}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400/80"
              >
                {error}
              </motion.p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!email.trim() || !password.trim() || loading}
                className="w-full py-3 text-sm font-medium text-[#0c0c0b] bg-white hover:bg-[#e5e7eb] transition-colors duration-150 disabled:opacity-30"
                style={{ borderRadius: "9999px", letterSpacing: "-0.025em" }}
              >
                {loading ? "Verifying…" : "Enter →"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: "#474747" }}>
          Need access?{" "}
          <a
            href="mailto:hello@endurancelabs.ai"
            className="hover:text-white transition-colors"
          >
            hello@endurancelabs.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}

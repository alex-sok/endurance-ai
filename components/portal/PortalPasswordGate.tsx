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

  const inputClass = "w-full bg-transparent border-b border-[#cdcdc9] px-0 py-2.5 text-sm text-[#262510] placeholder:text-[#7a7974] focus:outline-none focus:border-[#262510] transition-colors duration-150";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#f7f7f4", fontFamily: "var(--font-figtree)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Wordmark */}
        <div className="flex justify-center mb-10">
          <img src="/logo-endurance.svg" alt="Endurance AI Labs" className="h-4 w-auto opacity-50" />
        </div>

        {/* Card */}
        <div
          className="px-8 py-10"
          style={{ background: "#f7f7f4", border: "1px solid #e6e5e0", borderRadius: "4px", boxShadow: "rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 4px 16px -4px" }}
        >
          <h1 className="text-xl font-semibold text-[#262510] mb-1" style={{ letterSpacing: "-0.35px" }}>
            Private Briefing
          </h1>
          <p className="text-sm mb-8 text-[#7a7974]">
            Identify yourself and enter your access code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className={inputClass}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="Your email"
              required
              autoFocus
              className={inputClass}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              placeholder="Access code"
              required
              className={error ? inputClass.replace("border-[#cdcdc9]", "border-red-400") : inputClass}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {error}
              </motion.p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!email.trim() || !password.trim() || loading}
                className="w-full py-2.5 text-sm font-medium text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150 disabled:opacity-30"
                style={{ borderRadius: "4px" }}
              >
                {loading ? "Verifying…" : "Enter →"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-center mt-6 text-[#cdcdc9]">
          Need access?{" "}
          <a href="mailto:hello@endurancelabs.ai" className="text-[#7a7974] hover:text-[#262510] transition-colors">
            hello@endurancelabs.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}

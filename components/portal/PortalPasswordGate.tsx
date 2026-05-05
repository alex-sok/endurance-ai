"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { UnderlineField } from "@/components/ui/UnderlineField";

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
          style={{
            background: "#f7f7f4",
            border: "1px solid #e6e5e0",
            borderRadius: "4px",
            boxShadow: "rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 4px 16px -4px",
          }}
        >
          <h1 className="text-xl font-semibold text-ink mb-1" style={{ letterSpacing: "-0.35px" }}>
            Private Briefing
          </h1>
          <p className="text-sm mb-8 text-muted-ash">
            Identify yourself and enter your access code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <UnderlineField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
            />
            <UnderlineField
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="Your email"
              required
              autoFocus
            />
            <UnderlineField
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              placeholder="Access code"
              required
              error={error ?? undefined}
            />

            <div className="pt-2">
              <Btn
                type="submit"
                disabled={!email.trim() || !password.trim() || loading}
                className="w-full py-2.5"
              >
                {loading ? "Verifying…" : "Enter →"}
              </Btn>
            </div>
          </form>
        </div>

        <p className="text-xs text-center mt-6 text-subtle">
          Need access?{" "}
          <a href="mailto:hello@endurancelabs.ai" className="text-muted-ash hover:text-ink transition-colors">
            hello@endurancelabs.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}

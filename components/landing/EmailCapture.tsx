"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead-capture",
          name: name.trim(),
          email: email.trim(),
          company: "",
          messages: [],
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try emailing us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="px-6 py-5 max-w-sm border border-bone/15"
        style={{ borderRadius: 4 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-flare mb-2">
          Got it.
        </p>
        <p className="text-sm text-bone/70 leading-relaxed">
          We’ll be in touch. If your initiative is urgent, book a briefing
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <p className="text-sm text-bone/45 mb-5 leading-relaxed">
        Not ready to book? Leave your email and we’ll reach out when the timing
        is right.
      </p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-bone/20 px-0 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-flare transition-colors duration-200"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border-b border-bone/20 px-0 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-flare transition-colors duration-200"
        />
      </div>

      {error && <p className="text-xs text-flare mt-3">{error}</p>}

      <button
        type="submit"
        disabled={loading || !email.trim()}
        className="mt-6 px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] font-mono text-bone/70 border border-bone/20 hover:text-bone hover:border-bone/50 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderRadius: 4 }}
      >
        {loading ? "Sending…" : "Stay in touch →"}
      </button>
    </form>
  );
}

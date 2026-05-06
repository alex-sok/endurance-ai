"use client";

import { useState } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";

export function EmailCapture() {
  const [email, setEmail]     = useState("");
  const [name, setName]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

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
        className="px-5 py-4 max-w-sm"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px", background: "#f0efe9" }}
      >
        <MonoLabel className="block mb-1">Got it.</MonoLabel>
        <p className="text-sm text-[#262510]">
          We'll be in touch. If your initiative is urgent, book a briefing directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <p className="text-sm text-[#7a7974] mb-4">
        Not ready to book? Leave your email and we'll reach out when the timing is right.
      </p>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-[#cdcdc9] px-0 py-2 text-sm text-[#262510] placeholder:text-[#7a7974] focus:outline-none focus:border-[#262510] transition-colors duration-150"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border-b border-[#cdcdc9] px-0 py-2 text-sm text-[#262510] placeholder:text-[#7a7974] focus:outline-none focus:border-[#262510] transition-colors duration-150"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !email.trim()}
        className="mt-4 px-4 py-2 text-xs uppercase tracking-widest text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ borderRadius: "4px", fontFamily: "var(--font-jetbrains)" }}
      >
        {loading ? "Sending…" : "Stay in touch →"}
      </button>
    </form>
  );
}

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
      <div className="lp-form">
        <p>Got it. We will be in touch. If the work is urgent, book a call.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lp-form">
      <p>Not ready to talk? Leave a note and we will follow up.</p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error ? <p className="lp-form-error">{error}</p> : null}
      <button
        type="submit"
        className="lp-btn lp-btn-line"
        disabled={loading || !email.trim()}
      >
        {loading ? "Sending…" : "Stay in touch"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          company: company.trim(),
          website: "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="wl-done" role="status">
        <p className="wl-done-head">You&rsquo;re on the list.</p>
        <p className="wl-done-sub">
          We open seats in small groups, and we&rsquo;ll reach out at{" "}
          <b>{email.trim()}</b> when yours is ready.
        </p>
      </div>
    );
  }

  return (
    <form className="wl-form" onSubmit={handleSubmit}>
      <label className="wl-field">
        <span>Work email</span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className="wl-row">
        <label className="wl-field">
          <span>Name</span>
          <input
            type="text"
            autoComplete="name"
            placeholder="Optional"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="wl-field">
          <span>Company</span>
          <input
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="lp-feature-cta wl-submit" disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
      {state === "error" ? (
        <p className="wl-error" role="alert">
          That didn&rsquo;t go through. Try again, or email us directly.
        </p>
      ) : null}
      <p className="wl-note">
        Stored securely. Never shared, never sold — your data stays yours.
      </p>
    </form>
  );
}

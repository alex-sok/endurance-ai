"use client";

import { useState, type FormEvent } from "react";

interface AccessFormProps {
  from?: string;
  configError?: boolean;
}

export function AccessForm({ from, configError }: AccessFormProps) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    configError
      ? "This page isn't fully configured yet. Try again in a moment."
      : null,
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/investments/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const dest =
          from && from.startsWith("/investments") ? from : "/investments";
        window.location.assign(dest);
        return;
      }

      if (res.status === 503) {
        setError(
          "This page isn't fully configured yet. Try again in a moment.",
        );
      } else {
        setError("That phrase didn't unlock the page. Try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="inv-access__form" onSubmit={onSubmit} noValidate>
      <label className="inv-access__field">
        <span className="inv-mono inv-access__label">Access phrase</span>
        <input
          className="inv-access__input"
          type="password"
          name="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "inv-access-error" : undefined}
        />
      </label>
      <button
        type="submit"
        className="inv-cta inv-access__submit"
        disabled={submitting || password.length === 0}
      >
        {submitting ? "Verifying…" : "Unlock →"}
      </button>
      {error ? (
        <p
          id="inv-access-error"
          role="alert"
          className="inv-mono inv-access__error"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

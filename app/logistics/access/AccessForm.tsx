"use client";

import { useState, type FormEvent } from "react";

interface AccessFormProps {
  from?: string;
  configError?: boolean;
}

/**
 * Client-side form that POSTs the password to /api/logistics/access.
 *
 * Behavior:
 * - On success: redirects to `from` (the page the user was trying to
 *   reach) or `/logistics`.
 * - On 401: shows a single generic error message; does not echo the
 *   submitted password back.
 * - On 503: shows a "configuration" error — env var missing on the
 *   server. This is the same case the middleware redirects with
 *   ?err=config, so we surface it on initial load too.
 *
 * The submit button stays disabled while a request is in flight to
 * keep things calm and to prevent double-submits.
 */
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
      const res = await fetch("/api/logistics/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const dest =
          from && from.startsWith("/logistics") ? from : "/logistics";
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
    <form className="logi-access__form" onSubmit={onSubmit} noValidate>
      <label className="logi-access__field">
        <span className="logi-mono logi-access__label">Access phrase</span>
        <input
          className="logi-access__input"
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
          aria-describedby={error ? "logi-access-error" : undefined}
        />
      </label>
      <button
        type="submit"
        className="logi-cta logi-access__submit"
        disabled={submitting || password.length === 0}
      >
        {submitting ? "Verifying…" : "Unlock →"}
      </button>
      {error ? (
        <p
          id="logi-access-error"
          role="alert"
          className="logi-mono logi-access__error"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

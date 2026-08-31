"use client";

import { useState, type FormEvent } from "react";

interface AccessFormProps {
  from?: string;
  configError?: boolean;
}

/**
 * Client-side form that POSTs the password to /api/copperline/access.
 *
 * On success it redirects to `from` (the page the visitor was trying to reach)
 * or to /copperline. On 401 it shows one generic message and never echoes the
 * submitted phrase back. On 503 it reports a configuration problem — the same
 * case the middleware redirects with ?err=config, surfaced on first load too.
 *
 * `from` is checked against the /copperline prefix before use so a crafted
 * link cannot turn this form into an open redirect.
 */
export function AccessForm({ from, configError }: AccessFormProps) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    configError ? "This page isn't fully configured yet. Try again in a moment." : null,
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/copperline/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const dest = from && from.startsWith("/copperline") ? from : "/copperline";
        window.location.assign(dest);
        return;
      }

      if (res.status === 503) {
        setError("This page isn't fully configured yet. Try again in a moment.");
      } else {
        setError("That phrase didn't unlock the demo. Try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label className="cl-access__field">
        <span className="cl-access__label">Access phrase</span>
        <input
          className="cl-access__input"
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
          aria-describedby={error ? "cl-access-error" : undefined}
        />
      </label>
      <button
        type="submit"
        className="cl-access__submit"
        disabled={submitting || password.length === 0}
      >
        {submitting ? "Verifying…" : "Open the demo →"}
      </button>
      {error ? (
        <p id="cl-access-error" role="alert" className="cl-access__error">
          {error}
        </p>
      ) : null}
    </form>
  );
}

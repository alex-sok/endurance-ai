"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function ProposalAccess({ slug }: { slug: string }) {
  const [code, setCode] = useState(""),
    [pending, setPending] = useState(false),
    [error, setError] = useState("");
  const router = useRouter();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f9f8f3",
        color: "#213840",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <form
        style={{ maxWidth: 420, width: "100%" }}
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setError("");
          try {
            const r = await fetch(`/api/proposals/${slug}/auth`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
            });
            if (!r.ok) {
              setError(await r.text());
              return;
            }
            router.refresh();
          } catch {
            setError("Could not connect. Please try again.");
          } finally {
            setPending(false);
          }
        }}
      >
        <Image
          src="/logo-endurance.svg"
          alt="Endurance"
          width={180}
          height={26}
          unoptimized
        />
        <p
          style={{
            fontSize: 11,
            letterSpacing: ".16em",
            marginTop: 55,
            color: "#4665bc",
          }}
        >
          YOUR MISSION BRIEFING
        </p>
        <h1
          style={{
            fontSize: 42,
            lineHeight: 1.1,
            letterSpacing: "-.04em",
            margin: "20px 0",
          }}
        >
          A clearer next step.
        </h1>
        <p style={{ lineHeight: 1.6, marginBottom: 30 }}>
          Enter the access code your Endurance team shared with you.
        </p>
        <label style={{ fontSize: 13 }}>
          Access code
          <input
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              border: "1px solid #cbd2cd",
              padding: 14,
              borderRadius: 6,
              margin: "8px 0 18px",
            }}
            required
            minLength={8}
            maxLength={100}
          />
        </label>
        <button
          disabled={pending}
          style={{
            background: "#4665bc",
            color: "white",
            width: "100%",
            padding: 14,
            borderRadius: 6,
          }}
        >
          {pending ? "Opening…" : "Open your briefing ↗"}
        </button>
        {error && (
          <p role="alert" style={{ color: "#9d342d", marginTop: 15 }}>
            {error}
          </p>
        )}
        <p style={{ fontSize: 12, marginTop: 30 }}>
          Need a hand?{" "}
          <a href="mailto:hello@endurancelabs.ai">hello@endurancelabs.ai</a>
        </p>
      </form>
    </main>
  );
}

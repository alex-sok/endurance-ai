"use client";

import { useState } from "react";
import { Btn } from "@/components/ui/Btn";
import { UnderlineField } from "@/components/ui/UnderlineField";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error ?? "Invalid password");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UnderlineField
        label="Admin Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        error={error}
        autoFocus
      />
      <Btn type="submit" disabled={loading || !password} className="w-full py-2.5">
        {loading ? "Authenticating…" : "Access Mission Control →"}
      </Btn>
    </form>
  );
}

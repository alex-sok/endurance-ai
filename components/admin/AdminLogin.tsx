"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
          Admin Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#5b8dee] transition-colors"
          placeholder="Enter password"
          autoFocus
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full bg-[#5b8dee] hover:bg-[#4a7de0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors"
      >
        {loading ? "Authenticating..." : "Access Mission Control"}
      </button>
    </form>
  );
}

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
        <label
          className="block text-xs font-semibold tracking-[0.25em] uppercase mb-2"
          style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
        >
          Admin Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent px-0 py-2.5 text-sm text-[#262510] placeholder:text-[#cdcdc9] focus:outline-none transition-colors duration-150"
          style={{
            borderBottom: "1px solid #cdcdc9",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#262510")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#cdcdc9")}
          placeholder="Enter password"
          autoFocus
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-2.5 text-sm font-medium text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150 disabled:opacity-30"
          style={{ borderRadius: "4px" }}
        >
          {loading ? "Authenticating…" : "Access Mission Control →"}
        </button>
      </div>
    </form>
  );
}

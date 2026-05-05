"use client";

import { useState } from "react";

interface PortalResult {
  ok: boolean;
  portal_url: string;
  slug: string;
  password: string;
  sync: {
    chunks_found?: number;
    chunks_embedded?: number;
    note?: string;
    error?: string;
  } | null;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-1">
        {label}
      </label>
      {hint && <p className="text-white/25 text-xs mb-2">{hint}</p>}
      {children}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs text-[#5b8dee] hover:text-white transition-colors ml-3"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function AdminDashboard() {
  const [form, setForm] = useState({
    slug: "",
    client_name: "",
    password: "",
    hero_title: "",
    hero_body: "",
    notion_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PortalResult | null>(null);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch("/api/admin/portals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    setResult(data);
    setLoading(false);
    setForm({ slug: "", client_name: "", password: "", hero_title: "", hero_body: "", notion_url: "" });
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#5b8dee] transition-colors";

  return (
    <div className="space-y-8">

      {/* Analytics link */}
      <a
        href="/admin/analytics"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/5"
        style={{ border: "1px solid #1f2228" }}
      >
        <div>
          <p className="text-sm text-white font-medium" style={{ letterSpacing: "-0.025em" }}>Portal Analytics</p>
          <p className="text-xs mt-0.5" style={{ color: "#7d8187" }}>Visitor sessions, time on portal, sections viewed</p>
        </div>
        <span className="text-xs" style={{ color: "#7d8187", fontFamily: "var(--font-jetbrains)" }}>→</span>
      </a>

      {/* Success result */}
      {result && (
        <div className="border border-[#5b8dee]/40 bg-[#5b8dee]/5 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5b8dee] animate-pulse" />
            <span className="text-[#5b8dee] text-sm font-bold tracking-widest uppercase">
              Portal Live
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/5 rounded px-4 py-3">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Portal URL</p>
                <p className="text-white text-sm font-mono">{result.portal_url}</p>
              </div>
              <CopyButton value={result.portal_url} />
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded px-4 py-3">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Password</p>
                <p className="text-white text-sm font-mono">{result.password}</p>
              </div>
              <CopyButton value={result.password} />
            </div>
          </div>

          {result.sync && (
            <div className="bg-white/5 rounded px-4 py-3">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Notion Sync</p>
              {result.sync.error ? (
                <p className="text-yellow-400 text-sm">{result.sync.error}</p>
              ) : (
                <p className="text-white/70 text-sm">
                  {result.sync.chunks_embedded} / {result.sync.chunks_found} chunks embedded
                  {result.sync.note && ` — ${result.sync.note}`}
                </p>
              )}
            </div>
          )}

          <p className="text-white/30 text-xs">
            Add section content in Supabase → portal_sections. Re-sync anytime via the curl command.
          </p>
        </div>
      )}

      {/* Creation form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client Name" hint="Full display name">
            <input
              className={inputClass}
              placeholder="Capital Funding Partners"
              value={form.client_name}
              onChange={(e) => {
                set("client_name", e.target.value);
                if (!form.slug) set("slug", autoSlug(e.target.value));
              }}
              required
            />
          </Field>

          <Field label="Slug" hint="URL-safe identifier">
            <input
              className={inputClass}
              placeholder="capfund1"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              required
            />
          </Field>
        </div>

        <Field label="Password" hint="Client login password">
          <input
            className={inputClass}
            placeholder="GT2024"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            required
          />
        </Field>

        <Field label="Engagement Title" hint="Shown in the portal hero">
          <input
            className={inputClass}
            placeholder="AI Underwriting Acceleration"
            value={form.hero_title}
            onChange={(e) => set("hero_title", e.target.value)}
            required
          />
        </Field>

        <Field label="Engagement Overview" hint="1-2 sentences shown in the hero">
          <textarea
            className={`${inputClass} resize-none h-20`}
            placeholder="A strategic assessment of how AI can streamline your underwriting process..."
            value={form.hero_body}
            onChange={(e) => set("hero_body", e.target.value)}
          />
        </Field>

        <Field label="Notion Page URL" hint="Optional — paste the page URL to sync on creation">
          <input
            className={inputClass}
            placeholder="https://www.notion.so/Client-Name-34cd4df250ad..."
            value={form.notion_url}
            onChange={(e) => set("notion_url", e.target.value)}
          />
        </Field>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5b8dee] hover:bg-[#4a7de0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors"
        >
          {loading ? "Creating Portal..." : "Launch Portal"}
        </button>
      </form>
    </div>
  );
}

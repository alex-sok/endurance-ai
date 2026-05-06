"use client";

import { useState } from "react";
import { Btn } from "@/components/ui/Btn";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { UnderlineField } from "@/components/ui/UnderlineField";

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

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs transition-colors ml-3 font-mono"
      style={{ color: copied ? "#262510" : "#7a7974" }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ background: "#e6e5e0", borderRadius: "4px" }}
    >
      <div>
        <MonoLabel className="block mb-1">{label}</MonoLabel>
        <p className="text-sm text-ink font-mono">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export default function AdminDashboard() {
  const [form, setForm] = useState({
    slug: "",
    client_name: "",
    password: "",
    hero_title: "",
    hero_body: "",
    accent_color: "#7c3aed",
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
    setForm({ slug: "", client_name: "", password: "", hero_title: "", hero_body: "", accent_color: "#7c3aed", notion_url: "" });
  }

  return (
    <div className="space-y-8">

      {/* Analytics link */}
      <a
        href="/admin/analytics"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-ink" style={{ letterSpacing: "-0.025em" }}>
            Portal Analytics
          </p>
          <p className="text-xs mt-0.5 text-muted-ash">Visitor sessions, time on portal, sections viewed</p>
        </div>
        <MonoLabel>→</MonoLabel>
      </a>

      {/* Success result */}
      {result && (
        <div
          className="p-6 space-y-4"
          style={{ border: "1px solid #cdcdc9", borderRadius: "4px" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
            <MonoLabel>Portal Live</MonoLabel>
          </div>

          <div className="space-y-3">
            <ResultRow label="Portal URL" value={result.portal_url} />
            <ResultRow label="Password" value={result.password} />
          </div>

          {result.sync && (
            <div
              className="px-4 py-3"
              style={{ background: "#e6e5e0", borderRadius: "4px" }}
            >
              <MonoLabel className="block mb-2">Notion Sync</MonoLabel>
              {result.sync.error ? (
                <p className="text-yellow-600 text-sm">{result.sync.error}</p>
              ) : (
                <p className="text-sm text-ink">
                  {result.sync.chunks_embedded} / {result.sync.chunks_found} chunks embedded
                  {result.sync.note && ` — ${result.sync.note}`}
                </p>
              )}
            </div>
          )}

          <p className="text-xs text-subtle">
            Add section content in Supabase → portal_sections. Re-sync anytime via the curl command.
          </p>
        </div>
      )}

      {/* Creation form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <UnderlineField
            label="Client Name"
            hint="Full display name"
            placeholder="Capital Funding Partners"
            value={form.client_name}
            onChange={(e) => {
              set("client_name", e.target.value);
              if (!form.slug) set("slug", autoSlug(e.target.value));
            }}
            required
          />
          <UnderlineField
            label="Slug"
            hint="URL-safe identifier"
            placeholder="capfund1"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            required
          />
        </div>

        <UnderlineField
          label="Password"
          hint="Client login password"
          placeholder="GT2024"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          required
        />

        <UnderlineField
          label="Engagement Title"
          hint="Shown in the portal hero"
          placeholder="AI Underwriting Acceleration"
          value={form.hero_title}
          onChange={(e) => set("hero_title", e.target.value)}
          required
        />

        <UnderlineField
          as="textarea"
          label="Engagement Overview"
          hint="1–2 sentences shown in the hero"
          placeholder="A strategic assessment of how AI can streamline your underwriting process..."
          value={form.hero_body}
          onChange={(e) => set("hero_body", e.target.value)}
          className="h-20 resize-none"
        />

        {/* Accent color */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <MonoLabel>Accent Color</MonoLabel>
            <span className="text-xs font-mono text-muted-ash">{form.accent_color}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.accent_color}
              onChange={(e) => set("accent_color", e.target.value)}
              className="w-9 h-9 rounded cursor-pointer border-0 p-0.5"
              style={{ background: "transparent" }}
            />
            <div className="flex gap-2 flex-wrap">
              {["#7c3aed","#2563eb","#0ea5e9","#0d9488","#059669","#d97706","#dc2626","#db2777"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("accent_color", c)}
                  className="w-6 h-6 rounded-sm transition-transform hover:scale-110"
                  style={{
                    background: c,
                    outline: form.accent_color === c ? `2px solid ${c}` : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-ash" style={{ fontFamily: "var(--font-jetbrains)" }}>
            Shown in icosahedron, tab underlines, bullet points, and hover states
          </p>
        </div>

        <UnderlineField
          label="Notion Page URL"
          hint="Optional — paste the page URL to sync on creation"
          placeholder="https://www.notion.so/Client-Name-34cd4df250ad..."
          value={form.notion_url}
          onChange={(e) => set("notion_url", e.target.value)}
        />

        {error && (
          <div
            className="px-4 py-3"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px" }}
          >
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <Btn type="submit" disabled={loading} className="w-full py-2.5">
          {loading ? "Creating Portal…" : "Launch Portal →"}
        </Btn>
      </form>
    </div>
  );
}

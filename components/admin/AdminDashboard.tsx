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
      <label
        className="block text-xs font-semibold tracking-[0.25em] uppercase mb-1"
        style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
      >
        {label}
      </label>
      {hint && <p className="text-xs mb-2" style={{ color: "#cdcdc9" }}>{hint}</p>}
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
      className="text-xs transition-colors ml-3"
      style={{ color: copied ? "#262510" : "#7a7974" }}
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
    "w-full bg-transparent px-0 py-2.5 text-sm text-[#262510] placeholder:text-[#cdcdc9] focus:outline-none transition-colors duration-150";

  const inputStyle = {
    borderBottom: "1px solid #cdcdc9",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "#262510";
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "#cdcdc9";
  };

  return (
    <div className="space-y-8">

      {/* Analytics link */}
      <a
        href="/admin/analytics"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#e6e5e0]/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-[#262510]" style={{ letterSpacing: "-0.025em" }}>Portal Analytics</p>
          <p className="text-xs mt-0.5" style={{ color: "#7a7974" }}>Visitor sessions, time on portal, sections viewed</p>
        </div>
        <span className="text-xs" style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}>→</span>
      </a>

      {/* Success result */}
      {result && (
        <div
          className="p-6 space-y-4"
          style={{ border: "1px solid #cdcdc9", borderRadius: "4px", background: "#f7f7f4" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#262510] animate-pulse" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#262510]"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Portal Live
            </span>
          </div>

          <div className="space-y-3">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#e6e5e0", borderRadius: "4px" }}
            >
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
                >
                  Portal URL
                </p>
                <p className="text-sm text-[#262510]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {result.portal_url}
                </p>
              </div>
              <CopyButton value={result.portal_url} />
            </div>

            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#e6e5e0", borderRadius: "4px" }}
            >
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
                >
                  Password
                </p>
                <p className="text-sm text-[#262510]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {result.password}
                </p>
              </div>
              <CopyButton value={result.password} />
            </div>
          </div>

          {result.sync && (
            <div
              className="px-4 py-3"
              style={{ background: "#e6e5e0", borderRadius: "4px" }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-2"
                style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
              >
                Notion Sync
              </p>
              {result.sync.error ? (
                <p className="text-yellow-600 text-sm">{result.sync.error}</p>
              ) : (
                <p className="text-sm text-[#262510]">
                  {result.sync.chunks_embedded} / {result.sync.chunks_found} chunks embedded
                  {result.sync.note && ` — ${result.sync.note}`}
                </p>
              )}
            </div>
          )}

          <p className="text-xs" style={{ color: "#cdcdc9" }}>
            Add section content in Supabase → portal_sections. Re-sync anytime via the curl command.
          </p>
        </div>
      )}

      {/* Creation form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Field label="Client Name" hint="Full display name">
            <input
              className={inputClass}
              style={inputStyle}
              onFocus={focusHandler}
              onBlur={blurHandler}
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
              style={inputStyle}
              onFocus={focusHandler}
              onBlur={blurHandler}
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
            style={inputStyle}
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="GT2024"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            required
          />
        </Field>

        <Field label="Engagement Title" hint="Shown in the portal hero">
          <input
            className={inputClass}
            style={inputStyle}
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="AI Underwriting Acceleration"
            value={form.hero_title}
            onChange={(e) => set("hero_title", e.target.value)}
            required
          />
        </Field>

        <Field label="Engagement Overview" hint="1–2 sentences shown in the hero">
          <textarea
            className={`${inputClass} resize-none h-20`}
            style={inputStyle}
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="A strategic assessment of how AI can streamline your underwriting process..."
            value={form.hero_body}
            onChange={(e) => set("hero_body", e.target.value)}
          />
        </Field>

        <Field label="Notion Page URL" hint="Optional — paste the page URL to sync on creation">
          <input
            className={inputClass}
            style={inputStyle}
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="https://www.notion.so/Client-Name-34cd4df250ad..."
            value={form.notion_url}
            onChange={(e) => set("notion_url", e.target.value)}
          />
        </Field>

        {error && (
          <div
            className="px-4 py-3"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px" }}
          >
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-sm font-medium text-[#f7f7f4] bg-[#262510] hover:bg-[#141414] transition-colors duration-150 disabled:opacity-30"
          style={{ borderRadius: "4px" }}
        >
          {loading ? "Creating Portal…" : "Launch Portal →"}
        </button>
      </form>
    </div>
  );
}

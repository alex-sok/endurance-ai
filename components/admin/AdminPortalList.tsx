"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { UnderlineField } from "@/components/ui/UnderlineField";
import { Btn } from "@/components/ui/Btn";

interface PortalRow {
  id: string;
  slug: string;
  client_name: string;
  hero_title: string | null;
  hero_body: string | null;
  accent_color: string;
  is_published: boolean;
  password_hint: string | null;
  config: { notion_pages?: string[] };
  chunk_count: number;
  session_count: number;
  last_seen: string | null;
  created_at: string;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const ACCENT_PRESETS = ["#7c3aed","#2563eb","#0ea5e9","#0d9488","#059669","#d97706","#dc2626","#db2777"];

function StatusDot({ published }: { published: boolean }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{ background: published ? "#16a34a" : "#cdcdc9" }}
    />
  );
}

function PortalCard({ portal, onSaved }: { portal: PortalRow; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [syncMsg, setSyncMsg] = useState("");

  const [form, setForm] = useState({
    client_name: portal.client_name,
    hero_title: portal.hero_title ?? "",
    hero_body: portal.hero_body ?? "",
    accent_color: portal.accent_color,
    is_published: portal.is_published,
    new_password: "",
    notion_url: "",
  });

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSyncMsg("");

    const res = await fetch(`/api/admin/portals/${portal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        is_published: String(form.is_published),
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Save failed");
      return;
    }

    if (data.sync) {
      if (data.sync.error) {
        setSyncMsg(`Notion sync failed: ${data.sync.error}`);
      } else {
        setSyncMsg(`Synced ${data.sync.chunks_embedded} chunks from new Notion page`);
      }
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    set("new_password", "");
    set("notion_url", "");
    onSaved();
  }

  const notionPages = portal.config?.notion_pages ?? [];

  return (
    <div
      className="rounded transition-all duration-150"
      style={{ border: "1px solid #e6e5e0" }}
    >
      {/* Row header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#f0efe9] transition-colors duration-150 rounded"
      >
        <StatusDot published={portal.is_published} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#262510] truncate">{portal.client_name}</p>
          <p className="text-xs text-[#7a7974] font-mono mt-0.5">/mission/{portal.slug}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="w-3 h-3 rounded-sm" style={{ background: portal.accent_color }} />
          <span className="text-xs text-[#7a7974]">{portal.chunk_count} chunks</span>
          {portal.session_count > 0 ? (
            <span className="text-xs text-[#7a7974]">
              {portal.session_count} {portal.session_count === 1 ? "session" : "sessions"}
              {portal.last_seen && (
                <span className="text-[#cdcdc9]"> · {relativeTime(portal.last_seen)}</span>
              )}
            </span>
          ) : (
            <span className="text-xs text-[#cdcdc9]">no sessions</span>
          )}
          <span className="text-xs text-[#cdcdc9]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Edit form */}
      {open && (
        <form onSubmit={handleSave} className="px-5 pb-6 pt-2 space-y-5 border-t border-[#e6e5e0]">

          <div className="grid grid-cols-2 gap-5">
            <UnderlineField
              label="Client Name"
              value={form.client_name}
              onChange={(e) => set("client_name", e.target.value)}
              required
            />
            <div className="flex flex-col justify-end">
              <MonoLabel className="mb-1.5">Status</MonoLabel>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => set("is_published", val)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-all duration-150"
                    style={{
                      border: form.is_published === val ? "1px solid #262510" : "1px solid #e6e5e0",
                      color: form.is_published === val ? "#262510" : "#7a7974",
                      background: form.is_published === val ? "#f0efe9" : "transparent",
                    }}
                  >
                    <StatusDot published={val} />
                    {val ? "Published" : "Unpublished"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <UnderlineField
            label="Engagement Title"
            value={form.hero_title}
            onChange={(e) => set("hero_title", e.target.value)}
          />

          <UnderlineField
            as="textarea"
            label="Engagement Overview"
            value={form.hero_body}
            onChange={(e) => set("hero_body", e.target.value)}
            className="h-20 resize-none"
          />

          {/* Accent color */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <MonoLabel>Accent Color</MonoLabel>
              <span className="text-xs font-mono text-[#7a7974]">{form.accent_color}</span>
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
                {ACCENT_PRESETS.map((c) => (
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
          </div>

          {/* New password */}
          <UnderlineField
            label="New Password"
            hint={portal.password_hint ? `Current: ${portal.password_hint}` : undefined}
            placeholder="Leave blank to keep current"
            value={form.new_password}
            onChange={(e) => set("new_password", e.target.value)}
          />

          {/* Notion pages */}
          <div className="space-y-2">
            <MonoLabel>Notion Pages</MonoLabel>
            {notionPages.length > 0 ? (
              <ul className="space-y-1">
                {notionPages.map((id) => (
                  <li key={id} className="text-xs font-mono text-[#7a7974] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#cdcdc9] flex-shrink-0" />
                    {id}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#cdcdc9]">No Notion pages connected</p>
            )}
            <UnderlineField
              label="Add Notion Page URL"
              hint="Paste URL to add and sync a new page"
              placeholder="https://www.notion.so/Page-Name-abc123..."
              value={form.notion_url}
              onChange={(e) => set("notion_url", e.target.value)}
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded text-sm text-red-600" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
              {error}
            </div>
          )}
          {syncMsg && (
            <div className="px-4 py-3 rounded text-sm text-[#262510]" style={{ background: "#e6e5e0" }}>
              {syncMsg}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <a
              href={`/mission/${portal.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#7a7974] hover:text-[#262510] transition-colors"
            >
              Open portal →
            </a>
            <Btn type="submit" disabled={saving}>
              {saved ? "Saved ✓" : saving ? "Saving…" : "Save Changes"}
            </Btn>
          </div>
        </form>
      )}
    </div>
  );
}

export default function AdminPortalList() {
  const [portals, setPortals] = useState<PortalRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/portals/list");
    if (res.ok) {
      const data = await res.json();
      setPortals(data);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  if (loading) {
    return <p className="text-sm text-[#7a7974] py-8 text-center">Loading portals…</p>;
  }

  if (portals.length === 0) {
    return <p className="text-sm text-[#7a7974] py-8 text-center">No portals yet.</p>;
  }

  return (
    <div className="space-y-3">
      {portals.map((p) => (
        <PortalCard key={p.id} portal={p} onSaved={load} />
      ))}
    </div>
  );
}

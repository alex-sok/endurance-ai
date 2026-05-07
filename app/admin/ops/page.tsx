import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

interface HealthResult {
  name:    string;
  ok:      boolean;
  latency: number; // ms
  detail?: string;
}

interface SiteLead {
  id:         string;
  type:       string;
  name:       string | null;
  email:      string | null;
  company:    string | null;
  score:      number | null;
  created_at: string;
}

// ── Health checks ─────────────────────────────────────────────────────────────

async function ping(name: string, fn: () => Promise<boolean>): Promise<HealthResult> {
  const start = Date.now();
  try {
    const ok = await Promise.race([
      fn(),
      new Promise<boolean>((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ]);
    return { name, ok, latency: Date.now() - start };
  } catch (err) {
    return { name, ok: false, latency: Date.now() - start, detail: (err as Error).message };
  }
}

async function runHealthChecks(): Promise<HealthResult[]> {
  const checks = await Promise.all([
    ping("xAI (Grok)", async () => {
      const res = await fetch("https://api.x.ai/v1/models", {
        headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` },
      });
      // xAI returns 200 on valid key, 400 on invalid
      return res.status === 200;
    }),

    ping("OpenAI (Embeddings)", async () => {
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      });
      return res.ok;
    }),

    ping("Slack Webhook", async () => {
      const url = process.env.SLACK_WEBHOOK_URL;
      if (!url) return false;
      // Validate URL shape without sending a message
      return url.startsWith("https://hooks.slack.com/");
    }),

    ping("Lightfield CRM", async () => {
      const key = process.env.LIGHTFIELD_API_KEY;
      if (!key) return false;
      const res = await fetch("https://api.lightfield.app/v1/contacts?limit=1", {
        headers: {
          Authorization:        `Bearer ${key}`,
          "Lightfield-Version": "2026-03-01",
        },
      });
      return res.ok;
    }),

    ping("Notion", async () => {
      const res = await fetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization:    `Bearer ${process.env.NOTION_API_TOKEN}`,
          "Notion-Version": "2022-06-28",
        },
      });
      return res.ok;
    }),

    ping("Supabase", async () => {
      const supabase = await createClient(true);
      const { error } = await supabase.from("portals").select("id").limit(1);
      return !error;
    }),
  ]);

  return checks;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
    timeZoneName: "short",
  });
}

function scoreColor(score: number | null): string {
  if (score === null) return "#cdcdc9";
  if (score >= 75)   return "#16a34a"; // green
  if (score >= 50)   return "#f54e00"; // orange
  return "#7a7974";                    // muted
}

function scoreLabel(score: number | null): string {
  if (score === null) return "—";
  if (score >= 75)    return `🔥 ${score}`;
  if (score >= 50)    return `⚡ ${score}`;
  return `💬 ${score}`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function OpsPage() {
  // Auth gate
  const cookieStore = await cookies();
  const authCookie  = cookieStore.get("admin_auth")?.value;
  const expected    = computeAdminToken();
  if (!expected || authCookie !== expected) redirect("/admin");

  const supabase = await createClient(true);

  // Run health checks + DB queries in parallel
  const [health, leadsRes, siteStatsRes, portalStatsRes] = await Promise.all([
    runHealthChecks(),

    // Recent leads
    supabase
      .from("site_leads")
      .select("id, type, name, email, company, score, created_at")
      .order("created_at", { ascending: false })
      .limit(20),

    // Site session stats
    supabase
      .from("site_sessions")
      .select("id, chat_opened, started_at")
      .order("started_at", { ascending: false })
      .limit(500),

    // Portal stats
    supabase
      .from("portal_sessions")
      .select("id, started_at, chat_turns, portals(client_name, slug)")
      .order("started_at", { ascending: false })
      .limit(100),
  ]);

  const leads        = (leadsRes.data ?? []) as SiteLead[];
  const siteSessions = siteStatsRes.data ?? [];
  const portalSessions = portalStatsRes.data ?? [];

  // Today's stats
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayIso = todayStart.toISOString();

  const todaySiteSessions  = siteSessions.filter((s) => s.started_at >= todayIso);
  const todayChatOpens     = todaySiteSessions.filter((s) => s.chat_opened).length;
  const todayLeads         = leads.filter((l) => l.created_at >= todayIso).length;
  const todayPortalSessions = portalSessions.filter((s) => s.started_at >= todayIso).length;

  // This week
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekIso  = weekStart.toISOString();
  const weekLeads = leads.filter((l) => l.created_at >= weekIso).length;

  const allOk    = health.every((h) => h.ok);
  const failCount = health.filter((h) => !h.ok).length;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f7f4", color: "#262510", fontFamily: "var(--font-figtree)" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-xs mb-2 uppercase"
              style={{ color: "#7a7974", letterSpacing: "0.25em", fontFamily: "var(--font-jetbrains)" }}
            >
              Endurance AI Labs
            </p>
            <h1 className="text-2xl font-semibold" style={{ letterSpacing: "-0.025em" }}>
              Operations
            </h1>
            <p className="text-sm mt-1" style={{ color: "#7a7974" }}>
              System health · Leads · Activity
            </p>
          </div>
          <a
            href="/admin"
            className="text-xs px-4 py-2 transition-colors"
            style={{
              border: "1px solid #cdcdc9", borderRadius: "4px",
              fontFamily: "var(--font-jetbrains)", letterSpacing: "0.1em",
              color: "#7a7974",
            }}
          >
            ← Mission Control
          </a>
        </div>

        {/* ── Today at a glance ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Site Visits Today",   value: todaySiteSessions.length },
            { label: "Chat Opens Today",    value: todayChatOpens },
            { label: "Leads Today",         value: todayLeads },
            { label: "Leads This Week",     value: weekLeads },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="px-5 py-4"
              style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
            >
              <p
                className="text-[10px] uppercase mb-2"
                style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
              >
                {label}
              </p>
              <p className="text-3xl font-semibold" style={{ letterSpacing: "-0.04em" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── System health ──────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-xs uppercase"
              style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
            >
              System Health
            </h2>
            <span
              className="text-xs px-2 py-0.5"
              style={{
                fontFamily: "var(--font-jetbrains)",
                borderRadius: "4px",
                background: allOk ? "#dcfce7" : "#fee2e2",
                color:      allOk ? "#16a34a"  : "#dc2626",
                border:     `1px solid ${allOk ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              {allOk ? "All systems operational" : `${failCount} issue${failCount > 1 ? "s" : ""} detected`}
            </span>
          </div>

          <div style={{ border: "1px solid #e6e5e0", borderRadius: "4px", overflow: "hidden" }}>
            {health.map((h, i) => (
              <div
                key={h.name}
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: i < health.length - 1 ? "1px solid #e6e5e0" : undefined }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "8px", color: h.ok ? "#16a34a" : "#dc2626" }}>
                    {h.ok ? "●" : "●"}
                  </span>
                  <span className="text-sm" style={{ color: h.ok ? "#262510" : "#dc2626" }}>
                    {h.name}
                  </span>
                  {!h.ok && h.detail && (
                    <span className="text-xs" style={{ color: "#dc2626", fontFamily: "var(--font-jetbrains)" }}>
                      {h.detail}
                    </span>
                  )}
                </div>
                <span
                  className="text-xs"
                  style={{ color: "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}
                >
                  {h.ok ? `${h.latency}ms` : "❌ down"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recent leads ───────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-xs uppercase mb-3"
            style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
          >
            Recent Leads
          </h2>

          {leads.length === 0 ? (
            <div
              className="text-center py-12 text-sm"
              style={{ border: "1px solid #e6e5e0", borderRadius: "4px", color: "#cdcdc9" }}
            >
              No leads yet — run the SQL migration (011_site_leads) to enable.
            </div>
          ) : (
            <div style={{ border: "1px solid #e6e5e0", borderRadius: "4px", overflow: "hidden" }}>
              {/* Header row */}
              <div
                className="grid px-5 py-2 text-[10px] uppercase"
                style={{
                  gridTemplateColumns: "1fr 1fr 120px 80px 160px",
                  background: "#e6e5e0", color: "#7a7974",
                  letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)",
                  borderBottom: "1px solid #cdcdc9",
                }}
              >
                <span>Contact</span>
                <span>Company</span>
                <span>Type</span>
                <span>Score</span>
                <span>Time</span>
              </div>

              {leads.map((lead, i) => (
                <div
                  key={lead.id}
                  className="grid px-5 py-3 items-center hover:bg-[#e6e5e0]/30 transition-colors"
                  style={{
                    gridTemplateColumns: "1fr 1fr 120px 80px 160px",
                    borderBottom: i < leads.length - 1 ? "1px solid #e6e5e0" : undefined,
                  }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ letterSpacing: "-0.02em" }}>
                      {lead.name || <span style={{ color: "#cdcdc9" }}>—</span>}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#7a7974" }}>
                      {lead.email || <span style={{ color: "#cdcdc9" }}>—</span>}
                    </p>
                  </div>
                  <p className="text-sm" style={{ color: "#7a7974" }}>
                    {lead.company || <span style={{ color: "#cdcdc9" }}>—</span>}
                  </p>
                  <span
                    className="text-[10px] uppercase px-2 py-0.5 self-start"
                    style={{
                      fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em",
                      background: "#e6e5e0", borderRadius: "4px",
                      border: "1px solid #cdcdc9", color: "#7a7974",
                      width: "fit-content",
                    }}
                  >
                    {lead.type.replace("lead-capture", "chat").replace("mission-intake", "intake").replace("talk-to-team", "talk")}
                  </span>
                  <p
                    className="text-sm font-medium"
                    style={{ color: scoreColor(lead.score), fontFamily: "var(--font-jetbrains)" }}
                  >
                    {scoreLabel(lead.score)}
                  </p>
                  <p className="text-xs" style={{ color: "#7a7974" }}>
                    {fmt(lead.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Recent portal activity ─────────────────────────────────────── */}
        <section>
          <h2
            className="text-xs uppercase mb-3"
            style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
          >
            Recent Portal Activity
          </h2>

          {portalSessions.length === 0 ? (
            <div
              className="text-center py-12 text-sm"
              style={{ border: "1px solid #e6e5e0", borderRadius: "4px", color: "#cdcdc9" }}
            >
              No portal sessions yet.
            </div>
          ) : (
            <div style={{ border: "1px solid #e6e5e0", borderRadius: "4px", overflow: "hidden" }}>
              <div
                className="grid px-5 py-2 text-[10px] uppercase"
                style={{
                  gridTemplateColumns: "1fr 80px 160px",
                  background: "#e6e5e0", color: "#7a7974",
                  letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)",
                  borderBottom: "1px solid #cdcdc9",
                }}
              >
                <span>Portal</span>
                <span>Chat Turns</span>
                <span>Time</span>
              </div>
              {portalSessions.slice(0, 10).map((s, i) => {
                const portal = Array.isArray(s.portals) ? s.portals[0] : s.portals as { client_name: string; slug: string } | null;
                return (
                  <div
                    key={s.id}
                    className="grid px-5 py-3 items-center hover:bg-[#e6e5e0]/30 transition-colors"
                    style={{
                      gridTemplateColumns: "1fr 80px 160px",
                      borderBottom: i < 9 ? "1px solid #e6e5e0" : undefined,
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ letterSpacing: "-0.02em" }}>
                        {portal?.client_name ?? "—"}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}>
                        /mission/{portal?.slug ?? "—"}
                      </p>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: s.chat_turns > 0 ? "#f54e00" : "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}
                    >
                      {s.chat_turns > 0 ? s.chat_turns : "—"}
                    </p>
                    <p className="text-xs" style={{ color: "#7a7974" }}>{fmt(s.started_at)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

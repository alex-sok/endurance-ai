import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SessionRow {
  id:               string;
  email:            string | null;
  name:             string | null;
  started_at:       string;
  last_seen_at:     string;
  duration_seconds: number | null;
  chat_turns:       number;
  portals: { client_name: string; slug: string } | null;
  section_views:    { section_slug: string; duration_seconds: number | null }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  });
}

function fmtDuration(s: number | null) {
  if (!s) return "—";
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  searchParams: Promise<{ portal?: string; view?: string }>;
}

export default async function AnalyticsPage({ searchParams }: Props) {
  // ── Admin auth gate ───────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const authCookie  = cookieStore.get("admin_auth")?.value;
  const expected    = computeAdminToken();
  if (!expected || authCookie !== expected) redirect("/admin");

  const { portal: activePortalSlug, view = "portals" } = await searchParams;
  const isSiteView = view === "site";

  const supabase = await createClient(true);

  // ── Fetch all portals for filter bar ─────────────────────────────────────
  const { data: allPortals } = await supabase
    .from("portals")
    .select("slug, client_name")
    .eq("is_published", true)
    .order("client_name");

  // ── Fetch sessions, optionally filtered by portal slug ───────────────────
  let sessionQuery = supabase
    .from("portal_sessions")
    .select(`id, email, name, started_at, last_seen_at, duration_seconds, chat_turns,
             portals ( client_name, slug )`)
    .order("started_at", { ascending: false })
    .limit(200);

  if (activePortalSlug) {
    // Filter via the joined portal slug
    const portal = allPortals?.find((p) => p.slug === activePortalSlug);
    if (portal) {
      const { data: portalRow } = await supabase
        .from("portals")
        .select("id")
        .eq("slug", activePortalSlug)
        .single();
      if (portalRow) sessionQuery = sessionQuery.eq("portal_id", portalRow.id);
    }
  }

  const { data: sessions } = await sessionQuery;

  // ── Fetch section events for these sessions ───────────────────────────────
  const sessionIds = (sessions ?? []).map((s) => s.id);
  const { data: events } = sessionIds.length
    ? await supabase
        .from("portal_events")
        .select("session_id, section_slug, duration_seconds")
        .eq("event_type", "section_view")
        .in("session_id", sessionIds)
    : { data: [] };

  const eventsBySession: Record<string, { section_slug: string; duration_seconds: number | null }[]> = {};
  for (const ev of events ?? []) {
    if (!eventsBySession[ev.session_id]) eventsBySession[ev.session_id] = [];
    eventsBySession[ev.session_id].push({ section_slug: ev.section_slug, duration_seconds: ev.duration_seconds });
  }

  const rows: SessionRow[] = (sessions ?? []).map((s) => ({
    ...s,
    portals: Array.isArray(s.portals) ? s.portals[0] ?? null : (s.portals as SessionRow["portals"]),
    section_views: eventsBySession[s.id] ?? [],
  }));

  // ── Summary stats (scoped to current filter) ──────────────────────────────
  const totalSessions = rows.length;
  const uniqueEmails  = new Set(rows.map((r) => r.email).filter(Boolean)).size;
  const withDuration  = rows.filter((r) => r.duration_seconds);
  const avgDuration   = withDuration.length
    ? Math.round(withDuration.reduce((a, r) => a + (r.duration_seconds ?? 0), 0) / withDuration.length)
    : null;

  const activePortal = allPortals?.find((p) => p.slug === activePortalSlug);

  // ── Site analytics ────────────────────────────────────────────────────────
  const { data: siteSessions } = await supabase
    .from("site_sessions")
    .select("id, duration_seconds, chat_opened, started_at")
    .order("started_at", { ascending: false })
    .limit(500);

  const siteSessionIds = (siteSessions ?? []).map((s) => s.id);
  const { data: siteEvents } = siteSessionIds.length
    ? await supabase
        .from("site_events")
        .select("session_id, event_type, section_slug, duration_seconds")
        .in("session_id", siteSessionIds)
    : { data: [] };

  // Section funnel: count unique sessions that saw each section
  const SECTION_ORDER = ["hero","problem","services","proof","how-we-work","who-we-help","team","cta"];
  const sectionHits: Record<string, Set<string>> = {};
  for (const slug of SECTION_ORDER) sectionHits[slug] = new Set();
  for (const ev of siteEvents ?? []) {
    if (ev.event_type === "section_view" && ev.section_slug && sectionHits[ev.section_slug]) {
      sectionHits[ev.section_slug].add(ev.session_id);
    }
  }

  const totalSiteSessions = siteSessions?.length ?? 0;
  const chatOpenedCount   = (siteSessions ?? []).filter((s) => s.chat_opened).length;
  const siteWithDuration  = (siteSessions ?? []).filter((s) => s.duration_seconds);
  const avgSiteDuration   = siteWithDuration.length
    ? Math.round(siteWithDuration.reduce((a, s) => a + (s.duration_seconds ?? 0), 0) / siteWithDuration.length)
    : null;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f7f4", color: "#262510", fontFamily: "var(--font-figtree)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p
              className="text-xs mb-1 uppercase"
              style={{ color: "#7a7974", letterSpacing: "0.25em", fontFamily: "var(--font-jetbrains)" }}
            >
              Endurance AI Labs
            </p>
            <h1 className="text-2xl font-semibold" style={{ letterSpacing: "-0.025em" }}>
              Portal Analytics
              {activePortal && (
                <span style={{ color: "#7a7974" }}> · {activePortal.client_name}</span>
              )}
            </h1>
          </div>
          <a
            href="/admin"
            className="text-xs px-4 py-2 transition-colors text-[#7a7974] hover:text-[#262510]"
            style={{ border: "1px solid #cdcdc9", borderRadius: "4px", fontFamily: "var(--font-jetbrains)", letterSpacing: "0.1em" }}
          >
            ← Mission Control
          </a>
        </div>

        {/* View switcher */}
        <div className="flex gap-2 mb-6">
          {[{ label: "Client Portals", value: "portals" }, { label: "Landing Page", value: "site" }].map((tab) => (
            <a
              key={tab.value}
              href={`/admin/analytics?view=${tab.value}`}
              className="px-4 py-1.5 text-xs uppercase transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)", letterSpacing: "0.1em", borderRadius: "4px",
                border: view === tab.value ? "1px solid #262510" : "1px solid #cdcdc9",
                color:  view === tab.value ? "#262510" : "#7a7974",
                background: view === tab.value ? "#e6e5e0" : "transparent",
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* ── Site analytics view ── */}
        {isSiteView && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Visits",   value: totalSiteSessions },
                { label: "Avg Time",       value: fmtDuration(avgSiteDuration) },
                { label: "Chat Open Rate", value: totalSiteSessions ? `${Math.round((chatOpenedCount / totalSiteSessions) * 100)}%` : "—" },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-5" style={{ background: "#f7f7f4", border: "1px solid #e6e5e0", borderRadius: "4px" }}>
                  <p className="text-xs mb-2 uppercase" style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}>{stat.label}</p>
                  <p className="text-3xl font-semibold text-[#262510]" style={{ letterSpacing: "-0.025em" }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Section funnel */}
            <div style={{ border: "1px solid #e6e5e0", borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-5 py-3 text-xs uppercase" style={{ background: "#e6e5e0", color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)", borderBottom: "1px solid #cdcdc9" }}>
                Section Engagement
              </div>
              {SECTION_ORDER.map((slug) => {
                const count = sectionHits[slug]?.size ?? 0;
                const pct   = totalSiteSessions ? Math.round((count / totalSiteSessions) * 100) : 0;
                return (
                  <div key={slug} className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid #e6e5e0" }}>
                    <span className="text-xs font-mono w-28 flex-shrink-0 text-[#7a7974]">{slug}</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "#e6e5e0" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: "#262510", transition: "width 0.3s" }} />
                    </div>
                    <span className="text-xs font-mono w-16 text-right text-[#7a7974]">{count} <span style={{ color: "#cdcdc9" }}>({pct}%)</span></span>
                  </div>
                );
              })}
            </div>

            {totalSiteSessions === 0 && (
              <div className="text-center py-20 text-sm" style={{ border: "1px solid #e6e5e0", color: "#cdcdc9", borderRadius: "4px" }}>
                No visits yet. Run the migration to enable tracking.
              </div>
            )}
          </div>
        )}

        {/* Portal filter bar */}
        {!isSiteView && (allPortals?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <a
              href="/admin/analytics"
              className="px-4 py-1.5 text-xs uppercase transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)",
                letterSpacing: "0.1em",
                borderRadius: "4px",
                border: !activePortalSlug ? "1px solid #262510" : "1px solid #cdcdc9",
                color:  !activePortalSlug ? "#262510"           : "#7a7974",
                background: !activePortalSlug ? "#e6e5e0" : "transparent",
              }}
            >
              All
            </a>
            {allPortals?.map((p) => (
              <a
                key={p.slug}
                href={`/admin/analytics?portal=${p.slug}`}
                className="px-4 py-1.5 text-xs uppercase transition-colors"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  letterSpacing: "0.1em",
                  borderRadius: "4px",
                  border: activePortalSlug === p.slug ? "1px solid #262510" : "1px solid #cdcdc9",
                  color:  activePortalSlug === p.slug ? "#262510"           : "#7a7974",
                  background: activePortalSlug === p.slug ? "#e6e5e0" : "transparent",
                }}
              >
                {p.client_name}
              </a>
            ))}
          </div>
        )}

        {/* ── Portal analytics view ── */}
        {!isSiteView && <div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Sessions",        value: totalSessions },
            { label: "Unique Visitors", value: uniqueEmails },
            { label: "Avg Time",        value: fmtDuration(avgDuration) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5"
              style={{ background: "#f7f7f4", border: "1px solid #e6e5e0", borderRadius: "4px" }}
            >
              <p
                className="text-xs mb-2 uppercase"
                style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
              >
                {stat.label}
              </p>
              <p className="text-3xl font-semibold text-[#262510]" style={{ letterSpacing: "-0.025em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Sessions table */}
        {rows.length === 0 ? (
          <div
            className="text-center py-20 text-sm"
            style={{ border: "1px solid #e6e5e0", color: "#cdcdc9", borderRadius: "4px" }}
          >
            No sessions yet{activePortal ? ` for ${activePortal.client_name}` : ""}.
          </div>
        ) : (
          <div style={{ border: "1px solid #e6e5e0", borderRadius: "4px", overflow: "hidden" }}>
            {/* Table header */}
            <div
              className="grid gap-4 px-5 py-3 text-xs uppercase"
              style={{
                gridTemplateColumns: activePortalSlug ? "1fr 1fr 160px 80px 100px" : "1fr 1fr 1fr 160px 80px 100px",
                background: "#e6e5e0",
                color: "#7a7974",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-jetbrains)",
                borderBottom: "1px solid #cdcdc9",
              }}
            >
              <span>Visitor</span>
              {!activePortalSlug && <span>Portal</span>}
              <span>Accessed</span>
              <span>Sections Viewed</span>
              <span>Duration</span>
              <span>Chat Turns</span>
            </div>

            {/* Rows */}
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid gap-4 px-5 py-4 items-start transition-colors hover:bg-[#e6e5e0]/30"
                style={{
                  gridTemplateColumns: activePortalSlug ? "1fr 1fr 160px 80px 100px" : "1fr 1fr 1fr 160px 80px 100px",
                  borderBottom: "1px solid #e6e5e0",
                }}
              >
                {/* Visitor */}
                <div>
                  <p className="text-sm font-medium text-[#262510]" style={{ letterSpacing: "-0.025em" }}>
                    {row.name || <span style={{ color: "#cdcdc9" }}>—</span>}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#7a7974" }}>
                    {row.email || <span style={{ color: "#cdcdc9" }}>—</span>}
                  </p>
                </div>

                {/* Portal — hidden when filtered */}
                {!activePortalSlug && (
                  <div>
                    <p className="text-sm text-[#262510]">{row.portals?.client_name ?? "—"}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}>
                      /mission/{row.portals?.slug ?? "—"}
                    </p>
                  </div>
                )}

                {/* Accessed */}
                <div>
                  <p className="text-xs" style={{ color: "#7a7974" }}>{fmt(row.started_at)}</p>
                  {row.last_seen_at !== row.started_at && (
                    <p className="text-xs mt-0.5" style={{ color: "#cdcdc9" }}>
                      Last seen {fmt(row.last_seen_at)}
                    </p>
                  )}
                </div>

                {/* Sections */}
                <div className="flex flex-wrap gap-1">
                  {row.section_views.length === 0 ? (
                    <span style={{ color: "#cdcdc9", fontSize: "12px" }}>—</span>
                  ) : (
                    [...new Map(row.section_views.map((v) => [v.section_slug, v])).values()].map((v) => (
                      <span
                        key={v.section_slug}
                        className="px-1.5 py-0.5 text-[10px] uppercase"
                        style={{
                          background: "#e6e5e0",
                          border: "1px solid #cdcdc9",
                          color: "#7a7974",
                          letterSpacing: "0.05em",
                          fontFamily: "var(--font-jetbrains)",
                          borderRadius: "4px",
                        }}
                      >
                        {v.section_slug}
                        {v.duration_seconds ? ` · ${fmtDuration(v.duration_seconds)}` : ""}
                      </span>
                    ))
                  )}
                </div>

                {/* Duration */}
                <p
                  className="text-sm"
                  style={{ color: row.duration_seconds ? "#262510" : "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}
                >
                  {fmtDuration(row.duration_seconds)}
                </p>

                {/* Chat turns */}
                <p
                  className="text-sm"
                  style={{ color: row.chat_turns > 0 ? "#f54e00" : "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}
                >
                  {row.chat_turns > 0 ? `${row.chat_turns} turns` : "—"}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs mt-4" style={{ color: "#cdcdc9", fontFamily: "var(--font-jetbrains)" }}>
          Showing last 200 sessions{activePortal ? ` for ${activePortal.client_name}` : " across all portals"}
        </p>

        </div>} {/* end !isSiteView */}

      </div>
    </div>
  );
}

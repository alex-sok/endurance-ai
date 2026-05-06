import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

const MESSAGES = [
  "The machines are ready. Are you?",
  "Less talk, more ship.",
  "Every chunk is a weapon.",
  "We don't build slides. We build leverage.",
  "Speed is the strategy.",
  "Go build something that matters.",
  "The future is already here — deploy it.",
  "Fortune favors the fast.",
];

async function fetchStats() {
  try {
    const supabase = await createClient(true);
    const [portalsRes, chunksRes, publishedRes] = await Promise.all([
      supabase.from("portals").select("*", { count: "exact", head: true }),
      supabase.from("portal_chunks").select("*", { count: "exact", head: true }),
      supabase.from("portals").select("*", { count: "exact", head: true }).eq("is_published", true),
    ]);
    return {
      portals: portalsRes.count ?? 0,
      chunks: chunksRes.count ?? 0,
      published: publishedRes.count ?? 0,
    };
  } catch {
    return { portals: 0, chunks: 0, published: 0 };
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();
  const isAuthenticated = !!expectedToken && authCookie === expectedToken;

  const stats = isAuthenticated ? await fetchStats() : null;
  const message = MESSAGES[new Date().getDay() % MESSAGES.length];

  return (
    <div className="min-h-screen" style={{ background: "#f7f7f4", color: "#262510", fontFamily: "var(--font-figtree)" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
          >
            Endurance AI Labs
          </div>
          <h1 className="text-2xl font-semibold" style={{ letterSpacing: "-0.025em" }}>Mission Control</h1>
          <p className="text-sm mt-1" style={{ color: "#7a7974" }}>Portal Administration</p>
        </div>

        {isAuthenticated && stats ? (
          <>
            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Portals Created", value: stats.portals, sub: `${stats.published} live` },
                { label: "RAG Chunks", value: stats.chunks.toLocaleString(), sub: "indexed & embedded" },
                { label: "Today's Mandate", value: null, quote: message },
              ].map(({ label, value, sub, quote }) => (
                <div
                  key={label}
                  className="px-4 py-4 flex flex-col justify-between"
                  style={{ border: "1px solid #e6e5e0", borderRadius: "4px", minHeight: "80px" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
                  >
                    {label}
                  </p>
                  {quote ? (
                    <p className="text-sm font-medium leading-snug" style={{ color: "#262510", letterSpacing: "-0.01em" }}>
                      "{quote}"
                    </p>
                  ) : (
                    <>
                      <p className="text-3xl font-semibold" style={{ letterSpacing: "-0.04em", color: "#262510" }}>
                        {value}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#7a7974" }}>{sub}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <AdminDashboard />
          </>
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  );
}

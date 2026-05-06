import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminPortalList from "@/components/admin/AdminPortalList";

export const dynamic = "force-dynamic";

export default async function AdminPortalsPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();

  if (!expectedToken || authCookie !== expectedToken) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen" style={{ background: "#f7f7f4", color: "#262510", fontFamily: "var(--font-figtree)" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <a
            href="/admin"
            className="text-xs text-[#7a7974] hover:text-[#262510] transition-colors mb-6 block"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            ← Mission Control
          </a>
          <div
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}
          >
            Endurance AI Labs
          </div>
          <h1 className="text-2xl font-semibold" style={{ letterSpacing: "-0.025em" }}>Client Portals</h1>
          <p className="text-sm mt-1" style={{ color: "#7a7974" }}>Click a portal to edit it</p>
        </div>
        <AdminPortalList />
      </div>
    </div>
  );
}

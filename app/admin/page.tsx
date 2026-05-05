import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();
  const isAuthenticated = !!expectedToken && authCookie === expectedToken;

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
        {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
      </div>
    </div>
  );
}

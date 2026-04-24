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
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="text-[#5b8dee] text-xs font-bold tracking-widest uppercase mb-2">
            Endurance AI Labs
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-white/40 text-sm mt-1">Portal Administration</p>
        </div>
        {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
      </div>
    </div>
  );
}

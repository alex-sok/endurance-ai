import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return Response.json({ error: "ADMIN_SECRET not configured" }, { status: 500 });
    }

    if (password !== adminSecret) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = computeAdminToken();
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

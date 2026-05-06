import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { rateLimit, getIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // ── Rate limiting — 5 attempts per minute per IP ──────────────────────────
  const ip = getIP(request);
  if (!rateLimit(ip, 5, 60_000)) {
    return Response.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }

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
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

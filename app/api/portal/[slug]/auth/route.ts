import { createHmac } from "crypto";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, getIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Compute the HMAC token stored in the auth cookie.
// Includes the password_hash so changing the password invalidates all sessions.
export function computeAuthToken(slug: string, passwordHash: string): string {
  const secret = process.env.PORTAL_SESSION_SECRET ?? "dev-secret-change-in-prod";
  return createHmac("sha256", secret).update(`${slug}:${passwordHash}`).digest("hex");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // ── Rate limit: 10 attempts per minute per IP ─────────────────────────────
  const ip = getIP(request);
  if (!rateLimit(`auth:${ip}`, 10, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  let password: string;
  let email: string;
  let name: string;
  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password.trim() : "";
    email    = typeof body.email    === "string" ? body.email.trim().toLowerCase() : "";
    name     = typeof body.name     === "string" ? body.name.trim() : "";
    if (!password) return new Response("Password required", { status: 400 });
    if (!email)    return new Response("Email required",    { status: 400 });
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const supabase = await createClient(true);
  const { data: portal, error } = await supabase
    .from("portals")
    .select("id, password_hash")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !portal) {
    await new Promise((r) => setTimeout(r, 200));
    return new Response("Unauthorized", { status: 401 });
  }

  if (portal.password_hash) {
    const valid = await bcrypt.compare(password, portal.password_hash);
    if (!valid) return new Response("Unauthorized", { status: 401 });
  }

  // ── Create analytics session ──────────────────────────────────────────────
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const { data: session } = await supabase
    .from("portal_sessions")
    .insert({
      portal_id:  portal.id,
      email,
      name:       name || null,
      referrer:   request.headers.get("referer") ?? null,
      user_agent: userAgent,
      ip_hash:    ip ? createHmac("sha256", "ip-salt").update(ip).digest("hex").slice(0, 16) : null,
    })
    .select("id")
    .single();

  // ── Set cookies ───────────────────────────────────────────────────────────
  const authToken  = computeAuthToken(slug, portal.password_hash ?? "");
  const sessionId  = session?.id ?? "";
  const isProd     = process.env.NODE_ENV === "production";
  const maxAge     = 60 * 60 * 24 * 30; // 30 days

  const authCookie = [
    `portal_auth_${slug}=${authToken}`,
    "Path=/", "HttpOnly", "SameSite=Strict",
    `Max-Age=${maxAge}`,
    ...(isProd ? ["Secure"] : []),
  ].join("; ");

  // sid is NOT HttpOnly — the analytics hook reads it via document.cookie
  const sidCookie = [
    `portal_sid_${slug}=${sessionId}`,
    "Path=/", "SameSite=Strict",
    `Max-Age=${maxAge}`,
    ...(isProd ? ["Secure"] : []),
  ].join("; ");

  const headers = new Headers();
  headers.append("Set-Cookie", authCookie);
  headers.append("Set-Cookie", sidCookie);

  return new Response("ok", { status: 200, headers });
}

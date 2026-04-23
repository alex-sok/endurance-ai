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
  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password.trim() : "";
    if (!password) return new Response("Password required", { status: 400 });
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Fetch the stored hash using service role (bypasses RLS — password_hash never hits the client)
  const supabase = await createClient(true);
  const { data: portal, error } = await supabase
    .from("portals")
    .select("password_hash")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  // ── Uniform 401 for both "not found" and "wrong password" ────────────────
  // Returning different errors for each case lets attackers enumerate valid slugs.
  if (error || !portal) {
    // Small delay to match bcrypt timing and prevent timing-based enumeration
    await new Promise((r) => setTimeout(r, 200));
    return new Response("Unauthorized", { status: 401 });
  }

  if (!portal.password_hash) {
    // No password set — allow through
    return new Response("ok", { status: 200 });
  }

  // ── bcrypt compare ────────────────────────────────────────────────────────
  const valid = await bcrypt.compare(password, portal.password_hash);
  if (!valid) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Issue the session cookie
  const token = computeAuthToken(slug, portal.password_hash);
  const cookieName = `portal_auth_${slug}`;
  const cookieOptions = [
    `${cookieName}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${60 * 60 * 24 * 30}`, // 30 days
    ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
  ].join("; ");

  return new Response("ok", {
    status: 200,
    headers: { "Set-Cookie": cookieOptions },
  });
}

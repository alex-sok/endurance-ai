import { createHash, createHmac } from "crypto";
import { createClient } from "@/lib/supabase/server";

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

  if (error || !portal) return new Response("Not found", { status: 404 });
  if (!portal.password_hash) {
    // No password set — allow through
    return new Response("ok", { status: 200 });
  }

  // Hash the submitted password and compare
  const submittedHash = createHash("sha256").update(password).digest("hex");
  if (submittedHash !== portal.password_hash) {
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

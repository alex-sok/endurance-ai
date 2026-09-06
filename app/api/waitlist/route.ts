import { rateLimit, getIP } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* Waitlist signups. Same posture as /api/notify: origin allowlist, per-IP
   rate limit, sanitized input, and a service-role insert into a table the
   anon key can neither read nor write. Duplicates return ok without saying
   so, so the endpoint cannot be used to test which emails are on the list. */

const ALLOWED_ORIGINS = [
  "https://endurancelabs.ai",
  "https://www.endurancelabs.ai",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitize(value: unknown, maxLen = 200): string {
  return String(value ?? "")
    .trim()
    .replace(/[<>&"']/g, "")
    .slice(0, maxLen);
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const isDev = process.env.NODE_ENV !== "production";
  const isPreview = origin.endsWith(".vercel.app");
  if (!isDev && !isPreview && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response("forbidden", { status: 403 });
  }

  if (!rateLimit(`waitlist:${getIP(req)}`, 5, 60_000)) {
    return new Response("too many requests", { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  // honeypot: real people never fill this field
  if (typeof body.website === "string" && body.website.length > 0) {
    return new Response("ok", { status: 200 });
  }

  const email = sanitize(body.email).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return new Response("invalid email", { status: 400 });
  }

  const row = {
    email,
    name: sanitize(body.name) || null,
    company: sanitize(body.company) || null,
    source: "waitlist-page",
  };

  try {
    const supabase = await createClient(true);
    const { error } = await supabase.from("waitlist").insert(row);
    // 23505 = unique violation: already on the list. Treat as success so the
    // endpoint never reveals membership.
    if (error && error.code !== "23505") {
      console.error("[waitlist] insert failed:", error.message);
      return new Response("storage error", { status: 500 });
    }
  } catch (err) {
    console.error("[waitlist] insert threw:", err);
    return new Response("storage error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}

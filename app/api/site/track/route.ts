/**
 * POST /api/site/track
 *
 * Handles landing page analytics events.
 * Body shapes:
 *   { type: "session_start" }                                    → creates session, returns { session_id }
 *   { type: "section_view",  session_id, section_slug, duration_seconds? }
 *   { type: "chat_open",     session_id }
 *   { type: "cta_click",     session_id, section_slug }          → section_slug = CTA label
 *   { type: "page_exit",     session_id, duration_seconds, last_section?, last_section_duration? }
 */

import { createHmac } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, getIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // ── Rate limiting — 60 events/min per IP ─────────────────────────────────────
  const ip = getIP(request);
  if (!rateLimit(ip, 60, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : null;
  if (!type) return new Response("Bad request", { status: 400 });

  const supabase = await createClient(true);
  const ip = getIP(request);
  const ipHash = ip
    ? createHmac("sha256", "site-ip-salt").update(ip).digest("hex").slice(0, 16)
    : null;

  // ── Session start ─────────────────────────────────────────────────────────
  if (type === "session_start") {
    const { data: session, error } = await supabase
      .from("site_sessions")
      .insert({
        referrer:   request.headers.get("referer") ?? null,
        user_agent: request.headers.get("user-agent") ?? null,
        ip_hash:    ipHash,
      })
      .select("id")
      .single();

    if (error || !session) {
      return Response.json({ error: "Failed to create session" }, { status: 500 });
    }

    return Response.json({ session_id: session.id });
  }

  // ── All other events require a valid session_id ────────────────────────────
  const session_id = typeof body.session_id === "string" ? body.session_id : null;
  if (!session_id) return new Response("session_id required", { status: 400 });

  // Verify the session actually exists (prevents event injection against random UUIDs)
  const { data: session } = await supabase
    .from("site_sessions")
    .select("id")
    .eq("id", session_id)
    .single();
  if (!session) return new Response("Not found", { status: 404 });

  const now = new Date().toISOString();

  if (type === "section_view") {
    const section_slug     = typeof body.section_slug     === "string" ? body.section_slug     : null;
    const duration_seconds = typeof body.duration_seconds === "number" ? body.duration_seconds : null;

    await supabase.from("site_events").insert({
      session_id,
      event_type:   "section_view",
      section_slug,
      duration_seconds,
    });

    await supabase
      .from("site_sessions")
      .update({ last_seen_at: now })
      .eq("id", session_id);
  }

  if (type === "chat_open") {
    await supabase.from("site_events").insert({ session_id, event_type: "chat_open" });
    await supabase
      .from("site_sessions")
      .update({ chat_opened: true, last_seen_at: now })
      .eq("id", session_id);
  }

  if (type === "cta_click") {
    const section_slug = typeof body.section_slug === "string" ? body.section_slug : null;
    await supabase.from("site_events").insert({ session_id, event_type: "cta_click", section_slug });
  }

  if (type === "page_exit") {
    const duration_seconds      = typeof body.duration_seconds      === "number" ? body.duration_seconds      : null;
    const last_section          = typeof body.last_section          === "string" ? body.last_section          : null;
    const last_section_duration = typeof body.last_section_duration === "number" ? body.last_section_duration : null;

    if (last_section && last_section_duration != null) {
      await supabase.from("site_events").insert({
        session_id,
        event_type:       "section_view",
        section_slug:     last_section,
        duration_seconds: last_section_duration,
      });
    }

    await supabase
      .from("site_sessions")
      .update({ duration_seconds, last_seen_at: now })
      .eq("id", session_id);
  }

  return new Response("ok", { status: 200 });
}

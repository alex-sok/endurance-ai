import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Accepts section_view, chat_open, and page_exit events.
// Called fire-and-forget from the analytics hook; also handles sendBeacon blobs.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const session_id = typeof body.session_id === "string" ? body.session_id : null;
  const type       = typeof body.type       === "string" ? body.type       : null;
  if (!session_id || !type) return new Response("Bad request", { status: 400 });

  const supabase = await createClient(true);

  // Verify session belongs to this portal (prevents cross-portal event injection)
  const { data: session } = await supabase
    .from("portal_sessions")
    .select("id, portal_id")
    .eq("id", session_id)
    .single();

  if (!session) return new Response("Not found", { status: 404 });

  const now = new Date().toISOString();

  if (type === "section_view") {
    const section_slug     = typeof body.section_slug     === "string" ? body.section_slug     : null;
    const duration_seconds = typeof body.duration_seconds === "number" ? body.duration_seconds : null;

    await supabase.from("portal_events").insert({
      session_id,
      portal_id:    session.portal_id,
      event_type:   "section_view",
      section_slug,
      duration_seconds,
    });

    // Keep last_seen_at fresh
    await supabase
      .from("portal_sessions")
      .update({ last_seen_at: now })
      .eq("id", session_id);
  }

  if (type === "chat_open") {
    await supabase.from("portal_events").insert({
      session_id,
      portal_id:  session.portal_id,
      event_type: "chat_open",
    });
  }

  if (type === "page_exit") {
    const duration_seconds     = typeof body.duration_seconds     === "number" ? body.duration_seconds     : null;
    const last_section         = typeof body.last_section         === "string" ? body.last_section         : null;
    const last_section_duration = typeof body.last_section_duration === "number" ? body.last_section_duration : null;

    // Flush final section view if there's a pending one
    if (last_section && last_section_duration != null) {
      await supabase.from("portal_events").insert({
        session_id,
        portal_id:    session.portal_id,
        event_type:   "section_view",
        section_slug: last_section,
        duration_seconds: last_section_duration,
      });
    }

    // Stamp total duration on the session
    await supabase
      .from("portal_sessions")
      .update({ duration_seconds, last_seen_at: now })
      .eq("id", session_id);
  }

  return new Response("ok", { status: 200 });
}

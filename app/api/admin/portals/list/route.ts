/**
 * GET /api/admin/portals/list
 *
 * Returns all portals with chunk counts for the admin portal list.
 * Requires admin_auth cookie.
 */

import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, getIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // ── Rate limiting ─────────────────────────────────────────────────────────────
  const ip = getIP(request);
  if (!rateLimit(ip, 30, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();

  if (!expectedToken || authCookie !== expectedToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient(true);

  const { data: portals, error } = await supabase
    .from("portals")
    .select("id, slug, client_name, hero_title, hero_body, accent_color, is_published, password_hint, config, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Get chunk counts per portal
  const { data: chunks } = await supabase
    .from("portal_chunks")
    .select("portal_id");

  const chunkCounts: Record<string, number> = {};
  for (const chunk of chunks ?? []) {
    chunkCounts[chunk.portal_id] = (chunkCounts[chunk.portal_id] ?? 0) + 1;
  }

  const result = (portals ?? []).map((p) => ({
    ...p,
    chunk_count: chunkCounts[p.id] ?? 0,
  }));

  return Response.json(result);
}

/**
 * PATCH /api/admin/portals/[id]
 *
 * Updates an existing portal. Optionally re-syncs a new Notion page.
 * Requires admin_auth cookie.
 */

import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { fetchAndChunkPage } from "@/lib/notion-sync";
import { embedBatch } from "@/lib/embed";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function parseNotionPageId(url: string): string | null {
  const match = url.match(/([a-f0-9]{32})(?:[?&]|$)/i);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();

  if (!expectedToken || authCookie !== expectedToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, string | boolean>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const client_name  = body.client_name  as string | undefined;
  const hero_title   = body.hero_title   as string | undefined;
  const hero_body    = body.hero_body    as string | undefined;
  const accent_color = body.accent_color as string | undefined;
  const new_password = body.new_password as string | undefined;
  const notion_url   = body.notion_url   as string | undefined;
  const is_published = body.is_published;

  const supabase = await createClient(true);

  // ── Fetch current portal ──────────────────────────────────────────────────────
  const { data: portal, error: fetchError } = await supabase
    .from("portals")
    .select("id, slug, config")
    .eq("id", id)
    .single();

  if (fetchError || !portal) {
    return Response.json({ error: "Portal not found" }, { status: 404 });
  }

  // ── Build update payload ──────────────────────────────────────────────────────
  const updates: Record<string, unknown> = {};
  if (client_name !== undefined) updates.client_name = client_name;
  if (hero_title   !== undefined) updates.hero_title   = hero_title;
  if (hero_body    !== undefined) updates.hero_body    = hero_body?.trim() || null;
  if (accent_color !== undefined) updates.accent_color = accent_color;
  if (is_published !== undefined) updates.is_published = is_published === true || is_published === "true";

  if (new_password?.trim()) {
    updates.password_hash = await bcrypt.hash(new_password, 12);
    updates.password_hint = `${new_password.slice(0, 2)}****`;
  }

  // ── Parse new Notion URL ──────────────────────────────────────────────────────
  let newNotionPageId: string | null = null;
  if (notion_url?.trim()) {
    newNotionPageId = parseNotionPageId(notion_url);
    if (!newNotionPageId) {
      return Response.json({ error: "Could not parse Notion page ID from URL" }, { status: 400 });
    }
    const existingPages = ((portal.config as Record<string, unknown>)?.notion_pages ?? []) as string[];
    if (!existingPages.includes(newNotionPageId)) {
      updates.config = { ...portal.config, notion_pages: [...existingPages, newNotionPageId] };
    }
  }

  // ── Update portal ─────────────────────────────────────────────────────────────
  const { error: updateError } = await supabase
    .from("portals")
    .update(updates)
    .eq("id", id);

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 500 });
  }

  // ── Sync new Notion page ──────────────────────────────────────────────────────
  let syncResult: Record<string, unknown> | null = null;

  if (newNotionPageId && process.env.NOTION_API_TOKEN) {
    try {
      const chunks = await fetchAndChunkPage(newNotionPageId, process.env.NOTION_API_TOKEN);

      if (chunks.length > 0) {
        const BATCH_SIZE = 20;
        const embeddings: (number[] | null)[] = [];

        for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
          const batch = chunks.slice(i, i + BATCH_SIZE);
          embeddings.push(...await embedBatch(batch.map((c) => c.content)));
        }

        const rows = chunks
          .map((chunk, i) => ({
            portal_id: id,
            content: chunk.content,
            embedding: embeddings[i],
            metadata: {
              source_url: chunk.source_url,
              source_title: chunk.source_title,
              chunk_index: chunk.chunk_index,
              synced_at: new Date().toISOString(),
            },
          }))
          .filter((row) => row.embedding !== null);

        if (rows.length > 0) {
          await supabase.from("portal_chunks").insert(rows);
        }

        syncResult = { chunks_found: chunks.length, chunks_embedded: rows.length };
      } else {
        syncResult = { chunks_found: 0, chunks_embedded: 0, note: "No content found in Notion page" };
      }
    } catch (err) {
      console.error("[admin] Sync failed:", err);
      syncResult = { error: "Sync failed — check Notion connection" };
    }
  }

  return Response.json({ ok: true, sync: syncResult });
}

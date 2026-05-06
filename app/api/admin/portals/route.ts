/**
 * POST /api/admin/portals
 *
 * Creates a new mission portal: portal record, 6 sections, and optionally
 * runs the Notion sync pipeline in one shot.
 *
 * Requires admin_auth cookie (set via /api/admin/auth).
 */

import { cookies } from "next/headers";
import { computeAdminToken } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { fetchAndChunkPage } from "@/lib/notion-sync";
import { embedBatch } from "@/lib/embed";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const DEFAULT_SECTIONS = [
  { slug: "overview", title: "Overview", sort_order: 0 },
  { slug: "problem",  title: "Problem",  sort_order: 1 },
  { slug: "solution", title: "Solution", sort_order: 2 },
  { slug: "roadmap",  title: "Roadmap",  sort_order: 3 },
  { slug: "team",     title: "Team",     sort_order: 4 },
  { slug: "metrics",  title: "Metrics",  sort_order: 5 },
];

function parseNotionPageId(url: string): string | null {
  const match = url.match(/([a-f0-9]{32})(?:[?&]|$)/i);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

export async function POST(request: Request) {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth")?.value;
  const expectedToken = computeAdminToken();

  if (!expectedToken || authCookie !== expectedToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, client_name, password, hero_title, hero_body, notion_url } = body;

  if (!slug || !client_name || !password || !hero_title) {
    return Response.json(
      { error: "slug, client_name, password, and hero_title are required" },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return Response.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }

  // ── Parse Notion URL ─────────────────────────────────────────────────────────
  let notionPageId: string | null = null;
  if (notion_url?.trim()) {
    notionPageId = parseNotionPageId(notion_url);
    if (!notionPageId) {
      return Response.json({ error: "Could not parse Notion page ID from URL" }, { status: 400 });
    }
  }

  // ── Hash password ─────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(password, 12);
  const passwordHint = `${password.slice(0, 2)}****`;

  const supabase = await createClient(true);

  // ── Check for duplicate slug ──────────────────────────────────────────────────
  const { data: existing } = await supabase
    .from("portals")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    return Response.json({ error: `Portal "${slug}" already exists` }, { status: 409 });
  }

  // ── Create portal ─────────────────────────────────────────────────────────────
  const { data: portal, error: portalError } = await supabase
    .from("portals")
    .insert({
      slug,
      client_name,
      hero_title,
      hero_body: hero_body?.trim() || null,
      is_published: true,
      password_hash: passwordHash,
      password_hint: passwordHint,
      config: { notion_pages: notionPageId ? [notionPageId] : [] },
    })
    .select("id")
    .single();

  if (portalError || !portal) {
    return Response.json(
      { error: portalError?.message ?? "Failed to create portal" },
      { status: 500 }
    );
  }

  // ── Create sections ───────────────────────────────────────────────────────────
  const { error: sectionsError } = await supabase.from("portal_sections").insert(
    DEFAULT_SECTIONS.map((s) => ({ ...s, portal_id: portal.id, body: "" }))
  );

  if (sectionsError) {
    return Response.json(
      { error: `Portal created but sections failed: ${sectionsError.message}` },
      { status: 500 }
    );
  }

  // ── Sync Notion (if page provided) ────────────────────────────────────────────
  let syncResult: Record<string, unknown> | null = null;

  if (notionPageId && process.env.NOTION_API_TOKEN) {
    try {
      const chunks = await fetchAndChunkPage(notionPageId, process.env.NOTION_API_TOKEN);

      if (chunks.length > 0) {
        const BATCH_SIZE = 20;
        const embeddings: (number[] | null)[] = [];

        for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
          const batch = chunks.slice(i, i + BATCH_SIZE);
          embeddings.push(...await embedBatch(batch.map((c) => c.content)));
        }

        const rows = chunks
          .map((chunk, i) => ({
            portal_id: portal.id,
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
      syncResult = { error: "Sync failed — run manually after fixing Notion connection" };
    }
  }

  return Response.json({
    ok: true,
    portal_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mission/${slug}`,
    slug,
    password,
    sync: syncResult,
  });
}

/**
 * POST /api/portal/[slug]/sync
 *
 * Syncs Notion pages linked to a portal into portal_chunks for RAG.
 * Pipeline: Notion pages → text → chunks → xAI embeddings → pgvector
 *
 * Secured with x-sync-secret header (matches SUPABASE_WEBHOOK_SECRET).
 * Call manually or wire to a cron/webhook later.
 *
 * Example:
 *   curl -X POST https://endurancelabs.ai/api/portal/capfund1/sync \
 *     -H "x-sync-secret: YOUR_SECRET"
 */

import { createClient } from "@/lib/supabase/server";
import { fetchAndChunkPage } from "@/lib/notion-sync";
import { embedBatch } from "@/lib/embed";

export const dynamic = "force-dynamic";
// Notion fetches + embedding can take a while for large workspaces
export const maxDuration = 300;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // ── Auth ───────────────────────────────────────────────────────────────────
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get("x-sync-secret");
    if (header !== secret) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Check env vars ─────────────────────────────────────────────────────────
  const notionToken = process.env.NOTION_API_TOKEN;
  if (!notionToken) {
    return Response.json({ error: "NOTION_API_TOKEN not set" }, { status: 500 });
  }
  if (!process.env.XAI_API_KEY) {
    return Response.json({ error: "XAI_API_KEY not set" }, { status: 500 });
  }

  // ── Load portal ────────────────────────────────────────────────────────────
  const supabase = await createClient(true);
  const { data: portal, error } = await supabase
    .from("portals")
    .select("id, client_name, config")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !portal) {
    return Response.json({ error: "Portal not found" }, { status: 404 });
  }

  const notionPages: string[] = portal.config?.notion_pages ?? [];
  if (notionPages.length === 0) {
    return Response.json({
      error: "No Notion pages configured. Set config.notion_pages on this portal.",
    }, { status: 400 });
  }

  console.log(`[sync] ${slug}: syncing ${notionPages.length} root page(s)`);

  // ── Fetch + chunk all pages ────────────────────────────────────────────────
  const allChunks = [];
  for (const pageId of notionPages) {
    console.log(`[sync] Fetching Notion page: ${pageId}`);
    const chunks = await fetchAndChunkPage(pageId, notionToken);
    allChunks.push(...chunks);
    console.log(`[sync] Got ${chunks.length} chunks from page ${pageId}`);
  }

  if (allChunks.length === 0) {
    return Response.json({ message: "No content found in Notion pages", chunks: 0 });
  }

  // ── Embed in batches of 20 ─────────────────────────────────────────────────
  const BATCH_SIZE = 20;
  const embeddings: (number[] | null)[] = [];

  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const batchEmbeddings = await embedBatch(batch.map((c) => c.content));
    const nullCount = batchEmbeddings.filter((e) => e === null).length;
    if (nullCount > 0) {
      console.error(`[sync] ${nullCount}/${batchEmbeddings.length} embeddings returned null — check OPENAI_API_KEY`);
    }
    embeddings.push(...batchEmbeddings);
    console.log(`[sync] Embedded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allChunks.length / BATCH_SIZE)}`);
  }

  const nullEmbeddings = embeddings.filter((e) => e === null).length;
  const firstEmbeddingDim = embeddings.find((e) => e !== null)?.length ?? 0;
  console.log(`[sync] Embeddings: ${embeddings.length - nullEmbeddings} succeeded, ${nullEmbeddings} null, first dim=${firstEmbeddingDim}`);

  if (nullEmbeddings === embeddings.length) {
    return Response.json({
      error: "All embeddings failed — OPENAI_API_KEY is missing or invalid on this server",
      chunks_found: allChunks.length,
      chunks_embedded: 0,
    }, { status: 500 });
  }

  // ── Clear old chunks from Notion sources, then insert new ones ────────────
  // Delete existing Notion-sourced chunks for this portal before reinserting
  await supabase
    .from("portal_chunks")
    .delete()
    .eq("portal_id", portal.id)
    .not("metadata->>source_url", "is", null);

  // Build rows
  const rows = allChunks
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

  const { error: insertError } = await supabase
    .from("portal_chunks")
    .insert(rows);

  if (insertError) {
    console.error("[sync] Insert error:", insertError);
    return Response.json({ error: insertError.message }, { status: 500 });
  }

  const result = {
    portal: slug,
    pages_synced: notionPages.length,
    chunks_found: allChunks.length,
    chunks_embedded: rows.length,
    skipped: allChunks.length - rows.length,
    embedding_stats: {
      total: embeddings.length,
      succeeded: embeddings.length - nullEmbeddings,
      failed: nullEmbeddings,
      first_dim: firstEmbeddingDim,
    },
  };

  console.log("[sync] Complete:", result);
  return Response.json(result);
}

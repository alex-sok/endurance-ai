-- ─────────────────────────────────────────────────────────────────────────────
-- Notion sync support
-- 1. Wire CapFund1 portal to its Notion workspace root page
-- 2. Lower the match_chunks similarity threshold for better RAG recall
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Set CapFund1 Notion pages ─────────────────────────────────────────────
-- Points to the "CapFund1 Real Estate Investments" root page.
-- All child pages (Deal That Works, General Investment Criteria, etc.)
-- are fetched recursively by the sync pipeline.
update portals
set config = jsonb_set(
  coalesce(config, '{}'),
  '{notion_pages}',
  '["56ed4df2-50ad-835f-8528-0142e6099d75"]'::jsonb
)
where slug = 'capfund1';

-- ── 2. Loosen similarity threshold in match_chunks ────────────────────────────
-- Default was 0.75 — too strict for conversational queries.
-- 0.5 gives better recall while still filtering noise.
create or replace function match_chunks(
  query_embedding vector(1536),
  match_portal_id uuid,
  match_count     int default 5,
  match_threshold float default 0.5
)
returns table (
  id       uuid,
  content  text,
  metadata jsonb,
  similarity float
)
language sql stable as $$
  select
    c.id,
    c.content,
    c.metadata,
    1 - (c.embedding <=> query_embedding) as similarity
  from portal_chunks c
  where c.portal_id = match_portal_id
    and 1 - (c.embedding <=> query_embedding) > match_threshold
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

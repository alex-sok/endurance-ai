-- ─────────────────────────────────────────────────────────────────────────────
-- Mission Portal Schema
-- Run this in Supabase SQL Editor (Database → SQL Editor → New query)
-- Requires the "vector" extension to be enabled first (Settings → Database → Extensions)
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable pgvector
create extension if not exists vector;

-- ── Portals ───────────────────────────────────────────────────────────────────
-- One row per client portal (e.g. "capfund1")
create table if not exists portals (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,          -- URL key: /mission/capfund1
  client_name   text not null,                  -- Display name: "CapFund1"
  tagline       text,                           -- Hero subtitle
  logo_url      text,                           -- Optional client logo
  hero_title    text,                           -- H1 on portal hero
  hero_body     text,                           -- Supporting paragraph
  accent_color  text default '#5b8dee',         -- Per-portal brand color
  is_published  boolean default false,          -- Draft vs. live
  password_hash text,                           -- Optional portal password (bcrypt)
  config        jsonb default '{}',             -- Catch-all for future settings
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Portal Sections ───────────────────────────────────────────────────────────
-- The 6 visual canvas modules shown in the portal nav
create table if not exists portal_sections (
  id          uuid primary key default gen_random_uuid(),
  portal_id   uuid not null references portals(id) on delete cascade,
  slug        text not null,                    -- "overview" | "problem" | "solution" | "roadmap" | "team" | "metrics"
  title       text not null,
  icon        text,                             -- Lucide icon name
  content     jsonb default '{}',              -- Flexible structured content
  sort_order  int default 0,
  is_visible  boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique(portal_id, slug)
);

-- ── Portal Documents ──────────────────────────────────────────────────────────
-- Source files uploaded to power the RAG chat
create table if not exists portal_documents (
  id          uuid primary key default gen_random_uuid(),
  portal_id   uuid not null references portals(id) on delete cascade,
  filename    text not null,
  file_url    text,                             -- Supabase Storage URL
  mime_type   text,
  byte_size   int,
  status      text default 'pending',          -- pending | processing | ready | error
  error_msg   text,
  created_at  timestamptz default now()
);

-- ── Portal Chunks (RAG) ───────────────────────────────────────────────────────
-- Text chunks with embeddings for semantic search
create table if not exists portal_chunks (
  id          uuid primary key default gen_random_uuid(),
  portal_id   uuid not null references portals(id) on delete cascade,
  document_id uuid references portal_documents(id) on delete cascade,
  content     text not null,
  embedding   vector(1536),                    -- OpenAI text-embedding-3-small
  metadata    jsonb default '{}',
  created_at  timestamptz default now()
);

-- Index for fast similarity search
create index if not exists portal_chunks_embedding_idx
  on portal_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ── Portal Sessions ───────────────────────────────────────────────────────────
-- Analytics: one row per portal visit
create table if not exists portal_sessions (
  id            uuid primary key default gen_random_uuid(),
  portal_id     uuid not null references portals(id) on delete cascade,
  visitor_id    text,                           -- Anonymous fingerprint
  referrer      text,
  user_agent    text,
  ip_hash       text,                           -- Hashed for privacy
  started_at    timestamptz default now(),
  last_seen_at  timestamptz default now(),
  page_views    int default 1,
  chat_turns    int default 0,
  lead_captured boolean default false
);

-- ── Portal Messages ───────────────────────────────────────────────────────────
-- Chat history per session (for CRM/review)
create table if not exists portal_messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references portal_sessions(id) on delete cascade,
  portal_id   uuid not null references portals(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  created_at  timestamptz default now()
);

-- ── Portal Leads ─────────────────────────────────────────────────────────────
-- Captured contact info from portal visitors
create table if not exists portal_leads (
  id          uuid primary key default gen_random_uuid(),
  portal_id   uuid not null references portals(id) on delete cascade,
  session_id  uuid references portal_sessions(id),
  name        text,
  email       text,
  company     text,
  notes       text,
  score       int,                              -- Grok interest score
  created_at  timestamptz default now()
);

-- ── updated_at trigger ────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger portals_updated_at
  before update on portals
  for each row execute function set_updated_at();

create trigger portal_sections_updated_at
  before update on portal_sections
  for each row execute function set_updated_at();

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Portals: anyone can read published portals; only service role can write
alter table portals enable row level security;
create policy "Public can view published portals"
  on portals for select
  using (is_published = true);

alter table portal_sections enable row level security;
create policy "Public can view sections of published portals"
  on portal_sections for select
  using (
    exists (
      select 1 from portals p
      where p.id = portal_id and p.is_published = true
    )
  );

alter table portal_chunks enable row level security;
create policy "Public can search chunks of published portals"
  on portal_chunks for select
  using (
    exists (
      select 1 from portals p
      where p.id = portal_id and p.is_published = true
    )
  );

alter table portal_sessions enable row level security;
create policy "Service role only for sessions"
  on portal_sessions for all
  using (false);

alter table portal_messages enable row level security;
create policy "Service role only for messages"
  on portal_messages for all
  using (false);

alter table portal_leads enable row level security;
create policy "Service role only for leads"
  on portal_leads for all
  using (false);

alter table portal_documents enable row level security;
create policy "Service role only for documents"
  on portal_documents for all
  using (false);

-- ── match_chunks function (RAG retrieval) ─────────────────────────────────────
create or replace function match_chunks(
  query_embedding vector(1536),
  match_portal_id uuid,
  match_count     int default 5,
  match_threshold float default 0.75
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

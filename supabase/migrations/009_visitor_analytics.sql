-- ─────────────────────────────────────────────────────────────────────────────
-- 009: Visitor analytics — email identity + section event tracking
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Extend portal_sessions with identity + duration
alter table portal_sessions
  add column if not exists email           text,
  add column if not exists name            text,
  add column if not exists duration_seconds int;

-- Per-event tracking: section views, chat opens, page exits
create table if not exists portal_events (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references portal_sessions(id) on delete cascade,
  portal_id        uuid not null references portals(id) on delete cascade,
  event_type       text not null,      -- 'section_view' | 'chat_open' | 'page_exit'
  section_slug     text,               -- populated for section_view events
  duration_seconds int,                -- seconds on section / total session for page_exit
  payload          jsonb default '{}',
  created_at       timestamptz default now()
);

create index if not exists portal_events_session_id_idx on portal_events(session_id);
create index if not exists portal_events_portal_id_idx  on portal_events(portal_id);

-- RLS: service role only (same pattern as sessions)
alter table portal_events enable row level security;
create policy "Service role only for events"
  on portal_events for all
  using (false);

-- Index for analytics queries on sessions
create index if not exists portal_sessions_portal_id_idx on portal_sessions(portal_id);
create index if not exists portal_sessions_started_at_idx on portal_sessions(started_at desc);

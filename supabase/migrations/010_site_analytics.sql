-- ─────────────────────────────────────────────────────────────────────────────
-- 010: Site analytics — public marketing page session + event tracking
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists site_sessions (
  id               uuid primary key default gen_random_uuid(),
  referrer         text,
  user_agent       text,
  ip_hash          text,
  duration_seconds int,
  chat_opened      boolean default false,
  started_at       timestamptz default now(),
  last_seen_at     timestamptz default now()
);

create table if not exists site_events (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references site_sessions(id) on delete cascade,
  event_type       text not null,   -- 'section_view' | 'chat_open' | 'cta_click' | 'page_exit'
  section_slug     text,            -- which section was viewed / which cta was clicked
  duration_seconds int,             -- seconds spent on section (for section_view)
  created_at       timestamptz default now()
);

create index if not exists site_events_session_id_idx on site_events(session_id);
create index if not exists site_sessions_started_at_idx on site_sessions(started_at desc);

-- RLS: service role only
alter table site_sessions enable row level security;
create policy "Service role only for site_sessions"
  on site_sessions for all using (false);

alter table site_events enable row level security;
create policy "Service role only for site_events"
  on site_events for all using (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- 012: Site messages — stores chat conversation history from the landing page
-- Each row is one message (user or assistant) tied to a site session
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists site_messages (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references site_sessions(id) on delete cascade,
  role         text not null check (role in ('user', 'assistant')),
  content      text not null,
  created_at   timestamptz default now()
);

create index if not exists site_messages_session_id_idx on site_messages(session_id);
create index if not exists site_messages_created_at_idx on site_messages(created_at desc);

-- RLS: service role only
alter table site_messages enable row level security;
create policy "Service role only for site_messages"
  on site_messages for all using (false);

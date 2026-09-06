-- ─────────────────────────────────────────────────────────────────────────────
-- 013: Waitlist — early-access signups from /waitlist
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  name       text,
  company    text,
  source     text default 'waitlist-page',
  created_at timestamptz default now()
);

create index if not exists waitlist_created_at_idx on waitlist(created_at desc);

-- RLS: service role only — the anon key can neither read nor write this table
alter table waitlist enable row level security;
create policy "Service role only for waitlist"
  on waitlist for all using (false);

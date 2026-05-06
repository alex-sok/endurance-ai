-- ─────────────────────────────────────────────────────────────────────────────
-- 011: Site leads — captures contact info submitted through the landing page chat
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists site_leads (
  id           uuid primary key default gen_random_uuid(),
  type         text not null,          -- 'lead-capture' | 'mission-intake' | 'talk-to-team'
  name         text,
  email        text,
  company      text,
  -- mission-intake fields
  mission      text,
  obstacle     text,
  stakes       text,
  internal_challenges text,
  -- scoring
  score        int,
  score_reasoning text,
  -- metadata
  created_at   timestamptz default now()
);

create index if not exists site_leads_created_at_idx on site_leads(created_at desc);
create index if not exists site_leads_email_idx on site_leads(email);

-- RLS: service role only
alter table site_leads enable row level security;
create policy "Service role only for site_leads"
  on site_leads for all using (false);

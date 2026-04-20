-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: CapFund1 Portal
-- Real estate investment underwriting — first Mission Portal
-- ─────────────────────────────────────────────────────────────────────────────

-- Insert the portal
insert into portals (slug, client_name, tagline, hero_title, hero_body, accent_color, is_published)
values (
  'capfund1',
  'CapFund1',
  'Real Estate Investment Intelligence',
  'Your Mission Briefing',
  'We''ve built a strategic assessment of how AI can accelerate your investment underwriting process — from deal screening to close. Explore the analysis below, then speak directly with our system to go deeper.',
  '#5b8dee',
  true
)
on conflict (slug) do nothing;

-- Insert the 6 default sections
with portal as (
  select id from portals where slug = 'capfund1'
)
insert into portal_sections (portal_id, slug, title, icon, sort_order, content)
select
  p.id,
  s.slug,
  s.title,
  s.icon,
  s.sort_order,
  s.content::jsonb
from portal p
cross join (
  values
    ('overview',  'Overview',       'LayoutDashboard', 0, '{"summary": "High-level view of the engagement scope and objectives."}'),
    ('problem',   'The Challenge',  'Target',          1, '{"summary": "The underwriting bottlenecks slowing deal velocity and introducing risk."}'),
    ('solution',  'Our Approach',   'Zap',             2, '{"summary": "The AI-powered systems we''re proposing to deploy."}'),
    ('roadmap',   'Roadmap',        'Map',             3, '{"summary": "Phased implementation plan with milestones and timelines."}'),
    ('team',      'The Team',       'Users',           4, '{"summary": "The Endurance AI Labs team leading this engagement."}'),
    ('metrics',   'Success Metrics','BarChart2',       5, '{"summary": "How we define and measure success together."}')
) as s(slug, title, icon, sort_order, content)
on conflict (portal_id, slug) do nothing;

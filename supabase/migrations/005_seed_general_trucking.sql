-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: General Trucking Portal
-- AI Recruiting Initiative — password: GT2Infinity
-- ─────────────────────────────────────────────────────────────────────────────

insert into portals (
  slug, client_name, tagline, hero_title, hero_body,
  accent_color, is_published, password_hash
)
values (
  'general-trucking',
  'General Trucking',
  'AI Recruiting Initiative',
  'Your Mission Briefing',
  'General Trucking has 14 open dedicated driver lanes costing an estimated $1M+ in annual profit — business currently being sold off to partner carriers. This briefing outlines a phased AI-powered recruiting solution to fill those lanes faster, reduce qualification time from days to minutes, and improve driver retention through better expectation-setting.',
  '#5b8dee',
  true,
  '3a42920e62e556b1982a37df14d73be01d637675ac2637417bc08f2e63d767aa'
)
on conflict (slug) do nothing;

-- Insert 6 sections
with portal as (
  select id from portals where slug = 'general-trucking'
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

-- ── 01 Overview ──────────────────────────────────────────────────────────────
('overview', 'Overview', 'LayoutDashboard', 0, '{
  "body": "A phased AI-powered recruiting initiative to fill 14 open dedicated driver lanes — reducing the qualification window from 3–5 days to minutes, cutting drop-off at application, and improving retention by setting accurate expectations upfront. No rip-and-replace. Every tool plugs into the recruiting workflow General Trucking already runs.",
  "bullets": [
    "Client: General Trucking (contact: Chris)",
    "Recruiting lead: Desher Guthrie",
    "Engagement start: April 2026",
    "Scope: 3 phases across 2–3 weeks",
    "Focus: Facebook ad funnel → pre-qualification → application intake",
    "Pending: NDA signature and materials handoff from Desher before full scope is finalized"
  ]
}'),

-- ── 02 Problem ───────────────────────────────────────────────────────────────
('problem', 'The Challenge', 'Target', 1, '{
  "body": "14 dedicated driver lanes sit open while the business bleeds profit to partner carriers. The root causes are upstream — in how drivers are attracted, qualified, and onboarded.",
  "challenges": [
    {
      "title": "$1M+ revenue at risk",
      "description": "Open dedicated lanes are being covered by partner carriers at a significant margin loss. Every unfilled lane is a direct hit to annual profit."
    },
    {
      "title": "3–5 day qualification window",
      "description": "Manual qualification is slow. Leads go cold before anyone speaks with them — especially candidates who applied through Facebook and expected instant engagement."
    },
    {
      "title": "~15% lead-to-application rate",
      "description": "Only 15% of Facebook leads (20–40/day across 12 campaigns) make it to a full application. The funnel is leaking at pre-qualification and intake."
    },
    {
      "title": "Expectation mismatch driving churn",
      "description": "Drivers quit because the job is not what the JD described — particularly on high-churn lanes like Toledo shuttle and Three Rivers. The problem starts at the ad, not at the terminal."
    },
    {
      "title": "High ad spend, low downstream yield",
      "description": "12 active Facebook campaigns generating 20–40 leads per day, but the qualification bottleneck means most of that spend never converts to a seated driver."
    },
    {
      "title": "Manual, disconnected stack",
      "description": "Qualification, application, and onboarding are handled across disconnected tools with no automated handoff. Qualified candidates re-enter information at every step."
    }
  ]
}'),

-- ── 03 Solution ──────────────────────────────────────────────────────────────
('solution', 'Our Approach', 'Zap', 2, '{
  "body": "Three sequential phases that fix the funnel from top to bottom — starting with the message, then automating engagement, then removing friction at application.",
  "pillars": [
    {
      "title": "Job Description Optimization",
      "tag": "Phase 1 — Week 1",
      "description": "Rewrite all 14 open lane JDs using data-driven insights to set accurate expectations upfront. A/B test on Facebook and Indeed. Fixing the message before scaling volume ensures every ad dollar attracts candidates who will actually stay — especially for high-churn lanes like Toledo and Three Rivers."
    },
    {
      "title": "AI Pre-Qualification Agent",
      "tag": "Phase 2 — Weeks 1–2",
      "description": "Deploy an AI voice/chat agent triggered directly from Facebook ads — engaging and pre-qualifying leads the moment they click, not 3–5 days later. Qualification criteria: CDL type, experience, availability, home-time needs. Built and configured by Sid. Cuts qualification time to minutes."
    },
    {
      "title": "Application Intake Streamlining",
      "tag": "Phase 3 — Weeks 2–3",
      "description": "Remove friction between pre-qualification and full application. Auto-populate intake fields from AI agent data. Simplify the form for mobile-first completion. Integrate with Desher''s current recruiting stack. Qualified candidates should never re-enter information they already gave the AI."
    }
  ]
}'),

-- ── 04 Roadmap ───────────────────────────────────────────────────────────────
('roadmap', 'Roadmap', 'Map', 3, '{
  "phases": [
    {
      "phase": "1",
      "title": "Job Description Optimization",
      "duration": "Week 1",
      "milestones": [
        "Review current JDs for all 14 open dedicated driver lanes",
        "Identify expectation gaps causing churn (Toledo shuttle, Three Rivers lanes)",
        "Rewrite JDs to accurately reflect schedule, workload, and home-time expectations",
        "A/B test updated JDs on Facebook and Indeed campaigns",
        "Deliverable: Optimized job descriptions for all open lanes",
        "Owner: Endurance AI Labs + Desher Guthrie"
      ]
    },
    {
      "phase": "2",
      "title": "AI Pre-Qualification Agent",
      "duration": "Weeks 1–2",
      "milestones": [
        "Audit current Facebook ad campaigns (12 active, 20–40 leads/day)",
        "Define qualification criteria: CDL type, experience, availability, home-time needs",
        "Build and configure AI voice/chat agent for instant lead engagement",
        "Connect agent directly to Facebook ad traffic",
        "Internal testing and quality review before go-live",
        "Deliverable: Live AI pre-qualification agent on Facebook ad funnel",
        "Owner: Endurance AI Labs (Sid)"
      ]
    },
    {
      "phase": "3",
      "title": "Application Intake Streamlining",
      "duration": "Weeks 2–3",
      "milestones": [
        "Map current application flow and identify drop-off points",
        "Simplify and shorten the application form for mobile-first completion",
        "Auto-populate fields from pre-qualification data captured by the AI agent",
        "Integrate with Desher''s current recruiting stack",
        "Monitor completion rates and iterate",
        "Deliverable: Streamlined application intake with AI data handoff",
        "Owner: Endurance AI Labs + Desher Guthrie"
      ]
    },
    {
      "phase": "4",
      "title": "Scope Finalization + Pricing",
      "duration": "Post-NDA",
      "milestones": [
        "NDA signed by Chris",
        "Desher shares materials: JDs, Facebook campaigns, retention program",
        "Endurance AI Labs scopes project and finalizes pricing",
        "Proposal review call scheduled"
      ]
    }
  ]
}'),

-- ── 05 Team ───────────────────────────────────────────────────────────────────
('team', 'The Team', 'Users', 4, '{
  "members": [
    {
      "name": "Alex Sok",
      "role": "Founder & CEO, Endurance AI Labs",
      "bio": "Leading the General Trucking engagement. Responsible for strategy, delivery, and client relationship."
    },
    {
      "name": "Sid Bhambhani",
      "role": "Co-Founder & CTO, Endurance AI Labs",
      "bio": "Building and configuring the AI pre-qualification agent. 20 years in enterprise software and automation infrastructure."
    },
    {
      "name": "Nick Maxwell",
      "role": "Co-Founder & Chief AI Officer, Endurance AI Labs",
      "bio": "AI systems architecture. Previously led AI initiatives at TALA and Intuit. Cornell CS."
    },
    {
      "name": "Chris",
      "role": "Owner, General Trucking",
      "bio": "Executive sponsor. Responsible for NDA review and strategic direction. Also focused on growing the brokerage division."
    },
    {
      "name": "Desher Guthrie",
      "role": "Recruiting Lead, General Trucking",
      "bio": "Day-to-day recruiting operations. Managing 12 active Facebook campaigns and the current application stack. Materials point of contact."
    }
  ]
}'),

-- ── 06 Metrics ────────────────────────────────────────────────────────────────
('metrics', 'Success Metrics', 'BarChart2', 5, '{
  "body": "Success is defined by filling lanes faster with drivers who stay. These are the benchmarks we are building toward.",
  "kpis": [
    {
      "label": "Open Dedicated Lanes",
      "value": "14",
      "description": "Current open positions costing the business partner carrier margins on every load."
    },
    {
      "label": "Est. Revenue at Risk",
      "value": "$1M+",
      "description": "Annual profit lost to partner carriers while dedicated lanes remain unfilled."
    },
    {
      "label": "Daily Facebook Leads",
      "value": "20–40",
      "description": "Leads generated daily across 12 active campaigns. Volume is not the problem — conversion is."
    },
    {
      "label": "Current Conversion Rate",
      "value": "~15%",
      "description": "Leads to full applications. Target is 30%+ after intake streamlining."
    },
    {
      "label": "Qualification Time",
      "value": "3–5 days",
      "description": "Current manual process. Target: under 5 minutes with the AI pre-qualification agent."
    },
    {
      "label": "Deployment Target",
      "value": "2–3 wks",
      "description": "Full implementation timeline across all three phases."
    }
  ]
}')

) as s(slug, title, icon, sort_order, content)
on conflict (portal_id, slug) do nothing;

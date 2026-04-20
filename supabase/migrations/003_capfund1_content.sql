-- ─────────────────────────────────────────────────────────────────────────────
-- CapFund1 Section Content
-- Capital Funding Partners — Underwriting Automation
-- ─────────────────────────────────────────────────────────────────────────────

-- Update portal hero
update portals set
  client_name  = 'Capital Funding Partners',
  tagline      = 'Underwriting Automation',
  hero_title   = 'Your Mission Briefing',
  hero_body    = 'A strategic assessment of how AI can eliminate the manual, repetitive work in your underwriting process — from deal screening to IC memo — without replacing a single tool your team already uses.',
  accent_color = '#5b8dee'
where slug = 'capfund1';

-- ── 01 Overview ───────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "body": "A lightweight Claude-powered automation layer on top of CFP''s existing workflow. No platform replacement. The tools plug into Excel, Dropbox, email, and Word — the infrastructure you already use. Built for Ramzy and Wayne to run locally with zero new tools to learn.",
  "bullets": [
    "Client: Capital Funding Partners (CFP)",
    "Engagement start: April 2026",
    "Scope: 3 core deliverables across Stages 2, 3, 9, and 10",
    "Tech: Python + Claude Opus 4.6, runs locally — no server needed",
    "Out of scope (v1): Endex plugin replacement, pipeline tracker, Dropbox integration, post-LOI automation"
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'overview';

-- ── 02 Problem ────────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "body": "CFP underwrites multifamily acquisitions across a 12-stage process that is largely manual, repetitive, and spread across Excel, Dropbox, Word docs, and email.",
  "challenges": [
    {
      "title": "High-friction intake",
      "description": "Deal logging, document requests, and broker outreach are copy-paste work that consumes hours before any real underwriting begins."
    },
    {
      "title": "Slow back-of-envelope",
      "description": "Running a basic screen on a deal takes 2–4 hours. Most deals are NO-GOs — that time is largely wasted."
    },
    {
      "title": "Manual memo drafting",
      "description": "IC memo production takes 4–8 hours per deal. It''s structured, repeatable work that follows a known template every time."
    },
    {
      "title": "Fragmented toolset",
      "description": "Excel, Dropbox, Word, and email — no single source of truth. Context lives in someone''s head or an email thread."
    },
    {
      "title": "Judgment crowded out",
      "description": "Ramzy and Wayne spend the majority of their time on work that is high-friction but low-judgment, leaving less time for actual investment decisions."
    },
    {
      "title": "No audit trail",
      "description": "Screening decisions and pass/fail rationale aren''t captured consistently. IC has no structured record of why deals were advanced or killed."
    }
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'problem';

-- ── 03 Solution ───────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "body": "Three deliverables that automate the highest-friction, lowest-judgment stages of the pipeline. Each one plugs into what you already use.",
  "pillars": [
    {
      "title": "Deal Screener",
      "tag": "Stage 2 — Building Now",
      "description": "Ingests a deal from broker OM data or manual input and returns a structured PASS / NO-GO in under 5 minutes. Outputs: going-in cap rate, expense ratio, estimated levered IRR, loss-to-lease %, and a narrative rationale. No model required before the decision."
    },
    {
      "title": "Comparative Analysis Engine",
      "tag": "Stage 2→1 Feedback Loop",
      "description": "For each screening batch, produces a written explanation of why passing deals passed and failing deals failed — mapped to CFP''s specific acquisition criteria. Creates an audit trail for IC and trains team intuition over time."
    },
    {
      "title": "Underwriting Pipeline Automation",
      "tag": "Stages 3, 9, 10 — Queued",
      "description": "Three automations that fire in sequence for deals that pass screening: (1) Document Request Email with the full broker/sponsor checklist, (2) Market Research Narrative drafted from CoStar/Yardi inputs, (3) IC Memo first draft as a Word document ready for Wayne''s review."
    }
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'solution';

-- ── 04 Roadmap ────────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "phases": [
    {
      "phase": "1",
      "title": "Deal Screener — Back-of-Envelope",
      "duration": "Week 1–2",
      "milestones": [
        "Stage 2: Ingest broker OM data or manual input",
        "Return PASS / NO-GO with cap rate, IRR, expense ratio, loss-to-lease",
        "Narrative rationale for every decision",
        "Validated against Riverside Commons (PASS) and Pinewood Village (NO-GO) test cases",
        "Target: < 5 minutes per deal"
      ]
    },
    {
      "phase": "2",
      "title": "Document Request Automation",
      "duration": "Week 2–3",
      "milestones": [
        "Stage 3: Auto-generate broker/sponsor outreach email",
        "Include full document checklist: rent roll, T12, T3, tax bills, insurance, service contracts",
        "Parameterized by deal name, sponsor, and asset type"
      ]
    },
    {
      "phase": "3",
      "title": "IC Memo Generation",
      "duration": "Week 3–4",
      "milestones": [
        "Stage 10: Full Word document IC memo from model outputs",
        "Follows CFP memo template exactly",
        "Wayne reviews and edits — not writes",
        "Target: < 10 minutes from model to first draft"
      ]
    },
    {
      "phase": "4",
      "title": "Market Research Narrative",
      "duration": "Week 4–5",
      "milestones": [
        "Stage 9: Submarket thesis section of IC memo",
        "Drafted from structured CoStar/Yardi inputs",
        "Outputs directly into Phase 3 memo pipeline"
      ]
    },
    {
      "phase": "5",
      "title": "Deal Intake + Pipeline Logging",
      "duration": "Backlog",
      "milestones": [
        "Stage 1: Structured deal intake from broker email or manual entry",
        "Auto-populate pipeline tracking sheet",
        "Scoped after v1 deliverables are validated"
      ]
    }
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'roadmap';

-- ── 05 Team ───────────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "members": [
    {
      "name": "Alex Sok",
      "role": "Founder & CEO, Endurance AI Labs",
      "bio": "Leading the CFP engagement end-to-end. Point of contact for scope, delivery, and strategy."
    },
    {
      "name": "Sid Bhambhani",
      "role": "Co-Founder & CTO, Endurance AI Labs",
      "bio": "20 years in enterprise software. Previously built data and automation infrastructure at Summatti and PartnerHero."
    },
    {
      "name": "Nick Maxwell",
      "role": "Co-Founder & Chief AI Officer, Endurance AI Labs",
      "bio": "AI systems architect. Previously led AI initiatives at TALA and Intuit. Cornell CS."
    },
    {
      "name": "Ramzy",
      "role": "Underwriter, Capital Funding Partners",
      "bio": "Primary user of the Deal Screener and Document Request automation. Runs Stages 1–5 of the underwriting process."
    },
    {
      "name": "Wayne",
      "role": "Principal, Capital Funding Partners",
      "bio": "Reviews IC memo drafts. Final decision-maker on deal advancement. Approves screening criteria and acquisition parameters."
    }
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'team';

-- ── 06 Metrics ────────────────────────────────────────────────────────────────
update portal_sections set content = '{
  "body": "Success is defined by time saved, accuracy, and zero disruption to existing workflow. These are the benchmarks we''re building to.",
  "kpis": [
    {
      "label": "Back-of-Envelope Turnaround",
      "value": "< 5 min",
      "description": "Down from 2–4 hours. PASS / NO-GO before anyone touches the Excel model."
    },
    {
      "label": "IC Memo First Draft",
      "value": "< 10 min",
      "description": "Down from 4–8 hours. Wayne reviews and edits — not writes from scratch."
    },
    {
      "label": "New Tools to Learn",
      "value": "Zero",
      "description": "Inputs are copy-paste. Output is a Word doc or email. Runs in the terminal locally."
    },
    {
      "label": "Stages Automated (v1)",
      "value": "4 of 12",
      "description": "Stages 2, 3, 9, and 10. The highest-friction, most repeatable stages in the pipeline."
    },
    {
      "label": "Test Deals Validated",
      "value": "2",
      "description": "Riverside Commons (PASS — strong loss-to-lease, 5.0%+ cap) and Pinewood Village (NO-GO — tertiary market, <50 units, 60% expense ratio)."
    },
    {
      "label": "Platform Replacements",
      "value": "None",
      "description": "Excel, Dropbox, Word, and email stay exactly as-is. The automation layer wraps them."
    }
  ]
}'::jsonb
where portal_id = (select id from portals where slug = 'capfund1')
  and slug = 'metrics';

"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",    label: "Overview" },
  { id: "engineering", label: "Engineering" },
  { id: "timeline",    label: "Timeline" },
  { id: "integration", label: "Integration" },
  { id: "deployment",  label: "Deployment" },
  { id: "support",     label: "Support" },
  { id: "risks",       label: "Risks" },
];

const ENGINEERING = [
  {
    role: "AI/ML Lead Engineer",
    allocation: "Full-time", weeks: "Weeks 1–4", hours: 120,
    responsibilities: [
      "Design and build the optimization harness (multi-model orchestration layer)",
      "Train teacher policy agent on General Trucking's domain, tone, and compliance rules",
      "Distill to student model for low-latency, low-cost inference",
      "Build self-learning feedback loop (conversation recording, sentiment analysis, system prompt updates)",
      "Configure personality tuning engine with GT-specific guardrails",
    ],
  },
  {
    role: "Backend / Integration Engineer",
    allocation: "Full-time", weeks: "Weeks 1–3", hours: 100,
    responsibilities: [
      "Build and test TenStreet API integration — map voice agent output to TenStreet application fields",
      "Develop webhook infrastructure to receive Facebook lead events and trigger voice agent",
      "Stand up secure cloud hosting environment",
      "Build knockout logic engine and disqualification logging pipeline",
      "Implement source-to-hire analytics data pipeline",
    ],
  },
  {
    role: "Prompt & Conversation Designer",
    allocation: "Part-time", weeks: "Weeks 1–2", hours: 40,
    responsibilities: [
      "Rewrite all 14+ open lane job descriptions with data-optimized language",
      "Design full conversation flow for the voice agent (pre-screen, knockout, application collection)",
      "Define must-have vs. nice-to-have candidate criteria with Desher",
      "Script compliance guardrails (no age, nationality, or protected-class questions)",
      "Write A/B test variants for key funnel questions",
    ],
  },
  {
    role: "QA / Testing Engineer",
    allocation: "Part-time", weeks: "Weeks 2–3", hours: 30,
    responsibilities: [
      "End-to-end testing of voice agent across all open lane flows",
      "TenStreet integration validation — confirm all fields map and populate correctly",
      "Latency and cost benchmarking against baseline",
      "Edge case testing: bad audio, driver hang-ups, incomplete answers, system errors",
      "Compliance review pass before go-live",
    ],
  },
  {
    role: "Alex Sok — CEO / Project Lead",
    allocation: "Oversight", weeks: "Full engagement", hours: 20,
    responsibilities: [
      "Executive sponsor and primary point of contact for Chris Meers",
      "Weekly status updates and steering decisions",
      "Final approval on all prompt architecture and personality tuning",
      "Escalation path for any scope, timeline, or budget questions",
    ],
  },
];

const TIMELINE = [
  {
    week: "Week 1", label: "Discovery & Build Start",
    tracks: [
      { track: "Job Descriptions", tasks: ["Kickoff call with Desher and Chris", "Audit all 14 open lane descriptions", "Rewrite with data-optimized language", "Deploy to Facebook campaigns and TenStreet job store"] },
      { track: "Voice Agent", tasks: ["Finalize conversation flow with Desher", "Stand up optimization harness environment", "Begin personality tuning engine configuration", "Draft system prompt architecture with GT compliance guardrails"] },
      { track: "Integration", tasks: ["Audit TenStreet API documentation", "Confirm available endpoints and authentication", "Begin field mapping (voice agent output → TenStreet application fields)"] },
    ],
    milestone: "Updated job descriptions live by end of week",
  },
  {
    week: "Week 2", label: "Core Build",
    tracks: [
      { track: "Voice Agent", tasks: ["Complete teacher policy agent training on GT domain", "Distill to student model — benchmark latency and cost", "Integrate multi-model routing (OpenAI / Anthropic / Grok)", "Build Facebook ad → voice agent redirect flow"] },
      { track: "Integration", tasks: ["Complete TenStreet field mapping and application submission logic", "Build knockout disqualification engine and logging", "Webhook infrastructure for Facebook lead events"] },
      { track: "QA", tasks: ["Begin internal testing on all lane conversation flows", "Validate TenStreet application population end-to-end", "Latency benchmarking — target sub-500ms response"] },
    ],
    milestone: "Full voice agent build complete — internal testing begins",
  },
  {
    week: "Week 3", label: "Testing, Tuning & Go-Live",
    tracks: [
      { track: "Voice Agent", tasks: ["Incorporate QA feedback — refine conversation flows", "A/B test key knockout questions", "Final compliance review pass", "Deploy to staging for GT review"] },
      { track: "Integration", tasks: ["GT acceptance testing with Desher — confirm TenStreet flow", "Facebook ad redirect go-live", "Website widget deployment (if desired)"] },
      { track: "Reporting", tasks: ["Stand up source-to-hire analytics dashboard", "Configure weekly optimization email to Desher", "Set baseline KPIs: conversion rate, time-to-application, qualified lead %"] },
    ],
    milestone: "System live — first real driver conversations flowing through",
  },
  {
    week: "Week 4+", label: "Optimize & Expand",
    tracks: [
      { track: "Optimization", tasks: ["Analyze Week 3 conversation data", "Surface first A/B test results to Desher", "Refine system prompt and personality tuning based on outcomes", "Begin retention module scoping (Phase 3)"] },
      { track: "Reporting", tasks: ["Deliver Week 3 ROI summary to Chris", "Establish monthly review cadence", "Identify top funnel drop-off points for next sprint"] },
      { track: "Expansion", tasks: ["Scope over-the-road/regional fleet recruiting build", "Explore operational efficiency opportunities with Kevin (VP Ops)", "Brokerage division AI use case discovery"] },
    ],
    milestone: "First measurable ROI data delivered to Chris and team",
  },
];

const INTEGRATIONS = [
  {
    system: "TenStreet (ATS)", type: "Core", method: "REST API",
    details: [
      "Voice agent maps all collected driver data directly to TenStreet application fields in real time",
      "Knockout logic runs before any data is submitted — only qualified candidates enter TenStreet",
      "Disqualified leads are logged separately with reason codes for Desher's review and retargeting",
      "Automated status updates as drivers progress through the funnel",
      "All existing TenStreet automations remain intact",
    ],
    risk: "Low — TenStreet has a documented API; Desher confirmed existing automations must be preserved",
  },
  {
    system: "Facebook Ads", type: "Core", method: "Redirect / Lead Gen API",
    details: [
      "Replace static lead form destination with voice agent redirect URL",
      "Works across all 12 active campaigns without requiring ad creative changes",
      "Source tagging per campaign — every lead tracked back to its originating ad",
    ],
    risk: "Low — redirect approach requires no Facebook API permissions",
  },
  {
    system: "Optimization Harness", type: "Core", method: "Internal (Endurance-built)",
    details: [
      "Multi-model orchestration: OpenAI for general conversation, Anthropic for nuanced reasoning, Grok as fallback",
      "Self-learning loop records every conversation, runs sentiment analysis, surfaces improvement suggestions weekly",
      "Personality tuning engine stores GT's brand voice, conversation style, and compliance rules in structured system prompts",
    ],
    risk: "None — fully Endurance-built and operated",
  },
  {
    system: "General Trucking Website", type: "Optional", method: "JavaScript Widget",
    details: [
      "Embeddable widget drops onto any page with a single script tag — no engineering required on GT's side",
      "Driver can initiate voice or chat conversation directly from the GT careers page",
      "Branded with GT name and personality",
    ],
    risk: "Low — optional add-on, requires only web access to deploy",
  },
  {
    system: "Cloud / On-Premise Hosting", type: "Infrastructure", method: "Hybrid",
    details: [
      "Cloud hosting is appropriate — driver recruiting data is not PII-sensitive at the level requiring on-premise",
      "All conversation data stored in a secure, GT-dedicated environment — not shared with other clients",
      "On-premise option available if compliance posture changes — designed for this from day one",
      "Monthly compute costs ($300–500) cover API usage only — no Endurance infrastructure markup",
    ],
    risk: "Low — cloud-hosted by default; on-premise option already architected",
  },
];

const DEPLOYMENT = [
  { step: "01", title: "Kickoff Call", who: "Alex, Sid, Desher, Chris", when: "Day 1", desc: "Confirm scope, set baseline KPIs, collect Facebook ad assets and TenStreet credentials, finalize conversation flow requirements." },
  { step: "02", title: "Environment Setup", who: "Backend Engineer", when: "Days 1–2", desc: "Stand up cloud environment, configure API keys, establish secure credential vault." },
  { step: "03", title: "Job Descriptions Live", who: "Prompt Designer, Desher", when: "End of Week 1", desc: "Revised job descriptions reviewed and approved by Desher, deployed to all Facebook campaigns and TenStreet job store." },
  { step: "04", title: "Voice Agent Staging", who: "Full Engineering Team", when: "End of Week 2", desc: "Complete voice agent deployed to staging. Endurance runs full internal test suite across all open lane flows." },
  { step: "05", title: "GT Acceptance Testing", who: "Desher + Endurance QA", when: "Week 3, Days 1–3", desc: "Desher and team walk through the agent as a driver would. Feedback incorporated in real time. Compliance review sign-off." },
  { step: "06", title: "Go-Live", who: "Alex + Backend Engineer", when: "Week 3, Days 4–5", desc: "Facebook ad redirects updated. Website widget deployed. Monitoring dashboards activated. First live driver conversations begin." },
  { step: "07", title: "Week 1 ROI Check-In", who: "Alex + Chris", when: "End of Week 4", desc: "Review first week of live data — conversion rate vs. baseline, time-to-application, qualified lead %, any system issues." },
];

const SUPPORT = [
  {
    tier: "Ongoing Optimization", cadence: "Weekly",
    items: [
      "Automated optimization email to Desher — A/B test results, suggested prompt changes, conversion trends",
      "Human review and approval required before any system change is applied",
      "Endurance monitors system uptime, latency, and cost weekly",
      "System errors trigger immediate Endurance response (same business day)",
    ],
  },
  {
    tier: "Monthly Executive Review", cadence: "Monthly",
    items: [
      "30-minute call with Chris and/or Desher to review source-to-hire analytics",
      "ROI summary: qualified leads generated, applications submitted, hires attributed, cost per hire vs. baseline",
      "Next-quarter roadmap discussion — retention module, operational efficiency, brokerage expansion",
    ],
  },
  {
    tier: "On-Demand Support", cadence: "As needed",
    items: [
      "Direct access to Alex and the engineering team via email or phone",
      "Same-day response SLA for production issues",
      "48-hour turnaround for conversation flow changes or new lane additions",
      "New lane onboarding within 48 hours of receiving lane details from Desher",
    ],
  },
  {
    tier: "Phase Expansion Planning", cadence: "Quarterly",
    items: [
      "Retention module scoping — driver sentiment analysis, burnout prediction, early-warning signals",
      "Operational efficiency discovery with Kevin (VP Operations)",
      "Brokerage division AI use case exploration",
      "Pricing and timeline for each new phase presented before any additional commitment is made",
    ],
  },
];

const RISKS = [
  { risk: "TenStreet API limitations", likelihood: "Low", mitigation: "Desher confirmed TenStreet is a fully documented platform. If specific endpoints are unavailable, Endurance will build a screen-automation bridge — no delay to go-live." },
  { risk: "Desher adoption / change resistance", likelihood: "Medium", mitigation: "Human always in the loop — Desher approves every optimization before it goes live. Voice agent pre-qualifies leads so she only talks to serious candidates." },
  { risk: "Driver reluctance to talk to AI", likelihood: "Low", mitigation: "Research shows drivers are often more candid with AI agents than human recruiters. Agent is named, branded, and personality-tuned to feel natural. Option to escalate to human at any point." },
  { risk: "Facebook ad redirect drop-off", likelihood: "Low", mitigation: "A/B test redirect vs. static form in Week 1. If redirect reduces top-of-funnel clicks, revert and use Facebook Lead Gen API outbound call approach instead." },
  { risk: "Competitor wins before go-live", likelihood: "Medium", mitigation: "Job descriptions ship in Week 1 — GT sees improvement before the voice agent is live. Entry scope can be accelerated to 2 weeks if urgency demands it." },
  { risk: "Scope creep delaying go-live", likelihood: "Low", mitigation: "Strict Phase 1 scope: speed-to-lead and job descriptions only. Retention, operational efficiency, and brokerage are Phase 2/3 — logged but not acted on until Phase 1 ROI is confirmed." },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-white/10 rounded-sm bg-white/[0.03] p-5 ${className}`}>
      {children}
    </div>
  );
}

function CardHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <p className="text-base font-semibold text-white">{title}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: "var(--steel-400)", fontFamily: "var(--font-jetbrains)" }}>{sub}</p>}
    </div>
  );
}

function Bullet({ children, color = "signal" }: { children: React.ReactNode; color?: "signal" | "green" }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span
        className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: color === "green" ? "#4ade80" : "var(--signal)" }}
      />
      <span className="text-sm leading-relaxed" style={{ color: "var(--steel-300)" }}>{children}</span>
    </div>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "outline" | "green" | "yellow" }) {
  const styles: Record<string, string> = {
    default: "border border-white/10 text-white/60",
    outline: "border border-white/20 text-white/50",
    green: "border border-green-500/30 text-green-400 bg-green-500/10",
    yellow: "border border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-sm whitespace-nowrap ${styles[variant]}`}
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      {children}
    </span>
  );
}

function HBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-48 shrink-0 text-right" style={{ color: "var(--steel-400)", fontFamily: "var(--font-jetbrains)" }}>{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-sm overflow-hidden">
        <div className="h-full rounded-sm" style={{ width: `${pct}%`, background: "var(--signal)" }} />
      </div>
      <span className="text-xs w-8 shrink-0" style={{ color: "var(--steel-400)", fontFamily: "var(--font-jetbrains)" }}>{value}h</span>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

// ── Main component ────────────────────────────────────────────────────────────

export function GTProjectPlan() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="border border-white/10 rounded-sm bg-white/[0.03] p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: "var(--signal)", fontFamily: "var(--font-jetbrains)" }}>
              Detailed Project Plan
            </p>
            <p className="text-lg font-semibold text-white">General Trucking AI Recruiting System</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>
              Endurance AI Labs · May 2026 · Confidential
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">3-Week Build</Badge>
            <Badge variant="outline">$27K Full / Sub-$12K Entry</Badge>
          </div>
        </div>
        <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--steel-300)" }}>
          Complete engagement plan covering engineering resources, week-by-week timeline, TenStreet and Facebook integration, deployment checklist, ongoing support model, and risk mitigation.
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-3 py-1.5 text-xs whitespace-nowrap transition-colors duration-150 rounded-sm"
            style={{
              fontFamily: "var(--font-jetbrains)",
              border: activeTab === t.id ? "1px solid var(--signal)" : "1px solid rgba(255,255,255,0.1)",
              color: activeTab === t.id ? "var(--signal)" : "var(--steel-400)",
              background: activeTab === t.id ? "rgba(199,167,108,0.06)" : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ───────────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <Section>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Project Duration", value: "3 Weeks to Go-Live" },
              { label: "Engineering Headcount", value: "4 Roles" },
              { label: "Open Driver Lanes", value: "14 Dedicated + OTR" },
              { label: "Annual Profit at Stake", value: "$1M+" },
              { label: "Full Project Fee", value: "$27,000" },
              { label: "Entry Scope Fee", value: "< $12,000" },
            ].map(m => (
              <div key={m.label} className="border border-white/10 rounded-sm bg-white/[0.03] p-4">
                <p className="text-xs mb-1" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{m.label}</p>
                <p className="text-lg font-semibold text-white">{m.value}</p>
              </div>
            ))}
          </div>

          <Card>
            <CardHead title="Engagement Scope" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Phase", "Deliverable", "Timeline", "Fee"].map(h => (
                      <th key={h} className="text-left pb-2 pr-6 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { phase: "1", del: "Job Description Optimization", timeline: "Week 1", fee: "Free" },
                    { phase: "2", del: "AI Voice Agent + TenStreet Integration", timeline: "Weeks 1–3", fee: "Sub-$12K entry / $27K full" },
                    { phase: "3", del: "Retention Module", timeline: "Post go-live", fee: "TBD — scoped separately" },
                    { phase: "4", del: "Operational Efficiency + Brokerage AI", timeline: "Q3 2026+", fee: "TBD — scoped separately" },
                  ].map(r => (
                    <tr key={r.phase}>
                      <td className="py-3 pr-6 text-xs font-medium" style={{ color: "var(--signal)", fontFamily: "var(--font-jetbrains)" }}>{r.phase}</td>
                      <td className="py-3 pr-6 text-white">{r.del}</td>
                      <td className="py-3 pr-6 whitespace-nowrap" style={{ color: "var(--steel-400)" }}>{r.timeline}</td>
                      <td className="py-3" style={{ color: "var(--steel-400)" }}>{r.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHead title="Key Stakeholders" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Name", "Role", "Org", "Involvement"].map(h => (
                      <th key={h} className="text-left pb-2 pr-6 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: "Chris Meers", role: "CEO", org: "General Trucking", inv: "Executive sponsor — final decisions, monthly reviews" },
                    { name: "Desher Guthrie", role: "Director of Recruiting", org: "General Trucking", inv: "Day-to-day champion — conversation flows, TenStreet, acceptance testing" },
                    { name: "Thomas Guitar", role: "VP of Finance", org: "General Trucking", inv: "Cost approval — looped in on pricing and monthly compute" },
                    { name: "Kevin", role: "VP of Operations", org: "General Trucking", inv: "Phase 3+ — operational efficiency use cases" },
                    { name: "Ariel", role: "Recruiting Processor", org: "General Trucking", inv: "End-user of TenStreet integration — validates application flow" },
                    { name: "Alex Sok", role: "CEO / Project Lead", org: "Endurance AI Labs", inv: "Executive sponsor, Chris relationship, final prompt approval" },
                    { name: "Sid Bhambhani", role: "Co-Founder / CTO", org: "Endurance AI Labs", inv: "Technical architecture, integration design" },
                    { name: "James Collins", role: "Connector / Advisor", org: "External", inv: "Relationship bridge — kept informed of milestones" },
                  ].map(r => (
                    <tr key={r.name}>
                      <td className="py-3 pr-6 whitespace-nowrap font-medium text-white">{r.name}</td>
                      <td className="py-3 pr-6 whitespace-nowrap" style={{ color: "var(--steel-400)" }}>{r.role}</td>
                      <td className="py-3 pr-6 whitespace-nowrap" style={{ color: "var(--steel-400)" }}>{r.org}</td>
                      <td className="py-3" style={{ color: "var(--steel-300)" }}>{r.inv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>
      )}

      {/* ── ENGINEERING ────────────────────────────────────────────────────── */}
      {activeTab === "engineering" && (
        <Section>
          <Card>
            <CardHead title="Engineering Resources" sub="Estimated hours by role across the full engagement" />
            <div className="flex flex-col gap-3">
              {ENGINEERING.map(r => (
                <HBar key={r.role} label={r.role} value={r.hours} max={120} />
              ))}
            </div>
          </Card>
          {ENGINEERING.map(r => (
            <Card key={r.role}>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <p className="font-semibold text-white">{r.role}</p>
                <div className="flex gap-2">
                  <Badge variant="outline">{r.allocation}</Badge>
                  <Badge variant="outline">{r.weeks}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {r.responsibilities.map(item => <Bullet key={item}>{item}</Bullet>)}
              </div>
            </Card>
          ))}
        </Section>
      )}

      {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
      {activeTab === "timeline" && (
        <Section>
          {TIMELINE.map((w, wi) => (
            <Card key={w.week}>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                <div>
                  <p className="text-xs mb-0.5 uppercase tracking-widest" style={{ color: "var(--signal)", fontFamily: "var(--font-jetbrains)" }}>{w.week}</p>
                  <p className="font-semibold text-white">{w.label}</p>
                </div>
                <div className="flex items-center gap-2 border border-white/10 rounded-sm px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--signal)" }} />
                  <span className="text-xs" style={{ color: "var(--steel-300)", fontFamily: "var(--font-jetbrains)" }}>{w.milestone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {w.tracks.map(t => (
                  <div key={t.track}>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{t.track}</p>
                    <div className="flex flex-col gap-1.5">
                      {t.tasks.map(task => <Bullet key={task}>{task}</Bullet>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </Section>
      )}

      {/* ── INTEGRATION ────────────────────────────────────────────────────── */}
      {activeTab === "integration" && (
        <Section>
          <Card>
            <CardHead title="Data Flow" sub="End-to-end pipeline from Facebook ad to TenStreet application" />
            <div className="flex flex-col gap-2">
              {[
                "Facebook Ad clicked by driver",
                "Redirected to Endurance voice agent (hosted on GT-dedicated cloud environment)",
                "Voice agent conducts live pre-screening conversation (speech-to-text → LLM → text-to-speech)",
                "Knockout logic runs in real time — disqualified leads logged with reason, never reach TenStreet",
                "Qualified driver data mapped to TenStreet application fields and submitted via API",
                "Desher sees a fully completed TenStreet application — no manual data entry required",
                "Source-to-hire analytics tag the lead back to its originating Facebook campaign",
                "Weekly optimization report emailed to Desher with improvement suggestions",
              ].map((step, i) => (
                <div key={step} className="flex gap-3 items-start">
                  <span
                    className="shrink-0 w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium"
                    style={{ background: "rgba(199,167,108,0.15)", color: "var(--signal)", fontFamily: "var(--font-jetbrains)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--steel-300)" }}>{step}</span>
                </div>
              ))}
            </div>
          </Card>
          {INTEGRATIONS.map(item => (
            <Card key={item.system}>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <p className="font-semibold text-white">{item.system}</p>
                <div className="flex gap-2">
                  <Badge variant={item.type === "Core" ? "default" : "outline"}>{item.type}</Badge>
                  <Badge variant="outline">{item.method}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-3">
                {item.details.map(d => <Bullet key={d}>{d}</Bullet>)}
              </div>
              <div className="border border-white/5 rounded-sm bg-white/5 px-3 py-2">
                <span className="text-xs font-medium" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>Risk: </span>
                <span className="text-xs" style={{ color: "var(--steel-300)" }}>{item.risk}</span>
              </div>
            </Card>
          ))}
        </Section>
      )}

      {/* ── DEPLOYMENT ─────────────────────────────────────────────────────── */}
      {activeTab === "deployment" && (
        <Section>
          <Card>
            <CardHead title="Deployment Checklist" sub="7 steps from kickoff to first live driver conversation" />
            <div className="flex flex-col gap-3">
              {DEPLOYMENT.map(s => (
                <div key={s.step} className="flex gap-4 items-start p-3 rounded-sm bg-white/5">
                  <span
                    className="shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-sm font-semibold"
                    style={{ background: "rgba(199,167,108,0.12)", color: "var(--signal)", fontFamily: "var(--font-jetbrains)" }}
                  >
                    {s.step}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-white text-sm">{s.title}</p>
                      <Badge variant="outline">{s.when}</Badge>
                    </div>
                    <p className="text-xs mb-1" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>Owner: {s.who}</p>
                    <p className="text-sm" style={{ color: "var(--steel-300)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title="Go-Live Readiness Criteria" sub="Every item must be confirmed before switching Facebook ads live" />
            <div className="flex flex-col gap-1.5">
              {[
                "All open lane conversation flows tested end-to-end with no critical errors",
                "TenStreet integration validated — 5+ test applications submitted and confirmed in GT's TenStreet account",
                "Knockout logic verified — disqualified test candidates do not appear in TenStreet",
                "Desher has completed acceptance testing and signed off",
                "Compliance review passed — no protected-class questions in any flow",
                "Latency benchmarked — average agent response time under 600ms",
                "Source-to-hire analytics dashboard live and confirmed receiving data",
                "Monitoring and alerting configured — Endurance receives immediate notification of any system errors",
                "Rollback plan in place — Facebook ads can revert to original lead form within 15 minutes if needed",
              ].map(item => <Bullet key={item} color="green">{item}</Bullet>)}
            </div>
          </Card>
        </Section>
      )}

      {/* ── SUPPORT ────────────────────────────────────────────────────────── */}
      {activeTab === "support" && (
        <Section>
          {SUPPORT.map(t => (
            <Card key={t.tier}>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                <p className="font-semibold text-white">{t.tier}</p>
                <Badge variant="outline">{t.cadence}</Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                {t.items.map(item => <Bullet key={item} color="green">{item}</Bullet>)}
              </div>
            </Card>
          ))}

          <Card>
            <CardHead title="SLA Summary" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Issue Type", "Response Time", "Resolution Target"].map(h => (
                      <th key={h} className="text-left pb-2 pr-6 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { type: "System outage / voice agent down", response: "Immediate (auto-alert)", resolution: "2 hours" },
                    { type: "TenStreet integration failure", response: "Same business day", resolution: "4 hours" },
                    { type: "Conversation flow issue or bug", response: "Same business day", resolution: "24 hours" },
                    { type: "New lane onboarding", response: "Next business day", resolution: "48 hours" },
                    { type: "General question / change request", response: "24 hours", resolution: "48 hours" },
                  ].map(r => (
                    <tr key={r.type}>
                      <td className="py-3 pr-6 text-white">{r.type}</td>
                      <td className="py-3 pr-6 whitespace-nowrap" style={{ color: "var(--signal)" }}>{r.response}</td>
                      <td className="py-3 whitespace-nowrap" style={{ color: "var(--steel-400)" }}>{r.resolution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>
      )}

      {/* ── RISKS ──────────────────────────────────────────────────────────── */}
      {activeTab === "risks" && (
        <Section>
          {RISKS.map(r => (
            <Card key={r.risk}>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <p className="font-semibold text-white">{r.risk}</p>
                <Badge variant={r.likelihood === "Low" ? "green" : "yellow"}>{r.likelihood} likelihood</Badge>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--steel-300)" }}>{r.mitigation}</p>
            </Card>
          ))}

          <Card>
            <CardHead title="Success Metrics" sub="How we define and measure a successful engagement" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Metric", "Baseline (Today)", "Target (Week 4)"].map(h => (
                      <th key={h} className="text-left pb-2 pr-6 text-xs uppercase tracking-widest font-medium" style={{ color: "var(--steel-500)", fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { metric: "Lead-to-application conversion rate", baseline: "~10% (3–5 of 20–40 daily leads)", target: "25–40%" },
                    { metric: "Time from lead to qualified application", baseline: "3–5 days", target: "< 1 hour" },
                    { metric: "Recruiter time per qualified candidate", baseline: "High — manual calls, follow-up, nudging", target: "Desher reviews completed applications only" },
                    { metric: "Disqualification rate (pre-TenStreet)", baseline: "Unknown — all leads enter funnel", target: "Unqualified leads filtered before TenStreet; rate tracked weekly" },
                    { metric: "Open dedicated lanes filled", baseline: "14 open (going into May)", target: "Measurable reduction within 30 days" },
                    { metric: "Monthly compute cost", baseline: "N/A", target: "$300–$500 pass-through (no markup)" },
                  ].map(r => (
                    <tr key={r.metric}>
                      <td className="py-3 pr-6 text-white">{r.metric}</td>
                      <td className="py-3 pr-6" style={{ color: "var(--steel-400)" }}>{r.baseline}</td>
                      <td className="py-3 font-medium" style={{ color: "var(--signal)" }}>{r.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>
      )}

    </div>
  );
}

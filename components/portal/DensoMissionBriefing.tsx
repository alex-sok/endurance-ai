"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",  label: "Overview" },
  { id: "missions",  label: "Critical Missions" },
  { id: "plan",      label: "Project Plan" },
  { id: "about",     label: "About Us" },
  { id: "bizcase",   label: "Business Case" },
];

const MISSIONS = [
  {
    id: "M1",
    title: "FTZ Inventory Reconciliation",
    priority: "Priority 1",
    urgent: true,
    pain: "DENSO's Southern California Foreign Trade Zone (FTZ) 3PL partner lacks system integration capability. 8 of the first shipments to Latin America contained wrong parts. 410+ part numbers are unreconciled, creating exposure to Deloitte, Japan HQ, and MITI audits.",
    impact: "Millions of dollars in delayed shipments. Compliance violations risk. Manual research consuming days of PM time weekly.",
    solution: "Deploy a lightweight AI agent system that ingests daily Excel/CSV uploads from the 3PL, cross-references Oracle inventory, and produces a live reconciled ledger — receipts in, orders out, running balance. No IT team required. No API integration. Designed to phase out in 12–18 months as DENSO migrates to Panama operations.",
    estimate: "$20,000 – $30,000",
    timeline: "2–3 weeks to deploy",
    kpis: ["Inventory accuracy ≥ 98%", "Audit-ready ledger on demand", "PM research time reduced by 80%", "Zero compliance citations"],
  },
  {
    id: "M2",
    title: "Repack Department Reconciliation",
    priority: "Priority 2",
    urgent: false,
    pain: "DENSO's repack department operates similarly to the FTZ — manual tracking, disconnected data, and high labor overhead to maintain accuracy.",
    impact: "Ongoing operational drag. Risk of inventory inaccuracies compounding across departments.",
    solution: "Swap the logic layer from the FTZ solution to address repack-specific workflows. Foundational AI infrastructure is reused — only the business rules and context layer changes.",
    estimate: "$8,000 – $12,000",
    timeline: "1–2 weeks (after M1)",
    kpis: ["Repack accuracy parity with FTZ solution", "Reduced manual reconciliation time", "Unified reporting dashboard"],
  },
  {
    id: "M3",
    title: "Returns Department Reconciliation",
    priority: "Priority 3",
    urgent: false,
    pain: "The returns department faces similar systemic challenges — no automated tracking, manual workflows, and inventory that doesn't reconcile cleanly with Oracle.",
    impact: "Inaccurate returns ledger, potential inventory write-offs, audit risk.",
    solution: "Apply the same modular AI framework to returns processing — ingest returns data, verify against open orders, and generate a clean reconciled ledger.",
    estimate: "$8,000 – $12,000",
    timeline: "1–2 weeks (after M2)",
    kpis: ["Returns inventory reconciled within 24 hrs", "Reduction in manual write-off reviews", "Audit-ready returns ledger"],
  },
];

const PHASES = [
  {
    phase: "Phase 1",
    name: "Discovery & Process Mapping",
    duration: "Week 1",
    color: "#3b82f6",
    tasks: [
      "Deep-dive with DENSO Project Manager — map current FTZ workflow end-to-end",
      "Document Oracle inventory data structure and available export formats",
      "Map 3PL manual acknowledgment formats (Excel, email, CSV)",
      "Define reconciliation logic: receipts in, shipments out, balance, discrepancies",
      "Agree on daily upload protocol and output format",
    ],
  },
  {
    phase: "Phase 2",
    name: "Build & Internal Testing",
    duration: "Week 2",
    color: "#6366f1",
    tasks: [
      "Configure 3 AI agents: Ingestor, Verifier, Supervisor",
      "Build reconciliation orchestration layer",
      "Integrate Oracle data export pipeline",
      "Build discrepancy flagging and alert logic",
      "Internal QA against sample DENSO data",
    ],
  },
  {
    phase: "Phase 3",
    name: "DENSO UAT & Refinement",
    duration: "Week 3",
    color: "#8b5cf6",
    tasks: [
      "Live testing with DENSO PM using real data",
      "Fine-tune reconciliation logic based on edge cases",
      "Validate audit trail output meets Deloitte / Japan HQ standards",
      "Train DENSO team on daily upload workflow",
      "Sign-off and go-live",
    ],
  },
  {
    phase: "Phase 4",
    name: "Ongoing Support & Expansion",
    duration: "Month 2+",
    color: "#10b981",
    tasks: [
      "Weekly check-ins during stabilization period",
      "Performance monitoring and accuracy reporting",
      "Scope repack department logic layer (M2)",
      "Scope returns department logic layer (M3)",
      "Roadmap alignment with Panama migration timeline",
    ],
  },
];

const NEXT_STEPS = [
  { action: "Joseph shares this briefing with his advisor & VP",       owner: "Joseph Wright", target: "This week" },
  { action: "Joseph gauges boss / advisor appetite for moving forward", owner: "Joseph Wright", target: "This week" },
  { action: "Intro call with DENSO Project Manager to scope requirements", owner: "Both teams", target: "TBD" },
  { action: "Follow-up call — decision and go/no-go",                  owner: "All",           target: "Fri May 8" },
];

const WHY_US = [
  ["Speed",                    "What takes traditional vendors 6 months, we deliver in 3 weeks. We've done it for Fortune 500 clients."],
  ["No IT burden",             "Our solutions are designed to work around legacy systems and non-integrated partners — no API keys, no IT project queue."],
  ["Mission-critical DNA",     "We specialize in high-stakes, low-margin-for-error engagements. Failure is not an option we design for."],
  ["Near break-even pricing",  "We price strategically to earn DENSO's trust and build a long-term relationship. Your business on our roster matters more than margin today."],
  ["Proven enterprise credentials", "Active engagements with American Express and Expedia. We know how large organizations work."],
];

const TEAM = [
  ["Alex Sok",         "Co-Founder", "Former Cisco stealth AI lab. 15+ years at the intersection of enterprise systems and AI. Based in San Francisco, CA."],
  ["Anthony Haralson", "Co-Founder", "Sales methodology and enterprise engagement specialist. Drives discovery, solution framing, and customer success."],
];

const CLIENTS = [
  ["American Express", "Active engagement"],
  ["Expedia",          "Active engagement — AI solution built in 2 weeks vs. their team's 12-month effort"],
  ["DENSO",            "In scoping — Americas Operations AI"],
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded border border-[#e6e5e0] bg-[#f0efe9] p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHead({ label }: { label: string }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.25em] text-[#cdcdc9] mb-3" style={{ fontFamily: "var(--font-jetbrains)" }}>
      {label}
    </p>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#262510] leading-relaxed">
      <svg className="mt-[3px] flex-shrink-0" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="6" stroke="var(--portal-accent)" strokeOpacity="0.4" />
        <path d="M3.5 6.5l2 2 4-4" stroke="var(--portal-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

function PriorityPill({ urgent, label }: { urgent: boolean; label: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-sm text-xs font-medium"
      style={urgent
        ? { background: "#fee2e2", color: "#b91c1c" }
        : { background: "#e6e5e0", color: "#7a7974" }
      }
    >
      {label}
    </span>
  );
}

// Simple SVG donut chart for investment allocation
function DonutChart() {
  const segments = [
    { label: "FTZ (M1)", value: 25, color: "#3b82f6" },
    { label: "Repack (M2)", value: 10, color: "#6366f1" },
    { label: "Returns (M3)", value: 10, color: "#8b5cf6" },
  ];
  const total = segments.reduce((a, s) => a + s.value, 0);
  const cx = 80, cy = 80, r = 60, inner = 36;
  let angle = -Math.PI / 2;

  const arcs = segments.map((s) => {
    const sweep = (s.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep);
    const y2 = cy + r * Math.sin(angle + sweep);
    const xi1 = cx + inner * Math.cos(angle);
    const yi1 = cy + inner * Math.sin(angle);
    const xi2 = cx + inner * Math.cos(angle + sweep);
    const yi2 = cy + inner * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    angle += sweep;
    return { ...s, d };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width="160" height="160" viewBox="0 0 160 160" className="flex-shrink-0">
        {arcs.map((a) => <path key={a.label} d={a.d} fill={a.color} opacity="0.85" />)}
        <text x="80" y="76" textAnchor="middle" fontSize="13" fontWeight="600" fill="#262510">$45K</text>
        <text x="80" y="91" textAnchor="middle" fontSize="10" fill="#7a7974">total est.</text>
      </svg>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-sm text-[#262510]">{s.label}</span>
            <span className="text-sm font-semibold text-[#262510] ml-auto pl-4">${s.value}K</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab views ─────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <div className="space-y-4">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Estimated Investment", value: "$45K – $55K",  sub: "3 modules" },
          { label: "Phase 1 Delivery",     value: "~3 Weeks",     sub: "FTZ live" },
          { label: "Parts at Risk",         value: "410+",         sub: "Unreconciled", alert: true },
          { label: "Annual Audits",         value: "5×",           sub: "Deloitte · Japan · Michigan" },
        ].map((k) => (
          <Card key={k.label}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>{k.label}</p>
            <p className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.5px", color: k.alert ? "#b91c1c" : "#262510" }}>{k.value}</p>
            <p className="text-xs text-[#7a7974]">{k.sub}</p>
          </Card>
        ))}
      </div>

      {/* Situation */}
      <Card>
        <SectionHead label="Situation" />
        <div className="space-y-3 text-sm text-[#262510] leading-relaxed">
          <p>DENSO Products & Services Americas — the most profitable entity within Denso North America's 8-company network — is operating a Foreign Trade Zone in Southern California with a 3PL partner that cannot electronically connect to Oracle. Every inbound receipt, outbound shipment, and order is logged manually by both parties, and the records don't match.</p>
          <p>The first 8 shipments to Latin America contained the wrong parts. DENSO is now holding millions of dollars in delayed inventory while attempting to reconcile 410+ part numbers across two disconnected systems — with a Project Manager piecing it together by hand.</p>
          <p>With 5 annual audits (Deloitte, Japan HQ, Michigan) and ISO 9001 compliance requirements, inaccurate inventory isn't just an operational headache — it's a compliance liability. The company's IT team is at capacity and cannot prioritize a fix for 6+ months.</p>
          <p>Endurance AI Labs can deploy a purpose-built AI agent solution in weeks, not quarters — no IT team required, no complex integration, designed to sunset cleanly when DENSO transitions to Panama operations in 12–18 months.</p>
        </div>
      </Card>

      {/* Investment allocation */}
      <Card>
        <SectionHead label="Investment Allocation" />
        <DonutChart />
      </Card>

      {/* Why us */}
      <Card>
        <SectionHead label="Why Endurance AI Labs" />
        <div className="space-y-2">
          {WHY_US.map(([title, body]) => (
            <div key={title} className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
              <p className="text-sm font-semibold text-[#262510] mb-1">{title}</p>
              <p className="text-sm text-[#7a7974] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CriticalMissions() {
  return (
    <div className="space-y-4">
      {MISSIONS.map((m) => (
        <Card key={m.id}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[#262510]">{m.id}: {m.title}</p>
            <PriorityPill urgent={m.urgent} label={m.priority} />
          </div>
          <div className="space-y-4">
            <div>
              <SectionHead label="Pain Point" />
              <p className="text-sm text-[#262510] leading-relaxed">{m.pain}</p>
            </div>
            <div>
              <SectionHead label="Business Impact" />
              <p className="text-sm text-[#262510] leading-relaxed">{m.impact}</p>
            </div>
            <div>
              <SectionHead label="Proposed Solution" />
              <p className="text-sm text-[#262510] leading-relaxed">{m.solution}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>Investment</p>
                <p className="text-sm font-semibold text-[#262510]">{m.estimate}</p>
              </div>
              <div className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>Timeline</p>
                <p className="text-sm font-semibold text-[#262510]">{m.timeline}</p>
              </div>
            </div>
            <div>
              <SectionHead label="Success KPIs" />
              <ul className="space-y-2">
                {m.kpis.map((k) => <Check key={k}>{k}</Check>)}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ProjectPlan() {
  return (
    <div className="space-y-4">
      <Card>
        <SectionHead label="Engagement Roadmap — Phase 1 (FTZ) · 3-week sprint" />
        <div className="space-y-3">
          {PHASES.map((p) => (
            <div key={p.phase} className="rounded border border-[#e6e5e0] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: p.color + "18" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <span className="text-sm font-semibold text-[#262510] flex-1">{p.phase}: {p.name}</span>
                <span className="text-xs text-[#7a7974] px-2 py-0.5 rounded border border-[#e6e5e0] bg-[#f7f7f4]">{p.duration}</span>
              </div>
              <div className="px-4 py-3 bg-[#f7f7f4]">
                <ul className="space-y-1.5">
                  {p.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-[#262510]">
                      <span className="text-[#cdcdc9] mt-0.5 flex-shrink-0">›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHead label="Immediate Next Steps" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#e6e5e0]">
                {["#", "Action", "Owner", "Target"].map((h) => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-[0.2em] text-[#cdcdc9] pb-3 pr-4 font-normal" style={{ fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NEXT_STEPS.map((s, i) => (
                <tr key={i} className="border-b border-[#e6e5e0]/60">
                  <td className="py-3 pr-4 text-[#cdcdc9] font-mono text-xs">{i + 1}</td>
                  <td className="py-3 pr-4 text-[#262510] leading-snug">{s.action}</td>
                  <td className="py-3 pr-4 text-[#7a7974] whitespace-nowrap">{s.owner}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 text-xs rounded border border-[#e6e5e0] text-[#7a7974] whitespace-nowrap">{s.target}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AboutUs() {
  return (
    <div className="space-y-4">
      <Card>
        <SectionHead label="About Endurance AI Labs" />
        <p className="text-sm text-[#262510] leading-relaxed mb-4">
          Endurance AI Labs is a specialized AI deployment firm that builds production-grade AI agent systems for large enterprises. We operate like a special forces team — fast, precise, and focused on outcomes that matter. We don't chase nice-to-haves. We solve the problems that are costing your organization real money right now.
        </p>
        <div className="space-y-2">
          {TEAM.map(([name, title, bio]) => (
            <div key={name} className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
              <p className="text-sm font-semibold text-[#262510]">{name} <span className="font-normal text-[#7a7974]">· {title}</span></p>
              <p className="text-sm text-[#7a7974] mt-1 leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHead label="Select Engagements" />
        <div className="space-y-2">
          {CLIENTS.map(([name, desc]) => (
            <div key={name} className="flex items-start justify-between gap-4 p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
              <div>
                <p className="text-sm font-semibold text-[#262510]">{name}</p>
                <p className="text-xs text-[#7a7974] mt-0.5">{desc}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded border border-[#e6e5e0] text-[#7a7974] whitespace-nowrap flex-shrink-0">Client</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHead label="Contact" />
        <div className="space-y-1 text-sm">
          <p><span className="text-[#7a7974]">Email:</span> <span className="text-[#262510]">alex@endurancelabs.ai</span></p>
          <p><span className="text-[#7a7974]">Phone:</span> <span className="text-[#262510]">(415) 710-0009</span></p>
          <p><span className="text-[#7a7974]">Location:</span> <span className="text-[#262510]">San Francisco, CA</span></p>
        </div>
      </Card>
    </div>
  );
}

// ── Business Case ─────────────────────────────────────────────────────────────

function NumCircle({ n, color }: { n: number; color: string }) {
  return (
    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0" style={{ background: color }}>
      {n}
    </span>
  );
}

function BusinessCase() {
  return (
    <>
      {/* Print styles — injected into <head> only when this tab is rendered */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #denso-biz-case, #denso-biz-case * { visibility: visible !important; }
          #denso-biz-case { position: absolute; inset: 0; padding: 32px; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div id="denso-biz-case" className="space-y-4">

        {/* Header */}
        <div className="rounded border border-[#e6e5e0] bg-[#f0efe9] px-5 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>Business Case · Confidential</p>
            <h2 className="text-lg font-semibold text-[#262510] mb-0.5" style={{ letterSpacing: "-0.3px" }}>FTZ Inventory Reconciliation</h2>
            <p className="text-sm text-[#7a7974]">DENSO Products & Services Americas — Americas Operations</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-[#7a7974]">Prepared by</p>
            <p className="text-sm font-semibold text-[#262510]">Endurance AI Labs</p>
            <p className="text-xs text-[#7a7974]">May 2026</p>
          </div>
        </div>

        {/* Print button */}
        <div className="flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#7a7974] hover:text-[#262510] transition-colors duration-150 rounded border border-[#e6e5e0] hover:border-[#262510]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M3 4.5V1.5h7V4.5M3 9.5H1.5V5.5a1 1 0 011-1h9a1 1 0 011 1V9.5H11m-8 0v2h7V9.5m-7 0h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Print / Save as PDF
          </button>
        </div>

        {/* 1. The Problem */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <NumCircle n={1} color="#dc2626" />
            <p className="text-sm font-semibold text-[#262510]">The Problem</p>
          </div>
          <p className="text-xs text-[#7a7974] mb-4">A disconnected 3PL is costing DENSO time, money, and compliance confidence</p>
          <div className="space-y-3 text-sm text-[#262510] leading-relaxed">
            <p>DENSO's Southern California Foreign Trade Zone (FTZ) operates through a third-party logistics partner whose systems cannot connect to Oracle. Every transaction is logged manually by both parties, and the two records do not match.</p>
            <p>The consequences are already playing out: 8 consecutive shipments to Latin America contained wrong parts. DENSO is now holding millions of dollars in delayed inventory while a Project Manager works to reconcile 410+ part numbers by hand.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              ["Shipment Errors",    "8 of 8 initial shipments to Latin America shipped wrong parts",    "#dc2626"],
              ["Parts Unreconciled", "410+ part numbers with no confirmed accurate count",               "#ea580c"],
              ["Compliance Exposure","5 annual audits (Deloitte, Japan HQ, Michigan, ISO 9001)",        "#b45309"],
              ["IT Bandwidth",       "6-month backlog — no internal fix available this fiscal year",    "#ca8a04"],
            ].map(([title, desc, color]) => (
              <div key={title} className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
                <p className="text-xs font-semibold mb-1" style={{ color }}>{title}</p>
                <p className="text-xs text-[#262510] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded border border-[#fecaca] bg-[#fef2f2]">
            <p className="text-sm font-semibold text-[#262510] mb-1">Why this can't wait</p>
            <p className="text-xs text-[#7a7974] leading-relaxed">DENSO operates under ISO 9001 certification and is subject to audit by Japan HQ, Deloitte, and Michigan on a rolling basis. An inaccurate inventory ledger isn't a backlog item — it's a citation risk. The 3PL migration to Panama takes 12–18 months. The problem is live today.</p>
          </div>
        </Card>

        {/* 2. The Solution */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <NumCircle n={2} color="#3b82f6" />
            <p className="text-sm font-semibold text-[#262510]">The Proposed Solution</p>
          </div>
          <p className="text-xs text-[#7a7974] mb-4">A lightweight AI agent system — no IT team, no integration project, no long lead time</p>
          <p className="text-sm text-[#262510] leading-relaxed mb-4">Endurance AI Labs will deploy a purpose-built AI agent orchestration system that bridges the gap between DENSO's Oracle environment and the 3PL's manual outputs — without requiring the 3PL to change anything about how they operate.</p>
          <div className="space-y-2 mb-4">
            <SectionHead label="How It Works" />
            {[
              ["Ingest",     "DENSO uploads a daily file (Excel or CSV) from the 3PL. No software change on the 3PL side."],
              ["Verify",     "An AI agent cross-references the upload against Oracle inventory, flagging mismatches and discrepancies."],
              ["Reconcile",  "A supervisor agent compiles a running ledger: inventory on hand, shipments dispatched, open orders, and variance."],
              ["Report",     "DENSO receives a clean, audit-ready inventory summary. Discrepancies surfaced with context — act, not investigate."],
            ].map(([step, desc], i) => (
              <div key={step} className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0 mt-0.5" style={{ background: "#3b82f6" }}>{i + 1}</span>
                <p className="text-sm text-[#262510] leading-relaxed"><span className="font-semibold">{step} — </span>{desc}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded border border-[#bfdbfe] bg-[#eff6ff]">
            <p className="text-sm font-semibold text-[#262510] mb-1">Designed for your constraints</p>
            <p className="text-xs text-[#7a7974] leading-relaxed">No IT team involvement required. No new software licenses. No integration project. Intentionally lightweight — built to serve the FTZ for 12–18 months and retire cleanly when DENSO migrates to Panama.</p>
          </div>
        </Card>

        {/* 3. ROI */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <NumCircle n={3} color="#16a34a" />
            <p className="text-sm font-semibold text-[#262510]">Return on Investment</p>
          </div>
          <p className="text-xs text-[#7a7974] mb-4">What success looks like — and how we measure it</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              ["Inventory Accuracy",  "≥ 98%",      "Target on reconciled ledger",               "#16a34a"],
              ["PM Research Time",    "−80%",        "Hours spent on manual reconciliation",      "#3b82f6"],
              ["Audit Readiness",     "On demand",   "Clean ledger available at any time",        "#6366f1"],
              ["Shipment Error Rate", "→ 0",         "Wrong-part shipments eliminated",           "#65a30d"],
            ].map(([label, value, sub, color]) => (
              <div key={label} className="p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>{label}</p>
                <p className="text-xl font-semibold mb-0.5" style={{ color, letterSpacing: "-0.3px" }}>{value}</p>
                <p className="text-xs text-[#7a7974]">{sub}</p>
              </div>
            ))}
          </div>
          <SectionHead label="Downstream Benefits" />
          <ul className="space-y-2">
            {[
              "Director and management team freed from daily firefighting to focus on strategic priorities — Panama migration, sales growth, new partnerships.",
              "Confidence in inventory allows DENSO to accept and fulfill orders without risk of shipping against phantom stock.",
              "Timestamped audit trail satisfies Deloitte, Japan HQ, Michigan, and ISO 9001 requirements without a manual evidence-gathering sprint.",
              "Modular architecture: the same framework extends to Repack and Returns departments with an incremental logic-layer swap (~$8–12K each).",
            ].map((b, i) => <Check key={i}>{b}</Check>)}
          </ul>
        </Card>

        {/* 4. Investment & Timeline */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <NumCircle n={4} color="#6366f1" />
            <p className="text-sm font-semibold text-[#262510]">Investment & Timeline</p>
          </div>
          <p className="text-xs text-[#7a7974] mb-4">Phase 1: FTZ Inventory Reconciliation</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#e6e5e0]">
                  {["Phase", "Scope", "Duration", "Investment"].map((h) => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-[0.2em] text-[#cdcdc9] pb-3 pr-4 font-normal" style={{ fontFamily: "var(--font-jetbrains)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Discovery",      "Process mapping with DENSO PM · Data format review · Logic design",       "Week 1",   "Included"],
                  ["Build",          "3-agent system · Reconciliation engine · Oracle integration layer",       "Week 2",   "Included"],
                  ["UAT & Deploy",   "Live testing with DENSO team · Fine-tuning · Training · Go-live",        "Week 3",   "Included"],
                  ["Ongoing Support","Stabilization · Accuracy monitoring · Expansion scoping",                 "Month 2+", "TBD"],
                ].map(([phase, scope, duration, investment]) => (
                  <tr key={phase} className="border-b border-[#e6e5e0]/60">
                    <td className="py-3 pr-4 font-semibold text-[#262510] whitespace-nowrap">{phase}</td>
                    <td className="py-3 pr-4 text-[#7a7974] leading-snug">{scope}</td>
                    <td className="py-3 pr-4 whitespace-nowrap"><span className="px-2 py-0.5 text-xs rounded border border-[#e6e5e0] text-[#7a7974]">{duration}</span></td>
                    <td className="py-3 font-semibold text-[#262510] whitespace-nowrap">{investment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>Total Investment</p>
              <p className="text-2xl font-semibold text-[#262510]" style={{ letterSpacing: "-0.5px" }}>$20K – $30K</p>
              <p className="text-xs text-[#7a7974] mt-1">FTZ Inventory Reconciliation · Phase 1</p>
            </div>
            <div className="p-4 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>Time to Value</p>
              <p className="text-2xl font-semibold text-[#262510]" style={{ letterSpacing: "-0.5px" }}>~3 Weeks</p>
              <p className="text-xs text-[#7a7974] mt-1">From kickoff to live reconciled ledger</p>
            </div>
          </div>
        </Card>

        {/* 5. About Endurance */}
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <NumCircle n={5} color="#8b5cf6" />
            <p className="text-sm font-semibold text-[#262510]">About Endurance AI Labs</p>
          </div>
          <p className="text-xs text-[#7a7974] mb-4">Who we are and why we're the right team for this</p>
          <p className="text-sm text-[#262510] leading-relaxed mb-4">Endurance AI Labs is a specialized AI deployment firm that builds production-grade agent systems for large enterprises. We focus exclusively on mission-critical problems — the ones actively costing organizations money, compliance exposure, or operational capacity.</p>
          <div className="space-y-2">
            {[
              ["Speed",               "We deploy in weeks, not months. Where traditional IT projects take 6+ months, we deliver working solutions in 3 weeks."],
              ["Enterprise DNA",      "Active engagements with American Express and Expedia. We understand how large, complex organizations operate."],
              ["No IT dependency",    "Our solutions work around legacy constraints — no API requirements, no integration projects, no IT queue."],
              ["Strategic pricing",   "We price to earn the partnership. For the right relationship, we work near break-even to demonstrate value first."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3 p-3 rounded border border-[#e6e5e0] bg-[#f7f7f4]">
                <span className="text-[#3b82f6] flex-shrink-0 mt-0.5">→</span>
                <p className="text-sm text-[#262510] leading-relaxed"><span className="font-semibold">{title} — </span><span className="text-[#7a7974]">{desc}</span></p>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer CTA */}
        <div className="rounded border border-[#e6e5e0] bg-[#f0efe9] px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#262510] mb-1">Ready to move forward?</p>
            <p className="text-sm text-[#7a7974] leading-relaxed max-w-lg">The next step is a working session with your Project Manager to scope the data formats and confirm the reconciliation logic. We can be ready to build in days.</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-semibold text-[#262510]">Alex Sok</p>
            <p className="text-xs text-[#7a7974]">alex@endurancelabs.ai</p>
            <p className="text-xs text-[#7a7974]">(415) 710-0009</p>
          </div>
        </div>

      </div>
    </>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export function DensoMissionBriefing() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview":  return <Overview />;
      case "missions":  return <CriticalMissions />;
      case "plan":      return <ProjectPlan />;
      case "about":     return <AboutUs />;
      case "bizcase":   return <BusinessCase />;
      default:          return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>
          Mission Briefing Portal
        </p>
        <h2 className="text-xl font-semibold text-[#262510] mb-1" style={{ letterSpacing: "-0.3px" }}>
          DENSO × Endurance AI Labs
        </h2>
        <p className="text-sm text-[#7a7974]">
          AI-Powered Inventory Intelligence for Americas Operations · Joseph Wright, Director of Operations
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-[#e6e5e0] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150"
            style={{
              color: activeTab === tab.id ? "#262510" : "#7a7974",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 inset-x-0 h-px" style={{ background: "var(--portal-accent)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderTab()}</div>
    </div>
  );
}

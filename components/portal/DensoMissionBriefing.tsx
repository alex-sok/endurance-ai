"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",  label: "Overview" },
  { id: "missions",  label: "Critical Missions" },
  { id: "plan",      label: "Project Plan" },
  { id: "about",     label: "About Us" },
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

// ── Root component ────────────────────────────────────────────────────────────

export function DensoMissionBriefing() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview":  return <Overview />;
      case "missions":  return <CriticalMissions />;
      case "plan":      return <ProjectPlan />;
      case "about":     return <AboutUs />;
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

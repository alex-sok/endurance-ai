"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",  label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "approach",  label: "Approach" },
  { id: "roadmap",   label: "Roadmap" },
  { id: "team",      label: "The Team" },
  { id: "metrics",   label: "Metrics" },
];

const READINESS = [
  { label: "Data Integration",   value: 2 },
  { label: "AI Readiness",       value: 3 },
  { label: "Process Clarity",    value: 4 },
  { label: "Team Adoption",      value: 3 },
  { label: "Tool Maturity",      value: 3 },
  { label: "Competitive Edge",   value: 2 },
];

const PHASE_PROGRESS = [
  { phase: "Discovery", progress: 100 },
  { phase: "Design",    progress: 60 },
  { phase: "Pilot",     progress: 0 },
  { phase: "Scale",     progress: 0 },
];

const TOOLS = [
  { name: "McLeod TMS",  status: "Active",    category: "Core TMS" },
  { name: "TruckTools",  status: "Active",    category: "Ops" },
  { name: "DrumKit",     status: "Signed Up", category: "Ops" },
  { name: "Apollo.io",   status: "Active",    category: "Sales" },
];

const CHALLENGES = [
  {
    title: "Fragmented Tech Stack",
    desc: "McLeod, TruckTools, DrumKit, and Apollo.io operate independently. No integration means manual data transfer, reconciliation loops, and duplicated effort across systems.",
  },
  {
    title: "Manual Workflow Overhead",
    desc: "High-value team members spend significant time on manual processes: status updates, exception handling, report assembly. Exact workflows were mapped during Ben's onsite visit.",
  },
  {
    title: "No Competitive Differentiation",
    desc: "Every logistics competitor uses the same tools. RJS risks commoditization by running an identical tech playbook. Josh Rulnick specifically surfaced this concern.",
  },
  {
    title: "Systems Not Communicating",
    desc: "Johnnie's stated priority: connect all current products and enable them to communicate seamlessly. This is the top-of-mind problem from the leadership team.",
  },
  {
    title: "Untapped McLeod AI Capability",
    desc: "McLeod released major AI features (RespondAI, planning exception alerts) in early 2026. The team hasn't fully mapped where these features shine or where friction still exists.",
  },
];

const APPROACH_STEPS = [
  {
    title: "Map the invisible tax.",
    desc: "Identify the 2–3 most expensive manual workflows (front-office and back-office). Break each into micro-steps, identify owners, handoffs, and time-cost.",
  },
  {
    title: "Build the information superhighway.",
    desc: "Connect McLeod, TruckTools, DrumKit, and Apollo.io so they communicate. AI agents need clean, connected data. Without it, they hallucinate and destroy trust.",
  },
  {
    title: "Deploy targeted AI agents.",
    desc: "Purpose-built for RJS's workflows, not generic tools everyone else uses. This is how RJS builds proprietary IP and competitive differentiation.",
  },
  {
    title: "Build RJS-owned IP.",
    desc: "Rather than licensing the same platforms as competitors, RJS develops capabilities that belong to them, raising defensibility and valuation multiples over time.",
  },
  {
    title: "Reinvest every win.",
    desc: "Proven AI patterns feed the flywheel: better data → sharper models → better decisions → margin expansion → capacity for strategic growth.",
  },
];

const ROADMAP_PHASES = [
  {
    label: "Phase 1: Discovery & Design",
    status: "In Progress",
    items: [
      "Map 2 critical workflows (front-office + back-office)",
      "Audit current tool capabilities and usage patterns",
      "Deep-dive McLeod AI features (RespondAI, planning exceptions)",
      "Identify highest-leverage integration points",
      "Deliver findings presentation to full RJS team",
    ],
  },
  {
    label: "Phase 2: Pilot Build",
    status: "Upcoming",
    items: [
      "Finalize pilot scope and sign engagement",
      "Connect core systems (McLeod, TruckTools, DrumKit)",
      "Deploy first AI agent on highest-priority workflow",
      "Establish governance, oversight, and feedback loops",
      "Track hours saved and error reduction weekly",
    ],
  },
  {
    label: "Phase 3: ROI Review & Expansion",
    status: "Planned",
    items: [
      "60-day pilot ROI review with Johnnie & leadership team",
      "Expand to 2nd workflow based on learnings",
      "Begin development of RJS-native AI capabilities",
      "Introduce Endurance AI engineering team more deeply",
    ],
  },
  {
    label: "Phase 4: AI-Native Operations",
    status: "Future",
    items: [
      "Full system orchestration across all 4+ tools",
      "Proprietary micro-SaaS solutions owned by RJS",
      "Flywheel: data → models → decisions → growth",
      "Position RJS for PE-premium valuation multiples",
    ],
  },
];

const CORE_TEAM = [
  { name: "Alex Sok",        role: "Co-founder / CEO",    org: "Endurance AI",  focus: "Strategy & Relationship" },
  { name: "Ben Keeney",      role: "Transformation Lead", org: "Endurance AI",  focus: "Onsite Discovery & Engineering" },
  { name: "Johnnie Johnson", role: "President",           org: "RJS Logistics", focus: "Executive Sponsor" },
  { name: "Josh Rulnick",    role: "Vice President",      org: "RJS Logistics", focus: "Operations Champion" },
  { name: "Jason Kneller",   role: "VP Operations",       org: "RJS Logistics", focus: "Workflow Owner" },
  { name: "Michael Lee",     role: "Operations Manager",  org: "RJS Logistics", focus: "Day-to-Day Execution" },
];

const EXTENDED_CONTACTS = [
  { name: "Ryan Teitz",              title: "VP of Sales",           dept: "Sales" },
  { name: "Matt Pierce",             title: "",                      dept: "" },
  { name: "Paul Schmidt",            title: "",                      dept: "" },
  { name: "Frank van Ameringen",     title: "",                      dept: "" },
  { name: "Vin Lee",                 title: "Freight Broker",        dept: "Ops" },
  { name: "Summer Nguyen",           title: "",                      dept: "" },
  { name: "James Reagan (RJS Jay)",  title: "Account Representative",dept: "Other" },
];

const MILESTONES = [
  { date: "Feb 25, 2026", event: "Initial intro meeting: RJS & Endurance AI",            done: true },
  { date: "Feb 26, 2026", event: "Full team introduction at RJS",                         done: true },
  { date: "Mar 6, 2026",  event: "Deep-dive call: tools, integrations & priorities",      done: true },
  { date: "Mar 12, 2026", event: "Ben Keeney onsite: workflow discovery at Monroe, NC",   done: true },
  { date: "Mar 22, 2026", event: "Round Up email: Pittsburgh crew convenes in Charlotte",  done: true },
  { date: "TBD",          event: "30-min presentation: findings, IP strategy, team update",done: false },
  { date: "TBD",          event: "Pilot scope finalized & signed",                         done: false },
  { date: "TBD",          event: "Phase 1 build begins",                                   done: false },
  { date: "TBD",          event: "Pilot ROI review",                                       done: false },
];

const METRICS = [
  { kpi: "Manual Workflow Reduction",     target: "2+ workflows eliminated in Phase 1" },
  { kpi: "Hours Saved / Employee / Week", target: "5–6 hrs" },
  { kpi: "System Integration",            target: "McLeod + TruckTools + DrumKit connected" },
  { kpi: "AI Adoption Rate",              target: "Core ops team live within 60 days of pilot" },
  { kpi: "Competitive Differentiation",   target: "1+ proprietary AI capability vs. peers" },
  { kpi: "Pilot Decision Gate",           target: "Clear go / no-go at end of Phase 1" },
];

const HOURS_DATA = [
  { label: "10 employees",  hours: 50 },
  { label: "25 employees",  hours: 125 },
  { label: "50 employees",  hours: 250 },
  { label: "100 employees", hours: 500 },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-[#e6e5e0] bg-[#f7f7f4] p-5 ${className}`}>
      {children}
    </div>
  );
}

function CardHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <p className="text-base font-semibold text-[#262510]">{title}</p>
      {sub && (
        <p className="text-xs mt-0.5 text-[#7a7974]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span
        className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--portal-accent)" }}
      />
      <span className="text-sm leading-relaxed text-[#7a7974]">{children}</span>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const active = status === "Active";
  return (
    <span
      className="px-2 py-0.5 text-xs"
      style={{
        fontFamily: "var(--font-jetbrains)",
        border: `1px solid ${active ? "color-mix(in srgb, var(--portal-accent) 40%, transparent)" : "#e6e5e0"}`,
        color: active ? "var(--portal-accent)" : "#7a7974",
        background: active ? "color-mix(in srgb, var(--portal-accent) 8%, transparent)" : "transparent",
      }}
    >
      {status}
    </span>
  );
}

function THead({ cols }: { cols: string[] }) {
  return (
    <tr className="border-b border-[#e6e5e0]">
      {cols.map(c => (
        <th
          key={c}
          className="text-left pb-2 pr-6 text-xs uppercase tracking-widest font-medium text-[#7a7974]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {c}
        </th>
      ))}
    </tr>
  );
}

// ── Radar chart ───────────────────────────────────────────────────────────────

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const cx = 150, cy = 145, r = 88, maxVal = 5, n = data.length;

  function pt(i: number, val: number) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const scaled = (val / maxVal) * r;
    return { x: cx + scaled * Math.cos(angle), y: cy + scaled * Math.sin(angle) };
  }

  function polygon(val: number) {
    return Array.from({ length: n }, (_, i) => pt(i, val))
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ") + " Z";
  }

  const dataPath = data
    .map((d, i) => pt(i, d.value))
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ") + " Z";

  return (
    <svg viewBox="0 0 300 290" className="w-full max-w-[280px] mx-auto">
      {/* Grid rings */}
      {[1, 2, 3, 4, 5].map(lvl => (
        <path key={lvl} d={polygon(lvl)} fill="none" stroke="#e6e5e0" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {data.map((_, i) => {
        const end = pt(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#e6e5e0" strokeWidth="1" />;
      })}
      {/* Data fill */}
      <path
        d={dataPath}
        fill="color-mix(in srgb, var(--portal-accent) 15%, transparent)"
        stroke="var(--portal-accent)"
        strokeWidth="2"
      />
      {/* Data dots */}
      {data.map((d, i) => {
        const p = pt(i, d.value);
        return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--portal-accent)" />;
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const lr = r + 22;
        const lx = cx + lr * Math.cos(angle);
        const ly = cy + lr * Math.sin(angle);
        // Score dot position (slightly further)
        const sr = r + 8;
        return (
          <g key={i}>
            <text
              x={lx}
              y={ly - 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fill="#7a7974"
              fontFamily="var(--font-jetbrains)"
            >
              {d.label}
            </text>
            <text
              x={lx}
              y={ly + 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--portal-accent)"
              fontFamily="var(--font-jetbrains)"
            >
              {d.value}/5
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function RJSMissionBriefing() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="border border-[#e6e5e0] bg-[#f7f7f4] p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p
              className="text-xs mb-1 uppercase tracking-widest"
              style={{ color: "var(--portal-accent)", fontFamily: "var(--font-jetbrains)" }}
            >
              Mission Briefing
            </p>
            <p className="text-lg font-semibold text-[#262510]">RJS Logistics × Endurance AI</p>
            <p className="text-xs mt-0.5 text-[#7a7974]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Monroe, NC · AI Transformation Partnership · Est. February 2026
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Proposal Stage", "Logistics · Transportation"].map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs border border-[#e6e5e0] text-[#7a7974]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm mt-4 leading-relaxed text-[#7a7974]">
          Complete engagement overview covering company context, identified challenges, Endurance AI's approach, phase roadmap, joint team, and success metrics.
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 py-1.5 text-xs whitespace-nowrap transition-colors duration-150"
            style={{
              fontFamily: "var(--font-jetbrains)",
              border: tab === t.id ? "1px solid var(--portal-accent)" : "1px solid #e6e5e0",
              color: tab === t.id ? "var(--portal-accent)" : "#7a7974",
              background: tab === t.id ? "color-mix(in srgb, var(--portal-accent) 8%, transparent)" : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ───────────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead title="Who Is RJS Logistics?" />
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-[#7a7974]">
              <p>
                RJS Logistics is a regional logistics and transportation company headquartered in Monroe, NC.
                Led by President Johnnie Johnson, the company operates lean teams managing freight brokerage,
                dispatch, and operations across their network.
              </p>
              <p>
                They currently run a multi-tool technology stack: McLeod TMS, TruckTools, DrumKit, and Apollo.io.
                These platforms operate in silos with no integration or cross-system communication. Their core
                challenge: everyone uses the same tools as the rest of the industry, leaving little room for
                technological differentiation.
              </p>
              <p>
                Endurance AI was introduced through Johnnie Johnson in February 2026. After two intro meetings,
                an onsite discovery visit by Ben Keeney, and ongoing communication, the opportunity is now at
                <span
                  className="mx-1 px-1.5 py-0.5 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    border: "1px solid color-mix(in srgb, var(--portal-accent) 40%, transparent)",
                    color: "var(--portal-accent)",
                    background: "color-mix(in srgb, var(--portal-accent) 8%, transparent)",
                  }}
                >
                  Proposal
                </span>
                stage with strong executive engagement.
              </p>
            </div>
          </Card>

          {/* Stat grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Meetings Held",          value: "4",          sub: "Feb – Mar 2026" },
              { label: "Key Contacts",            value: "11",         sub: "Ops, Sales & Leadership" },
              { label: "Tools in Stack",          value: "4",          sub: "0 Integrated" },
              { label: "Onsite Discovery",        value: "✓",          sub: "Mar 12, 2026" },
            ].map(s => (
              <div key={s.label} className="border border-[#e6e5e0] bg-[#f7f7f4] p-4">
                <p className="text-xs text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {s.label}
                </p>
                <p className="text-2xl font-semibold text-[#262510] leading-none mb-1">{s.value}</p>
                <p className="text-xs text-[#7a7974]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <Card>
            <CardHead title="Engagement Timeline" sub="Key touchpoints from first contact to active pilot" />
            <div className="flex flex-col gap-3">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: m.done ? "var(--portal-accent)" : "transparent",
                      border: m.done ? "none" : "2px solid #e6e5e0",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs text-[#7a7974] whitespace-nowrap"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {m.date}
                      </span>
                      <span
                        className="px-1.5 py-px text-[10px]"
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          border: "1px solid #e6e5e0",
                          color: m.done ? "var(--portal-accent)" : "#7a7974",
                          background: m.done
                            ? "color-mix(in srgb, var(--portal-accent) 8%, transparent)"
                            : "transparent",
                        }}
                      >
                        {m.done ? "Complete" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-sm text-[#262510] mt-0.5">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── CHALLENGE ──────────────────────────────────────────────────────── */}
      {tab === "challenge" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead
              title="Core Challenges Identified"
              sub="Surfaced through discovery meetings and Ben's onsite visit"
            />
            <div className="flex flex-col gap-4">
              {CHALLENGES.map((c, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-semibold"
                    style={{
                      background: "color-mix(in srgb, var(--portal-accent) 12%, transparent)",
                      color: "var(--portal-accent)",
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#262510] mb-1">{c.title}</p>
                    <p className="text-sm leading-relaxed text-[#7a7974]">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead
              title="Current Tool Stack Assessment"
              sub="4 active tools · 0 integrations · All siloed"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <THead cols={["Tool", "Category", "Status", "Integration"]} />
                </thead>
                <tbody className="divide-y divide-[#e6e5e0]">
                  {TOOLS.map(t => (
                    <tr key={t.name}>
                      <td className="py-3 pr-6 font-medium text-[#262510]">{t.name}</td>
                      <td className="py-3 pr-6 text-[#7a7974]">{t.category}</td>
                      <td className="py-3 pr-6"><StatusPill status={t.status} /></td>
                      <td className="py-3">
                        <span
                          className="px-2 py-0.5 text-xs border border-[#e6e5e0] text-[#7a7974]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          Not Connected
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ── APPROACH ───────────────────────────────────────────────────────── */}
      {tab === "approach" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead
              title="Endurance AI's Approach"
              sub="Start small, prove ROI fast, build the flywheel"
            />
            <p className="text-sm leading-relaxed text-[#7a7974] mb-4">
              We do not do massive overhauls. We build in parallel: small, controlled phases delivering
              immediate value with full governance and human oversight. For RJS, this means:
            </p>
            <div className="flex flex-col gap-4">
              {APPROACH_STEPS.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-semibold mt-0.5"
                    style={{
                      background: "color-mix(in srgb, var(--portal-accent) 12%, transparent)",
                      color: "var(--portal-accent)",
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#262510]">{s.title} </span>
                    <span className="text-sm leading-relaxed text-[#7a7974]">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead
              title="AI Readiness Snapshot"
              sub="Assessed across 6 dimensions from discovery"
            />
            <RadarChart data={READINESS} />
            <p className="text-xs text-[#7a7974] mt-3 text-center" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Scale: 1 (early) → 5 (mature). Process clarity and team adoption are strengths;
              data integration and competitive edge are the priority gaps.
            </p>
          </Card>
        </div>
      )}

      {/* ── ROADMAP ────────────────────────────────────────────────────────── */}
      {tab === "roadmap" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead
              title="Engagement Roadmap"
              sub="Four phases: start focused, then scale"
            />
            <div className="flex flex-col gap-6">
              {ROADMAP_PHASES.map((p, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="shrink-0 w-8 h-8 flex items-center justify-center text-xs font-semibold"
                      style={{
                        background: "color-mix(in srgb, var(--portal-accent) 12%, transparent)",
                        color: "var(--portal-accent)",
                        fontFamily: "var(--font-jetbrains)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < ROADMAP_PHASES.length - 1 && (
                      <div className="w-px flex-1 bg-[#e6e5e0] min-h-[24px]" />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <p className="text-sm font-semibold text-[#262510]">{p.label}</p>
                      <span
                        className="px-2 py-0.5 text-xs border border-[#e6e5e0] text-[#7a7974]"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {p.items.map(item => <Bullet key={item}>{item}</Bullet>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title="Phase Progress" sub="Completion estimate by phase" />
            <div className="flex flex-col gap-4">
              {PHASE_PROGRESS.map(p => (
                <div key={p.phase}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-[#7a7974]">{p.phase}</span>
                    <span
                      className="text-xs text-[#7a7974]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {p.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#e6e5e0] overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${p.progress}%`,
                        background: p.progress === 0
                          ? "transparent"
                          : "var(--portal-accent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── TEAM ───────────────────────────────────────────────────────────── */}
      {tab === "team" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead
              title="Joint Account Team"
              sub="Endurance AI + RJS Logistics stakeholders"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <THead cols={["Name", "Role", "Org", "Focus"]} />
                </thead>
                <tbody className="divide-y divide-[#e6e5e0]">
                  {CORE_TEAM.map(m => (
                    <tr key={m.name}>
                      <td className="py-3 pr-6 font-medium text-[#262510] whitespace-nowrap">{m.name}</td>
                      <td className="py-3 pr-6 text-[#7a7974]">{m.role}</td>
                      <td className="py-3 pr-6">
                        <span
                          className="px-2 py-0.5 text-xs"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            border: m.org === "Endurance AI"
                              ? "1px solid color-mix(in srgb, var(--portal-accent) 40%, transparent)"
                              : "1px solid #e6e5e0",
                            color: m.org === "Endurance AI" ? "var(--portal-accent)" : "#7a7974",
                            background: m.org === "Endurance AI"
                              ? "color-mix(in srgb, var(--portal-accent) 8%, transparent)"
                              : "transparent",
                          }}
                        >
                          {m.org}
                        </span>
                      </td>
                      <td className="py-3 text-[#7a7974]">{m.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHead
              title="Extended RJS Contacts"
              sub="Engaged across sales, ops, and frontline"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <THead cols={["Name", "Title", "Department"]} />
                </thead>
                <tbody className="divide-y divide-[#e6e5e0]">
                  {EXTENDED_CONTACTS.map(m => (
                    <tr key={m.name}>
                      <td className="py-3 pr-6 font-medium text-[#262510] whitespace-nowrap">{m.name}</td>
                      <td className="py-3 pr-6 text-[#7a7974]">{m.title || "—"}</td>
                      <td className="py-3 text-[#7a7974]">{m.dept || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHead
              title="Endurance AI Engineering Team"
              sub="Announced March 2026, joining to support RJS and pipeline"
            />
            <p className="text-sm leading-relaxed text-[#7a7974]">
              New engineers joining from MIT, Cornell, Cisco, and Google DeepMind. Long-tenured
              colleagues of Alex Sok from his Cisco AI/ML program. Focus: solving real, hard business
              problems. Capacity expansion is timed to coincide with the pilot build phase.
            </p>
          </Card>
        </div>
      )}

      {/* ── METRICS ────────────────────────────────────────────────────────── */}
      {tab === "metrics" && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHead
              title="Success Metrics"
              sub="What winning looks like for this engagement"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <THead cols={["KPI", "Target"]} />
                </thead>
                <tbody className="divide-y divide-[#e6e5e0]">
                  {METRICS.map(m => (
                    <tr key={m.kpi}>
                      <td className="py-3 pr-8 font-medium text-[#262510]">{m.kpi}</td>
                      <td className="py-3 text-[#7a7974]">{m.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHead
              title="Hours Saved Potential"
              sub="Based on Gusto 2026 SMB benchmarks: 5–6 hrs/employee/week"
            />
            <div className="flex flex-col gap-3 mt-2">
              {HOURS_DATA.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                  <span
                    className="text-xs w-28 shrink-0 text-[#7a7974]"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {d.label}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#e6e5e0] overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(d.hours / 500) * 100}%`,
                        background: "var(--portal-accent)",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-12 shrink-0 text-right text-[#7a7974]"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {d.hours}h/wk
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#7a7974] mt-4" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Hours saved per week at 5 hrs/employee. RJS headcount across Pittsburgh + Monroe
              offices makes even conservative adoption meaningful.
            </p>
          </Card>

          <Card>
            <CardHead title="Definition of Success: Phase 1" />
            <p className="text-sm leading-relaxed text-[#7a7974] mb-3">
              At the end of Phase 1, we will have either:
            </p>
            <div className="flex flex-col gap-2">
              <Bullet>
                <span className="font-semibold text-[#262510]">Crystal-clear partnership path</span>{" "}
                starting small, proving ROI fast, building the AI-native flywheel in parallel.
              </Bullet>
              <Bullet>
                <span className="font-semibold text-[#262510]">Or an honest no-go</span>{" "}
                which is totally okay. Either outcome delivers maximum value for RJS's time invested.
              </Bullet>
            </div>
            <p className="text-sm leading-relaxed text-[#7a7974] mt-3">
              This framing, set by Alex in the March 11 onsite prep email, establishes trust and removes
              pressure. It is a key reason executive engagement remains high.
            </p>
          </Card>
        </div>
      )}

    </div>
  );
}

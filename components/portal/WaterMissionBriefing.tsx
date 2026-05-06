"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",  label: "Overview" },
  { id: "tracks",    label: "Engagement" },
  { id: "risk",      label: "Risk Register" },
  { id: "timeline",  label: "Timeline" },
  { id: "roi",       label: "Investment" },
  { id: "next",      label: "Next Steps" },
];

const SITUATION = [
  { label: "Annual Budget",       value: "~$35–40M",          note: "Significant automation opportunity exists" },
  { label: "AI Budget (thru Sept)", value: "Underfunded",     note: "Won't cover current licensing requests" },
  { label: "AI Platform",         value: "ChatGPT Business",  note: "No enterprise agreement; Claude demand rising" },
  { label: "Governance",          value: "Policy exists",     note: "Enforcement fragmented; vibe coding underway" },
];

const TRACKS = [
  {
    id: "t1",
    title: "Track 1",
    subtitle: "Leadership AI Education",
    commitment: "1 hr/week · 8 weeks",
    audience: "AI Committee (4–5 senior leaders)",
    topics: [
      "What AI can and cannot do today (and in 6–12 months)",
      "Process mapping: where to look, what to measure",
      "Platform decisions: ChatGPT vs. Claude vs. emerging tools",
      "AI governance, data sensitivity, and risk management",
      "Practical prompting and workflow integration",
      "Building a business case for AI investment",
    ],
    outcomes: [
      "Shared vocabulary and mental model for AI across leadership",
      "Framework for evaluating AI tools and vendors",
      "Platform decision: ChatGPT vs. Claude vs. hybrid stack",
      "Process mapping methodology your teams can apply independently",
      "Governance principles and AI policy reinforcement",
    ],
  },
  {
    id: "t2",
    title: "Track 2",
    subtitle: "Citizen Developer Guardrails",
    commitment: "~1 month engagement",
    audience: "Vibe coding team + Jared",
    topics: [
      "Review current vibe-coded tool: what's working, what's at risk",
      "Set up Water Mission GitHub org + access controls",
      "Establish pull request review and security scanning",
      "Claude Code workflow: plan elsewhere, build safely",
      "Data sensitivity: what can and cannot go into an LLM",
      "Ongoing governance for citizen developers",
    ],
    outcomes: [
      "Water Mission GitHub organization account established",
      "Secure code review + security scanning on all pull requests",
      "Team understands what questions to ask before building",
      "Clear distinction between POC and MVP — and what each requires",
      "Claude Code workflow established with proper guardrails",
      "No sensitive data exposure risk from citizen development",
    ],
  },
  {
    id: "t3",
    title: "Track 3",
    subtitle: "AI Department on Retainer",
    commitment: "Ongoing · as needed",
    audience: "Jared + AI Committee",
    topics: [
      "Ad hoc advising on tools, platforms, and requests",
      "Evaluate new AI initiatives before they go sideways",
      "Help draft internal business cases for budget approval",
      "Legal review agent scoping (with Rodney, post-sabbatical)",
      "Platform standardization: finalize enterprise stack by Sept 30",
      "Long-term: Water Mission brain — a unified AI operating layer",
    ],
    outcomes: [
      "Jared has a trusted resource to call for any AI question",
      "New tool requests evaluated quickly with expert input",
      "AI roadmap evolves with the landscape — not behind it",
      "Business cases drafted for leadership budget approvals",
      "Water Mission builds toward its own AI operating layer",
    ],
  },
];

const RISKS = [
  { risk: "Unsanctioned vibe coding exposes donor data",               likelihood: "High",   impact: "Critical", mitigation: "GitHub org + code review process (Track 2)" },
  { risk: "Platform fragmentation locks in the wrong stack",           likelihood: "High",   impact: "High",     mitigation: "Platform decision framework (Track 1)" },
  { risk: "AI budget runs out before fiscal year end",                 likelihood: "High",   impact: "High",     mitigation: "Business case + ROI framing for leadership" },
  { risk: "Jared becomes single point of failure for AI",              likelihood: "Medium", impact: "High",     mitigation: "AI Committee education + retainer support" },
  { risk: "Vibe-coded tool reaches production without security review", likelihood: "Medium", impact: "Critical", mitigation: "POC vs. MVP guardrails + Endurance review" },
];

const TIMELINE = [
  { phase: "Week 1–2",   action: "Endurance reviews vibe coding team's work; GitHub org set up",    track: "Track 2" },
  { phase: "Week 2",     action: "First leadership education session with AI Committee",             track: "Track 1" },
  { phase: "Week 3–4",   action: "Guardrails and Claude Code workflow established for dev team",     track: "Track 2" },
  { phase: "Month 2",    action: "Education sessions continue; platform decision underway",          track: "Track 1" },
  { phase: "Month 2–3",  action: "Business case drafted for AI budget expansion",                   track: "Track 3" },
  { phase: "Late June",  action: "Rodney returns from sabbatical; legal review agent scoped",        track: "Track 3" },
  { phase: "By Sept 30", action: "Enterprise stack decided; AI budget case submitted for FY26",      track: "All" },
];

const ROI_CARDS = [
  { label: "Donor data breach risk",   value: "Existential",      note: "One incident costs 10–100x any investment in guardrails" },
  { label: "Rodney's legal review",    value: "~100 contracts/yr", note: "Each hour reviewing is an hour not spent on strategic COO work" },
  { label: "Vibe coding team",         value: "3 people, live now", note: "Building without a net — needs guidance this week" },
  { label: "Platform decision deadline", value: "Sept 30",         note: "FY26 budget season requires a clear stack recommendation" },
];

const NEXT_STEPS = [
  { who: "Alex",        action: "Meet with vibe coding team — review what's been built, identify risks, recommend guardrails" },
  { who: "Alex + Jared", action: "Schedule first AI Committee education session" },
  { who: "Jared",       action: "Loop in Laura to reschedule Rodney meeting (post-sabbatical, targeting late June)" },
  { who: "Alex",        action: "Share proposed retainer structure with cost options for Jared to take to leadership" },
  { who: "Jared",       action: "Gather sample contracts + Rodney's risk criteria for legal review agent scoping" },
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
    <p className="text-[10px] uppercase tracking-[0.25em] text-[#cdcdc9] mb-4" style={{ fontFamily: "var(--font-jetbrains)" }}>
      {label}
    </p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#262510] leading-relaxed">
      <span className="mt-[7px] w-1 h-1 rounded-sm flex-shrink-0" style={{ background: "var(--portal-accent)" }} />
      {children}
    </li>
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

function RiskPill({ value }: { value: string }) {
  const map: Record<string, string> = {
    Critical: "bg-[#fee2e2] text-[#b91c1c]",
    High:     "bg-[#ffedd5] text-[#c2410c]",
    Medium:   "bg-[#fef9c3] text-[#a16207]",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-sm text-xs font-medium ${map[value] ?? "bg-[#e6e5e0] text-[#7a7974]"}`}>
      {value}
    </span>
  );
}

function TrackPill({ track }: { track: string }) {
  const map: Record<string, string> = {
    "Track 1": "bg-[#dbeafe] text-[#1e40af]",
    "Track 2": "bg-[#e0e7ff] text-[#3730a3]",
    "Track 3": "bg-[#f3e8ff] text-[#6b21a8]",
    "Retainer": "bg-[#f3e8ff] text-[#6b21a8]",
    "All":      "bg-[#dcfce7] text-[#166534]",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-sm text-xs font-medium whitespace-nowrap ${map[track] ?? "bg-[#e6e5e0] text-[#7a7974]"}`}>
      {track}
    </span>
  );
}

// ── Tab content ───────────────────────────────────────────────────────────────

function Overview() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[#7a7974] leading-relaxed max-w-2xl">
        Water Mission operates at the intersection of engineering excellence, global coordination, and mission-driven impact.
        AI offers a meaningful force multiplier — but only when deployed with the right foundation. This document outlines
        a phased partnership designed to meet Water Mission where it is today: innovative but fragmented, budget-constrained
        but motivated, and ready to build something sustainable.
      </p>

      <div>
        <SectionHead label="Where Water Mission Is Today" />
        <div className="grid sm:grid-cols-2 gap-3">
          {SITUATION.map((s) => (
            <Card key={s.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>{s.label}</p>
              <p className="text-base font-semibold text-[#262510] mb-1">{s.value}</p>
              <p className="text-xs text-[#7a7974]">{s.note}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tracks() {
  const [activeTrack, setActiveTrack] = useState("t1");
  const track = TRACKS.find(t => t.id === activeTrack)!;

  const trackColors: Record<string, string> = {
    t1: "bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]",
    t2: "bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe]",
    t3: "bg-[#f3e8ff] text-[#6b21a8] border-[#e9d5ff]",
  };
  const trackBorder: Record<string, string> = {
    t1: "#93c5fd",
    t2: "#a5b4fc",
    t3: "#d8b4fe",
  };

  return (
    <div className="space-y-5">
      {/* Track selector */}
      <div className="flex gap-2 flex-wrap">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTrack(t.id)}
            className={`px-4 py-2 text-xs font-medium rounded transition-all duration-150 border ${
              activeTrack === t.id
                ? trackColors[t.id]
                : "border-[#e6e5e0] text-[#7a7974] hover:text-[#262510]"
            }`}
          >
            {t.title}: {t.subtitle}
          </button>
        ))}
      </div>

      {/* Track detail */}
      <div
        className="rounded border-l-4 border border-[#e6e5e0] bg-[#f0efe9] p-5"
        style={{ borderLeftColor: trackBorder[activeTrack] }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
          <p className="text-sm font-semibold text-[#262510]">{track.subtitle}</p>
          <span className="text-xs text-[#7a7974]">{track.audience}</span>
          <span className="text-xs text-[#7a7974]">·</span>
          <span className="text-xs text-[#7a7974]">{track.commitment}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <SectionHead label="Curriculum / Scope" />
            <ul className="space-y-2.5">
              {track.topics.map((t) => <Bullet key={t}>{t}</Bullet>)}
            </ul>
          </div>
          <div>
            <SectionHead label="Outcomes" />
            <ul className="space-y-2.5">
              {track.outcomes.map((o) => <Check key={o}>{o}</Check>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskRegister() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#7a7974]">Current exposure from unstructured AI adoption.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#e6e5e0]">
              {["Risk", "Likelihood", "Impact", "Mitigation"].map((h) => (
                <th key={h} className="text-left text-[10px] uppercase tracking-[0.2em] text-[#cdcdc9] pb-3 pr-4 font-normal" style={{ fontFamily: "var(--font-jetbrains)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RISKS.map((r) => (
              <tr key={r.risk} className="border-b border-[#e6e5e0]/60">
                <td className="py-3 pr-4 text-[#262510] leading-snug">{r.risk}</td>
                <td className="py-3 pr-4 whitespace-nowrap"><RiskPill value={r.likelihood} /></td>
                <td className="py-3 pr-4 whitespace-nowrap"><RiskPill value={r.impact} /></td>
                <td className="py-3 text-[#7a7974] leading-snug">{r.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#7a7974]">Phased rollout through end of fiscal year.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#e6e5e0]">
              {["Phase", "Action", "Track"].map((h) => (
                <th key={h} className="text-left text-[10px] uppercase tracking-[0.2em] text-[#cdcdc9] pb-3 pr-4 font-normal" style={{ fontFamily: "var(--font-jetbrains)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMELINE.map((item) => (
              <tr key={item.phase + item.action} className="border-b border-[#e6e5e0]/60">
                <td className="py-3 pr-4 font-medium text-[#262510] whitespace-nowrap">{item.phase}</td>
                <td className="py-3 pr-4 text-[#262510] leading-snug">{item.action}</td>
                <td className="py-3"><TrackPill track={item.track} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Investment() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-[#7a7974] leading-relaxed max-w-2xl">
        In a $35–40M organization, even a 5–10% reduction in manual operational overhead represents $1.75–4M in freed
        capacity. The ask is not to spend money on AI — it is to redirect what is already being spent on friction.
      </p>
      <div>
        <SectionHead label="How to Make the Budget Case Internally" />
        <div className="grid sm:grid-cols-2 gap-3">
          {ROI_CARDS.map((c) => (
            <Card key={c.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>{c.label}</p>
              <p className="text-base font-semibold text-[#262510] mb-1">{c.value}</p>
              <p className="text-xs text-[#7a7974]">{c.note}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function NextSteps() {
  return (
    <div className="space-y-3">
      {NEXT_STEPS.map((step, i) => (
        <div key={i} className="flex gap-4 p-4 rounded border border-[#e6e5e0] bg-[#f0efe9]">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-sm flex items-center justify-center text-xs font-semibold"
            style={{ background: "color-mix(in srgb, var(--portal-accent) 12%, transparent)", color: "var(--portal-accent)" }}
          >
            {i + 1}
          </span>
          <div>
            <span className="text-sm font-semibold text-[#262510]">{step.who}: </span>
            <span className="text-sm text-[#7a7974]">{step.action}</span>
          </div>
        </div>
      ))}
      <p className="text-xs text-[#cdcdc9] pt-2">Prepared by Endurance AI · May 2026 · For internal use by Water Mission leadership</p>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export function WaterMissionBriefing() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview":  return <Overview />;
      case "tracks":    return <Tracks />;
      case "risk":      return <RiskRegister />;
      case "timeline":  return <Timeline />;
      case "roi":       return <Investment />;
      case "next":      return <NextSteps />;
      default:          return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#7a7974] mb-1" style={{ fontFamily: "var(--font-jetbrains)" }}>
          Business Case · May 2026
        </p>
        <h2 className="text-xl font-semibold text-[#262510] mb-1" style={{ letterSpacing: "-0.3px" }}>
          Water Mission × Endurance AI
        </h2>
        <p className="text-sm text-[#7a7974]">
          A phased AI partnership to protect, educate, and accelerate your mission.
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
              <span
                className="absolute bottom-0 inset-x-0 h-px"
                style={{ background: "var(--portal-accent)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{renderTab()}</div>
    </div>
  );
}

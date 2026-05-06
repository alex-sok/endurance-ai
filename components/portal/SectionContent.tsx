"use client";

import type { Portal, PortalSection } from "@/types/portal";
import { GTProjectPlan } from "./GTProjectPlan";
import { RJSMissionBriefing } from "./RJSMissionBriefing";

interface Props {
  section: PortalSection;
  portal: Portal;
}

/**
 * Renders the content of a portal section.
 * Content is stored as JSONB in Supabase — each section type has its own schema.
 * This component dispatches to the right renderer based on section.slug.
 */
export function SectionContent({ section, portal }: Props) {
  const c = section.content;

  switch (section.slug) {
    case "overview":
      return <OverviewContent content={c} portal={portal} />;
    case "problem":
      return <ProblemContent content={c} portal={portal} />;
    case "solution":
      return <SolutionContent content={c} portal={portal} />;
    case "roadmap":
      return <RoadmapContent content={c} portal={portal} />;
    case "team":
      return <TeamContent content={c} portal={portal} />;
    case "metrics":
      return <MetricsContent content={c} portal={portal} />;
    case "project-plan":
      return <GTProjectPlan />;
    case "rjs-briefing":
      return <RJSMissionBriefing />;
    default:
      return <GenericContent content={c} portal={portal} />;
  }
}

// ── Shared types ──────────────────────────────────────────────────────────────

interface ContentProps {
  content: Record<string, unknown>;
  portal: Portal;
}

// ── Overview ─────────────────────────────────────────────────────────────────

function OverviewContent({ content, portal }: ContentProps) {
  const bullets = (content.bullets as string[]) ?? [];
  const body = content.body as string | undefined;

  return (
    <div className="space-y-6">
      {body && (
        <p className="text-base text-[#262510] leading-relaxed tracking-wide">{body}</p>
      )}
      {bullets.length > 0 && (
        <ul className="space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: portal.accent_color }} />
              <span className="text-sm text-[#262510] leading-relaxed tracking-wide">{b}</span>
            </li>
          ))}
        </ul>
      )}
      {!body && bullets.length === 0 && <EmptyState />}
    </div>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function ProblemContent({ content, portal }: ContentProps) {
  const challenges = (content.challenges as Array<{ title: string; description: string }>) ?? [];
  const body = content.body as string | undefined;

  return (
    <div className="space-y-6">
      {body && (
        <p className="text-base text-[#262510] leading-relaxed tracking-wide">{body}</p>
      )}
      {challenges.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map((c, i) => (
            <div
              key={i}
              className="p-5 rounded border border-[#e6e5e0] bg-[#e6e5e0]/50"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: portal.accent_color }} />
                <span className="text-sm font-semibold text-[#262510] tracking-wide">{c.title}</span>
              </div>
              <p className="text-sm text-[#262510] leading-relaxed tracking-wide">{c.description}</p>
            </div>
          ))}
        </div>
      )}
      {!body && challenges.length === 0 && <EmptyState />}
    </div>
  );
}

// ── Solution ──────────────────────────────────────────────────────────────────

function SolutionContent({ content, portal }: ContentProps) {
  const pillars = (content.pillars as Array<{ title: string; description: string; tag?: string }>) ?? [];
  const body = content.body as string | undefined;

  return (
    <div className="space-y-6">
      {body && (
        <p className="text-base text-[#262510] leading-relaxed tracking-wide">{body}</p>
      )}
      {pillars.length > 0 && (
        <div className="space-y-4">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="flex gap-5 p-5 rounded border border-[#e6e5e0] bg-[#e6e5e0]/50"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-xs font-semibold"
                style={{ background: `${portal.accent_color}20`, color: portal.accent_color }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-[#262510] tracking-wide">{p.title}</span>
                  {p.tag && (
                    <span
                      className="px-2 py-0.5 text-xs rounded-sm"
                      style={{ background: `${portal.accent_color}18`, color: portal.accent_color }}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#262510] leading-relaxed tracking-wide">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!body && pillars.length === 0 && <EmptyState />}
    </div>
  );
}

// ── Roadmap ───────────────────────────────────────────────────────────────────

function RoadmapContent({ content, portal }: ContentProps) {
  const phases = (content.phases as Array<{ phase: string; title: string; duration: string; milestones: string[] }>) ?? [];

  return (
    <div className="space-y-4">
      {phases.length > 0 ? (
        phases.map((p, i) => (
          <div key={i} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: `${portal.accent_color}20`, color: portal.accent_color }}
              >
                {i + 1}
              </div>
              {i < phases.length - 1 && (
                <div className="w-px flex-1 mt-2 mb-2 bg-[#e6e5e0] min-h-[24px]" />
              )}
            </div>
            <div className="pb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-sm font-semibold text-[#262510] tracking-wide">{p.title}</span>
                <span className="text-xs text-[#262510] tracking-wide">{p.duration}</span>
              </div>
              {p.milestones?.length > 0 && (
                <ul className="space-y-2 mt-2">
                  {p.milestones.map((m, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-2 w-1 h-1 rounded-sm flex-shrink-0 bg-[#cdcdc9]" />
                      <span className="text-sm text-[#262510] leading-relaxed tracking-wide">{m}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────

function TeamContent({ content, portal }: ContentProps) {
  const members = (content.members as Array<{ name: string; role: string; bio?: string; photo?: string }>) ?? [];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {members.length > 0 ? (
        members.map((m, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded border border-[#e6e5e0] bg-[#e6e5e0]/50"
          >
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center text-sm font-semibold flex-shrink-0"
              style={{ background: `${portal.accent_color}20`, color: portal.accent_color }}
            >
              {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#262510] tracking-wide">{m.name}</p>
              <p className="text-sm text-[#262510] tracking-wide mb-2">{m.role}</p>
              {m.bio && <p className="text-sm text-[#262510] leading-relaxed">{m.bio}</p>}
            </div>
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// ── Metrics ───────────────────────────────────────────────────────────────────

function MetricsContent({ content, portal }: ContentProps) {
  const kpis = (content.kpis as Array<{ label: string; value: string; description?: string }>) ?? [];
  const body = content.body as string | undefined;

  return (
    <div className="space-y-6">
      {body && (
        <p className="text-base text-[#262510] leading-relaxed tracking-wide">{body}</p>
      )}
      {kpis.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((k, i) => (
            <div
              key={i}
              className="p-5 rounded border border-[#e6e5e0] bg-[#e6e5e0]/50"
            >
              <p
                className="text-3xl font-semibold tracking-tight mb-1"
                style={{ color: portal.accent_color }}
              >
                {k.value}
              </p>
              <p className="text-sm font-medium text-[#262510] tracking-wide mb-1.5">{k.label}</p>
              {k.description && (
                <p className="text-sm text-[#262510] leading-relaxed">{k.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {!body && kpis.length === 0 && <EmptyState />}
    </div>
  );
}

// ── Generic ───────────────────────────────────────────────────────────────────

function GenericContent({ content }: ContentProps) {
  const body = content.body as string | undefined;
  return body ? (
    <p className="text-base text-[#262510] leading-relaxed tracking-wide">{body}</p>
  ) : (
    <EmptyState />
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex items-center gap-3 py-8">
      <div className="h-px flex-1 bg-[#e6e5e0]/60" />
      <span className="text-xs text-[#7a7974] tracking-[0.2em] uppercase">Content coming soon</span>
      <div className="h-px flex-1 bg-[#e6e5e0]/60" />
    </div>
  );
}

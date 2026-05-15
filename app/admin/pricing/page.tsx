import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { computeAdminToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PriceBadgeProps {
  label: string;
  accent?: boolean;
}

interface TierProps {
  name: string;
  price: string;
  duration: string;
  description: string;
}

// ── Components ────────────────────────────────────────────────────────────────

function PriceBadge({ label, accent = false }: PriceBadgeProps) {
  return (
    <span
      className="inline-block text-xs px-2.5 py-1 font-medium"
      style={{
        fontFamily:  "var(--font-jetbrains)",
        borderRadius: "4px",
        background:  accent ? "#262510" : "#f0efe9",
        color:       accent ? "#f7f7f4" : "#262510",
        border:      accent ? "1px solid #262510" : "1px solid #e6e5e0",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase mb-4"
      style={{ color: "#7a7974", letterSpacing: "0.25em", fontFamily: "var(--font-jetbrains)" }}
    >
      {children}
    </p>
  );
}

function ServiceCard({
  title,
  tagline,
  description,
  badges,
  tiers,
  note,
}: {
  title: string;
  tagline: string;
  description: string;
  badges?: React.ReactNode;
  tiers?: TierProps[];
  note?: string;
}) {
  return (
    <div
      className="p-6"
      style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
    >
      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-semibold" style={{ letterSpacing: "-0.02em" }}>
            {title}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#7a7974" }}>{tagline}</p>
        </div>
        {badges && <div className="flex flex-wrap gap-2">{badges}</div>}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a4940", maxWidth: "680px" }}>
        {description}
      </p>

      {/* Tier grid */}
      {tiers && (
        <div className={`grid gap-3 ${tiers.length === 2 ? "grid-cols-1 sm:grid-cols-2" : tiers.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="px-4 py-3"
              style={{ background: "#f0efe9", borderRadius: "4px", border: "1px solid #e6e5e0" }}
            >
              <p
                className="text-[10px] uppercase mb-1"
                style={{ color: "#7a7974", letterSpacing: "0.2em", fontFamily: "var(--font-jetbrains)" }}
              >
                {tier.name}
              </p>
              <p className="text-lg font-semibold mb-0.5" style={{ letterSpacing: "-0.03em" }}>
                {tier.price}
              </p>
              <p className="text-xs mb-2" style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}>
                {tier.duration}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#4a4940" }}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      {note && (
        <p
          className="text-xs mt-3"
          style={{ color: "#7a7974", fontStyle: "italic", fontFamily: "var(--font-jetbrains)" }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

// ── Pricing data ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    section: "Entry Point",
    items: [
      {
        title: "AI Audit",
        tagline: "Know exactly where AI moves the needle — before you spend anything.",
        description:
          "We come in, look at what you're doing, what you're not doing, and tell you exactly where AI can generate real ROI — and where it's a waste of money. One flat fee. No retainer. No obligation to continue. You walk away with a prioritized roadmap you can act on immediately, whether you work with us or not. Most companies spending on AI without this are guessing.",
        badges: <PriceBadge label="$999 flat" accent />,
      },
    ],
  },
  {
    section: "Embedded AI Engineer",
    items: [
      {
        title: "Embedded AI Engineer",
        tagline: "A senior AI operator inside your business — scoped to the work, not a permanent hire.",
        description:
          "We embed directly into your team and build. No lengthy discovery phases, no bloated proposals. Three tiers depending on where you are in your AI journey and what you need to get done.",
        tiers: [
          {
            name: "Tier 1",
            price: "$19k",
            duration: "2 weeks",
            description:
              "You're AI-curious but haven't shipped anything real yet. We get you from zero to deployed — a working AI system in your business in two weeks.",
          },
          {
            name: "Tier 2",
            price: "$69k",
            duration: "2 months",
            description:
              "You've shipped things, but the ROI isn't showing up. We diagnose what's broken, rebuild what needs rebuilding, and leave you with systems that actually produce results.",
          },
          {
            name: "Tier 3",
            price: "$179k",
            duration: "6 months",
            description:
              "Your AI program has stalled, failed, or needs to move faster than your team can carry it. We take the lead, rebuild from the ground up, and ship a program that works.",
          },
        ],
      },
    ],
  },
  {
    section: "DevOps & Security",
    items: [
      {
        title: "DevOps & Security for Vibe Coding",
        tagline: "You built fast. Now make sure it doesn't fall apart — or get you sued.",
        description:
          "Vibe coding ships fast. But fast code without a real foundation is a liability — downtime, data exposure, and technical debt that compounds every week. We start with an audit to understand what you've built and where the risks are. Then we architect and implement the full DevOps and security infrastructure from scratch: CI/CD pipelines, secrets management, access controls, monitoring, and incident response. You end up with a real system, not a checklist.",
        tiers: [
          {
            name: "Step 1",
            price: "$999",
            duration: "Audit",
            description: "Full technical audit of your existing setup — code, infrastructure, secrets, access, and deployment. Deliverable: a prioritized risk and remediation report.",
          },
          {
            name: "Step 2",
            price: "From $4,999",
            duration: "Full implementation",
            description: "We architect and build the complete DevOps and security system. Final price depends on stack complexity and scope of work.",
          },
        ],
      },
    ],
  },
  {
    section: "Products",
    items: [
      {
        title: "MicroSaaS",
        tagline: "We build software products. Lean, focused, designed to generate revenue.",
        description:
          "Not every business problem needs a massive platform. Sometimes the right move is a focused tool — one that does one thing well, integrates with what you have, and generates real returns. We scope, design, and build MicroSaaS products from concept to launch. Three tiers based on complexity, feature scope, and the size of the business problem you're solving.",
        tiers: [
          {
            name: "Starter",
            price: "$29k",
            duration: "Core product",
            description: "Single focused use case. Core features, clean UI, ready to ship.",
          },
          {
            name: "Growth",
            price: "$49k",
            duration: "Expanded scope",
            description: "Multi-feature product with integrations, user management, and a revenue model baked in.",
          },
          {
            name: "Scale",
            price: "$99k",
            duration: "Full platform",
            description: "Enterprise-grade product with advanced functionality, robust infrastructure, and a clear path to market.",
          },
        ],
      },
    ],
  },
  {
    section: "Voice",
    items: [
      {
        title: "Voice Agent Optimization Harness",
        tagline: "AI voice agents that get smarter over time — without you touching anything.",
        description:
          "Most voice agents are built once and left to decay. Calls go sideways, edge cases pile up, and nobody's watching. We build the infrastructure to deploy voice agents, optimize each one individually, and keep them monitored and improving on a continuous basis. You pay once to set up the harness, once per agent to build and optimize it, and a flat monthly fee to keep them running and learning. Minimum commitments apply. Annual contracts available at a discount.",
        tiers: [
          {
            name: "Small Business",
            price: "$1,999 setup",
            duration: "$999 / agent · $149 / mo per agent",
            description:
              "Standard harness setup. Individual agent builds with core optimization loop. Monthly monitoring included. 3-month minimum commitment. Annual option: 2 months free.",
          },
          {
            name: "Mid-Market",
            price: "$5,999 setup",
            duration: "$2,499 / agent · $349 / mo per agent",
            description:
              "Multi-system harness with CRM and helpdesk integrations. Advanced call flow logic and monthly optimization reviews with reporting. 6-month minimum commitment. Annual option: 2 months free.",
          },
          {
            name: "Large Enterprise",
            price: "$24,999 setup",
            duration: "$7,499 / mo platform · $599 / mo per agent over 10",
            description:
              "Dedicated environment, compliance review, and custom integrations. Platform fee covers up to 10 agents. Additional agents at $599/month each. Full-cycle optimization, dedicated account management, and SLA guarantee. Annual contract required.",
          },
        ],
        note: "Setup fee covers the full infrastructure harness. Agent fee is one-time per voice agent built. Small Business and Mid-Market: monthly fee per agent. Large Enterprise: flat platform fee covering up to 10 agents, then per-agent beyond that.",
      },
    ],
  },
  {
    section: "Infrastructure",
    items: [
      {
        title: "AI OS / Brain",
        tagline: "The connective tissue that makes your whole team think with AI — not just use it.",
        description:
          "Most companies have AI tools scattered everywhere: a chatbot here, an automation there, a model no one remembers how to use. The AI OS is different. We build the operating system for your entire organization — connecting your tools, your knowledge, your workflows, and your people into a unified system that surfaces the right information and capabilities at the right moment. This is the infrastructure layer that makes everything else compound. Priced by team size.",
        tiers: [
          {
            name: "Small",
            price: "$29k",
            duration: "1–49 team members",
            description: "Core AI infrastructure for growing teams. Unified knowledge base, workflow automation, and team-wide AI access.",
          },
          {
            name: "Mid-Sized",
            price: "$69k",
            duration: "50–499 team members",
            description: "Cross-departmental AI architecture. Role-based access, advanced integrations, and organizational memory.",
          },
          {
            name: "Large",
            price: "$129k",
            duration: "500–999 team members",
            description: "Enterprise-grade AI infrastructure at scale. Security hardening, governance layer, and complex system integrations.",
          },
          {
            name: "Enterprise",
            price: "From $499k",
            duration: "1,000+ team members",
            description: "Full enterprise AI OS with custom architecture, dedicated support, and ongoing optimization.",
          },
        ],
      },
    ],
  },
  {
    section: "Education",
    items: [
      {
        title: "Education Series & Workshops",
        tagline: "For executives and teams who need to understand AI well enough to make good decisions with it.",
        description:
          "Bad AI decisions come from not knowing what the technology can and can't do. We run focused, no-fluff sessions designed for specific audiences and outcomes — not generic overviews. Each workshop is led by operators who have built and shipped real AI systems.",
        tiers: [
          {
            name: "Executive Masterclass",
            price: "$4,999",
            duration: "Half-day session",
            description: "Built for C-suite and senior leadership. The strategic landscape, where AI creates real competitive advantage, and how to make investment decisions without getting played by vendors.",
          },
          {
            name: "Vibe Coding: Safe, Fast, Compliant",
            price: "$9,999",
            duration: "Full-day workshop",
            description: "How to ship with AI-assisted coding without creating security holes, compliance risk, or technical debt you can't unwind. For technical leads and engineering managers.",
          },
          {
            name: "AI Benefits & Capabilities",
            price: "$6,999",
            duration: "Full-day session",
            description: "A practical, honest map of what AI is good at, what it's not, and where it applies to your specific business and industry. For teams evaluating or early in adoption.",
          },
          {
            name: "Connecting Systems with AI",
            price: "$4,999",
            duration: "Half-day workshop",
            description: "How to integrate AI into your existing tech stack — APIs, data pipelines, automation, and the orchestration layer that makes it all work together.",
          },
        ],
      },
    ],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PricingPage() {
  // Auth gate
  const cookieStore = await cookies();
  const authCookie  = cookieStore.get("admin_auth")?.value;
  const expected    = computeAdminToken();
  if (!expected || authCookie !== expected) redirect("/admin");

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f7f4", color: "#262510", fontFamily: "var(--font-figtree)" }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-xs mb-2 uppercase"
              style={{ color: "#7a7974", letterSpacing: "0.25em", fontFamily: "var(--font-jetbrains)" }}
            >
              Endurance AI Labs
            </p>
            <h1 className="text-2xl font-semibold" style={{ letterSpacing: "-0.025em" }}>
              Services & Pricing
            </h1>
            <p className="text-sm mt-1" style={{ color: "#7a7974" }}>
              Offerings, tiers, and descriptions
            </p>
          </div>
          <a
            href="/admin"
            className="text-xs px-4 py-2 transition-colors hover:bg-[#e6e5e0]"
            style={{
              border:       "1px solid #cdcdc9",
              borderRadius: "4px",
              fontFamily:   "var(--font-jetbrains)",
              letterSpacing: "0.1em",
              color:        "#7a7974",
            }}
          >
            ← Mission Control
          </a>
        </div>

        {/* Services */}
        {SERVICES.map(({ section, items }) => (
          <section key={section} className="mb-10">
            <SectionLabel>{section}</SectionLabel>
            <div className="space-y-4">
              {items.map((item) => (
                <ServiceCard key={item.title} {...item} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer note */}
        <div
          className="mt-6 px-5 py-4 text-sm"
          style={{ border: "1px solid #e6e5e0", borderRadius: "4px", color: "#7a7974" }}
        >
          All prices in USD. Enterprise and custom scopes available on request. Contact{" "}
          <a
            href="mailto:hello@endurancelabs.ai"
            className="underline underline-offset-2"
            style={{ color: "#262510" }}
          >
            hello@endurancelabs.ai
          </a>{" "}
          to discuss scope.
        </div>

      </div>
    </div>
  );
}

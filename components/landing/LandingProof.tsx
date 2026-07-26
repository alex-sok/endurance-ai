"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Btn } from "@/components/ui/Btn";

interface Props {
  onOpenChat: () => void;
}

/**
 * Each row pairs the economic problem an executive actually feels with the
 * span of the system built for it. The capability list is the point: these are
 * operating layers that run the business end to end, not point solutions.
 */
const BUILDS = [
  {
    industry: "Construction",
    problem:
      "Budgets built by hand. Forecasts stale on arrival. Margin gone before anyone sees it.",
    built:
      "A brain-powered operating system for the whole company — automated budgeting, forecasting and accounting as the financial bedrock everything else runs on.",
    stack: [
      "Automated budgeting",
      "Cost-to-complete forecasting",
      "Bid preparation & estimating",
      "Job tracking & billing",
      "Autonomous accounting",
      "Job costing & WIP",
      "Change orders & RFIs",
      "Submittals & drawings",
      "Schedule & sequencing",
      "Subcontractor prequalification",
      "Certified payroll & prevailing wage",
      "Lien waivers & compliance",
      "Retainage & cash flow",
      "Materials & procurement",
      "Equipment & fleet",
      "Safety & OSHA reporting",
      "HR guides & onboarding",
      "Workforce certifications",
      "Insurance & bonding",
      "Punch list & warranty",
      "Executive reporting",
    ],
  },
  {
    industry: "Real estate & capital markets",
    problem:
      "Underwriting by hand. Investor reporting rebuilt from scratch every quarter.",
    built:
      "An autonomous brain-powered operating system running the entire firm — underwriting through capital markets and everything investors ever see.",
    stack: [
      "Automated underwriting",
      "Portfolio analytics",
      "Market research",
      "Capital markets & debt",
      "Acquisitions pipeline",
      "IC memo pipeline",
      "Comps & valuations",
      "Budgeting & reforecast",
      "Asset management",
      "Lease administration",
      "Property operations",
      "Liquidity & distributions",
      "Waterfall & LP reporting",
      "Capital calls",
      "Investor relations portal",
      "Tax & K-1 support",
      "Dispositions",
    ],
  },
  {
    industry: "Legal",
    problem:
      "Expertise locked in a few partners. Realization leaking everywhere.",
    built:
      "A brain over the firm's entire corpus, running the practice from intake through collections.",
    stack: [
      "Matter knowledge retrieval",
      "Precedent & clause search",
      "Contract lifecycle",
      "Discovery & document review",
      "Conflicts & intake",
      "Docket & deadlines",
      "Time capture & realization",
      "Matter budgeting",
      "Utilization & staffing",
      "Billing & collections",
      "Trust accounting",
      "Regulatory compliance",
      "Client reporting",
    ],
  },
  {
    industry: "Logistics & freight",
    problem:
      "Margin per load stays invisible until long after settlement.",
    built:
      "One operating system from tender to cash, with margin visible on every load in real time.",
    stack: [
      "Dispatch & tendering",
      "Load matching",
      "Carrier & capacity",
      "Rate & margin management",
      "Settlement & billing",
      "Freight audit",
      "Detention & accessorials",
      "Driver operations & HR",
      "Fleet maintenance",
      "Fuel & cost control",
      "ELD & DOT compliance",
      "Claims management",
      "Capacity forecasting",
      "Customer reporting",
    ],
  },
  {
    industry: "Multi-unit operations",
    problem:
      "Every location its own island. Group P&L always arrives too late.",
    built:
      "One operating system across every location — unit-level labor through consolidated group reporting.",
    stack: [
      "Unit-level P&L",
      "Labor scheduling & HR",
      "Inventory & purchasing",
      "Revenue management",
      "Pricing & menu analytics",
      "Forecasting & budgeting",
      "Multi-entity consolidation",
      "Vendor & supply chain",
      "Waste & shrink control",
      "Health & safety compliance",
      "Training & onboarding",
      "Cash reconciliation",
      "Customer feedback",
      "Owner reporting",
    ],
  },
  {
    industry: "Consumer & brokerage",
    problem:
      "Commission math by hand. Slow, opaque, impossible to audit.",
    built:
      "A penny-accurate commissions and settlement system finance can stand behind, wired into everything upstream.",
    stack: [
      "Commission calculation",
      "Split & override logic",
      "Plan modeling",
      "Settlement & payouts",
      "Clawbacks & adjustments",
      "Producer onboarding",
      "Licensing & compliance",
      "Producer reporting",
      "Revenue recognition",
      "Dispute resolution",
      "Audit trail & controls",
      "Forecasting",
    ],
  },
];

export function LandingProof({ onOpenChat }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-proof-header]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-proof-header]", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-build-row]").forEach((row) => {
          gsap.from(row.querySelector("[data-build-rule]"), {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: row, start: "top 92%" },
          });
          gsap.from(row.querySelectorAll("[data-build-content]"), {
            autoAlpha: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
          gsap.from(row.querySelectorAll("[data-build-chip]"), {
            autoAlpha: 0,
            y: 8,
            duration: 0.5,
            stagger: 0.025,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        });

        gsap.from("[data-proof-thread], [data-proof-nda]", {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-proof-thread]", start: "top 90%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40" aria-label="What we build">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div data-proof-header className="mb-16 md:mb-24 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60 mb-8">
            Built in the field
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.8rem)", lineHeight: 1.06 }}
          >
            Custom infrastructure, <em>built one industry at a time.</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-bone/65 max-w-xl">
            Not a product you adopt. Systems built around how you already run —
            operations, finance, revenue, workforce, reporting.
          </p>
        </div>

        {/* Industry × solution matrix */}
        <div>
          <div
            className="hidden md:grid grid-cols-12 gap-x-10 pb-4 border-b"
            style={{ borderColor: "rgba(244,243,238,0.14)" }}
          >
            <span className="col-span-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              Industry
            </span>
            <span className="col-span-4 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              What it costs them
            </span>
            <span className="col-span-5 font-mono text-[10px] uppercase tracking-[0.25em] text-flare">
              The system we built
            </span>
          </div>

          {BUILDS.map((b) => (
            <div key={b.industry} data-build-row className="group relative">
              <span data-build-rule className="block h-px w-full bg-bone/10" />
              <div className="grid md:grid-cols-12 gap-y-4 md:gap-x-10 py-9 md:py-12 transition-colors duration-300 group-hover:bg-bone/[0.025]">
                <h3
                  data-build-content
                  className="md:col-span-3 font-display text-bone text-xl md:text-2xl leading-tight"
                >
                  {b.industry}
                </h3>
                <p
                  data-build-content
                  className="md:col-span-4 text-sm md:text-[15px] leading-relaxed text-bone/55"
                >
                  {b.problem}
                </p>
                <div className="md:col-span-5">
                  <p
                    data-build-content
                    className="text-sm md:text-[15px] leading-relaxed text-bone/85"
                  >
                    {b.built}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${b.industry} — systems covered`}>
                    {b.stack.map((s) => (
                      <li
                        key={s}
                        data-build-chip
                        className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone/60 border px-2 py-1"
                        style={{ borderColor: "rgba(148,176,230,0.20)", borderRadius: 3 }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <span className="block h-px w-full bg-bone/10" />
        </div>

        <p
          data-proof-thread
          className="font-display text-bone/85 mt-16 md:mt-20 max-w-4xl"
          style={{ fontSize: "clamp(1.3rem, 2.6vw, 2rem)", lineHeight: 1.3 }}
        >
          One private brain on your data,{" "}
          <em>extended across every function that runs on it.</em>
        </p>

        <div
          data-proof-nda
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t pt-10"
          style={{ borderColor: "rgba(244,243,238,0.08)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55 max-w-md leading-relaxed">
            Client names held in confidence. Full detail under NDA.
          </p>
          <Btn variant="light" onClick={onOpenChat} className="shrink-0">
            Tell us how your business runs →
          </Btn>
        </div>
      </div>
    </section>
  );
}

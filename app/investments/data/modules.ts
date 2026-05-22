export const modules = [
  {
    num: "01",
    name: "Underwriting Workbench",
    tagline: "The core of the platform.",
    body: "Type an address and within seconds the system auto-populates property data, local market comps, and rent estimates. A full institutional-grade underwriting model runs in real time — cap rates, IRR, equity multiples, LP waterfalls, and DSCR update as you type.",
    bullets: [
      "AI-assisted assumptions with transparent override capability",
      "Automated investment committee memo generation",
      "Deal fit scoring against your firm's stated buy box",
      "Side-by-side deal comparison and scenario modeling",
    ],
  },
  {
    num: "02",
    name: "Capital Markets & Lender Hub",
    tagline: "Every quote, every term sheet, every closing — tracked.",
    body: "The platform maintains a live record of your lender relationships, their current appetites, and the delta between what they quoted and what they closed.",
    bullets: [
      "Lender quote comparison with automatic spread and proceeds analysis",
      "Term sheet tracker with status, follow-up reminders, and history",
      "Relationship scoring: response time, quote competitiveness, close rate",
    ],
  },
  {
    num: "03",
    name: "LP Investor CRM",
    tagline: "LPs treated as the strategic relationships they are.",
    body: "A purpose-built investor relations module that manages every touchpoint and document — from onboarding through K-1 delivery.",
    bullets: [
      "Investor profiles with commitment history, accreditation, and preferences",
      "K-1 delivery tracking and acknowledgment workflows",
      "Automated capital call and distribution notifications",
      "AUM-by-investor and fund performance dashboards",
    ],
  },
  {
    num: "04",
    name: "Broker & Vendor CRM",
    tagline: "Institutional memory for external relationships.",
    body: "The platform tracks every broker interaction, every deal shown, and every referral — so your next conversation starts where the last one left off.",
    bullets: [
      "Deal flow attribution: which brokers show the best opportunities",
      "Vendor management: attorneys, inspectors, property managers",
      "Sentiment and relationship health scoring",
    ],
  },
  {
    num: "05",
    name: "Disposition Manager",
    tagline: "Exit planning with the rigor of entry.",
    body: "Guides the full sale process from hold/sell analysis through closing, with integrated BOV tracking and broker selection tooling.",
    bullets: [
      "Hold vs. sell analysis with projected LP returns at exit",
      "BOV solicitation tracker with broker estimates and justifications",
      "Marketing status: prospect count, tours, bids, contract milestones",
      "Projected proceeds waterfall for LP distribution modeling",
    ],
  },
  {
    num: "06",
    name: "Intelligence Layer · AI",
    tagline: "Woven throughout every module.",
    body: "The AI layer does the work that currently falls through the cracks: parsing offering memoranda, flagging deals that match your buy box, surfacing the right lender, and drafting IC memos from raw underwriting data.",
    bullets: [
      'Natural language deal screener — "80+ unit B-class in Boise under $15M"',
      "OM document parser — extract key data from broker PDFs",
      "Anomaly detection — flag assumptions that deviate from historical norms",
      "Recommended actions — the platform tells you what to do next",
    ],
  },
] as const;

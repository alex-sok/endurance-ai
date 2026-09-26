// Copy and figures for the Margins pricing page. Kept short on purpose: the
// rate card, the year drawn, and two product frames carry most of the page.
export const PRICE = {
  implementation: "$9,500",
  implementationCredit: "$792",     // 12 x 792 returns the fee, so year one equals year two
  warrantyBar: "$12,000",
  floor: 25,
  effective: "September 2026",
};

export const BANDS = [
  { range: "25 to 40", monthly: "$1,950", annual: "$23,400" },
  { range: "41 to 70", monthly: "$2,750", annual: "$33,000" },
  { range: "71 to 110", monthly: "$3,750", annual: "$45,000" },
  { range: "111 to 175", monthly: "$4,950", annual: "$59,400" },
  { range: "176 to 275", monthly: "$6,500", annual: "$78,000" },
  { range: "276 and up", monthly: "Quoted", annual: "Quoted" },
];

export const PRICING_META = {
  title: "Pricing — Margins",
  description:
    "One monthly number, set from your own pay runs and fixed for the year. Implementation credited back in full. The pilot is free.",
  canonical: "https://endurancelabs.ai/margins/pricing",
};

export const PRICING_HERO = {
  kicker: "Margins · Pricing",
  h1: "One number a month,",
  h1Em: "fixed for twelve months.",
  lede: "Set once from your own pay runs, fixed for the year, and priced on the people your run pays.",
  fillLabel: "Open the live demo",
  fillHref: "/margins/app/commissions",
  lineLabel: "Book a call",
};

export const PRICE_BLOCK = {
  kicker: "01 · The price",
  title: "Priced on the people your run pays.",
  note: "We read the count from your own closed runs, not your roster, so nobody is billed for a name that did not get paid. Your band is set at signature and does not change for twelve months, whoever you hire.",
  colophon: "List price, effective September 2026. Production figures on this page were queried on August 24, 2026 at the brokerage where Margins was built.",
};

export const YEAR_BLOCK = {
  kicker: "02 · What a year costs",
  title: "Implementation, credited back in full.",
  note: "Implementation is $9,500 at signature. Beginning in the month your third live run closes, we apply a $792 monthly credit for twelve months. That milestone determines when the credits start.",
};

export const BUYS_BLOCK = {
  kicker: "03 · What you get",
  title: "The run, and everyone's statement.",
  frames: [
    {
      kind: "held" as const,
      caption: "Every run holds as a draft until it proves out. Blockers stop the pay step; warnings ask for a look.",
    },
    {
      kind: "statement" as const,
      caption: "A portal for every earner, with locked statements that trace to the load behind them.",
    },
  ],
  note: "Your TMS connection, your comp plan encoded, your closed weeks reconciled, and one audit line per load per earner.",
};

export const TRUST_BLOCK = {
  kicker: "04 · What we take on",
  title: "The pilot and implementation credit.",
  points: [
    {
      label: "The pilot is free",
      body: "Two to three days on your own loads. If it finds less than a year of Margins costs, we say so and we do not sell you the year.",
    },
    {
      label: "A credit tied to mispayments caught",
      body: "If Margins does not catch $12,000 of mispayment in your first twelve months, we credit the $9,500 back.",
    },
  ],
};

export const LINE_BLOCK = {
  kicker: "05 · When not to buy",
  title: "When Margins may not be a fit.",
  body: "Under about fifteen payees, a spreadsheet may still be the right fit. Margins supports one brokerage per deployment today; adding a second requires integration work.",
};

export const FAQ = {
  kicker: "06 · Questions",
  title: "Answered plainly.",
  items: [
    {
      q: "Does Margins move our money?",
      a: "No. It calculates pay, proves every dollar, and locks the run. Payment goes out however it does today.",
    },
    {
      q: "What happens if we add twenty brokers in March?",
      a: "Your pricing band stays the same until renewal. It is set at signature and fixed for twelve months, including when you add people.",
    },
    {
      q: "Why is there no free trial?",
      a: "A useful evaluation needs your TMS data and your compensation rules. The free pilot puts those into a parallel pay run, so you can compare the result with your current process.",
    },
    {
      q: "Our TMS already reports commissions.",
      a: "Compare how it handles effective dates, approvals, duplicate loads, and locked statements. Margins connects those controls to the pay run; in the published case study, that helped identify roughly $39,400 assigned to the wrong broker before payment.",
    },
    {
      q: "Can it handle our comp plan?",
      a: "Thirteen distinct pay mechanisms are in force at the brokerage where Margins was built. If the pilot finds a rule we have not encoded, we encode it and rerun.",
    },
    {
      q: "Do you train models on our data?",
      a: "No.",
    },
  ],
};

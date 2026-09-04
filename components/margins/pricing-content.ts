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
  h1Em: "and it does not move.",
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
  note: "Implementation is $9,500 at signature. We credit $792 a month across your first twelve months, starting the month your third live run closes. The credit starts on a run closing rather than on a date, so a slow integration costs us, not you.",
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
  title: "The risk sits with us.",
  points: [
    {
      label: "The pilot is free",
      body: "Two to three days on your own loads. If it finds less than a year of Margins costs, we say so and we do not sell you the year.",
    },
    {
      label: "So is a year that catches nothing",
      body: "If Margins does not catch $12,000 of mispayment in your first twelve months, we credit the $9,500 back.",
    },
  ],
};

export const LINE_BLOCK = {
  kicker: "05 · When not to buy",
  title: "Two ways this is wrong for you.",
  body: "Under about fifteen people getting paid, a spreadsheet genuinely still works, and we will say so. And Margins runs one brokerage per deployment today, so fitting a second one is integration work rather than a signup form.",
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
      a: "Nothing until renewal. A bill that jumped every time you hired would argue against the product.",
    },
    {
      q: "Why is there no free trial?",
      a: "Standing Margins up means connecting your TMS and encoding your comp plan, which cannot be undone in thirty days. The free pilot is the honest version.",
    },
    {
      q: "Our TMS already reports commissions.",
      a: "A report tells you what it believes you owe today. It cannot tell you what it told you last week, and it cannot stop a run. When two people shared one agent code here, roughly $39,400 went back to the broker who earned it because nothing had been disbursed yet.",
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

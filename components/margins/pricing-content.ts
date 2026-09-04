// Approved copy and the live figures for the Margins pricing page.
//
// The level is anchored three ways: against QuotaPath's published price for
// commission software ($525/mo platform + $35/user, so $30,660 to $44,400 a
// year for 63 payees), against the value the reference deployment defends
// (the finance hours returned, which are the team's estimate, plus the
// $14,277 a year of duplicates caught), and against a per-head curve that
// declines smoothly so no band boundary is worth gaming.
export const PRICE = {
  implementation: "$9,500",
  implementationCredit: "$792",     // 12 x 792 = 9,504, so year one equals every year after
  warrantyBar: "$12,000",
  floor: 25,
  effective: "September 2026",
};

// Narrow bands, so a renewal step is a third rather than a multiple. Every band
// from 25 to 110 people sits inside the published market range for commission
// software; above that we come in under it.
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
    "What Margins costs: one monthly number set from your own pay runs and fixed for the term, implementation credited back in full, and a free pilot on your own loads.",
  canonical: "https://endurancelabs.ai/margins/pricing",
};

export const PRICING_HERO = {
  kicker: "Margins · Pricing",
  h1: "One number a month,",
  h1Em: "and it does not move.",
  lede: "Your price is set once, from your own pay runs, and it is fixed for the year. Hire ten brokers in March and the bill is the same in April. Implementation is credited back in full, so your first year costs exactly what every year after it costs.",
  fillLabel: "Open the live demo",
  fillHref: "/margins/app/commissions",
  lineLabel: "Book a call",
};

export const PRICE_BLOCK = {
  kicker: "01 · The price",
  title: "Priced on the people your run pays.",
  lede: "Not on seats you administer, not on loads you cannot forecast, and not on a percentage of what you pay out.",
  note: "A person getting paid is anyone the weekly run pays: brokers, dispatchers, and salaried staff. We read the figure from your own closed runs rather than your roster, so you are not billed for a name that did not get paid. At the brokerage where Margins was built that is about 63 people in a typical week against 94 on the roster.",
  fixed: "Your band is set at signature from the pilot's own runs and does not change for twelve months, whoever you hire. At renewal it is re-set from the year you actually ran.",
  colophon: "List price, effective September 2026. Production figures on this page are drawn from the brokerage where Margins was built and were queried on August 24, 2026.",
};

export const START_BLOCK = {
  kicker: "02 · Getting started",
  title: "Implementation, credited back in full.",
  lede: "Margins runs one brokerage per deployment, so getting you live is integration work rather than a signup form. We charge for it, then we give it back.",
  body: [
    "Implementation is $9,500 at signature. We credit $792 a month against your subscription across the first twelve months, starting the month your third consecutive live run closes. Twelve credits return the whole fee, so your first year and every year after it cost the same amount.",
    "The credit starts on a run closing rather than on a date, which means we carry the cost of a slow integration instead of you.",
  ],
  rows: [
    {
      label: "The TMS connection",
      body: "Loads arrive on their own. In the reference deployment that is 1,077 loads in a week, imported automatically.",
    },
    {
      label: "Your comp plan, encoded",
      body: "Customer deals, team splits, extra shares, dispatcher pay, draws, escrow, loans, floors. Thirteen distinct pay mechanisms are in force at the brokerage where Margins was built, and each one is configuration, not a formula in a cell.",
    },
    {
      label: "Your history, priced",
      body: "Closed weeks are run through the engine and reconciled against what you actually paid, so the first live week is not the first test.",
    },
    {
      label: "A portal for every earner",
      body: "Locked statements only. Every line traces to the load behind it, and statement emails carry a sign-in link, never financial data.",
    },
    {
      label: "The audit trail",
      body: "One line per load, per earner. Corrections post forward as their own lines, so what was actually paid stays queryable years later.",
    },
  ],
};

export const PILOT_BLOCK = {
  kicker: "03 · The pilot",
  title: "Free, on your own loads.",
  lede: "Two to three days. Nothing changes and nobody has to trust us. You compare two numbers: what your spreadsheet paid, and what Margins says you should have paid.",
  outcomes: [
    {
      title: "The numbers match.",
      body: "Margins is proven correct, and the spreadsheet is now redundant.",
    },
    {
      title: "Margins finds a difference.",
      body: "That difference is the return on investment conversation, in your own dollars.",
    },
    {
      title: "Margins is wrong.",
      body: "We learn a comp rule we had not encoded, fix it, and rerun. Cheap.",
    },
  ],
  note: "There is no charge for the pilot and no obligation at the end of it. If the variance the pilot finds comes in under what a year of Margins costs you, we will say so, and we will not sell you the year.",
  // Remove or update this line after December 1, 2026.
  scarcity: "One brokerage per deployment means the constraint is real: we are running four pilots before December 1, 2026.",
};

export const WARRANTY_BLOCK = {
  kicker: "04 · What we stand behind",
  title: "If it does not catch anything, we pay for that.",
  lede: "The whole argument for Margins is that it stops wrong pay before it leaves. That is a claim you can hold us to, so we have written it down.",
  body: [
    "If Margins does not catch $12,000 of mispayment in your first twelve months, we credit the $9,500 implementation fee back to you. Caught means found and stopped in a draft run, with the audit line to show it, not an estimate we hand you at renewal.",
    "For scale: at the brokerage where Margins was built, duplicate loads alone accounted for $5,491 stopped before payment across twenty weeks, and a single shared agent code had been crediting about $3,961 a week to the wrong broker.",
  ],
};

export const LINE_BLOCK = {
  kicker: "05 · Where the line is",
  title: "When not to buy this.",
  body: [
    "Under about fifteen people getting paid, a spreadsheet genuinely still works, and we will say so. Our smallest band starts at twenty five, and below that the honest answer is to take the pilot anyway and come back when you have hired.",
    "Margins runs one brokerage per deployment today. Fitting a second one is integration work, not a signup form, and we would rather say that here than discover it together in week three.",
  ],
};

export const FAQ = {
  kicker: "06 · Questions",
  title: "Answered plainly.",
  items: [
    {
      q: "Does Margins move our money?",
      a: "No. Margins calculates pay, proves every dollar, and locks the run. Payment itself goes out however it goes out today. Nothing about your banking changes.",
    },
    {
      q: "How is our band set, and can it change mid-year?",
      a: "It is set once, at signature, from the closed runs the pilot produced on your own loads. It does not move for twelve months no matter who you hire or lose. At renewal we re-set it from the runs you actually closed that year, which is a conversation you can see coming twelve months out.",
    },
    {
      q: "So what happens if we add twenty brokers in March?",
      a: "Nothing, until renewal. That is the point. The owner's case for Margins is adding agents without adding back office headcount, and a bill that jumped every time you hired would be arguing against itself.",
    },
    {
      q: "Why is there no free trial?",
      a: "Because it would not be a trial. Standing Margins up means connecting your TMS and encoding your comp plan, which is the expensive part and cannot be undone in thirty days. The free pilot is the honest version: two to three days on your own loads, and a number you can check.",
    },
    {
      q: "Our TMS already reports commissions. Why buy a second system?",
      a: "A report tells you what it currently believes you owe. It cannot tell you what it told you last week, and it cannot stop a run. Margins holds every run as a draft until someone approves it, files each rate change for a second administrator to approve or reject, and keeps one audit line per load per earner. When two people shared one agent code at the brokerage where Margins was built, roughly $39,400 went back to the broker who earned it precisely because nothing had been disbursed yet.",
    },
    {
      q: "Can it handle our comp plan?",
      a: "Thirteen distinct pay mechanisms are in force at the brokerage where Margins was built, and none of them lived in one place before. If the pilot finds a rule we have not encoded, we encode it and rerun. That is what the pilot is for.",
    },
    {
      q: "What happens when a number is wrong?",
      a: "Corrections never rewrite history. They post forward as their own lines, so what was actually paid stays queryable years later alongside the reason it changed and the person who approved it. The calculation lives in one place, covered by 39 test suites that run on every change.",
    },
    {
      q: "Can our brokers see each other's pay?",
      a: "No. Each broker, dispatcher, and salaried person signs into their own portal and sees their own locked statements. Archive a payee and their sessions end that instant.",
    },
    {
      q: "Do you train models on our data?",
      a: "No.",
    },
    {
      q: "How long until we are live?",
      a: "The pilot is two to three days. Implementation is scoped against your TMS and your comp plan after the pilot, not guessed at before it, and the implementation credit does not begin until your third live run closes.",
    },
  ],
};

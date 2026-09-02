// Approved copy for the Margins pricing page.
//
// THE TWO FIGURES ARE NOT SET. Implementation and the monthly per-earner fee
// are commercial decisions, so they render as "Not set" rather than as an
// invented number. Fill both below, then link the page from the nav and from
// the Margins page. Everything else on the page is final.
export const PRICE: {
  implementation: string | null;
  perEarnerMonth: string | null;
  effective: string;
} = {
  implementation: null,
  perEarnerMonth: null,
  effective: "September 2026",
};

export const PRICING_META = {
  title: "Pricing — Margins",
  description:
    "What Margins costs: implementation once, then a monthly fee for each person getting paid. The pilot is free and runs on your own loads.",
  canonical: "https://endurancelabs.ai/margins/pricing",
};

export const PRICING_HERO = {
  kicker: "Margins · Pricing",
  h1: "One number to start,",
  h1Em: "one number a month.",
  lede: "Implementation once, then a monthly fee for each person the run pays. The pilot is free and runs on your own loads, so you see the number Margins produces before you pay for anything.",
  fillLabel: "Open the live demo",
  fillHref: "/margins/app",
  lineLabel: "Book a call",
};

export const PRICE_ROWS = [
  {
    label: "Implementation",
    qualifier: "one time, scoped after the pilot",
    key: "implementation" as const,
  },
  {
    label: "Each person getting paid",
    qualifier: "per month",
    key: "perEarnerMonth" as const,
  },
];

export const PRICE_NOTE =
  "An earner is anyone the pay run pays: brokers, dispatchers, and salaried people. At the brokerage where Margins was built, 94 people are on the roster and about 63 are paid in a typical week.";

export const INCLUDED = {
  kicker: "02 · What implementation covers",
  title: "The work of fitting one brokerage.",
  lede: "Margins runs one brokerage per deployment, so implementation is integration, not a signup form. It is the same list every time.",
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
  closer: "There is no charge for the pilot, and no obligation at the end of it.",
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
};

export const LINE_BLOCK = {
  kicker: "04 · Where the line is",
  title: "When not to buy this.",
  body: [
    "Under about fifteen people getting paid, a spreadsheet genuinely still works, and we will say so.",
    "Margins runs one brokerage per deployment today. Fitting a second one is integration work, not a signup form, and we would rather say that here than discover it together in week three.",
  ],
};

export const FAQ = {
  kicker: "05 · Questions",
  title: "Answered plainly.",
  items: [
    {
      q: "Does Margins move our money?",
      a: "No. Margins calculates pay, proves every dollar, and locks the run. Payment itself goes out however it goes out today. Nothing about your banking changes.",
    },
    {
      q: "What does it need from our TMS?",
      a: "Loads. They import automatically, and the run prices each one on its own. You do not export anything by hand.",
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
      a: "The pilot is two to three days. Implementation is scoped against your TMS and your comp plan after the pilot, not guessed at before it.",
    },
    {
      q: "What if we add agents?",
      a: "The monthly fee follows the people getting paid, so it moves with the roster. Adding agents is the case for Margins rather than a reason to renegotiate: you add them without adding back office headcount.",
    },
  ],
};

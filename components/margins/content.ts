import { CALENDLY_URL } from "@/lib/conversation-flows";

// Margins marketing page copy. Single source of truth for /margins.
//
// Every figure is drawn from the source brokerage's production system as of
// August 24, 2026 (see the Margins case study in the platform repo). No
// estimate appears on this page. Claims discipline: Margins calculates,
// proves, and locks pay; it does not move money, and the page says so out
// loud in REFUSALS. Caught dollars were caught before payment, never
// recovered losses. The source brokerage is never named.
//
// Structure: the page walks one Friday. Sheet, run, catch, statement, and the
// dispute that arrives six months later. Do not alter strings without sign-off.

// The demo is entered at /margins/app/commissions, not /margins/app: the bare
// path renders without its stylesheets. Every deep link below points at the
// view that shows the beat it sits under.
export const DEMO_HREF = "/margins/app/commissions";
export const PRICING_HREF = "/margins/pricing";
export const PROOF_HREF = "/margins/proof";

export type MarginsFigure = {
  value: string;
  label: string;
};

export type MarginsCta = {
  label: string;
  href: string;
};

export type MarginsBeat = {
  slug: string;
  kicker: string;
  title: string;
  body: string[];
  receipts?: MarginsFigure[];
  demo?: MarginsCta;
};

export const MARGINS_META = {
  title: "Margins — Endurance AI Labs",
  description:
    "Commission settlement for freight brokerages. Calculate splits from your TMS, review exceptions before payday, and trace each statement back to its loads.",
  canonical: "https://endurancelabs.ai/margins",
};

export const HERO = {
  kicker: "Product · Margins",
  h1: "One person knows the spreadsheet.",
  h1Em: "Everyone is paid from it.",
  lede: "A commission spreadsheet carries years of decisions: who shares a load, which rate applies, what changed last month. Margins turns those rules into calculations your team can inspect, flags exceptions before payday, and traces each statement back to the load.",
  ledeTwo: "Make the rules available to the team, including the person covering a week away.",
  fillLabel: "Open the live demo, no login",
  fillHref: DEMO_HREF,
  lineLabel: "Book a 15-minute call",
  lineHref: CALENDLY_URL,
};

// Spoken to the champion, early and by role. The person who owns the sheet
// reads this page afraid it replaces them, and they are the objection that
// decides the deal.
export const CHAMPION = {
  title: "If you are the one who knows the sheet.",
  body: "You know why the rules are there and where the exceptions hide. The pilot starts with that knowledge, then makes it easier for someone else to understand and run the process when you are away.",
};

export const BEATS: MarginsBeat[] = [
  {
    slug: "sheet",
    kicker: "01 · The sheet",
    title: "Thirteen ways to get paid. One file knows them all.",
    body: [
      "Customer deals, team splits, extra shares, dispatcher pay, draws, escrow, loans, floors. At the brokerage where Margins was built, thirteen distinct pay mechanisms are in force. In the sheet each one is a formula in a cell. In Margins each one is a rule with a date on it.",
      "A proposed rule change shows its dollar impact and needs a second approval. Its effective date determines which runs it applies to, preserving the rules used for earlier weeks.",
    ],
    receipts: [
      { value: "13", label: "pay mechanisms in force" },
      { value: "343", label: "changes filed and reviewed: 311 approved, 29 rejected" },
    ],
    demo: { label: "Walk a load's precedence ladder", href: "/margins/app/loads" },
  },
  {
    slug: "run",
    kicker: "02 · The run",
    title: "The same load, billed in two different weeks.",
    body: [
      "A duplicate load can be easy to miss when the entries fall in different weeks. Margins blocks the run and identifies it. Re-billed loads with changed financials, unmatched agent codes, losses, and unusually high margins also go to review.",
      "Warnings ask for a look. Blockers lock the pay step until a person clears them.",
    ],
    receipts: [
      { value: "605", label: "exceptions raised and worked in twenty weeks" },
      { value: "$5,491", label: "that would have paid twice, stopped across 20 duplicate loads" },
    ],
    demo: { label: "Open the exceptions worklist", href: "/margins/app/exceptions" },
  },
  {
    slug: "catch",
    kicker: "03 · The catch",
    title: "$39,400 was going to the wrong broker.",
    body: [
      "Two people, one agent code. A whole book, about $3,961 a week, landing on the wrong statement. Every run was still a draft. Not a dollar had moved. It went back to the broker who earned it.",
      "The audit made the shared agent code visible while there was still time to correct the statements.",
    ],
    demo: { label: "Open the audit board", href: "/margins/app/audit" },
  },
  {
    slug: "statement",
    kicker: "04 · The statement",
    title: "Every broker signs into their own numbers.",
    body: [
      "No figures in an email. A sign-in link, a locked statement, and every line opens to the load behind it. Their live board, their book by customer, and a scorecard ranked against anonymized peers.",
      "When a broker questions a number, both sides can start from the same load and the same rule.",
    ],
    receipts: [
      { value: "270", label: "statements delivered since the end of July" },
      { value: "89", label: "people they reached" },
    ],
    demo: { label: "See how each person is paid", href: "/margins/app/people" },
  },
  {
    slug: "later",
    kicker: "05 · Six months later",
    title: "A broker disputes a check from April. His deal changed in June.",
    body: [
      "Re-run April. Margins uses April's rates, because every deal carries a date. Corrections post forward as their own lines. Nothing rewrites what was paid. Years later, what went out is still queryable, next to the reason it changed and who approved it.",
      "It is also the record a buyer asks for in diligence.",
    ],
    receipts: [
      { value: "38,015", label: "audit lines behind twenty weeks of pay" },
    ],
  },
];

// The honesty, gathered in one place and placed high. Four refusals read as
// confidence; the same four spread through the page read as caveats.
export const REFUSALS = {
  slug: "refusals",
  kicker: "06 · The limits",
  title: "What Margins will not do.",
  items: [
    "It will not move your money. It computes, proves, and locks what every person earned. Then it works with how you already pay.",
    "It will not replace your TMS. It sits on top of it.",
    "Under about fifteen payees, a spreadsheet may still be the right fit. We will help you assess whether the added system is worth it.",
    "It will not run two brokerages on one deployment today. A second one is integration work, not a signup form.",
  ],
};

export const PILOT = {
  slug: "pilot",
  kicker: "07 · The pilot",
  title: "One pay run, next to your sheet.",
  lede: "For two to three days, we calculate pay from your own loads alongside your existing process. Compare the results and examine the rules behind any difference.",
  outcomes: [
    {
      title: "They match.",
      body: "The two calculations agree for that run. Together, we check the rules and exceptions before deciding what to move into daily use.",
    },
    {
      title: "They differ.",
      body: "We trace the difference to its source: a rule, an input, or an error. Then you can judge what correcting it is worth.",
    },
    {
      title: "We are wrong.",
      body: "We correct the rule or calculation and rerun the comparison. Your current pay process continues while we work through it.",
    },
  ],
  note: "Bring the person who owns the spreadsheet. They know the history behind the rules and can tell us when a calculation misses it.",
  primary: { label: "Start a parallel run", href: CALENDLY_URL },
  secondary: { label: "See what it costs", href: PRICING_HREF },
};

export const CLOSER =
  "Margins grew out of a brokerage’s weekly pay run. Real loads, disputed statements, and the people responsible for resolving them shaped the system.";

export const BAND = {
  slug: "band",
  figures: [
    { value: "$4,015,094", label: "commission settled through Margins" },
    { value: "24,299", label: "loads priced" },
    { value: "94", label: "earners on the roster, about 63 paid in a typical week" },
    { value: "20", label: "closed weekly runs, March 29 to August 16, 2026" },
  ] as MarginsFigure[],
  note: "Every figure on this page is drawn from the production system of the brokerage where Margins was built, queried August 24, 2026. One brokerage, twenty closed weekly runs.",
  cta: { label: "Twenty weeks, line by line", href: PROOF_HREF },
};

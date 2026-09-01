import { CALENDLY_URL } from "@/lib/conversation-flows";

// Margins marketing page copy. Single source of truth.
//
// Every figure is drawn from the brokerage's production system as of
// August 24, 2026 (see CASE-STUDY-2026-08-24-margins.md in the platform
// repo), except the finance hours, which are the team's estimate and must
// stay labeled as such. Claims discipline: Margins calculates, proves, and
// locks pay; it does not move money. Caught dollars were caught before
// payment, never recovered losses. Do not alter strings without sign-off.

export type MarginsFigure = {
  value: string;
  label: string;
};

export type MarginsChapter = {
  slug: string;
  kicker: string;
  pain: string;
  answerKicker: string;
  title: string;
  body: string[];
  frameSrc: string;
  frameAlt: string;
  frameCaption: string;
  receipts: MarginsFigure[];
  demoHref: string;
  demoLabel: string;
  note?: { title: string; body: string };
};

export type LedgerRow = {
  label: string;
  qualifier?: string;
  figure: string;
};

export const MARGINS_META = {
  title: "Margins — Endurance AI Labs",
  description:
    "Commission settlement for freight brokerages. Every deal governed, every exception caught before payday, every dollar proved to the person it belongs to.",
  canonical: "https://endurancelabs.ai/margins",
};

export const HERO = {
  kicker: "Product · Margins",
  h1: "Pay for the margin,",
  h1Em: "not the load.",
  lede: "Your TMS produces a commission number. Someone still finishes it by hand: overrides, pools, splits, reserves. Margins closes that gap and proves every dollar before payday.",
  fillLabel: "Open the live demo",
  fillHref: "/margins/app",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
};

export const BAND: MarginsFigure[] = [
  { value: "$4.02M", label: "settled in 20 closed weeks" },
  { value: "24,299", label: "loads priced" },
  { value: "38,015", label: "audit lines behind the payouts" },
  { value: "20", label: "duplicate loads stopped before they paid twice" },
];

export const BAND_PROVENANCE =
  "Production figures from the brokerage where Margins was built. Queried August 24, 2026.";

export const HERO_FRAME = {
  src: "/landing/margins.jpg",
  alt: "The Margins weekly run: ready to pay, blockers, warnings, and the run checklist",
};

export const CHAPTERS: MarginsChapter[] = [
  {
    slug: "deals",
    kicker: "01 · The deals",
    pain: "“Thirteen ways to get paid, one spreadsheet that knows them all, and one person who knows the spreadsheet.”",
    answerKicker: "What Margins does",
    title: "Every deal, in one governed place.",
    body: [
      "Customer deals, team splits, extra shares, dispatcher pay, draws, escrow, loans, floors. At the brokerage thirteen distinct pay mechanisms are in force, and before Margins none of them lived in one place. Now each one is configuration, not a formula in a cell.",
      "Every rate and split edit is filed with its dollar impact previewed, approved by a second administrator, and recorded on the audit board. Deals are effective-dated, so re-running an old week uses that week's rates, not today's.",
    ],
    frameSrc: "/landing/margins-load.jpg",
    frameAlt: "One load in Margins: who got paid on the left, and the precedence ladder explaining why on the right",
    frameCaption: "Who got paid on the left. Why on the right, rule by rule.",
    receipts: [
      { value: "13", label: "pay mechanisms in force" },
      { value: "343", label: "changes filed and reviewed: 311 approved, 29 rejected" },
    ],
    demoHref: "/margins/app/loads",
    demoLabel: "Walk a load's precedence ladder in the demo",
  },
  {
    slug: "catches",
    kicker: "02 · The catches",
    pain: "“A spreadsheet cannot notice the same load billed in two different weeks. And it cannot show why a number is the number.”",
    answerKicker: "What Margins does",
    title: "The run stops before it pays wrong.",
    body: [
      "The same load billed twice is a duplicate, and it blocks the run. Re-billed loads with changed financials go to review. Loads whose agent code maps to nobody, loads that lost money, and margins high enough to suggest a missing carrier cost all wait for a person before payday. Warnings ask for a look. Blockers lock the pay step until someone acts.",
      "The same run protects the house. A load below the minimum margin pays zero and says so in words. No deal can distribute more than 100 percent of a load's profit. Margins above a set review threshold, currently just under 60 percent, get a second pair of eyes, and the what-if simulator prices a proposed rate change against the real engine before anyone approves it.",
    ],
    frameSrc: "/landing/margins-exceptions.jpg",
    frameAlt: "The Margins exceptions worklist: one blocker holding the run, fifteen warnings, and the dollars at stake on each row",
    frameCaption: "Every problem load, with the money attached and the reason written out.",
    receipts: [
      { value: "605", label: "exceptions raised and worked in twenty weeks" },
      { value: "$5,491", label: "that would have paid twice, stopped across 20 duplicate loads" },
    ],
    demoHref: "/margins/app/exceptions",
    demoLabel: "Open the exceptions worklist in the demo",
    note: {
      title: "Caught before it paid.",
      body: "During configuration at the brokerage, an audit found two people sharing one agent code. A broker's entire book, about $3,961 a week, was crediting to the wrong person. Every run was still a draft, so nothing had been disbursed, and roughly $39,400 went back to the broker who earned it. A system you can audit surfaces that error. A spreadsheet just pays it.",
    },
  },
  {
    slug: "portal",
    kicker: "03 · The portal",
    pain: "“Disputes are the tax a brokerage pays for a spreadsheet.”",
    answerKicker: "What Margins does",
    title: "Every earner signs into their own numbers.",
    body: [
      "Each broker, dispatcher, and salaried person gets their own portal. Locked statements only: a week appears once the office finalizes it, and every line traces to the load behind it. Their live board, their book by customer, and a scorecard benchmarked against anonymized peers.",
      "Statement emails carry a sign-in link, never financial data. Archive a payee and their sessions end that instant. Nobody waits for accounting to assemble a statement, and nobody argues with a number they can walk back to the load.",
    ],
    frameSrc: "/landing/margins-statement.jpg",
    frameAlt: "A Margins commission statement: net pay, the margin gate explained in plain words, and every load behind the number",
    frameCaption: "One person's week, tracing back to the loads behind it.",
    receipts: [
      { value: "270", label: "statements delivered since the end of July" },
      { value: "89", label: "people they reached" },
    ],
    demoHref: "/margins/app/people",
    demoLabel: "Open a statement in the demo",
  },
];

export const LEDGER = {
  slug: "ledger",
  kicker: "The ledger",
  title: "Twenty weeks in one brokerage.",
  lede: "One brokerage, 20 closed weekly runs, March 29 through August 16, 2026.",
  rows: [
    { label: "Commission settled through Margins", figure: "$4,015,094" },
    { label: "Average weekly payroll", qualifier: "across the closed weeks", figure: "$200,755" },
    { label: "Loads priced", figure: "24,299" },
    { label: "Audit lines behind those payouts", qualifier: "one per load, per earner", figure: "38,015" },
    { label: "Earners on the roster", qualifier: "about 63 paid in a typical week", figure: "94" },
    { label: "Distinct pay mechanisms in force", figure: "13" },
    { label: "Exceptions raised and worked", figure: "605" },
    { label: "Duplicate loads stopped before payment", qualifier: "about $5,491 that would have paid twice", figure: "20" },
    { label: "Configuration changes filed and reviewed", figure: "343" },
    { label: "Finance hours returned each week", qualifier: "the team's estimate rather than a queried figure", figure: "30 to 40" },
  ] as LedgerRow[],
  methodKicker: "Why it holds",
  methodTitle: "Built to be questioned.",
  methodBody: [
    "The calculation lives in one place, covered by 39 test suites that run on every pull request. A week can be re-run at any time and gives the same answer from the same inputs.",
    "Corrections never rewrite history. They post forward as their own lines, so what was actually paid stays queryable years later, alongside the reason it changed and the person who approved it.",
  ],
  closer:
    "Margins was not designed and then sold. It was built inside a brokerage's Monday, against real loads and real disputes, until the spreadsheet had nothing left to do.",
  colophon:
    "Every figure except the finance hours is drawn from the brokerage's production system on August 24, 2026. The hours are the finance team's own estimate.",
};

export const PILOT = {
  slug: "pilot",
  kicker: "The pilot",
  title: "One pay run, next to your spreadsheet.",
  lede: "Two to three days, on your own loads. Nothing changes and nobody has to trust us. You compare two numbers.",
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
  buyers: [
    {
      role: "For the owner",
      unlock: "Add agents without adding back office headcount, and a commission book clean enough to survive diligence.",
    },
    {
      role: "For the controller",
      unlock: "Payday runs without you. You are not the single point of failure any more.",
    },
  ],
  frameSrc: "/landing/margins-reconcile.jpg",
  frameAlt: "The Margins reconciliation screen: a pay run matched line by line against the spreadsheet, variances named to the cent",
  frameCaption: "The parallel run, made into a screen. Matched to the cent, variances named.",
  demoHref: "/margins/app/reconciliation",
  demoLabel: "See the reconciliation screen in the demo",
  note: "Under about fifteen people getting paid, a spreadsheet genuinely still works, and we will say so. Margins runs one brokerage per deployment today. Fitting a second one is integration work, not a signup form, and we would rather say that here than discover it together in week three.",
};

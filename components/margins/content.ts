import { CALENDLY_URL } from "@/lib/conversation-flows";

// Margins marketing page copy. Single source of truth.
//
// Every figure is drawn from the source brokerage's production system as of
// August 24, 2026 (see the Margins case study in the platform repo), except
// the finance hours, which are the team's estimate and must
// stay labeled as such. Claims discipline: Margins calculates, proves, and
// locks pay; it does not move money. Caught dollars were caught before
// payment, never recovered losses. Do not alter strings without sign-off.

export type MarginsFigure = {
  value: string;
  label: string;
};

export type ExhibitRow = {
  label: string;
  sub: string;
  value: string;
};

export type Exhibit = {
  caption: string;
  head: string;
  meta: string;
  rows: ExhibitRow[];
  foot?: { label: string; value: string };
};

export type MarginsChapter = {
  slug: string;
  kicker: string;
  statement: string;
  title: string;
  body: string[];
  exhibit?: Exhibit;
  diagram?: boolean;
  frame?: "paid" | "held" | "statement";
  frameCaption?: string;
  receipts: MarginsFigure[];
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
  h1Accent: "margin",
  h1Em: "not the load.",
  lede: "Your TMS produces a commission number. Someone still finishes it by hand: overrides, pools, splits, reserves. Margins closes that gap and proves every dollar before payday.",
  fillLabel: "Open the live demo",
  fillHref: "/margins/app",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
};

export const CHAPTERS: MarginsChapter[] = [
  {
    slug: "deals",
    kicker: "02 · The deals",
    statement: "Thirteen ways to get paid, one spreadsheet that knows them all, and one person who knows the spreadsheet.",
    title: "Every deal, in one governed place.",
    body: [
      "Customer deals, team splits, extra shares, dispatcher pay, draws, escrow, loans, floors. At the brokerage where Margins was built, thirteen distinct pay mechanisms are in force, and before Margins none of them lived in one place. Now each one is configuration, not a formula in a cell.",
      "Every rate and split edit is filed with its dollar impact previewed, approved by a second administrator, and recorded on the audit board. Deals are effective-dated, so re-running an old week uses that week's rates, not today's.",
    ],
    exhibit: {
      caption: "One load, distributed",
      head: "Load L284100",
      meta: "Harbor Logistics Co · $413 profit",
      rows: [
        { label: "Hutchins reserve", sub: "Office reserve · 5%", value: "$21.00" },
        { label: "Hutchins team", sub: "Team pool · 70%", value: "$274.00" },
        { label: "Theo York", sub: "Dispatch share · 7%", value: "$29.00" },
        { label: "Margins keeps", sub: "Remainder after payouts", value: "$89.00" },
      ],
    },
    frame: "paid",
    frameCaption: "The same load in the product. Every share names its rule.",
    receipts: [
      { value: "13", label: "pay mechanisms in force" },
      { value: "343", label: "changes filed and reviewed: 311 approved, 29 rejected" },
    ],
  },
  {
    slug: "catches",
    kicker: "03 · The catches",
    statement: "A spreadsheet cannot notice the same load billed in two different weeks. And it cannot show why a number is the number.",
    title: "The run stops before it pays wrong.",
    body: [
      "The same load billed twice is a duplicate, and it blocks the run. Re-billed loads with changed financials go to review. Loads whose agent code maps to nobody, loads that lost money, and margins high enough to suggest a missing carrier cost all wait for a person before payday. Warnings ask for a look. Blockers lock the pay step until someone acts.",
      "The same run protects the house. A load below the minimum margin pays zero and says so in words. No deal can distribute more than 100 percent of a load's profit. Margins above a set review threshold, currently just under 60 percent, get a second pair of eyes, and the what-if simulator prices a proposed rate change against the real engine before anyone approves it.",
    ],
    diagram: true,
    frame: "held",
    frameCaption: "The same week in the product. One blocker holds the pay step; the run will not release until a person clears it.",
    receipts: [
      { value: "605", label: "exceptions raised and worked in twenty weeks" },
      { value: "$5,491", label: "that would have paid twice, stopped across 20 duplicate loads" },
    ],
    note: {
      title: "Caught before it paid.",
      body: "During configuration, an audit found two people sharing one agent code. A broker's entire book, about $3,961 a week, was crediting to the wrong person. Every run was still a draft, so nothing had been disbursed, and roughly $39,400 went back to the broker who earned it. A system you can audit surfaces that error. A spreadsheet just pays it.",
    },
  },
  {
    slug: "portal",
    kicker: "04 · The portal",
    statement: "Disputes are the tax a brokerage pays for a spreadsheet.",
    title: "Every earner signs into their own numbers.",
    body: [
      "Each broker, dispatcher, and salaried person gets their own portal. Locked statements only: a week appears once the office finalizes it, and every line traces to the load behind it. Their live board, their book by customer, and a scorecard benchmarked against anonymized peers.",
      "Statement emails carry a sign-in link, never financial data. Archive a payee and their sessions end that instant. Nobody waits for accounting to assemble a statement, and nobody argues with a number they can walk back to the load.",
    ],
    exhibit: {
      caption: "One statement",
      head: "Beck Zimmer",
      meta: "BECKZFL · Broker · paid as flat rate",
      rows: [
        { label: "L284233", sub: "Meridian Lumber · 22.1% margin", value: "$396.00" },
        { label: "L284492", sub: "Halcyon Glass · 19.9% margin", value: "$148.00" },
      ],
      foot: { label: "Net pay · week ending Jun 20", value: "$544.00" },
    },
    frame: "statement",
    frameCaption: "A statement as the earner sees it. The gate is explained in words, not a code.",
    receipts: [
      { value: "270", label: "statements delivered since the end of July" },
      { value: "89", label: "people they reached" },
    ],
  },
];

export const LEDGER = {
  slug: "ledger",
  kicker: "01 · The ledger",
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
  methodKicker: "05 · Why it holds",
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
  kicker: "06 · The pilot",
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
  note: "Under about fifteen people getting paid, a spreadsheet genuinely still works, and we will say so. Margins runs one brokerage per deployment today. Fitting a second one is integration work, not a signup form, and we would rather say that here than discover it together in week three.",
};

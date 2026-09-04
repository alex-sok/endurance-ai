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
    "Commission settlement for freight brokerages. Every split computed off your TMS, every load that would pay wrong held before payday, every broker handed a statement that traces to the load.",
  canonical: "https://endurancelabs.ai/margins",
};

export const HERO = {
  kicker: "Product · Margins",
  h1: "One person knows the spreadsheet.",
  h1Em: "Everyone is paid from it.",
  lede: "It decides what every broker gets paid. The only test it has ever had is the person who built it. Margins computes every split off your TMS, holds the loads that would pay wrong, and hands each broker a statement that traces to the load.",
  ledeTwo: "Add agents without adding another person who knows the sheet.",
  fillLabel: "Open the live demo, no login",
  fillHref: DEMO_HREF,
  lineLabel: "Fifteen minutes",
  lineHref: CALENDLY_URL,
};

// Spoken to the champion, early and by role. The person who owns the sheet
// reads this page afraid it replaces them, and they are the objection that
// decides the deal.
export const CHAMPION = {
  title: "If you are the one who knows the sheet.",
  body: "Margins does not replace you. The run happens the week you are out. The next person can read what you built. The pilot needs you in the room.",
};

export const BEATS: MarginsBeat[] = [
  {
    slug: "sheet",
    kicker: "01 · The sheet",
    title: "Thirteen ways to get paid. One file knows them all.",
    body: [
      "Customer deals, team splits, extra shares, dispatcher pay, draws, escrow, loans, floors. At the brokerage where Margins was built, thirteen distinct pay mechanisms are in force. In the sheet each one is a formula in a cell. In Margins each one is a rule with a date on it.",
      "Changing a rule takes a filed request, a priced dollar impact, and a second signature. Nothing behind that date moves.",
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
      "The sheet pays it twice. Margins stops the run and says why. Same for a re-billed load whose financials moved, an agent code that maps to nobody, a load that lost money, and a margin too good to be true.",
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
      "A system you can audit finds that. A spreadsheet just pays it.",
    ],
    demo: { label: "Open the audit board", href: "/margins/app/audit" },
  },
  {
    slug: "statement",
    kicker: "04 · The statement",
    title: "Every broker signs into their own numbers.",
    body: [
      "No figures in an email. A sign-in link, a locked statement, and every line opens to the load behind it. Their live board, their book by customer, and a scorecard ranked against anonymized peers.",
      "Nobody argues with a number they can walk back to the load.",
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
    "It will not earn its keep under about fifteen payees. Keep the sheet. We mean it. Come back when it hurts.",
    "It will not run two brokerages on one deployment today. A second one is integration work, not a signup form.",
  ],
};

export const PILOT = {
  slug: "pilot",
  kicker: "07 · The pilot",
  title: "One pay run, next to your sheet.",
  lede: "Two to three days, on your own loads. Nothing changes and nobody has to trust us. You compare two numbers.",
  outcomes: [
    {
      title: "They match.",
      body: "Margins is proven correct, and the sheet is now redundant.",
    },
    {
      title: "They differ.",
      body: "That gap is the return on investment conversation, in your own dollars.",
    },
    {
      title: "We are wrong.",
      body: "We learn a comp rule we had not encoded, fix it, and rerun. Cheap.",
    },
  ],
  note: "The person who owns the sheet should be in the room. They are your best reviewer, and the objection that matters most.",
  primary: { label: "Start a parallel run", href: CALENDLY_URL },
  secondary: { label: "See what it costs", href: PRICING_HREF },
};

export const CLOSER =
  "Margins was not designed and then sold. It was built inside a brokerage's Friday, against real loads and real disputes, until the spreadsheet had nothing left to do.";

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

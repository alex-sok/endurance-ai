import { CALENDLY_URL } from "@/lib/conversation-flows";

export type ProductProofPair = {
  before: string;
  after: string;
};

export type ProductClose = {
  kicker?: string;
  title: string;
  lede?: string;
  talkLabel?: string;
  hideCapture?: boolean;
};

export type ProductSolve = {
  id: string;
  pain: string;
  solve: string;
  body: string;
  frameSrc: string;
  frameAlt: string;
};

export type ProductContent = {
  kicker: string;
  title: string;
  italic: string;
  lede: string;
  talkLabel?: string;
  frameSrc: string;
  frameAlt: string;
  chips?: string[];
  proofStrip?: string;
  /** Ordered pain→solve sheets. Append when VP locks more; do not invent copy. */
  solves?: ProductSolve[];
  steps: { n: string; title: string; body: string }[];
  proofLede: string;
  proofTitle: string;
  proofNote: string;
  proofPair?: ProductProofPair;
  close?: ProductClose;
  lineLabel: string;
  lineHref: string;
  note?: { text: string; href: string; link: string };
};

const MARGINS_FRAME = "/landing/margins.jpg";
// SAMPLE 16:10 crops, not the live book. SAMPLE stays in the stills.
const MARGINS_SLOTS = {
  ingest: "/landing/margins-autosplit.png",
  "pay-run": "/landing/margins-week-run.png",
  exceptions: "/landing/margins-exceptions.png",
} as const;

/** Render order. Locked copy appears; reserved ids stay dark until VP locks them. */
export const MARGINS_SOLVE_IDS = [
  "ingest",
  "pay-run",
  "exceptions",
  "structures",
  "fraud",
  "overpay",
  "deals",
  "portal",
] as const;

export type MarginsSolveId = (typeof MARGINS_SOLVE_IDS)[number];

type LockedSolve = Omit<ProductSolve, "id">;

function lockedSolves(
  order: readonly MarginsSolveId[],
  locked: Partial<Record<MarginsSolveId, LockedSolve>>,
): ProductSolve[] {
  return order.flatMap((id) => {
    const block = locked[id];
    return block ? [{ id, ...block }] : [];
  });
}

export const BRAIN: ProductContent = {
  kicker: "Product · Brain",
  title: "Institutional memory",
  italic: "that cites its sources.",
  lede: "Everything the firm already produces, compiled. Every claim cites a source. Nothing is invented.",
  frameSrc: "/landing/brain.png",
  frameAlt: "Ask Brain console",
  steps: [
    {
      n: "01",
      title: "Ingest",
      body: "Sources the firm already produces, kept verbatim. Mail, threads, decks, meetings, code.",
    },
    {
      n: "02",
      title: "Compile",
      body: "A living knowledge base. A claim without a source does not ship.",
    },
    {
      n: "03",
      title: "Answer",
      body: "Ask in plain language. Every figure points at a document.",
    },
  ],
  proofLede: "Everything the firm already produces, compiled.",
  proofTitle: "Every claim cites a source.",
  proofNote: "Nothing is invented.",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
  note: {
    text: "A working console, not this page.",
    href: "/brain/console",
    link: "Open the demo",
  },
};

// Hero is the margin claim. Commission math is table stakes — a band, not the hero.
export const MARGINS: ProductContent = {
  kicker: "",
  title: "Pay for the margin, not the load.",
  italic: "Every commission, to the penny.",
  lede: "TMS loads become a weekly pay run. Splits track what the load actually made.",
  talkLabel: "Talk",
  frameSrc: MARGINS_FRAME,
  frameAlt: "Margins commissions run",
  proofStrip:
    "In production at a freight brokerage. Weekly pay run from their TMS.",
  chips: [
    "McLeod-first",
    "Existing TMS",
    "Weekly pay run",
    "Brokerage owners",
    "One brokerage per deployment",
  ],
  steps: [],
  solves: lockedSolves(MARGINS_SOLVE_IDS, {
    ingest: {
      pain: "“Splits don’t follow what the load actually made.”",
      solve: "Pay follows the margin.",
      body: "Ingest from the TMS. No re-keying. A fat load and a thin load are not the same deal. Agents can still make more. The house stops overpaying the week the market was fat.",
      frameSrc: MARGINS_SLOTS.ingest,
      frameAlt: "AutoSplit / scale",
    },
    "pay-run": {
      pain: "“The spreadsheet is the system.”",
      solve: "A weekly pay run.",
      body: "Every split computed. Everyone who gets paid, and the rule that pays them. The week is an object you can run.",
      frameSrc: MARGINS_SLOTS["pay-run"],
      frameAlt: "this week’s run",
    },
    exceptions: {
      pain: "“We find the miss after payday.”",
      solve: "Exceptions before money moves.",
      body: "Blockers and warnings while the run is still a draft. Friday is the close, not the discovery.",
      frameSrc: MARGINS_SLOTS.exceptions,
      frameAlt: "exceptions on the run",
    },
  }),
  proofLede: "",
  proofTitle: "",
  proofNote: "",
  proofPair: {
    before: "The spreadsheet.",
    after: "The pay run.",
  },
  close: {
    title: "Talk if the pay run is still a spreadsheet.",
    talkLabel: "Talk",
    hideCapture: true,
  },
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
};

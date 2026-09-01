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
  pain: string;
  solve: string;
  body: string;
  frameSrc: string;
  frameAlt: string;
  frameFocus?: "start" | "center" | "end";
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
  solves: [
    {
      pain: "“Splits don’t follow what the load actually made.”",
      solve: "Pay follows the margin.",
      body: "Ingest from the TMS. No re-keying. A fat load and a thin load are not the same deal. Agents can still make more. The house stops overpaying the week the market was fat.",
      frameSrc: MARGINS_FRAME,
      frameAlt: "AutoSplit / scale",
      frameFocus: "start",
    },
    {
      pain: "“The spreadsheet is the system.”",
      solve: "A weekly pay run.",
      body: "Every split computed. Everyone who gets paid, and the rule that pays them. The week is an object you can run.",
      frameSrc: MARGINS_FRAME,
      frameAlt: "this week’s run",
      frameFocus: "center",
    },
    {
      pain: "“We find the miss after payday.”",
      solve: "Exceptions before money moves.",
      body: "Blockers and warnings while the run is still a draft. Friday is the close, not the discovery.",
      frameSrc: MARGINS_FRAME,
      frameAlt: "exceptions on the run",
      frameFocus: "end",
    },
  ],
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

import { CALENDLY_URL } from "@/lib/conversation-flows";

export type ProductContent = {
  kicker: string;
  title: string;
  italic: string;
  lede: string;
  frameSrc: string;
  frameAlt: string;
  chips: string[];
  steps: { n: string; title: string; body: string }[];
  proofs: { before: string; after: string; body: string }[];
  proofTitle: string;
  lineLabel: string;
  lineHref: string;
  note?: { text: string; href: string; link: string };
};

export const BRAIN: ProductContent = {
  kicker: "Product · Brain",
  title: "Institutional memory.",
  italic: "That cites its sources.",
  lede: "Everything the firm already produces, compiled into a living knowledge base. Every claim cites a source. Nothing is invented.",
  frameSrc: "/landing/brain.png",
  frameAlt: "Ask Brain console",
  chips: ["Email", "Slack", "Drive", "Deal rooms", "Code"],
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
  proofs: [
    {
      before: "Answers buried in mail.",
      after: "Cited. Every time.",
      body: "The thread, the deck, the meeting. Compiled. Asked. Sourced.",
    },
    {
      before: "Knowledge walking out.",
      after: "The firm still knows.",
      body: "When people leave, the work they did does not.",
    },
  ],
  proofTitle: "Every claim, sourced.",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
  note: {
    text: "A working console, not this page.",
    href: "/brain/console",
    link: "Open the demo",
  },
};

export const MARGINS: ProductContent = {
  kicker: "Product · Margins",
  title: "Commissions.",
  italic: "Settled to the penny.",
  lede: "TMS loads become a proven pay run. Every split computed. Every exception surfaced before payday.",
  frameSrc: "/landing/margins.jpg",
  frameAlt: "Margins commissions run",
  chips: ["TMS loads", "Splits", "Exceptions", "Owner-operators", "Payday"],
  steps: [
    {
      n: "01",
      title: "Ingest the loads",
      body: "Jobs, people, and splits in from the TMS. No re-keying.",
    },
    {
      n: "02",
      title: "Compute every split",
      body: "Every commission, to the penny. The spreadsheet is not the system.",
    },
    {
      n: "03",
      title: "Surface exceptions",
      body: "What does not prove out is a list, before the money moves.",
    },
  ],
  proofs: [
    {
      before: "Payday in a spreadsheet.",
      after: "Settled to the penny.",
      body: "Loads become a proven run. The math is the product.",
    },
    {
      before: "Exceptions after the fact.",
      after: "Before payday.",
      body: "What does not prove out is a list, not a surprise.",
    },
  ],
  proofTitle: "The run, proven.",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
  note: {
    text: "A sample run, not this page.",
    href: "/margins/app",
    link: "Open the demo",
  },
};

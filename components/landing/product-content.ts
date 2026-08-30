import { CALENDLY_URL } from "@/lib/conversation-flows";

export type ProductContent = {
  kicker: string;
  title: string;
  italic: string;
  lede: string;
  frameSrc: string;
  frameAlt: string;
  steps: { n: string; title: string; body: string }[];
  proofLede: string;
  proofTitle: string;
  proofNote: string;
  lineLabel: string;
  lineHref: string;
  note?: { text: string; href: string; link: string };
};

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
  kicker: "Product · Margins",
  title: "Pay for the margin,",
  italic: "not the load.",
  lede: "TMS loads become a weekly pay run. Splits track what the load actually made.",
  frameSrc: "/landing/margins.jpg",
  frameAlt: "Margins commissions run",
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
  proofLede:
    "Margins is in production inside a freight brokerage, running the weekly pay run from their TMS.",
  proofTitle: "That is the method.",
  proofNote: "Sit in the operation. Ship the system.",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
  note: {
    text: "A sample run, not this page.",
    href: "/margins/app",
    link: "Open the demo",
  },
};

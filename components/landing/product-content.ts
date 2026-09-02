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

// Brain's own answers, typeset for the page. Real rows from the console.
export const BRAIN_ANSWERS = [
  { label: "JV terms on Magnolia Crossing?", sub: "8% pref · 70/30 · LP 88% / GP 12%", value: "4" },
  { label: "Year-3 NOI vs projection?", sub: "$4.6M vs $4.4M, up 4.5%", value: "2" },
  { label: "Debt stack on Cedar Ridge?", sub: "$18.4M · SOFR+165 · matures 2031", value: "3" },
  { label: "Remaining capital commitment?", sub: "$2.1M undrawn across 3 deals", value: "2" },
];

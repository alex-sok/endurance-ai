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
  {
    label: "Help me find the leakage in our invoicing.",
    sub: "$68,400 unbilled across 318 invoices · four causes, ranked",
    value: "12",
  },
  {
    label: "Which customers cost us money after everything?",
    sub: "11 accounts below 6% margin on $2.1M of revenue",
    value: "9",
  },
  {
    label: "What did we actually agree to in this contract?",
    sub: "30-day notice · cap at 110% of budget · auto-renews Mar 1",
    value: "3",
  },
  {
    label: "Why did last month miss plan?",
    sub: "Labor +$212K · price and mix +$88K · volume flat",
    value: "7",
  },
];

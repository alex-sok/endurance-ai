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
  lede: "Your company’s knowledge is spread across documents, messages, meetings, and code. Brain brings it into a living knowledge base, with source links your team can follow.",
  frameSrc: "/landing/brain.png",
  frameAlt: "Ask Brain console",
  steps: [
    {
      n: "01",
      title: "Ingest",
      body: "Bring in the documents, messages, meetings, and code your company already produces. The original material stays available for reference.",
    },
    {
      n: "02",
      title: "Compile",
      body: "Organize that material into pages about your people, customers, processes, and rules. Link the claims back to their sources.",
    },
    {
      n: "03",
      title: "Answer",
      body: "Ask in plain language and follow the answer back to the supporting material. Your team can examine both the answer and the evidence.",
    },
  ],
  proofLede: "A useful answer should leave you able to check it.",
  proofTitle: "Follow the answer to its source.",
  proofNote: "Source links make the reasoning open to review. They help your team spot a missing detail or a mistaken interpretation.",
  lineLabel: "Book a call",
  lineHref: CALENDLY_URL,
  note: {
    text: "Explore example questions and answers in the console.",
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
    label: "Revenue was down 3.5% last quarter. Why?",
    sub: "Volume −6.1% · price +2.4% · two accounts, one lost rep",
    value: "16",
  },
  {
    label: "Where is our best growth over the last few quarters?",
    sub: "Three segments compounding above 18% · two worth the capital",
    value: "14",
  },
  {
    label: "Invite every account executive to the new product demo.",
    sub: "18 reps found · drafted, times held, waiting on your send",
    value: "5",
  },
  {
    label: "Model next year at +20% growth. What breaks first?",
    sub: "Dispatch capacity in month 7 · working capital $2.8M short · two hires, named",
    value: "21",
  },
  {
    label: "Which five customers are most at risk this quarter?",
    sub: "Signals across email, tickets and order flow · save plans drafted for two",
    value: "11",
  },
];

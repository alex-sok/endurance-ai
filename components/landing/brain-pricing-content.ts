// Copy and figures for the Brain pricing page. Short on purpose: the ladder,
// the deployment ledger, and the answers carry it.
//
// CLAIMS DISCIPLINE: the deployment is the same operation where Margins runs,
// and that operation is never named. Figures below were counted from the
// compiled knowledge base on September 2, 2026.
export const BRAIN_BANDS = [
  { range: "Up to 25", monthly: "$1,250", annual: "$15,000" },
  { range: "26 to 45", monthly: "$1,950", annual: "$23,400" },
  { range: "46 to 80", monthly: "$2,750", annual: "$33,000" },
  { range: "81 to 140", monthly: "$3,750", annual: "$45,000" },
  { range: "141 and up", monthly: "Quoted", annual: "Quoted" },
];

export const BRAIN_PRICING_META = {
  title: "Pricing — Brain",
  description:
    "One monthly number, priced on the people who can ask. No setup fee. Running in production inside a freight brokerage since June 2026.",
  canonical: "https://endurancelabs.ai/brain/pricing",
};

export const BRAIN_PRICING_HERO = {
  kicker: "Brain · Pricing",
  h1: "Priced on the people",
  h1Em: "who can ask.",
  lede: "One monthly number, fixed for the year. No setup fee, because the compiling is the product.",
  fillLabel: "Open the console",
  fillHref: "/brain/console",
  lineLabel: "Book a call",
};

export const BRAIN_PRICE_BLOCK = {
  kicker: "01 · The price",
  title: "One number, and it holds for the year.",
  note: "Counted on the people who can ask, set at signature and fixed for twelve months. There is no implementation fee: ingesting what you already produce is the work Brain does, not a project you pay for first.",
};

export const BRAIN_LEDGER = {
  kicker: "02 · In the field",
  title: "Twelve weeks inside a freight brokerage.",
  lede: "Brain runs in production at the same operation where Margins was built.",
  rows: [
    { label: "Documents compiled", figure: "116", qualifier: "" },
    { label: "Words kept verbatim", figure: "184,779", qualifier: "sources are never summarised away" },
    { label: "Sections of the business", figure: "11", qualifier: "customers, carriers, people, processes, systems" },
    { label: "Updates filed", figure: "444", qualifier: "since June 9, 2026" },
    { label: "Weeks live", figure: "12", qualifier: "" },
  ],
  colophon: "Counted from the compiled knowledge base on September 2, 2026, at the same brokerage where Margins runs. The operation is not named here at their request.",
};

export const BRAIN_ANSWERS_BLOCK = {
  kicker: "03 · What you get",
  title: "Answers that name their sources.",
  caption: "Every answer carries the count of documents it was drawn from. A claim without a source does not ship.",
};

export const BRAIN_LINE_BLOCK = {
  kicker: "04 · When not to buy",
  title: "Two ways this is wrong for you.",
  body: "If your firm's knowledge already lives in one system that everyone trusts, Brain is solving a problem you do not have. And Brain reads what you already produce: if that is thin, compiling it will not make it thicker.",
};

export const BRAIN_FAQ = {
  kicker: "05 · Questions",
  title: "Answered plainly.",
  items: [
    {
      q: "What does it read?",
      a: "What the firm already produces, kept verbatim. Mail, threads, decks, meetings, code. Nothing is rewritten into a summary you cannot check.",
    },
    {
      q: "Can it invent an answer?",
      a: "A claim without a source does not ship. Every figure points at the document it came from, and the count of sources sits next to the answer.",
    },
    {
      q: "Do you train models on our data?",
      a: "No.",
    },
    {
      q: "What happens if we add people?",
      a: "Nothing until renewal. The band is set at signature and holds for twelve months.",
    },
  ],
};

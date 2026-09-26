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
  lede: "A monthly price based on the people who can use Brain, fixed for twelve months. Compiling your company’s knowledge is included, with no setup fee.",
  fillLabel: "Open the console",
  fillHref: "/brain/console",
  lineLabel: "Book a call",
};

export const BRAIN_PRICE_BLOCK = {
  kicker: "01 · The price",
  title: "One number, and it holds for the year.",
  note: "Your band is based on the people who can use Brain, set at signature and fixed for twelve months. Bringing in and compiling your existing material is included; there is no implementation fee.",
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
  caption: "The answers below show the supporting document count. Follow the sources to examine the evidence and check the interpretation.",
};

export const BRAIN_LINE_BLOCK = {
  kicker: "04 · When not to buy",
  title: "When Brain may not be a fit.",
  body: "Brain is most useful when knowledge is scattered across several places. If your team already finds reliable answers in one system, the benefit may be small. If important knowledge has never been recorded, it will need to be captured before Brain can use it.",
};

export const BRAIN_FAQ = {
  kicker: "05 · Questions",
  title: "Answered plainly.",
  items: [
    {
      q: "What does it read?",
      a: "Brain reads the material your company already produces, including documents, messages, meetings, and code. It preserves the source material alongside the compiled knowledge so your team can check it.",
    },
    {
      q: "Can it invent an answer?",
      a: "Yes. AI can make mistakes, including misreading a source. Brain links answers to supporting material so your team can check the evidence and the interpretation.",
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

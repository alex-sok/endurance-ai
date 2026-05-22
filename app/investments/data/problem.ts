export const problemLead =
  "The multifamily real estate investment workflow is fundamentally broken. Operators managing $10M–$500M in assets are running mission-critical decisions on a stack of tools that were never designed to work together.";

export const problemBreakdowns = [
  {
    title: "Underwriting",
    body: "Lives in a different Excel model for every analyst — no consistency, no audit trail, no intelligence.",
  },
  {
    title: "Lenders",
    body: "Relationships tracked in email threads and personal notebooks — quotes get lost, deadlines get missed.",
  },
  {
    title: "LP investor data",
    body: "Split across DocuSign, QuickBooks, Excel, and memory — K-1 season is a nightmare.",
  },
  {
    title: "Brokers & vendors",
    body: "Zero institutional memory — every new deal starts from scratch.",
  },
  {
    title: "Disposition",
    body: "Decisions made from gut feel, with no systematic BOV tracking or exit modeling.",
  },
] as const;

export const problemHiddenCost = {
  headline: "The hidden cost",
  body: "A mid-size operator running 5–10 acquisitions per year loses an estimated 40+ hours per deal to manual data wrangling, version control chaos, and communication overhead. That's 400+ hours annually — the equivalent of a full-time analyst doing nothing but administrative cleanup.",
};

export const problemStats = [
  { value: "40+", label: "Hours lost per deal to manual wrangling" },
  { value: "400+", label: "Hours per year — a full analyst's worth" },
  { value: "5–10", label: "Acquisitions per year per mid-size operator" },
] as const;

export const problemPullQuote = {
  body: "The industry has scaled deal volume without scaling the intelligence infrastructure behind it. The result is a massive, systematic value leak that the right platform can capture.",
  attribution: "Market thesis",
};

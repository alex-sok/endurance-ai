// TODO(alex): replace placeholder figures with sourced numbers + provide
// citation URLs for the investor memo footnotes. Current numbers are the
// industry-cited ranges from the spec; lock them down before launch.

export const problemStats = [
  {
    value: "$87B",
    label: "Spent annually on freight brokerage fees in the US",
    source: "TODO(alex): cite — ATA / FreightWaves 2024",
  },
  {
    value: "35%",
    label: "Of all truck miles are deadhead — empty backhauls",
    source: "TODO(alex): cite — ATRI 2023 ops cost report",
  },
  {
    value: "$1.8T",
    label: "US logistics spend, growing 4% YoY",
    source: "TODO(alex): cite — CSCMP State of Logistics 2024",
  },
] as const;

export const problemPullQuote = {
  // TODO(alex): swap for a real, sourced trucker or shipper quote.
  body: "I'm running 60 phone calls a day just to keep eleven trucks moving. Most of it is asking the same broker for the same load five different ways.",
  attribution: "Independent fleet operator, Southeast US",
};

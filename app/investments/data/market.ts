export const marketLead =
  "The U.S. multifamily market is the largest single asset class in commercial real estate — $4.6 trillion in total value, $450 billion in annual transaction volume. It is served by approximately 15,000 active private equity and owner-operator firms, nearly all of which manage their operations on tooling built for a different era.";

export const marketSegments = [
  {
    label: "Core",
    range: "50–500 unit operators",
    firms: "~8,000 firms",
    price: "$18K–$36K / year",
    weight: 8,
  },
  {
    label: "Growth",
    range: "500–2,000 unit operators",
    firms: "~4,000 firms",
    price: "$36K–$120K / year",
    weight: 4,
  },
  {
    label: "Enterprise",
    range: "2,000+ units",
    firms: "~1,000 firms",
    price: "$120K–$500K / year",
    weight: 1,
    highlight: true,
  },
] as const;

export const marketHeadline = {
  big: "$240B",
  label: "Cumulative SaaS addressable market · ~13,000 firms",
};

export const marketDrivers = [
  {
    title: "Interest rate volatility",
    body: "Underwriting precision is mission-critical. Operators who model wrong lose deals or overpay.",
  },
  {
    title: "LP capital has gotten selective",
    body: "Firms that demonstrate institutional-grade reporting and process win more capital.",
  },
  {
    title: "AI tooling has matured",
    body: "Real estate financial modeling can finally be automated reliably.",
  },
  {
    title: "Legacy players ignore the mid-market",
    body: "Argus, CoStar, Yardi are enterprise-only — and notoriously poor at UX.",
  },
  {
    title: "Post-2022 dislocation forged discipline",
    body: "A generation of operators survived by becoming more rigorous — primed to pay for tools that codify that discipline.",
  },
] as const;

export const marketClose =
  "This is not a feature gap — it is a generational platform gap. No one has built the Bloomberg Terminal for the multifamily operator. That is what Endurance Investments is building.";

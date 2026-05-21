// TODO(alex): every number in this file is a placeholder. Replace with
// real figures before sending the page to any external investor.
// If real numbers aren't ready, set PRIVATE_METRICS = true in
// app/logistics/lib/config.ts and the page will render masked versions.

export const headlineStat = {
  value: 0, // TODO(alex): set real annualized GMV / revenue
  label: "Annualized GMV", // or "Annualized revenue" — pick the lens
  prefix: "$",
};

export const revenueByMonth = [
  // TODO(alex): replace with real monthly figures.
  { month: "2025-09", value: 0 },
  { month: "2025-10", value: 0 },
  { month: "2025-11", value: 0 },
  { month: "2025-12", value: 0 },
  { month: "2026-01", value: 0 },
  { month: "2026-02", value: 0 },
  { month: "2026-03", value: 0 },
  { month: "2026-04", value: 0 },
];

export const loadsPerWeek = [
  // TODO(alex): real load counts per week.
];

export const customerQuotes = [
  // TODO(alex): real customer quotes + logo SVGs in /public/logistics/customers/
  {
    body: "Endurance is the only carrier we use that already booked the load by the time we picked up the phone.",
    attribution: "VP Ops, [Customer A]",
    logo: null, // TODO(alex): path to monochrome SVG
  },
  {
    body: "They cut our dispatch headcount in half and our on-time number went up.",
    attribution: "Head of Logistics, [Customer B]",
    logo: null,
  },
] as const;

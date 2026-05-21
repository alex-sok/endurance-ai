// TODO(alex): finalize round size, allocation %, and committed investors.

export const ask = {
  roundSize: { value: 0, label: "Series A" }, // TODO(alex): set real number
  // TODO(alex): confirm allocation slices add to 100.
  allocation: [
    { slice: "Engineering", pct: 0.42, blurb: "Dispatcher v2, negotiation agent, ops platform" },
    { slice: "Ops + network buildout", pct: 0.28, blurb: "New corridors, carrier onboarding, dispatch overflow" },
    { slice: "Fleet", pct: 0.18, blurb: "Owned + leased trucks to backstop margin on top lanes" },
    { slice: "GTM", pct: 0.12, blurb: "Shipper acquisition, named-account team" },
  ],
  unlocks: [
    "TODO(alex): 18-mo milestone 1",
    "TODO(alex): 18-mo milestone 2",
    "TODO(alex): 18-mo milestone 3",
  ],
  // TODO(alex): committed investor logos (SVG, monochrome).
  committed: [] as { name: string; logo: string | null }[],
};

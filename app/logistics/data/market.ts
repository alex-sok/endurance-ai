export const marketSize = {
  tam: { value: "$1.8T", label: "Total US logistics spend (TAM)" },
  sam: { value: "$400B", label: "Truckload + brokered freight (SAM)" },
  som: {
    value: "$12B",
    label: "Mid-haul dry van, Southeast + Midwest (SOM, 24-mo beachhead)",
  },
};

// TODO(alex): confirm the beachhead segment. Spec calls out dry van
// mid-haul SE/Midwest as the wedge — lock this before investor review.

export const spendBreakdown = [
  { segment: "Trucking", value: 0.62, highlight: true },
  { segment: "Warehousing", value: 0.14 },
  { segment: "Brokerage", value: 0.12 },
  { segment: "Last-mile", value: 0.08 },
  { segment: "Other", value: 0.04 },
] as const;

export const laneCorridors = [
  // Phase 3+: Mapbox will read these as a line layer. For Phase 1 we
  // just list them for context.
  { name: "I-95 — Northeast Corridor", weight: 1.0 },
  { name: "I-10 — Southern Corridor", weight: 0.9 },
  { name: "I-80 — Transcontinental", weight: 0.85 },
  { name: "I-75 — Midwest → Southeast", weight: 0.8 },
  { name: "I-35 — Texas Triangle ↑", weight: 0.7 },
] as const;

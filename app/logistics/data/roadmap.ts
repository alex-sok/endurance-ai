// TODO(alex): finalize milestones before investor review. Below are
// placeholder beats that match the narrative shape — each window has
// 2–3 deliverables and an ARR / lane-count anchor.

export const roadmapMilestones = [
  {
    window: "Today",
    deliverables: [
      "Live dispatcher in production on the I-75 corridor",
      "[N] active shippers, [N] contracted carriers",
      "TODO(alex): current ARR figure",
    ],
  },
  {
    window: "Next 6 months",
    deliverables: [
      "Expand to I-10 + I-20 corridors",
      "Multi-leg load chaining live",
      "First fleet-of-record partnership",
    ],
  },
  {
    window: "Next 12 months",
    deliverables: [
      "10-corridor coverage across Southeast + Midwest",
      "Negotiation agent v2 — handles tender-rejection scenarios",
      "TODO(alex): 12-mo ARR target",
    ],
  },
  {
    window: "Next 24 months",
    deliverables: [
      "National lane coverage",
      "Owned + leased fleet to backstop margin",
      "Becomes the default freight network for [target segment]",
      "TODO(alex): 24-mo ARR target",
    ],
  },
] as const;

export const shiftPillars = [
  {
    title: "Models are good enough.",
    body: "GPT-class function-calling now matches a senior dispatcher on 9 of 10 routine scenarios. The remaining 10% are escalations, and the routing problem is solved.",
    // TODO(alex): replace with internal benchmark numbers once we publish.
  },
  {
    title: "Data is finally available.",
    body: "ELD mandate compliance is universal. Public lane and rate data is plentiful. The training corpus that didn't exist in 2014 now exists in volume.",
  },
  {
    title: "Margins are big enough to take.",
    body: "Brokers extract 12–18% on every load. Automating dispatch collapses that margin and gives a portion back to the shipper and the driver. The economics finally fund the build.",
  },
] as const;

export const shiftSplit = {
  incumbent: ["phone", "fax", "TMS", "broker", "broker", "broker"],
  endurance: ["agent", "model", "marketplace", "fleet"],
} as const;

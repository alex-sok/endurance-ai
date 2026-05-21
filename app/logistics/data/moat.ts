export const moatColumns = [
  {
    name: "Traditional broker",
    tone: "muted" as const,
    cells: {
      "Cost per load": "High",
      "Time-to-quote": "Hours",
      "Margin": "12–18%",
      "Scalability": "Headcount-bound",
      "Defensibility": "Phone book",
    },
  },
  {
    name: "Digital broker",
    tone: "muted" as const,
    cells: {
      "Cost per load": "Medium",
      "Time-to-quote": "Minutes",
      "Margin": "10–14%",
      "Scalability": "Marketplace effects",
      "Defensibility": "Two-sided liquidity",
    },
  },
  {
    name: "Endurance",
    tone: "signal" as const,
    cells: {
      "Cost per load": "Near zero marginal",
      "Time-to-quote": "Sub-second",
      "Margin": "Captured at the model",
      "Scalability": "Capital-bound, not headcount",
      "Defensibility": "Data flywheel — every load trains the dispatcher",
    },
  },
] as const;

export const moatClose =
  "Every load makes the model better. The model can't be unbundled from the fleet, and the fleet can't be unbundled from the data. That's the moat.";

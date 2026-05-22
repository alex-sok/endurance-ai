type Cell = "yes" | "no" | "partial" | "soon" | string;

interface Column {
  name: string;
  tone: "signal" | "muted";
  cells: Record<string, Cell>;
}

export const competitiveColumns: Column[] = [
  {
    name: "Endurance",
    tone: "signal",
    cells: {
      "AI underwriting model": "yes",
      "Auto address → deal pull": "yes",
      "Waterfall & LP economics": "yes",
      "Lender quote tracker": "yes",
      "LP CRM + K-1 management": "yes",
      "Broker / vendor CRM": "yes",
      "Disposition + BOV tracker": "yes",
      "IC memo generation": "yes",
      "Multi-tenant / white-label": "yes",
      "Real-time market data feeds": "soon",
      "Mobile-ready web app": "yes",
    },
  },
  {
    name: "Excel",
    tone: "muted",
    cells: {
      "AI underwriting model": "no",
      "Auto address → deal pull": "no",
      "Waterfall & LP economics": "yes",
      "Lender quote tracker": "no",
      "LP CRM + K-1 management": "no",
      "Broker / vendor CRM": "no",
      "Disposition + BOV tracker": "no",
      "IC memo generation": "no",
      "Multi-tenant / white-label": "no",
      "Real-time market data feeds": "no",
      "Mobile-ready web app": "no",
    },
  },
  {
    name: "Argus",
    tone: "muted",
    cells: {
      "AI underwriting model": "no",
      "Auto address → deal pull": "no",
      "Waterfall & LP economics": "yes",
      "Lender quote tracker": "no",
      "LP CRM + K-1 management": "no",
      "Broker / vendor CRM": "no",
      "Disposition + BOV tracker": "no",
      "IC memo generation": "no",
      "Multi-tenant / white-label": "no",
      "Real-time market data feeds": "yes",
      "Mobile-ready web app": "no",
    },
  },
  {
    name: "Generic CRM",
    tone: "muted",
    cells: {
      "AI underwriting model": "no",
      "Auto address → deal pull": "no",
      "Waterfall & LP economics": "no",
      "Lender quote tracker": "partial",
      "LP CRM + K-1 management": "partial",
      "Broker / vendor CRM": "yes",
      "Disposition + BOV tracker": "no",
      "IC memo generation": "no",
      "Multi-tenant / white-label": "partial",
      "Real-time market data feeds": "no",
      "Mobile-ready web app": "no",
    },
  },
];

export const competitiveAdvantages = [
  {
    title: "Depth of workflow integration",
    body: "We cover deal sourcing through disposition — not just one slice.",
  },
  {
    title: "Built by operators",
    body: "Every feature was designed around how real deals actually get done.",
  },
  {
    title: "AI-first, not AI-bolted-on",
    body: "The intelligence layer is woven into every module — not a chatbot add-on.",
  },
  {
    title: "Speed to value",
    body: "A new user can run a real underwriting model on a real deal in under 15 minutes.",
  },
  {
    title: "Price-performance advantage",
    body: "Enterprise-grade capability at operator-accessible pricing.",
  },
] as const;

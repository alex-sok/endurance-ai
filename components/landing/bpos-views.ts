// Per-industry page shape. The products do not look alike in real life, so
// they should not look alike here. Three layouts, assigned by what the portal
// actually is:
//
//   command — a dark operating band over a wide data grid. Real estate and
//             wealth run this way: one source of truth, drill-downs a click
//             away. Modelled on the Blackwater Executive Command Center.
//   board   — a KPI strip over contract-style progress rows and a rollup.
//             Construction, restaurants and brokerage read as a book of jobs,
//             units or listings, each with a number that is tracking or not.
//   run     — a headline figure, blockers, worklist and a locked checklist.
//             Legal and logistics are periodic runs: something has to clear
//             before money moves.

export type Layout = "command" | "board" | "run";

export interface BandKpi {
  label: string;
  value: string;
  delta: string;
  sub: string;
  spark: number[];
}

export interface Grid {
  title: string;
  meta: string;
  cols: string[];
  rows: string[][];
}

export interface BarRow {
  name: string;
  meta: string;
  /** 0–100, the filled portion */
  pct: number;
  right: string;
  flag?: boolean;
}

export interface IndustryView {
  layout: Layout;
  /** command: the dark band */
  bandTitle?: string;
  bandSub?: string;
  bandMeta?: string;
  band?: BandKpi[];
  grid?: Grid;
  /** board: progress rows */
  barsTitle?: string;
  barsMeta?: string;
  bars?: BarRow[];
}

export const BPOS_VIEWS: Record<string, IndustryView> = {
  realestate: {
    layout: "command",
    bandTitle: "Executive Command Center",
    bandSub:
      "36 assets in scope — one source of truth: property-management financials, rent rolls, work orders and collections. No exports, no spreadsheet rebuilds, drill-downs one click away.",
    bandMeta: "T-12 basis · Aug 2025 — Jul 2026",
    band: [
      { label: "Units", value: "8,312", delta: "36 assets", sub: "10 states · 100% PM-synced", spark: [38, 40, 41, 44, 46, 49, 52, 55, 58, 62, 66, 70] },
      { label: "Occupancy", value: "95.6%", delta: "0.1 pts vs T-3", sub: "unit-weighted, trailing 12", spark: [52, 48, 55, 60, 57, 63, 66, 62, 68, 72, 70, 74] },
      { label: "Avg in-place rent", value: "$2,449", delta: "2.8% T-12", sub: "loss-to-lease capture on turns", spark: [30, 34, 38, 41, 45, 48, 52, 57, 61, 65, 69, 73] },
      { label: "NOI · T-12", value: "$189.33M", delta: "3.9% monthly run-rate", sub: "margin 81.2% of EGI", spark: [40, 44, 42, 48, 52, 50, 56, 60, 58, 64, 68, 72] },
      { label: "Collections · T-12", value: "99.4%", delta: "$592,679 delinquent", sub: "billed vs collected rents", spark: [62, 55, 68, 50, 71, 58, 74, 61, 66, 70, 64, 72] },
      { label: "Open work orders", value: "718", delta: "avg 3.2 days to close", sub: "R&M and turn spend below trend", spark: [70, 66, 62, 65, 58, 60, 54, 50, 52, 46, 44, 41] },
    ],
    grid: {
      title: "Portfolio Snapshot",
      meta: "36 assets · live metrics · T-12 basis",
      cols: ["Property", "Address", "Units", "Yr", "%Occ", "Rent/unit", "Delinq%", "EGI (T12)", "NOI (T12)"],
      rows: [
        ["Cadence Station", "2150 W Frye Rd, Chandler, AZ", "252", "2020", "95.9%", "$2,226", "2.2%", "$6,486,490", "$5,180,112"],
        ["The Quinby", "1520 S Higley Rd, Gilbert, AZ", "268", "2022", "95.4%", "$2,195", "3.7%", "$6,718,565", "$5,346,519"],
        ["Marlowe District", "455 N 3rd St, Phoenix, AZ", "320", "2019", "95.8%", "$2,134", "3.3%", "$7,855,594", "$6,214,412"],
        ["The Calloway", "7340 E Indian School Rd, Scottsdale, AZ", "244", "2016", "96.1%", "$2,744", "2.0%", "$7,711,632", "$6,380,155"],
        ["Arrow & Vine", "17300 Von Karman Ave, Irvine, CA", "316", "2015", "96.2%", "$3,781", "1.8%", "$13,690,852", "$11,813,004"],
        ["Haven on 5th", "500 R St, Sacramento, CA", "286", "2019", "96.5%", "$2,622", "4.2%", "$8,627,153", "$7,084,330"],
        ["Marisol Bay", "1980 Kettner Blvd, San Diego, CA", "298", "2017", "94.4%", "$3,598", "2.1%", "$12,083,639", "$10,342,779"],
        ["Painted Sky", "3115 N Chestnut St, Colorado Springs, CO", "110", "2001", "96.1%", "$1,432", "4.0%", "$1,853,800", "$1,333,207"],
      ],
    },
  },

  wealth: {
    layout: "command",
    bandTitle: "Client Command Center",
    bandSub:
      "1,204 households in scope — custodial positions, portfolio accounting, billing and the CRM reconciled nightly. Every figure on a client pack traces to a custodian record.",
    bandMeta: "Quarter to date · closes Jun 30",
    band: [
      { label: "Assets reported", value: "$8.4B", delta: "1,204 households", sub: "42,180 positions reconciled", spark: [40, 43, 45, 48, 51, 54, 56, 60, 63, 66, 70, 73] },
      { label: "Net new", value: "$214M", delta: "18 households", sub: "this quarter", spark: [30, 36, 33, 42, 46, 44, 52, 56, 54, 62, 66, 70] },
      { label: "Portfolios drifted", value: "6", delta: "avg drift 2.1%", sub: "past target band", spark: [20, 24, 28, 26, 34, 38, 36, 44, 48, 52, 58, 62] },
      { label: "Fee accrual", value: "$21.4M", delta: "billed on schedule", sub: "annualised, net of credits", spark: [44, 46, 50, 52, 55, 58, 60, 63, 66, 68, 71, 74] },
      { label: "Packs ready", value: "1,166", delta: "of 1,204", sub: "quarter close in 3 days", spark: [10, 18, 26, 33, 40, 48, 55, 62, 70, 78, 86, 94] },
      { label: "Open exceptions", value: "12", delta: "1 blocking", sub: "custodian and cost-basis", spark: [64, 60, 58, 52, 50, 46, 42, 38, 34, 30, 26, 22] },
    ],
    grid: {
      title: "Client Book",
      meta: "1,204 households · live positions · quarter to date",
      cols: ["Household", "Advisor", "Accounts", "Model", "Assets", "Drift", "Fee YTD", "Last review", "Status"],
      rows: [
        ["Ashworth Family Trust", "M. Rivera", "7", "Growth 70/30", "$42.8M", "0.8%", "$106,400", "Apr 18", "Current"],
        ["Bellweather Holdings", "M. Rivera", "4", "Balanced", "$28.1M", "2.4%", "$70,250", "Mar 02", "Drifted"],
        ["Corbin Living Trust", "J. Ndiaye", "3", "Income", "$19.6M", "0.4%", "$49,000", "May 11", "Current"],
        ["Delacroix Partners", "J. Ndiaye", "9", "Growth 80/20", "$61.2M", "3.1%", "$153,000", "Feb 27", "Drifted"],
        ["Eastvale Foundation", "P. Okafor", "5", "Endowment", "$88.4M", "0.6%", "$221,000", "May 29", "Current"],
        ["Fairmont Family", "P. Okafor", "6", "Balanced", "$34.9M", "1.2%", "$87,250", "Apr 04", "Current"],
        ["Granville Trust", "M. Rivera", "2", "Conservative", "$12.3M", "0.3%", "$30,750", "Jun 09", "Current"],
        ["Halstead Group", "J. Ndiaye", "8", "Growth 70/30", "$47.5M", "2.8%", "$118,750", "Jan 22", "Review due"],
      ],
    },
  },

  construction: {
    layout: "board",
    barsTitle: "Contract · earned · billed",
    barsMeta: "Top jobs by contract value · earned as % of contract",
    bars: [
      { name: "Riverside Medical", meta: "$18.4M contract · $2.1M to complete", pct: 88, right: "88% earned", flag: true },
      { name: "Cedar Ridge Phase II", meta: "$14.2M contract · $3.4M to complete", pct: 76, right: "76% earned", flag: true },
      { name: "Harbor Point Tower", meta: "$21.8M contract · $6.9M to complete", pct: 68, right: "68% earned" },
      { name: "Midtown Logistics", meta: "$9.6M contract · $1.2M to complete", pct: 87, right: "87% earned" },
      { name: "Ashland Commons", meta: "$11.3M contract · $4.6M to complete", pct: 59, right: "59% earned" },
      { name: "Northgate Refresh", meta: "$6.4M contract · $0.4M to complete", pct: 94, right: "94% earned" },
    ],
    grid: {
      title: "All Jobs — CFO Rollup",
      meta: "34 active jobs · costs synced nightly",
      cols: ["Job", "PM", "Contract", "Earned", "Billed", "Cost to complete", "Margin", "Status"],
      rows: [
        ["Riverside Medical", "D. Alvarez", "$18,400,000", "$16,192,000", "$15,940,000", "$2,208,000", "9.4%", "Over bid"],
        ["Cedar Ridge Ph II", "K. Sundberg", "$14,200,000", "$10,792,000", "$10,410,000", "$3,408,000", "10.1%", "Over bid"],
        ["Harbor Point Tower", "D. Alvarez", "$21,800,000", "$14,824,000", "$14,300,000", "$6,976,000", "12.8%", "On plan"],
        ["Midtown Logistics", "R. Behzadi", "$9,600,000", "$8,352,000", "$8,190,000", "$1,248,000", "13.2%", "On plan"],
        ["Ashland Commons", "K. Sundberg", "$11,300,000", "$6,667,000", "$6,410,000", "$4,633,000", "11.9%", "On plan"],
        ["Northgate Refresh", "R. Behzadi", "$6,400,000", "$6,016,000", "$5,980,000", "$384,000", "14.6%", "Closing"],
        ["Weston Interiors", "D. Alvarez", "$3,900,000", "$2,145,000", "$2,080,000", "$1,755,000", "15.1%", "On plan"],
        ["Foxglove Site Work", "R. Behzadi", "$5,100,000", "$4,335,000", "$4,180,000", "$765,000", "8.8%", "Watch"],
      ],
    },
  },

  restaurants: {
    layout: "board",
    barsTitle: "Prime cost by unit",
    barsMeta: "Food plus labor as % of sales · target 58%",
    bars: [
      { name: "Unit 07 — Riverwalk", meta: "$412K sales · labor 32.1%", pct: 63, right: "63.0% prime", flag: true },
      { name: "Unit 22 — Grove St", meta: "$388K sales · food 33.4%", pct: 61, right: "61.2% prime" },
      { name: "Unit 19 — Harbor", meta: "$455K sales · labor 29.8%", pct: 59, right: "59.4% prime" },
      { name: "Unit 31 — Northside", meta: "$298K sales · food 30.1%", pct: 58, right: "57.8% prime" },
      { name: "Unit 14 — Midtown", meta: "$501K sales · labor 27.4%", pct: 56, right: "55.9% prime" },
      { name: "Unit 03 — Lakeside", meta: "$470K sales · food 29.2%", pct: 54, right: "54.3% prime" },
    ],
    grid: {
      title: "Units — Group Rollup",
      meta: "41 units · closed nightly · period to date",
      cols: ["Unit", "GM", "Sales", "Food%", "Labor%", "Prime", "Covers", "EBITDA", "Status"],
      rows: [
        ["07 — Riverwalk", "T. Nakamura", "$412,400", "30.9%", "32.1%", "63.0%", "18,240", "$28,100", "Over target"],
        ["22 — Grove St", "L. Okonjo", "$388,100", "33.4%", "27.8%", "61.2%", "16,980", "$31,400", "Watch"],
        ["19 — Harbor", "S. Petrov", "$455,900", "29.6%", "29.8%", "59.4%", "20,110", "$44,200", "Blocked"],
        ["31 — Northside", "T. Nakamura", "$298,300", "30.1%", "27.7%", "57.8%", "13,440", "$26,700", "On plan"],
        ["14 — Midtown", "L. Okonjo", "$501,200", "28.5%", "27.4%", "55.9%", "22,870", "$58,300", "On plan"],
        ["03 — Lakeside", "S. Petrov", "$470,600", "29.2%", "25.1%", "54.3%", "21,050", "$61,900", "On plan"],
        ["11 — Old Town", "T. Nakamura", "$344,800", "29.9%", "26.6%", "56.5%", "15,320", "$38,400", "On plan"],
        ["28 — Fairview", "L. Okonjo", "$389,700", "30.4%", "26.9%", "57.3%", "17,640", "$40,100", "On plan"],
      ],
    },
  },

  brokerage: {
    layout: "board",
    barsTitle: "Listings by stage",
    barsMeta: "Share of the book at each stage · 74 live listings",
    bars: [
      { name: "Under contract", meta: "18 listings · $128M pipeline", pct: 24, right: "18" },
      { name: "Offers received", meta: "12 listings · 3 at best and final", pct: 16, right: "12" },
      { name: "Actively marketed", meta: "29 listings · avg 63 days on market", pct: 39, right: "29" },
      { name: "Pre-market", meta: "9 listings · BOV complete", pct: 12, right: "9" },
      { name: "Expired, still live", meta: "6 listings · needs decision", pct: 8, right: "6", flag: true },
    ],
    grid: {
      title: "Live Listings",
      meta: "74 listings · synced from CRM · this week",
      cols: ["Listing", "Agent", "Type", "Ask", "Days", "Stage", "Comps", "BOV", "Status"],
      rows: [
        ["1420 Westheimer", "R. Delgado", "Retail", "$12,400,000", "41", "Under contract", "18", "Complete", "On track"],
        ["800 Sabine St", "A. Whitfield", "Office", "$28,900,000", "88", "Actively marketed", "22", "Complete", "Price cut due"],
        ["Northline Industrial", "R. Delgado", "Industrial", "$41,200,000", "26", "Offers received", "14", "Complete", "On track"],
        ["The Almeda Portfolio", "M. Castellanos", "Multifamily", "$63,700,000", "12", "Pre-market", "9", "In review", "Comps thin"],
        ["2900 Kirby", "A. Whitfield", "Retail", "$8,150,000", "134", "Expired, still live", "16", "Complete", "Decision needed"],
        ["Bayou Crossing", "M. Castellanos", "Industrial", "$19,600,000", "57", "Actively marketed", "20", "Complete", "On track"],
        ["1101 Milam", "R. Delgado", "Office", "$34,100,000", "71", "Offers received", "25", "Complete", "On track"],
        ["Southbelt Flex", "A. Whitfield", "Industrial", "$15,300,000", "33", "Under contract", "11", "Complete", "On track"],
      ],
    },
  },

  legal: { layout: "run" },
  logistics: { layout: "run" },
};

/** What the system is plugged into. APIs are systems of record; MCP servers
 *  are the tool surfaces the agent itself calls. Shown because the claim is
 *  that nothing here is typed in by hand. */
export interface Source {
  kind: "API" | "MCP";
  name: string;
  note?: string;
}

export const BPOS_SOURCES: Record<string, { synced: string; sources: Source[] }> = {
  construction: {
    synced: "6 min ago",
    sources: [
      { kind: "API", name: "Procore", note: "×34 jobs" },
      { kind: "API", name: "Sage 300 CRE" },
      { kind: "API", name: "Autodesk Build" },
      { kind: "API", name: "ADP" },
      { kind: "MCP", name: "Drawings & specs" },
      { kind: "MCP", name: "Pay applications" },
    ],
  },
  realestate: {
    synced: "4 min ago",
    sources: [
      { kind: "API", name: "Yardi Voyager", note: "×18" },
      { kind: "API", name: "RealPage", note: "×18" },
      { kind: "API", name: "Entrata" },
      { kind: "API", name: "MRI" },
      { kind: "MCP", name: "Data room" },
      { kind: "MCP", name: "Rent rolls & T-12s" },
    ],
  },
  legal: {
    synced: "9 min ago",
    sources: [
      { kind: "API", name: "iManage" },
      { kind: "API", name: "Aderant" },
      { kind: "API", name: "Elite 3E" },
      { kind: "API", name: "Intapp" },
      { kind: "MCP", name: "Matter files" },
      { kind: "MCP", name: "Conflicts index" },
    ],
  },
  logistics: {
    synced: "2 min ago",
    sources: [
      { kind: "API", name: "McLeod", note: "×1,077 loads" },
      { kind: "API", name: "Samsara" },
      { kind: "API", name: "Highway" },
      { kind: "API", name: "QuickBooks" },
      { kind: "MCP", name: "Rate confirmations" },
      { kind: "MCP", name: "Carrier invoices" },
    ],
  },
  restaurants: {
    synced: "11 min ago",
    sources: [
      { kind: "API", name: "Toast", note: "×41 units" },
      { kind: "API", name: "7shifts" },
      { kind: "API", name: "Restaurant365" },
      { kind: "API", name: "MarginEdge" },
      { kind: "MCP", name: "Vendor invoices" },
      { kind: "MCP", name: "Recipe costing" },
    ],
  },
  brokerage: {
    synced: "7 min ago",
    sources: [
      { kind: "API", name: "CoStar" },
      { kind: "API", name: "Crexi" },
      { kind: "API", name: "Salesforce" },
      { kind: "API", name: "County records", note: "×41" },
      { kind: "MCP", name: "Comp sets" },
      { kind: "MCP", name: "BOV drafting" },
    ],
  },
  wealth: {
    synced: "3 min ago",
    sources: [
      { kind: "API", name: "Schwab", note: "×612 accts" },
      { kind: "API", name: "Fidelity" },
      { kind: "API", name: "Addepar" },
      { kind: "API", name: "Orion" },
      { kind: "MCP", name: "Custodial statements" },
      { kind: "MCP", name: "Client packs" },
    ],
  },
};

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

export type Layout = "command";

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

export type Tick = [label: string, value: string, delta: string];

export interface IndustryView {
  layout: Layout;
  /** run: index of the module the checklist actually belongs to. Every other
   *  module gets a full-width worklist instead of a checklist that does not
   *  describe it. */
  runModule?: number;
  /** command: the market strip across the top of the band */
  ticker?: Tick[];
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
    ticker: [
      ["30D avg SOFR", "3.66%", ""],
      ["2Y UST", "4.37%", "+3.0 bps"],
      ["5Y UST", "4.54%", "+2.0 bps"],
      ["10Y UST", "4.78%", "+1.0 bps"],
      ["30Y MTG", "6.71%", ""],
      ["CPI YOY", "3.36%", ""],
      ["CORE PCE", "3.34%", ""],
      ["FED FUNDS", "3.75%", ""],
      ["10Y-2Y", "0.41%", ""],
    ],
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
    ticker: [
      ["S&P 500", "6,284", "+0.42%"],
      ["NASDAQ", "20,918", "+0.61%"],
      ["10Y UST", "4.78%", "+1.0 bps"],
      ["2Y UST", "4.37%", "+3.0 bps"],
      ["VIX", "13.4", "-0.6"],
      ["DXY", "104.2", "+0.11%"],
      ["GOLD", "$3,412", "+0.28%"],
      ["IG OAS", "92 bps", "-1 bp"],
      ["HY OAS", "318 bps", "-4 bps"],
    ],
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
    layout: "command",
    ticker: [
      ["HR STEEL", "$842/ton", "-1.2%"],
      ["COPPER", "$4.61/lb", "+0.8%"],
      ["DIESEL", "$3.74/gal", "-0.03"],
      ["LUMBER", "$561/mbf", "+1.4%"],
      ["CEMENT PPI", "+3.2%", "YOY"],
      ["ENR CCI", "13,842", "+0.31%"],
      ["PRIME RATE", "6.75%", ""],
      ["SURETY RATE", "0.62%", ""],
      ["ABI", "48.7", "-1.1"],
    ],
    bandTitle: "Project Command Center",
    bandSub:
      "34 active jobs in scope \u2014 one source of truth: job costs, commitments, pay applications and timesheets. Earned value is computed from the cost ledger, not retyped from a schedule of values.",
    bandMeta: "Week ending Jun 20 \u00b7 costs synced nightly",
    band: [
      { label: "Contract backlog", value: "$1.24B", delta: "34 active jobs", sub: "14.2 months of coverage", spark: [36, 39, 41, 44, 43, 47, 51, 54, 58, 61, 65, 70] },
      { label: "Earned to date", value: "$842.6M", delta: "68.0% of contract", sub: "cost-to-cost, computed nightly", spark: [22, 27, 32, 37, 41, 46, 51, 56, 61, 67, 72, 78] },
      { label: "Billed vs earned", value: "99.1%", delta: "$7.4M underbilled", sub: "across 9 open pay apps", spark: [58, 62, 55, 66, 60, 70, 64, 72, 67, 74, 69, 76] },
      { label: "Gross margin", value: "11.8%", delta: "40 bps under bid", sub: "weighted by contract value", spark: [70, 68, 66, 63, 61, 58, 56, 54, 51, 49, 47, 45] },
      { label: "Change orders", value: "$18.4M", delta: "62 pending", sub: "31 unsigned past 30 days", spark: [30, 33, 38, 36, 44, 48, 46, 54, 58, 62, 68, 73] },
      { label: "Committed cost", value: "$611.2M", delta: "94% under subcontract", sub: "$38.4M still to buy out", spark: [40, 44, 47, 50, 54, 57, 60, 64, 67, 70, 73, 76] },
    ],
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
    layout: "command",
    ticker: [
      ["BEEF (CME)", "$2.34/lb", "+1.8%"],
      ["BROILER", "$1.42/lb", "-0.4%"],
      ["EGGS (MW)", "$3.18/doz", "+4.2%"],
      ["BUTTER", "$2.71/lb", "+0.6%"],
      ["PRODUCE IDX", "118.4", "+0.9%"],
      ["FOOD-AWAY CPI", "+3.9%", "YOY"],
      ["AVG HOURLY", "$18.42", "+0.4%"],
      ["SEATED DINERS", "+2.1%", "YOY"],
      ["NAT GAS", "$3.12", "-1.1%"],
    ],
    bandTitle: "Group Command Center",
    bandSub:
      "41 units in scope \u2014 point of sale, scheduling and invoices closed nightly. Prime cost is built from the actual tickets and the actual punches, so the number is the same one the GM sees.",
    bandMeta: "Week ending Jun 20 \u00b7 closed nightly",
    band: [
      { label: "Units reporting", value: "41", delta: "6 markets", sub: "41 of 41 closed on time", spark: [64, 66, 68, 67, 70, 72, 71, 74, 76, 75, 78, 80] },
      { label: "Net sales", value: "$4.18M", delta: "3.2% comp", sub: "week to date, all units", spark: [38, 42, 40, 47, 51, 49, 56, 60, 58, 65, 69, 73] },
      { label: "Prime cost", value: "61.4%", delta: "80 bps over target", sub: "food plus labor, target 58%", spark: [44, 46, 48, 47, 52, 55, 57, 59, 62, 64, 67, 70] },
      { label: "Food cost", value: "29.8%", delta: "130 bps over", sub: "theoretical 28.5%", spark: [40, 43, 41, 48, 46, 53, 51, 58, 56, 62, 60, 66] },
      { label: "Labor", value: "31.6%", delta: "2,418 shifts", sub: "overtime 1.9% of hours", spark: [56, 54, 58, 55, 60, 57, 62, 59, 64, 61, 66, 63] },
      { label: "Voids and comps", value: "$18,420", delta: "0.44% of sales", sub: "3 units past threshold", spark: [30, 34, 32, 40, 44, 42, 50, 54, 52, 60, 64, 68] },
    ],
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
    layout: "command",
    ticker: [
      ["10Y UST", "4.78%", "+1.0 bps"],
      ["SOFR", "3.66%", ""],
      ["MULTIFAMILY CAP", "5.42%", "+6 bps"],
      ["INDUSTRIAL CAP", "5.94%", "-2 bps"],
      ["RETAIL CAP", "6.81%", "+3 bps"],
      ["OFFICE CAP", "8.12%", "+14 bps"],
      ["CMBS AAA", "142 bps", "-3 bps"],
      ["TXN VOLUME", "-4.2%", "YOY"],
      ["BID-ASK", "3.1%", "narrowing"],
    ],
    bandTitle: "Desk Command Center",
    bandSub:
      "74 live listings in scope \u2014 the CRM, the comp sets and the marketing record in one place. Every opinion of value is assembled from comps the desk can open, not from a broker's memory.",
    bandMeta: "Week ending Jun 20 \u00b7 comps refreshed daily",
    band: [
      { label: "Live listings", value: "74", delta: "$612M asking", sub: "avg 63 days on market", spark: [42, 45, 44, 49, 52, 51, 56, 58, 57, 62, 65, 68] },
      { label: "Under contract", value: "18", delta: "$128M", sub: "3 at best and final", spark: [24, 29, 27, 35, 40, 38, 46, 51, 49, 57, 62, 66] },
      { label: "Closed year to date", value: "$438M", delta: "61 deals", sub: "avg 47 days to contract", spark: [12, 20, 28, 34, 41, 48, 54, 61, 68, 74, 81, 88] },
      { label: "Weighted pipeline", value: "$2.14M", delta: "fee basis", sub: "probability-weighted", spark: [38, 41, 44, 42, 48, 52, 50, 57, 60, 64, 68, 72] },
      { label: "Opinions of value", value: "126", delta: "avg 41 minutes", sub: "delivered this year", spark: [8, 16, 24, 31, 39, 47, 55, 62, 70, 77, 85, 92] },
      { label: "Hours reclaimed", value: "1,840", delta: "vs manual assembly", sub: "at 14.6 hours per BOV", spark: [10, 18, 25, 33, 40, 48, 56, 63, 71, 78, 86, 94] },
    ],
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

  legal: {
    layout: "command",
    runModule: 2,
    ticker: [
      ["LEGAL CPI", "+4.1%", "YOY"],
      ["PARTNER RATE IDX", "1.084", "+2.1%"],
      ["ASSOCIATE SCALE", "$225,000", "1st year"],
      ["RATE GROWTH", "+7.8%", "TTM"],
      ["PEER REALIZATION", "91.2%", "benchmark"],
      ["PEER DSO", "68 days", "benchmark"],
      ["DEMAND IDX", "+1.4%", "YOY"],
      ["EXPENSE IDX", "+5.2%", "YOY"],
      ["PRIME RATE", "6.75%", ""],
    ],
    bandTitle: "Firm Command Center",
    bandSub:
      "1,842 open matters in scope \u2014 the document system, the practice-management ledger and the time entries in one place. Every figure on a prebill traces to a timekeeper record.",
    bandMeta: "Month to date \u00b7 closes Jun 30",
    band: [
      { label: "Matters open", value: "1,842", delta: "214 clients", sub: "9 practice groups", spark: [50, 52, 51, 55, 57, 56, 60, 62, 61, 65, 67, 70] },
      { label: "Billable hours", value: "41,208", delta: "88.4% of target", sub: "month to date, 186 timekeepers", spark: [20, 27, 34, 40, 47, 53, 60, 66, 72, 79, 85, 91] },
      { label: "Work in progress", value: "$18.4M", delta: "34 days aged", sub: "unbilled time and cost", spark: [44, 48, 46, 53, 57, 55, 61, 65, 63, 69, 72, 76] },
      { label: "Accounts receivable", value: "$22.1M", delta: "61 days outstanding", sub: "$3.2M past 90 days", spark: [60, 57, 62, 58, 64, 60, 66, 62, 68, 64, 70, 66] },
      { label: "Realization", value: "92.4%", delta: "1.1 pts", sub: "billed against standard", spark: [40, 44, 43, 49, 52, 51, 57, 60, 59, 65, 68, 72] },
      { label: "Prebills to review", value: "148", delta: "12 blocking", sub: "cycle closes in 4 days", spark: [86, 80, 74, 68, 62, 55, 49, 43, 37, 30, 24, 18] },
    ],
    grid: {
      title: "Matter Book",
      meta: "1,842 open matters \u00b7 time and cost synced hourly",
      cols: ["Matter", "Client", "Practice", "Partner", "WIP", "AR", "Realization", "Budget", "Status"],
      rows: [
        ["Redwood / Vantage merger", "Redwood Holdings", "Corporate", "E. Marchetti", "$1,284,000", "$612,000", "94.1%", "78% used", "On plan"],
        ["Sable Creek arbitration", "Sable Creek LLC", "Litigation", "D. Osei", "$948,000", "$1,104,000", "88.6%", "112% used", "Over budget"],
        ["Kestrel patent family", "Kestrel Devices", "IP", "H. Lindqvist", "$412,000", "$188,000", "96.2%", "54% used", "On plan"],
        ["Harbor Row refinancing", "Harbor Row Partners", "Real estate", "E. Marchetti", "$276,000", "$94,000", "93.8%", "61% used", "On plan"],
        ["Ainsworth wage class", "Ainsworth Foods", "Employment", "D. Osei", "$1,610,000", "$1,842,000", "82.4%", "138% used", "Blocked"],
        ["Pellworth ITC action", "Pellworth Marine", "IP", "H. Lindqvist", "$704,000", "$358,000", "91.0%", "83% used", "Watch"],
        ["Calder Group tax review", "Calder Group", "Tax", "S. Rahimi", "$188,000", "$42,000", "97.4%", "39% used", "On plan"],
        ["Brentmoor bankruptcy", "Brentmoor Retail", "Restructuring", "S. Rahimi", "$1,022,000", "$766,000", "86.9%", "97% used", "Watch"],
      ],
    },
  },
  logistics: {
    layout: "command",
    runModule: 2,
    ticker: [
      ["DAT VAN SPOT", "$2.41/mi", "+0.03"],
      ["REEFER SPOT", "$2.78/mi", "+0.02"],
      ["FLATBED SPOT", "$2.63/mi", "-0.01"],
      ["DIESEL (EIA)", "$3.74/gal", "-0.03"],
      ["FUEL SURCHARGE", "$0.48/mi", ""],
      ["TENDER REJECT", "6.1%", "+0.4"],
      ["LOAD-TO-TRUCK", "4.12", "+0.18"],
      ["WTI", "$71.40", "+0.9%"],
      ["OTR CAPACITY", "-1.2%", "YOY"],
    ],
    bandTitle: "Network Command Center",
    bandSub:
      "1,077 loads in flight \u2014 the transportation system, the telematics feed and the carrier record in one place. Rate confirmations, invoices and settlements are matched against the load, not against a spreadsheet.",
    bandMeta: "Month to date \u00b7 closes Jun 30",
    band: [
      { label: "Loads in flight", value: "1,077", delta: "412 carriers", sub: "38 states, 6 lanes over plan", spark: [46, 50, 48, 55, 58, 56, 62, 65, 63, 69, 72, 75] },
      { label: "Revenue", value: "$14.82M", delta: "3,940 loads", sub: "month to date", spark: [22, 29, 36, 42, 49, 55, 62, 68, 74, 81, 87, 93] },
      { label: "Gross margin", value: "14.6%", delta: "20 bps", sub: "after fuel surcharge", spark: [64, 61, 63, 59, 61, 57, 59, 55, 57, 53, 55, 51] },
      { label: "On-time delivery", value: "96.2%", delta: "41 late", sub: "against appointment time", spark: [58, 62, 60, 66, 64, 70, 68, 73, 71, 76, 74, 78] },
      { label: "Carrier invoices", value: "$4.21M", delta: "318 to audit", sub: "$68,400 in rate variance", spark: [40, 44, 42, 50, 54, 52, 59, 63, 61, 68, 71, 74] },
      { label: "Unbilled receivable", value: "$1.94M", delta: "226 loads ready", sub: "documents complete", spark: [78, 72, 66, 61, 55, 49, 44, 38, 33, 27, 22, 16] },
    ],
    grid: {
      title: "Load Book",
      meta: "1,077 loads in flight \u00b7 positions updated every 15 minutes",
      cols: ["Load", "Lane", "Carrier", "Equip", "Miles", "Revenue", "Cost", "Margin", "Status"],
      rows: [
        ["RJS-408122", "Huntsville, AL \u2192 Monroe, LA", "Bellmont Trucking", "Van", "412", "$1,184", "$960", "18.9%", "Delivered"],
        ["RJS-408140", "Laredo, TX \u2192 Memphis, TN", "Cordova Freight", "Reefer", "918", "$2,742", "$2,410", "12.1%", "In transit"],
        ["RJS-408155", "Joliet, IL \u2192 Columbus, OH", "Northway Carriers", "Van", "342", "$886", "$720", "18.7%", "In transit"],
        ["RJS-408161", "Fontana, CA \u2192 Phoenix, AZ", "Sierra Line Haul", "Van", "358", "$942", "$838", "11.0%", "Detention"],
        ["RJS-408177", "Savannah, GA \u2192 Charlotte, NC", "Ashcroft Logistics", "Flatbed", "266", "$1,020", "$860", "15.7%", "At shipper"],
        ["RJS-408190", "Kansas City, MO \u2192 Denver, CO", "Bellmont Trucking", "Van", "604", "$1,588", "$1,412", "11.1%", "Rate variance"],
        ["RJS-408204", "Fresno, CA \u2192 Salt Lake City, UT", "Cordova Freight", "Reefer", "742", "$2,264", "$1,910", "15.6%", "In transit"],
        ["RJS-408218", "Allentown, PA \u2192 Boston, MA", "Northway Carriers", "Van", "312", "$1,104", "$998", "9.6%", "Margin flag"],
      ],
    },
  },
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

/** The worklist header, per module. "Needs a look" on every screen of every
 *  product read as one template with the data swapped out. Keyed
 *  `industry.module`. */
export const BPOS_WORKLIST: Record<string, string> = {
  "construction.Bids": "Bid gaps",
  "construction.Budget": "Budget exceptions",
  "construction.Billing": "Billing held up",
  "construction.Manpower": "Crew flags",
  "realestate.Asset Books": "Book exceptions",
  "realestate.Underwriting": "Deal blockers",
  "realestate.Distributions": "Distribution holds",
  "realestate.Comps": "Comp set gaps",
  "legal.Matters": "Matter risks",
  "legal.Intake": "Intake queue",
  "legal.Billing": "Prebill exceptions",
  "legal.Budget": "Budget breaches",
  "legal.People": "Capacity flags",
  "logistics.Ops": "Dispatch flags",
  "logistics.Carrier audit": "Audit exceptions",
  "logistics.Billing": "Invoice exceptions",
  "logistics.Reconciliation": "Unmatched items",
  "logistics.Commissions": "Pay exceptions",
  "restaurants.Labor": "Labor flags",
  "restaurants.Inventory": "Count and price flags",
  "restaurants.COGS": "Cost variances",
  "restaurants.Reports": "Close blockers",
  "brokerage.BOV": "BOV queue",
  "brokerage.Broker desk": "Payout exceptions",
  "brokerage.Research": "Data gaps",
  "brokerage.Agents": "Agent flags",
  "wealth.Models": "Drift and trade flags",
  "wealth.Performance": "Pack exceptions",
  "wealth.Committee": "Committee items",
  "wealth.Compliance": "Compliance items",
};

/** The one tool on each screen that is not a table.
 *
 *  These are the things actually shipped in the demos, not illustrations of a
 *  category: the autonomous BOV calculator on the brokerage desk, the return
 *  solver and the waterfall out of the underwriting model, the commission run
 *  that pays nothing on a gate-blocked load, the prebill realization check.
 *  Two per industry, so a working screen has something on it the next screen
 *  does not. Keyed `industry.module`. */
export interface Feature {
  title: string;
  meta: string;
  /** what the operator sets, or what the system pulled */
  inputs: [label: string, value: string][];
  /** what comes back out */
  outputs: [label: string, value: string, sub: string][];
  note: string;
}

export const BPOS_FEATURES: Record<string, Feature> = {
  "brokerage.BOV": {
    title: "BOV Calculator",
    meta: "Comp-derived value range \u00b7 rebuilds when the comp set moves",
    inputs: [
      ["Property", "Bayou Crossing \u00b7 Industrial \u00b7 184,000 SF"],
      ["NOI, trailing 12", "$1,412,000"],
      ["Comp set", "20 sales \u00b7 within 4.0 mi \u00b7 last 18 months"],
      ["Cap rate band", "5.62% \u2013 6.44%"],
      ["Adjustments", "Age +0.18% \u00b7 clear height \u22120.11%"],
    ],
    outputs: [
      ["Indicated value", "$21.9M \u2013 $25.1M", "midpoint $23.5M \u00b7 $127.72 / SF"],
      ["Implied cap", "6.01%", "at the midpoint"],
      ["Time to draft", "41 min", "comps, pricing and the letter"],
    ],
    note: "Every comp in the band opens to the county record it came from.",
  },
  "brokerage.Broker desk": {
    title: "Split calculator",
    meta: "Gross fee to agent payout \u00b7 the desk's own schedule",
    inputs: [
      ["Deal", "1101 Milam \u00b7 $34,100,000 \u00b7 Office"],
      ["Gross fee", "$682,000 \u00b7 2.00%"],
      ["Referral out", "$68,200 \u00b7 10.0%"],
      ["House split", "45 / 55 \u00b7 tier 3 agent"],
      ["Co-broke", "$153,450 \u00b7 buyer side"],
    ],
    outputs: [
      ["Agent payout", "$252,945", "after referral and co-broke"],
      ["House retained", "$206,955", "net of desk costs"],
      ["Effective rate", "55.0%", "against the split schedule"],
    ],
    note: "The schedule is the signed one, so the number does not get argued.",
  },

  "realestate.Underwriting": {
    title: "Return solver",
    meta: "Solves the price the deal can carry, not the price on the flyer",
    inputs: [
      ["Deal", "Willow Bend \u00b7 168 units \u00b7 Boise, ID"],
      ["Year 1 NOI", "$3,184,000 \u00b7 T-12 rolled forward"],
      ["Senior debt", "5-yr \u00b7 5Y UST + 155 bps \u00b7 live index"],
      ["Exit cap", "5.50% \u00b7 held flat"],
      ["Constraints", "LP IRR \u2265 13.5% \u00b7 avg cash-on-cash \u2265 4.5%"],
    ],
    outputs: [
      ["Maximum price", "$41,850,000", "$249,107 per unit"],
      ["LP IRR", "13.52%", "at the solved price"],
      ["Equity multiple", "2.31x", "5-year hold"],
    ],
    note: "The index is the live 5-year Treasury, not a number typed in last month.",
  },
  "realestate.Distributions": {
    title: "Waterfall calculator",
    meta: "Distributable cash through the tiers \u00b7 reconciles to zero",
    inputs: [
      ["Period", "Q3 \u00b7 4 assets distributing"],
      ["Distributable cash", "$2,418,600"],
      ["Preferred return", "8.0% \u00b7 accrued $1,884,200"],
      ["Split above pref", "70 / 30 to LP"],
      ["Catch-up", "GP to 20% of profit"],
    ],
    outputs: [
      ["To limited partners", "$2,058,020", "pref then 70% of the residual"],
      ["To general partner", "$360,580", "catch-up plus promote"],
      ["Reconciliation", "$0.00", "sources less uses, both checks clear"],
    ],
    note: "The zero-proof is the gate: nothing sends until both checks are zero.",
  },

  "construction.Bids": {
    title: "Bid coverage check",
    meta: "Scope against quotes \u00b7 finds the hole before it is signed",
    inputs: [
      ["Bid", "Trinity Commons \u00b7 $12,400,000 \u00b7 due Jun 27"],
      ["Divisions scoped", "26 of 28"],
      ["Subs quoted", "94 quotes \u00b7 61 firms"],
      ["Uncovered scope", "Div 08 glazing \u00b7 Div 21 fire protection"],
      ["Escalation", "Steel \u22121.2% \u00b7 copper +0.8%"],
    ],
    outputs: [
      ["Exposure if unpriced", "$684,000", "5.5% of the bid"],
      ["Coverage", "92.9%", "of scoped value carried by a quote"],
      ["Margin at bid", "11.4%", "before the two open divisions"],
    ],
    note: "Read from the bid tabs and the drawings, not from a takeoff retyped by hand.",
  },
  "construction.Billing": {
    title: "Pay application builder",
    meta: "Earned value to the signed G702 \u00b7 assembled from the cost ledger",
    inputs: [
      ["Job", "Riverside Medical \u00b7 $18,400,000"],
      ["Earned to date", "$16,192,000 \u00b7 cost-to-cost"],
      ["Previously billed", "$15,940,000"],
      ["Retainage", "5.0% \u00b7 $809,600 held"],
      ["Stored materials", "$142,000 \u00b7 invoiced, not installed"],
    ],
    outputs: [
      ["This application", "$394,000", "earned plus stored, less retainage"],
      ["Underbilled", "$252,000", "closes with this application"],
      ["Lien waivers", "38 of 41", "3 outstanding, all under $10k"],
    ],
    note: "The three missing waivers are named, so the application does not go out short.",
  },

  "legal.Billing": {
    title: "Realization check",
    meta: "Standard value to what the firm actually collects",
    inputs: [
      ["Cycle", "June prebills \u00b7 148 to review"],
      ["Standard value", "$4,182,000 \u00b7 41,208 hours"],
      ["Write-downs", "$214,400 \u00b7 partner discretion"],
      ["Client discounts", "$102,800 \u00b7 per engagement letter"],
      ["Blocked entries", "12 \u00b7 narrative or code"],
    ],
    outputs: [
      ["Billed value", "$3,864,800", "after write-downs and discounts"],
      ["Realization", "92.4%", "against standard, 1.1 pts"],
      ["At risk if not fixed", "$188,600", "sitting behind the 12 blockers"],
    ],
    note: "Each write-down names the partner and the reason, in their own words.",
  },
  "legal.Budget": {
    title: "Matter budget burn",
    meta: "Phase budget against actual \u00b7 projects the finish",
    inputs: [
      ["Matter", "Ainsworth wage class \u00b7 Employment"],
      ["Budget", "$1,420,000 \u00b7 phased by task code"],
      ["Incurred", "$1,960,000 \u00b7 through Jun 20"],
      ["Phase remaining", "Expert work, trial prep"],
      ["Rate card", "Client card \u00b7 blended $612"],
    ],
    outputs: [
      ["Projected at completion", "$2,410,000", "70% over the approved budget"],
      ["Overrun to date", "$540,000", "unbudgeted, unbilled to client"],
      ["Notice due", "Jun 24", "engagement letter requires 10 days"],
    ],
    note: "The notice date comes from the engagement letter, which the system read.",
  },

  "logistics.Commissions": {
    title: "Commission run",
    meta: "Penny-accurate \u00b7 the margin gate decides before the split does",
    inputs: [
      ["Week", "Jun 16 \u2013 Jun 20 \u00b7 3,940 loads"],
      ["Eligible margin", "$2,164,320"],
      ["Plan", "Tiered \u00b7 4% to 11% by book"],
      ["Margin gate", "Below 10% pays nothing"],
      ["Gate-blocked", "212 loads \u00b7 $84,120 margin"],
    ],
    outputs: [
      ["Commission payable", "$186,742.18", "27 reps, penny-accurate"],
      ["Blocked by the gate", "$0.00", "shown on the statement, not hidden"],
      ["Held for review", "$3,442.33", "16 exceptions, 1 blocking"],
    ],
    note: "A gate-blocked load still appears on the rep's statement, at zero.",
  },
  "logistics.Carrier audit": {
    title: "Rate variance check",
    meta: "Rate confirmation against the carrier invoice, line by line",
    inputs: [
      ["Invoice", "Cordova Freight \u00b7 INV-88214 \u00b7 $2,610.00"],
      ["Rate confirmation", "$2,410.00 \u00b7 signed Jun 17"],
      ["Accessorials claimed", "Detention 2.0 hr \u00b7 lumper $84"],
      ["Supported by", "Telematics dwell 1.4 hr \u00b7 receipt on file"],
      ["Contract terms", "Detention after 2 hr \u00b7 $60/hr"],
    ],
    outputs: [
      ["Approved amount", "$2,494.00", "linehaul plus the lumper receipt"],
      ["Disputed", "$116.00", "detention not supported by dwell"],
      ["Recovered this month", "$68,400", "across 318 audited invoices"],
    ],
    note: "The dwell time comes from the truck, so the dispute is not an opinion.",
  },

  "restaurants.COGS": {
    title: "Theoretical vs actual",
    meta: "Recipe cost against what was actually used",
    inputs: [
      ["Unit", "07 \u2014 Riverwalk \u00b7 week ending Jun 20"],
      ["Net sales", "$412,400 \u00b7 18,240 covers"],
      ["Theoretical food", "$117,536 \u00b7 28.5% from recipes"],
      ["Actual food", "$127,432 \u00b7 30.9% from invoices"],
      ["Counted", "Jun 20 \u00b7 all 9 categories"],
    ],
    outputs: [
      ["Variance", "$9,896", "240 bps of sales"],
      ["Largest driver", "Protein \u00b7 $6,140", "yield below spec on 3 items"],
      ["Annualised", "$514,592", "at this unit alone"],
    ],
    note: "Recipes come from the menu system; usage comes from the invoices and the count.",
  },
  "restaurants.Labor": {
    title: "Schedule cost check",
    meta: "The posted schedule priced before the week starts",
    inputs: [
      ["Unit", "07 \u2014 Riverwalk \u00b7 week of Jun 23"],
      ["Scheduled hours", "1,842 \u00b7 46 employees"],
      ["Blended rate", "$18.42 \u00b7 plus 14.2% burden"],
      ["Forecast sales", "$418,000 \u00b7 from the same weeks last year"],
      ["Overtime scheduled", "34.5 hr \u00b7 6 employees"],
    ],
    outputs: [
      ["Scheduled labor", "$38,742", "9.3% of forecast sales"],
      ["Over target", "$2,180", "target 8.8% for this unit"],
      ["Cheapest fix", "Cut 118 hr", "Tue and Wed mid-shift, no service impact"],
    ],
    note: "The fix names the shifts, so the manager is not asked to find them.",
  },

  "wealth.Models": {
    title: "Rebalance calculator",
    meta: "Drift against the band \u00b7 trades sized before the desk opens",
    inputs: [
      ["Household", "Delacroix Partners \u00b7 9 accounts"],
      ["Model", "Growth 80/20 \u00b7 drift 3.1%"],
      ["Band", "\u00b1 2.5% per sleeve"],
      ["Assets", "$61,200,000 \u00b7 reconciled to custodian"],
      ["Constraints", "No wash sales \u00b7 harvest to $250k"],
    ],
    outputs: [
      ["Trades to place", "14", "4 sells, 10 buys"],
      ["Back inside band", "0.4% drift", "all nine sleeves"],
      ["Realized gain", "$182,400", "after $250,000 of harvested losses"],
    ],
    note: "Lot selection runs against the custodian's cost basis, not an estimate.",
  },
  "wealth.Performance": {
    title: "Client pack builder",
    meta: "Quarter-end pack assembled from the custodian record",
    inputs: [
      ["Household", "Eastvale Foundation \u00b7 5 accounts"],
      ["Period", "Quarter ending Jun 30"],
      ["Positions reconciled", "412 of 412 \u00b7 nightly"],
      ["Benchmark", "70/30 blended \u00b7 policy statement"],
      ["Fees", "$221,000 year to date \u00b7 net of credits"],
    ],
    outputs: [
      ["Net of fees", "+6.84%", "quarter, time-weighted"],
      ["Versus benchmark", "+41 bps", "after all fees and credits"],
      ["Pack status", "Ready", "1,166 of 1,204 households"],
    ],
    note: "Every figure on the pack opens to the custodian statement behind it.",
  },
};

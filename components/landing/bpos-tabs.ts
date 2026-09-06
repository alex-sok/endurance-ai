/* Per-screen tables for the Brain OS console, pulled from the demos.
 *
 * Every column schema here is lifted from a page that actually exists:
 *   logistics    — Copperline (settlement queue defects, AR ageing, the
 *                  three-way match, payout statements with the margin gate)
 *   construction — Yates portal (bid tab with CSI codes, WIP with EAC,
 *                  G702 pay apps, trades standard-vs-actual)
 *   legal        — lawfirm portal (intake with conflict hits, prebill audit,
 *                  AFA economics, capacity by practice group)
 *   hospitality  — 1100 Group restaurant OS (SPLH and break premiums,
 *                  theoretical vs actual, inventory reconciliation,
 *                  the four-wall P&L)
 *   brokerage    — Circa (BOV comp grid with net adjustments, the desk
 *                  ledger, market reports, agent book with retention risk)
 *   wealth       — Rosemont (model holdings, composite net-of-fees,
 *                  committee votes, the compliance calendar)
 *
 * Data is synthetic throughout, kept consistent with the figures already on
 * the command centres. Keyed `industry.module`. */

import type { Grid, BarRow } from "./bpos-views";

export interface TabPanel {
  grid?: Grid;
  barsTitle?: string;
  barsMeta?: string;
  bars?: BarRow[];
}

export const BPOS_TABS: Record<string, TabPanel> = {
  /* ── logistics · Copperline ─────────────────────────────────────────── */

  "logistics.Carrier audit": {
    grid: {
      title: "Settlement queue",
      meta: "186 carrier invoices this week · 74% released untouched",
      cols: ["Invoice", "Carrier", "Channel", "Billed", "Rate con", "Δ", "Docs", "Reason"],
      rows: [
        ["INV-88214", "Cordova Freight", "Email", "$2,610.00", "$2,410.00", "+$200.00", "3 of 4", "Billed over rate con"],
        ["INV-88201", "Bergstrom Trucking", "EDI 210", "$1,184.00", "$1,184.00", "$0.00", "4 of 4", "Auto-approved"],
        ["INV-88197", "Willow Creek Carriers", "Carrier portal", "$942.00", "$942.00", "$0.00", "3 of 4", "Waiting on the POD"],
        ["INV-88190", "Sawtooth Express", "Factoring co.", "$1,588.00", "$1,588.00", "$0.00", "4 of 4", "Possible duplicate"],
        ["INV-88186", "Delgado Freight Lines", "Email", "$1,326.00", "$1,210.00", "+$116.00", "4 of 4", "Unapproved accessorial"],
        ["INV-88180", "Redstone Motor Freight", "EDI 210", "$2,264.00", "$2,264.00", "$0.00", "4 of 4", "Auto-approved"],
        ["INV-88171", "Copper Basin Hauling", "Email", "$886.00", "$886.00", "$0.00", "2 of 4", "Remit-to mismatch"],
        ["INV-88164", "Novara Carriers", "Carrier portal", "$1,020.00", "$1,020.00", "$0.00", "4 of 4", "Auto-approved"],
      ],
    },
  },

  "logistics.Billing": {
    grid: {
      title: "Shipper invoices — the other side of the bill",
      meta: "226 loads billed themselves this week · ageing against terms",
      cols: ["Invoice", "Customer", "Load", "Amount", "Channel", "Terms", "Age", "Status"],
      rows: [
        ["AR-40311", "Ridgeway Foods", "RJS-408122", "$1,184.00", "EDI", "Net 30", "2d", "Sent"],
        ["AR-40308", "Halcyon Building Products", "RJS-408140", "$2,742.00", "Portal", "Net 45", "4d", "Sent"],
        ["AR-40297", "Verity Paper Mills", "RJS-408155", "$886.00", "Email", "Net 30", "9d", "Sent"],
        ["AR-40286", "Northgate Beverage", "RJS-408101", "$1,912.00", "EDI", "Net 30", "31d", "1 day past terms"],
        ["AR-40271", "Sable Chemical", "RJS-408088", "$2,140.00", "Portal", "Net 60", "18d", "Sent"],
        ["AR-40266", "Pinnacle Grain Co.", "RJS-408072", "$1,455.00", "Email", "Net 30", "44d", "Second notice"],
        ["AR-40252", "Marlowe Home Goods", "RJS-408069", "$1,020.00", "EDI", "Net 30", "6d", "Sent"],
        ["AR-40247", "Cascade Nutrition", "RJS-408051", "$2,388.00", "Portal", "Net 45", "12d", "Sent"],
      ],
    },
  },

  "logistics.Reconciliation": {
    grid: {
      title: "Three-way match",
      meta: "Rate con · carrier invoice · shipper invoice, per load",
      cols: ["Load", "Rate con", "Carrier inv", "Shipper inv", "GP", "Margin", "Status"],
      rows: [
        ["RJS-408122", "$960.00", "$960.00", "$1,184.00", "$224.00", "18.9%", "Matched"],
        ["RJS-408140", "$2,410.00", "$2,410.00", "$2,742.00", "$332.00", "12.1%", "Matched"],
        ["RJS-408155", "$720.00", "$720.00", "$886.00", "$166.00", "18.7%", "Matched"],
        ["RJS-408161", "$838.00", "$954.00", "$942.00", "($12.00)", "−1.3%", "Carrier over — disputed"],
        ["RJS-408177", "$860.00", "$860.00", "$1,020.00", "$160.00", "15.7%", "Matched"],
        ["RJS-408190", "$1,412.00", "$1,612.00", "$1,588.00", "($24.00)", "−1.5%", "Rate variance open"],
        ["RJS-408204", "$1,910.00", "$1,910.00", "$2,264.00", "$354.00", "15.6%", "Matched"],
        ["RJS-408218", "$998.00", "$998.00", "$1,104.00", "$106.00", "9.6%", "Margin flag"],
      ],
    },
  },

  "logistics.Commissions": {
    grid: {
      title: "Payout statements",
      meta: "27 payees · penny-accurate · below 10% margin pays nothing",
      cols: ["Payee", "Role", "Loads", "Profit", "Margin", "Tier", "Earned", "Adjustments", "Balance"],
      rows: [
        ["D. Whitaker", "Broker", "48", "$41,208.40", "16.2%", "Top", "$11,538.35", "—", "$11,538.35"],
        ["S. Marchetti", "Broker", "39", "$28,114.72", "13.8%", "Mid", "$7,590.97", "($500.00) escrow", "$7,090.97"],
        ["R. Okafor", "Broker", "44", "$24,882.10", "11.4%", "Mid", "$6,469.35", "($1,250.00) loan", "$5,219.35"],
        ["T. Delgado", "Broker", "31", "$18,204.66", "9.4%", "—", "$0.00", "gate-blocked, shown at zero", "$0.00"],
        ["M. Reyes", "Dispatcher", "112", "$96,412.55", "14.1%", "Mid", "$6,748.88", "—", "$6,748.88"],
        ["K. Sundstrom", "Broker", "27", "$19,880.14", "15.0%", "Top", "$5,566.44", "+$750.00 bonus", "$6,316.44"],
        ["L. Tran", "Broker", "22", "$12,411.90", "12.7%", "Mid", "$3,351.21", "—", "$3,351.21"],
        ["J. Beaufort", "Dispatcher", "96", "$71,205.34", "13.2%", "Mid", "$4,984.37", "($400.00) escrow", "$4,584.37"],
      ],
    },
  },

  /* ── construction · Yates ───────────────────────────────────────────── */

  "construction.Bids": {
    grid: {
      title: "Bid tab — Trinity Commons",
      meta: "$12.4M bid · due Jun 27 · 94 quotes across 61 firms",
      cols: ["CSI", "Trade", "Scope", "Qty", "Unit cost", "Direct cost", "OH", "Profit", "Sell"],
      rows: [
        ["03 30 00", "Concrete", "Cast-in-place, foundations", "4,120 CY", "$412", "$1,697,440", "8%", "6%", "$1,942,760"],
        ["05 12 00", "Structural steel", "Frame and deck", "618 TON", "$3,240", "$2,002,320", "8%", "6%", "$2,291,655"],
        ["08 40 00", "Glazing", "Curtain wall and storefront", "22,400 SF", "$74", "$1,657,600", "8%", "6%", "UNCOVERED"],
        ["09 29 00", "Drywall", "Framing, board, finish", "184,000 SF", "$6.40", "$1,177,600", "8%", "6%", "$1,347,782"],
        ["21 10 00", "Fire protection", "Wet system, full coverage", "148,000 SF", "$4.10", "$606,800", "8%", "6%", "UNCOVERED"],
        ["23 09 00", "Controls / BAS", "DDC controls, self-perform", "1 LS", "$684,000", "$684,000", "8%", "10%", "$812,592"],
        ["26 05 00", "Electrical", "Service, distribution, lighting", "1 LS", "$1,912,000", "$1,912,000", "8%", "6%", "$2,188,294"],
        ["27 10 00", "Low voltage", "Structured cabling", "148,000 SF", "$2.20", "$325,600", "8%", "6%", "$372,647"],
      ],
    },
  },

  "construction.Budget": {
    grid: {
      title: "Work in progress — cost to complete",
      meta: "34 jobs · EAC recomputed nightly from the cost ledger",
      cols: ["Job", "% Comp", "Budget", "ITD cost", "EAC", "(Over)/Under", "Flag"],
      rows: [
        ["Riverside Medical", "88%", "$16,560,000", "$14,780,000", "$16,890,000", "($330,000)", "Over bid"],
        ["Cedar Ridge Ph II", "76%", "$12,780,000", "$9,940,000", "$13,020,000", "($240,000)", "Over bid"],
        ["Harbor Point Tower", "68%", "$19,010,000", "$12,880,000", "$18,850,000", "$160,000", "On plan"],
        ["Midtown Logistics", "87%", "$8,330,000", "$7,240,000", "$8,290,000", "$40,000", "On plan"],
        ["Ashland Commons", "59%", "$9,950,000", "$5,870,000", "$9,910,000", "$40,000", "On plan"],
        ["Northgate Refresh", "94%", "$5,470,000", "$5,140,000", "$5,450,000", "$20,000", "Closing"],
        ["Weston Interiors", "55%", "$3,310,000", "$1,820,000", "$3,290,000", "$20,000", "On plan"],
        ["Foxglove Site Work", "85%", "$4,650,000", "$3,980,000", "$4,780,000", "($130,000)", "Watch"],
      ],
    },
  },

  "construction.Billing": {
    grid: {
      title: "Pay applications — June cycle",
      meta: "9 open apps · retainage held at 5% · lien waivers tracked per app",
      cols: ["App #", "Job", "Period to", "This period", "Certified", "Retainage held", "Waivers", "Status"],
      rows: [
        ["014", "Riverside Medical", "Jun 30", "$394,000", "$16,192,000", "$809,600", "38 of 41", "3 waivers out"],
        ["011", "Cedar Ridge Ph II", "Jun 30", "$382,000", "$10,792,000", "$539,600", "29 of 29", "Ready to submit"],
        ["009", "Harbor Point Tower", "Jun 30", "$524,000", "$14,824,000", "$741,200", "31 of 33", "2 waivers out"],
        ["012", "Midtown Logistics", "Jun 30", "$162,000", "$8,352,000", "$417,600", "22 of 22", "Certified"],
        ["007", "Ashland Commons", "Jun 30", "$257,000", "$6,667,000", "$333,350", "18 of 18", "Ready to submit"],
        ["016", "Northgate Refresh", "Jun 30", "$36,000", "$6,016,000", "$300,800", "14 of 14", "Final — releasing"],
        ["005", "Weston Interiors", "Jun 30", "$121,000", "$2,145,000", "$107,250", "9 of 9", "Certified"],
        ["010", "Foxglove Site Work", "Jun 30", "$155,000", "$4,335,000", "$216,750", "11 of 12", "1 waiver out"],
      ],
    },
  },

  "construction.Manpower": {
    grid: {
      title: "Trades — standard vs actual",
      meta: "Timesheets synced nightly · burden included",
      cols: ["Trade", "Crew", "Hours (wk)", "Standard $/hr", "Actual $/hr", "Flag"],
      rows: [
        ["Controls — self-perform", "14", "548", "$68.00", "$66.40", "Under standard"],
        ["Electrical", "22", "861", "$74.00", "$78.20", "OT running 9%"],
        ["Mechanical / piping", "18", "704", "$71.00", "$71.80", "On standard"],
        ["Drywall / framing", "26", "1,022", "$54.00", "$53.10", "Under standard"],
        ["Concrete", "12", "466", "$58.00", "$63.90", "Weather rework"],
        ["Low-voltage cabling", "8", "312", "$52.00", "$51.60", "On standard"],
        ["TAB & commissioning", "5", "196", "$82.00", "$82.00", "On standard"],
        ["Site / civil", "9", "348", "$56.00", "$57.40", "On standard"],
      ],
    },
  },

  /* ── legal · lawfirm portal ─────────────────────────────────────────── */

  "legal.Intake": {
    grid: {
      title: "Intake & conflicts",
      meta: "14 requests open · conflicts checked before the file opens",
      cols: ["Request", "Client", "Requesting partner", "Practice", "Est. value", "Conflict hits", "Days open", "Stage"],
      rows: [
        ["NB-2481", "Redwood Holdings", "E. Marchetti", "Corporate", "$1.8M", "0", "1", "Clear — engagement letter out"],
        ["NB-2480", "Kestrel Devices", "H. Lindqvist", "IP", "$650K", "2", "3", "Hits under review"],
        ["NB-2478", "Brentmoor Retail", "S. Rahimi", "Restructuring", "$2.4M", "1", "2", "Waiver requested"],
        ["NB-2477", "Fairview Logistics", "D. Osei", "Litigation", "$900K", "0", "4", "Clear — awaiting retainer"],
        ["NB-2474", "Calder Group", "S. Rahimi", "Tax", "$310K", "0", "1", "Opened"],
        ["NB-2472", "Ainsworth Foods", "D. Osei", "Employment", "$1.1M", "3", "6", "Adverse-party hit — declined"],
        ["NB-2470", "Harbor Row Partners", "E. Marchetti", "Real estate", "$540K", "0", "2", "Opened"],
        ["NB-2468", "Pellworth Marine", "H. Lindqvist", "IP", "$780K", "1", "5", "Related-party waiver signed"],
      ],
    },
  },

  "legal.Billing": {
    grid: {
      title: "Prebill audit",
      meta: "Every entry checked against the client's billing rules before it bills",
      cols: ["Timekeeper", "Date", "Hrs", "Rate", "Narrative check", "Client rules", "Verdict"],
      rows: [
        ["E. Marchetti", "Jun 12", "3.4", "$1,150", "Clear", "Pass", "Bills"],
        ["Assoc. R. Chen", "Jun 12", "6.1", "$625", "Block-billed — split required", "Fail", "Held"],
        ["H. Lindqvist", "Jun 13", "2.8", "$1,050", "Clear", "Pass", "Bills"],
        ["Assoc. M. Diallo", "Jun 13", "7.2", "$595", "Vague: “attention to file”", "Fail", "Held"],
        ["Paralegal K. Voss", "Jun 14", "4.5", "$285", "Clear", "Pass", "Bills"],
        ["D. Osei", "Jun 14", "1.9", "$1,150", "Clear", "Rate over client cap", "Written down"],
        ["Assoc. R. Chen", "Jun 15", "5.4", "$625", "Clear", "Pass", "Bills"],
        ["S. Rahimi", "Jun 15", "3.1", "$1,095", "Travel at full rate", "Fail — 50% travel", "Written down"],
      ],
    },
  },

  "legal.Budget": {
    grid: {
      title: "Alternative fee arrangements",
      meta: "The fixed-fee book, priced against what hourly would have made",
      cols: ["Arrangement", "Matters", "Hours", "Collected", "Realized rate", "vs hourly", "Margin"],
      rows: [
        ["Redwood — M&A flat fee", "3", "2,140", "$1,820,000", "$850", "+$122,000", "Ahead"],
        ["Kestrel — patent portfolio cap", "11", "3,480", "$2,240,000", "$644", "($196,000)", "Behind cap"],
        ["Ainsworth — employment subscription", "24", "1,910", "$1,140,000", "$597", "+$38,000", "On plan"],
        ["Harbor Row — closing menu", "8", "820", "$690,000", "$841", "+$74,000", "Ahead"],
        ["Brentmoor — restructuring success fee", "1", "2,650", "$0", "$0", "at risk", "Fee on exit"],
        ["Calder — tax controversy collar", "4", "1,120", "$860,000", "$768", "+$12,000", "On plan"],
        ["Pellworth — ITC blended rate", "2", "1,860", "$1,290,000", "$694", "($44,000)", "Watch"],
        ["Fairview — litigation budget + collar", "3", "1,540", "$1,180,000", "$766", "+$29,000", "On plan"],
      ],
    },
  },

  "legal.People": {
    grid: {
      title: "Capacity by practice group",
      meta: "Forward demand against hours on the bench, next 90 days",
      cols: ["Practice group", "People", "Open matters", "Forward demand", "Capacity", "Gap", "Reading"],
      rows: [
        ["Corporate", "31", "284", "14,200 hrs", "15,900 hrs", "+1,700", "Room for two deals"],
        ["Litigation", "42", "391", "22,800 hrs", "20,100 hrs", "−2,700", "Over — trial calendar"],
        ["IP", "24", "310", "11,400 hrs", "12,300 hrs", "+900", "Balanced"],
        ["Employment", "18", "242", "9,800 hrs", "8,600 hrs", "−1,200", "Over — wage class"],
        ["Real estate", "14", "168", "6,100 hrs", "7,200 hrs", "+1,100", "Room"],
        ["Tax", "11", "121", "5,400 hrs", "5,600 hrs", "+200", "Balanced"],
        ["Restructuring", "9", "84", "6,800 hrs", "4,900 hrs", "−1,900", "Over — Brentmoor"],
        ["Regulatory", "8", "92", "3,600 hrs", "4,100 hrs", "+500", "Room"],
      ],
    },
  },

  /* ── hospitality · 1100 Group restaurant OS ─────────────────────────── */

  "hospitality.Labor": {
    grid: {
      title: "Labor vs sales — Unit 07, week to date",
      meta: "Punches from the POS · SPLH is sales per labor hour",
      cols: ["Date", "Net sales", "Scheduled", "Actual", "Variance", "SPLH", "OT hrs", "Premiums"],
      rows: [
        ["Mon Jun 15", "$41,208", "412 hrs", "398 hrs", "−14", "$103.54", "0.0", "$0"],
        ["Tue Jun 16", "$44,916", "418 hrs", "422 hrs", "+4", "$106.44", "1.5", "$41"],
        ["Wed Jun 17", "$52,340", "440 hrs", "459 hrs", "+19", "$114.03", "4.0", "$118"],
        ["Thu Jun 18", "$58,112", "466 hrs", "471 hrs", "+5", "$123.38", "2.5", "$74"],
        ["Fri Jun 19", "$81,904", "512 hrs", "540 hrs", "+28", "$151.67", "9.5", "$286"],
        ["Sat Jun 20", "$88,215", "524 hrs", "561 hrs", "+37", "$157.25", "12.0", "$362"],
        ["Sun Jun 21", "$45,705", "436 hrs", "418 hrs", "−18", "$109.34", "0.0", "$0"],
      ],
    },
    barsTitle: "Overtime share by unit",
    barsMeta: "OT hours as % of total · threshold 2.0%",
    bars: [
      { name: "Unit 07 — Riverwalk", meta: "29.5 OT hrs on 3,269", pct: 90, right: "0.9%" },
      { name: "Unit 22 — Grove St", meta: "84.2 OT hrs on 3,010", pct: 100, right: "2.8%", flag: true },
      { name: "Unit 19 — Harbor", meta: "51.1 OT hrs on 3,388", pct: 54, right: "1.5%" },
      { name: "Unit 14 — Midtown", meta: "38.8 OT hrs on 3,552", pct: 39, right: "1.1%" },
    ],
  },

  "hospitality.Inventory": {
    grid: {
      title: "Inventory reconciliation — protein, Unit 07",
      meta: "Opening + purchases − closing = actual · recipes say theoretical",
      cols: ["Item", "Opening", "Purchases", "Closing", "Actual usage", "Theoretical", "Variance", "Days on hand"],
      rows: [
        ["Beef, ground 81/19", "142 lb", "460 lb", "128 lb", "474 lb", "441 lb", "33 lb", "1.9"],
        ["Chicken, airline breast", "96 lb", "310 lb", "88 lb", "318 lb", "309 lb", "9 lb", "2.0"],
        ["Salmon, Atlantic fillet", "44 lb", "150 lb", "38 lb", "156 lb", "148 lb", "8 lb", "1.7"],
        ["Pork shoulder", "88 lb", "180 lb", "102 lb", "166 lb", "162 lb", "4 lb", "4.3"],
        ["Shrimp 16/20", "31 lb", "120 lb", "26 lb", "125 lb", "121 lb", "4 lb", "1.5"],
        ["Butter, unsalted", "64 lb", "144 lb", "58 lb", "150 lb", "146 lb", "4 lb", "2.7"],
        ["Eggs, large", "38 dz", "160 dz", "42 dz", "156 dz", "154 dz", "2 dz", "1.9"],
        ["Avocado, hass", "9 cs", "38 cs", "6 cs", "41 cs", "36 cs", "5 cs", "1.1"],
      ],
    },
  },

  "hospitality.COGS": {
    grid: {
      title: "Theoretical vs actual by unit",
      meta: "Recipes price the theoretical · invoices and counts price the actual",
      cols: ["Restaurant", "Theoretical", "Actual", "Variance", "Rate", "Top driver"],
      rows: [
        ["Unit 07 — Riverwalk", "28.5%", "30.9%", "240 bps", "$9,896 / wk", "Protein yield below spec"],
        ["Unit 22 — Grove St", "28.9%", "33.4%", "450 bps", "$17,464 / wk", "Unlogged waste"],
        ["Unit 19 — Harbor", "28.2%", "29.6%", "140 bps", "$6,383 / wk", "Purchase price — seafood"],
        ["Unit 31 — Northside", "29.0%", "30.1%", "110 bps", "$3,281 / wk", "Portioning"],
        ["Unit 14 — Midtown", "28.4%", "28.5%", "10 bps", "$501 / wk", "In spec"],
        ["Unit 03 — Lakeside", "28.8%", "29.2%", "40 bps", "$1,882 / wk", "Spoilage — produce"],
        ["Unit 11 — Old Town", "29.1%", "29.9%", "80 bps", "$2,758 / wk", "Portioning"],
        ["Unit 28 — Fairview", "28.7%", "30.4%", "170 bps", "$6,625 / wk", "Purchase price — dairy"],
      ],
    },
  },

  "hospitality.Reports": {
    grid: {
      title: "Four-wall P&L — group, period to date",
      meta: "Closed nightly from the POS, payroll and invoices",
      cols: ["Line", "This period", "% of sales", "Budget", "Variance"],
      rows: [
        ["Net sales", "$4,182,400", "100.0%", "$4,050,000", "+$132,400"],
        ["Cost of goods sold", "($1,246,355)", "29.8%", "($1,154,250)", "($92,105)"],
        ["Labor — hourly + management", "($1,321,638)", "31.6%", "($1,296,000)", "($25,638)"],
        ["Prime cost", "($2,567,993)", "61.4%", "($2,450,250)", "($117,743)"],
        ["Controllables", "($409,875)", "9.8%", "($405,000)", "($4,875)"],
        ["Delivery commissions", "($100,378)", "2.4%", "($97,200)", "($3,178)"],
        ["Occupancy", "($309,498)", "7.4%", "($309,498)", "$0"],
        ["Four-wall EBITDA", "$794,656", "19.0%", "$788,052", "+$6,604"],
      ],
    },
  },

  /* ── brokerage · Circa ──────────────────────────────────────────────── */

  "brokerage.BOV": {
    grid: {
      title: "Comp grid — Bayou Crossing BOV",
      meta: "20 sales in the set · net adjustments applied per comp",
      cols: ["#", "Comparable", "City", "Dist", "Closed", "SF", "Sale price", "$/SF", "Net adj"],
      rows: [
        ["1", "Northline Distribution 4", "Houston", "1.8 mi", "Mar 2026", "168,400", "$20,208,000", "$120.00", "+3.2%"],
        ["2", "Bayport Commerce Center", "Pasadena", "3.4 mi", "Jan 2026", "204,100", "$26,533,000", "$130.00", "−1.8%"],
        ["3", "Gulfgate Logistics Park B", "Houston", "2.2 mi", "Nov 2025", "151,200", "$18,144,000", "$120.00", "+4.1%"],
        ["4", "Almeda Flex Portfolio", "Houston", "3.9 mi", "Oct 2025", "96,800", "$12,681,000", "$131.00", "−2.4%"],
        ["5", "Port Crossing 8 & 9", "La Porte", "4.0 mi", "Sep 2025", "222,000", "$27,306,000", "$123.00", "+0.8%"],
        ["6", "Ellington Trade Center", "Houston", "2.9 mi", "Aug 2025", "134,600", "$17,229,000", "$128.00", "−0.6%"],
        ["7", "Sable Chemical HQ sale-leaseback", "Deer Park", "3.1 mi", "Jul 2025", "118,300", "$15,143,000", "$128.00", "−3.5%"],
        ["8", "Fairmount Plastics Bldg 2", "Houston", "1.4 mi", "Jun 2025", "142,700", "$16,839,000", "$118.00", "+2.9%"],
      ],
    },
  },

  "brokerage.Broker desk": {
    grid: {
      title: "Desk ledger — June closings",
      meta: "Gross fee to agent payout, against the signed schedule",
      cols: ["Deal", "Agent", "Side", "Gross fee", "Referral out", "House", "Agent payout", "Status"],
      rows: [
        ["1101 Milam", "R. Delgado", "Seller", "$682,000", "($68,200)", "$276,210", "$337,590", "Paid"],
        ["Southbelt Flex", "A. Whitfield", "Seller", "$306,000", "—", "$137,700", "$168,300", "Paid"],
        ["1420 Westheimer", "R. Delgado", "Seller", "$248,000", "—", "$111,600", "$136,400", "Funding"],
        ["Northline Industrial", "M. Castellanos", "Both", "$824,000", "($41,200)", "$352,260", "$430,540", "In escrow"],
        ["Bayou Crossing", "M. Castellanos", "Seller", "$392,000", "—", "$176,400", "$215,600", "In escrow"],
        ["2900 Kirby", "A. Whitfield", "Seller", "$163,000", "($16,300)", "$66,015", "$80,685", "Price cut pending"],
        ["Harborview Retail Pads", "R. Delgado", "Buyer", "$214,000", "—", "$96,300", "$117,700", "Paid"],
        ["Almeda Portfolio", "M. Castellanos", "Seller", "$1,274,000", "($127,400)", "$516,000", "$630,600", "Pre-market"],
      ],
    },
  },

  "brokerage.Research": {
    grid: {
      title: "Market reports — refreshed overnight",
      meta: "Listings, closings and county records, summarized per market",
      cols: ["Market", "Median $/SF", "DOM", "Active", "Closed 90d", "MoM", "Signal"],
      rows: [
        ["Houston — Industrial", "$124", "47", "212", "88", "+1.2%", "Tightening"],
        ["Houston — Office", "$188", "104", "348", "41", "−0.8%", "Soft — sublease glut"],
        ["Houston — Retail", "$241", "68", "184", "52", "+0.4%", "Stable"],
        ["Houston — Multifamily", "$186K/u", "58", "96", "34", "+0.9%", "Bid depth returning"],
        ["San Antonio — Industrial", "$108", "61", "134", "46", "+0.6%", "Stable"],
        ["Austin — Office", "$298", "121", "266", "28", "−1.4%", "Soft"],
        ["Dallas — Industrial", "$118", "44", "388", "142", "+1.6%", "Tightening"],
        ["Gulf Coast — Land", "$4.86", "196", "74", "12", "0.0%", "Thin trade"],
      ],
    },
  },

  "brokerage.Agents": {
    grid: {
      title: "Agent book",
      meta: "Production, open files and retention risk, scored nightly",
      cols: ["Agent", "Office", "Tenure", "Specialty", "TTM $M", "Sides", "Open", "Asks/90d", "Self-served", "Risk"],
      rows: [
        ["M. Castellanos", "Downtown", "Year 9", "Industrial", "$84.2", "14", "6", "31", "72%", "Low"],
        ["R. Delgado", "Downtown", "Year 6", "Office / retail", "$61.8", "12", "5", "24", "68%", "Low"],
        ["A. Whitfield", "Westside", "Year 4", "Retail", "$28.4", "9", "4", "19", "61%", "Low"],
        ["D. Vosburgh", "Westside", "Year 1", "Resale — SFR", "$2.5", "2", "0", "17", "56%", "High — 118d no close"],
        ["T. Delacroix", "Downtown", "Year 11", "Multifamily", "$96.6", "11", "7", "22", "81%", "Low"],
        ["S. Okonkwo", "Northside", "Year 2", "Land", "$8.1", "3", "2", "26", "44%", "Watch — low self-serve"],
        ["J. Marchetti", "Northside", "Year 5", "Industrial", "$44.9", "10", "5", "18", "70%", "Low"],
        ["P. Lindqvist", "Westside", "Year 3", "Office", "$19.7", "6", "3", "21", "58%", "Watch — trend −15%"],
      ],
    },
  },

  /* ── wealth · Rosemont ──────────────────────────────────────────────── */

  "wealth.Models": {
    grid: {
      title: "Growth 80/20 — model holdings",
      meta: "Sleeves to funds · every weight against its band",
      cols: ["Asset class", "Fund", "Vehicle", "Sleeve weight", "Model weight", "Fee", "Status"],
      rows: [
        ["US large cap", "Rosemont Core Equity", "SMA", "62%", "38.4%", "0.18%", "In band"],
        ["US small/mid", "Ashcroft SMID Index", "ETF", "18%", "11.2%", "0.06%", "In band"],
        ["International dev.", "Meridian Intl Equity", "Fund", "14%", "8.7%", "0.31%", "Drifted +2.6%"],
        ["Emerging markets", "Caldwell EM Index", "ETF", "6%", "3.7%", "0.11%", "In band"],
        ["Core fixed income", "Rosemont Muni Ladder", "SMA", "70%", "14.0%", "0.15%", "In band"],
        ["Credit", "Harborview IG Credit", "Fund", "20%", "4.0%", "0.29%", "In band"],
        ["Real assets", "Sable Real Asset Idx", "ETF", "10%", "2.0%", "0.24%", "Drifted −1.1%"],
        ["Alternatives", "Whitmore Diversified Alts", "LP", "—", "18.0%", "1.10%", "Quarterly gate"],
      ],
    },
  },

  "wealth.Performance": {
    grid: {
      title: "Composite — net of fees",
      meta: "GIPS-style, against the blended benchmark",
      cols: ["Year", "Gross", "Net", "Benchmark", "Excess", "Portfolios", "Assets"],
      rows: [
        ["2026 YTD", "+7.21%", "+6.84%", "+6.43%", "+41 bps", "1,204", "$8.4B"],
        ["2025", "+13.48%", "+12.79%", "+12.10%", "+69 bps", "1,141", "$7.6B"],
        ["2024", "+16.02%", "+15.31%", "+15.66%", "−35 bps", "1,086", "$6.8B"],
        ["2023", "+18.44%", "+17.70%", "+17.12%", "+58 bps", "1,012", "$5.9B"],
        ["2022", "−14.28%", "−14.81%", "−15.79%", "+98 bps", "968", "$4.7B"],
        ["2021", "+15.94%", "+15.22%", "+14.90%", "+32 bps", "902", "$5.2B"],
        ["3yr annualized", "+15.9%", "+15.2%", "+14.9%", "+31 bps", "—", "—"],
        ["5yr annualized", "+9.4%", "+8.8%", "+8.4%", "+38 bps", "—", "—"],
      ],
    },
  },

  "wealth.Committee": {
    grid: {
      title: "Investment committee — Jun 26 agenda",
      meta: "Papers circulated · impact modelled · votes logged to compliance",
      cols: ["Item", "Asset class", "Position", "Horizon", "Expected return", "Vote", "Decision"],
      rows: [
        ["Trim US large-cap overweight", "US equity", "−2.0%", "12 mo", "+6.8%", "6–1", "Approved"],
        ["Add EM small-cap sleeve", "Emerging markets", "+1.5%", "36 mo", "+9.4%", "4–3", "Approved"],
        ["Replace Meridian Intl Equity", "International", "swap", "—", "fee −9 bps", "7–0", "Approved"],
        ["Extend muni ladder to 12yr", "Fixed income", "duration +1.4", "—", "+4.3% TEY", "6–1", "Approved"],
        ["Private credit allocation", "Alternatives", "+2.0%", "60 mo", "+10.2%", "3–4", "Rejected — liquidity"],
        ["Hedge overlay on concentrated stock", "Risk", "collar", "12 mo", "—", "7–0", "Approved"],
        ["Raise cash band to 3%", "Cash", "+1.0%", "6 mo", "+3.9%", "2–5", "Rejected"],
        ["Sable Real Asset rebalance", "Real assets", "to target", "—", "—", "7–0", "Approved"],
      ],
    },
  },

  "wealth.Compliance": {
    grid: {
      title: "Compliance calendar — Q2",
      meta: "Every item with an owner, a due date and its evidence",
      cols: ["Item", "Category", "Owner", "Due", "Status", "Evidence"],
      rows: [
        ["Form ADV annual amendment", "Regulatory", "CCO", "Mar 31", "Filed", "IARD receipt"],
        ["Quarterly best-execution review", "Trading", "Ops", "Jun 30", "In progress", "Broker scorecards"],
        ["Code of ethics attestations", "Personnel", "CCO", "Jun 30", "38 of 41 in", "Attestation log"],
        ["Custody surprise exam", "Custody", "Auditor", "Jul 15", "Scheduled", "Engagement letter"],
        ["Fee billing audit — sample 40", "Billing", "Ops", "Jun 20", "Complete — 0 errors", "Recalc workpapers"],
        ["Marketing rule review", "Advertising", "CCO", "Rolling", "Current", "Review log"],
        ["Vendor due diligence — custodians", "Vendors", "COO", "Aug 31", "On track", "DDQ responses"],
        ["Business continuity test", "Operations", "COO", "Sep 12", "Scheduled", "Test plan"],
      ],
    },
  },
};

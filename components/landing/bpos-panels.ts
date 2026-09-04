/* The screens that are a product rather than a table.
 *
 * Asset Books is the operating statement out of the portfolio book: actual
 * against budget, line by line, with the debt and the occupancy beside it.
 * Underwriting is the workbench — assumptions, the five-year model, the
 * waterfall and the returns in one place, which is the whole point of it.
 * Comps and the load board are maps, because a market and a lane are places. */

import type { MapDot, MapLane } from "./BposMap";

/* ── real estate · Asset Books ─────────────────────────────────────────── */

export interface BookLine {
  label: string;
  actual: string;
  budget: string;
  variance: string;
  /** true when the variance is the wrong way */
  bad?: boolean;
  /** a subtotal rather than a line item */
  total?: boolean;
}

export const ASSET_BOOK = {
  property: "Cadence Station",
  address: "2150 W Frye Rd, Chandler, AZ 85224",
  chips: [
    ["Units", "252"],
    ["Built", "2020"],
    ["Occupancy", "95.9%"],
    ["Avg rent", "$2,226"],
    ["Basis", "T-12 · Jul 2025 — Jun 2026"],
  ] as [string, string][],
  lines: [
    { label: "Gross potential rent", actual: "$6,730,560", budget: "$6,681,120", variance: "+$49,440" },
    { label: "Loss to lease", actual: "($141,342)", budget: "($120,260)", variance: "($21,082)", bad: true },
    { label: "Vacancy", actual: "($275,953)", budget: "($267,245)", variance: "($8,708)", bad: true },
    { label: "Concessions and bad debt", actual: "($94,228)", budget: "($100,217)", variance: "+$5,989" },
    { label: "Other income", actual: "$267,453", budget: "$251,900", variance: "+$15,553" },
    { label: "Effective gross income", actual: "$6,486,490", budget: "$6,445,298", variance: "+$41,192", total: true },
    { label: "Payroll", actual: "($312,480)", budget: "($318,000)", variance: "+$5,520" },
    { label: "Repairs and maintenance", actual: "($284,116)", budget: "($262,400)", variance: "($21,716)", bad: true },
    { label: "Turnover", actual: "($148,932)", budget: "($151,200)", variance: "+$2,268" },
    { label: "Utilities", actual: "($196,404)", budget: "($192,600)", variance: "($3,804)", bad: true },
    { label: "Property taxes", actual: "($241,808)", budget: "($238,400)", variance: "($3,408)", bad: true },
    { label: "Insurance", actual: "($118,240)", budget: "($112,600)", variance: "($5,640)", bad: true },
    { label: "Management fee", actual: "($194,595)", budget: "($193,359)", variance: "($1,236)" },
    { label: "General and administrative", actual: "($109,803)", budget: "($108,400)", variance: "($1,403)" },
    { label: "Total operating expenses", actual: "($1,306,378)", budget: "($1,276,959)", variance: "($29,419)", bad: true, total: true },
    { label: "Net operating income", actual: "$5,180,112", budget: "$5,168,339", variance: "+$11,773", total: true },
  ] as BookLine[],
  debt: [
    ["Lender", "Fannie Mae · servicer Walker & Dunlop"],
    ["Balance", "$31,240,000 · 62.4% LTV"],
    ["Rate", "5.18% fixed · matures Aug 2031"],
    ["Debt service", "$2,041,608 · DSCR 2.54x"],
    ["Escrows", "$412,800 held · taxes and insurance"],
    ["Covenants", "All clear · tested Jun 30"],
  ] as [string, string][],
  trend: {
    label: "Occupancy and in-place rent, trailing 12",
    occ: [94.1, 94.4, 94.9, 95.2, 95.0, 95.4, 95.6, 95.3, 95.8, 96.1, 95.7, 95.9],
    rent: [2118, 2131, 2144, 2152, 2166, 2178, 2184, 2197, 2205, 2211, 2219, 2226],
  },
  note: "Rebuilt every night from the property-management financials and the rent roll. Any line opens to the general-ledger detail behind it.",
};

/* ── real estate · Underwriting workbench ──────────────────────────────── */

export const UW_BENCH = {
  deal: "Willow Bend · 168 units · Boise, ID",
  stage: "Going to committee Thursday, Jun 26",
  assumptions: [
    ["Purchase price", "$41,850,000 · $249,107/unit"],
    ["Year 1 NOI", "$3,184,000 · T-12 rolled forward"],
    ["Revenue growth", "3.0% · trend after year 2"],
    ["Expense growth", "3.0% · taxes reassessed at sale price"],
    ["Exit cap", "5.50% · held flat"],
    ["Hold", "5 years · sale month 60"],
    ["Senior debt", "5-yr · 5Y UST 4.54% + 155 bps"],
    ["Proceeds", "$27,202,500 · 65.0% LTV"],
    ["Preferred return", "8.0% · compounding"],
    ["Acquisition fee", "$300,000 · lesser of 2.0% and $300k"],
  ] as [string, string][],
  model: {
    cols: ["", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"],
    rows: [
      ["Effective gross income", "$4,412,000", "$4,588,000", "$4,725,000", "$4,867,000", "$5,013,000"],
      ["Operating expenses", "($1,228,000)", "($1,265,000)", "($1,303,000)", "($1,342,000)", "($1,382,000)"],
      ["Net operating income", "$3,184,000", "$3,323,000", "$3,422,000", "$3,525,000", "$3,631,000"],
      ["Debt service", "($1,824,000)", "($1,824,000)", "($1,824,000)", "($1,824,000)", "($1,824,000)"],
      ["Capital reserves", "($42,000)", "($43,300)", "($44,600)", "($45,900)", "($47,300)"],
      ["Cash flow after debt", "$1,318,000", "$1,455,700", "$1,553,400", "$1,655,100", "$1,759,700"],
      ["Cash-on-cash", "4.51%", "4.98%", "5.31%", "5.66%", "6.02%"],
    ],
  },
  waterfall: [
    { tier: "Return of capital", lp: "$29,220,000", gp: "$1,538,000", note: "contributed capital, LP first" },
    { tier: "Preferred return · 8.0%", lp: "$13,842,000", gp: "$728,500", note: "accrued and compounding" },
    { tier: "Catch-up", lp: "$0", gp: "$3,642,600", note: "GP to 20% of profit" },
    { tier: "Residual · 70 / 30", lp: "$11,408,400", gp: "$4,889,300", note: "above the pref and catch-up" },
    { tier: "Total distributions", lp: "$54,470,400", gp: "$10,798,400", note: "over the five-year hold", total: true },
  ] as { tier: string; lp: string; gp: string; note: string; total?: boolean }[],
  returns: [
    ["LP IRR", "13.52%", "net of fees and promote"],
    ["Equity multiple", "2.31x", "5-year hold"],
    ["Avg cash-on-cash", "5.30%", "policy minimum 4.5%"],
    ["GP IRR", "22.84%", "including the promote"],
  ] as [string, string, string][],
  sensitivity: {
    title: "LP IRR · exit cap against hold",
    cols: ["5.00%", "5.25%", "5.50%", "5.75%", "6.00%"],
    rows: [
      ["3 yr", ["16.8%", "15.1%", "13.4%", "11.8%", "10.2%"]],
      ["4 yr", ["16.2%", "14.8%", "13.4%", "12.1%", "10.8%"]],
      ["5 yr", ["15.9%", "14.7%", "13.5%", "12.4%", "11.3%"]],
      ["6 yr", ["15.5%", "14.5%", "13.5%", "12.6%", "11.7%"]],
      ["7 yr", ["15.2%", "14.3%", "13.5%", "12.7%", "11.9%"]],
    ] as [string, string[]][],
    /** the base case, highlighted */
    at: [2, 2] as [number, number],
  },
  note: "The index is the live 5-year Treasury. Change a single assumption and the model, the waterfall, the returns and the grid above all move together.",
};

/* ── real estate · Comps map ───────────────────────────────────────────── */

export const COMP_DOTS: MapDot[] = [
  { name: "Phoenix, AZ", lat: 33.45, lng: -112.07, n: 84, meta: "84 sale comps · 312 rent comps · refreshed today" },
  { name: "Chandler, AZ", lat: 33.31, lng: -111.84, n: 41, meta: "41 sale comps · 168 rent comps · refreshed today" },
  { name: "Tucson, AZ", lat: 32.22, lng: -110.97, n: 28, meta: "28 sale comps · 104 rent comps · refreshed today" },
  { name: "Sacramento, CA", lat: 38.58, lng: -121.49, n: 52, meta: "52 sale comps · 214 rent comps · refreshed today" },
  { name: "San Diego, CA", lat: 32.72, lng: -117.16, n: 61, meta: "61 sale comps · 268 rent comps · refreshed today" },
  { name: "Irvine, CA", lat: 33.68, lng: -117.83, n: 44, meta: "44 sale comps · 190 rent comps · refreshed today" },
  { name: "Modesto, CA", lat: 37.64, lng: -120.99, n: 22, meta: "22 sale comps · 88 rent comps · refreshed today" },
  { name: "Fresno, CA", lat: 36.74, lng: -119.78, n: 26, meta: "26 sale comps · 96 rent comps · refreshed today" },
  { name: "Denver, CO", lat: 39.74, lng: -104.99, n: 71, meta: "71 sale comps · 284 rent comps · refreshed today" },
  { name: "Colorado Springs, CO", lat: 38.83, lng: -104.82, n: 33, meta: "33 sale comps · 128 rent comps · refreshed today" },
  { name: "Fort Collins, CO", lat: 40.59, lng: -105.08, n: 18, meta: "18 sale comps · 74 rent comps · refreshed today" },
  { name: "Boise, ID", lat: 43.62, lng: -116.2, n: 9, meta: "9 sale comps · 46 rent comps · set too thin to score", flag: true },
  { name: "Idaho Falls, ID", lat: 43.49, lng: -112.03, n: 11, meta: "11 sale comps · 38 rent comps · refreshed today" },
  { name: "Las Vegas, NV", lat: 36.17, lng: -115.14, n: 58, meta: "58 sale comps · 232 rent comps · refreshed today" },
  { name: "Reno, NV", lat: 39.53, lng: -119.81, n: 24, meta: "24 sale comps · 92 rent comps · refreshed today" },
  { name: "Portland, OR", lat: 45.52, lng: -122.68, n: 47, meta: "47 sale comps · 196 rent comps · refreshed today" },
  { name: "Bend, OR", lat: 44.06, lng: -121.31, n: 14, meta: "14 sale comps · 58 rent comps · refreshed today" },
  { name: "Salem, OR", lat: 44.94, lng: -123.04, n: 16, meta: "16 sale comps · 64 rent comps · refreshed today" },
  { name: "Seattle, WA", lat: 47.61, lng: -122.33, n: 66, meta: "66 sale comps · 274 rent comps · refreshed today" },
  { name: "Tacoma, WA", lat: 47.25, lng: -122.44, n: 31, meta: "31 sale comps · 122 rent comps · refreshed today" },
  { name: "Spokane, WA", lat: 47.66, lng: -117.43, n: 21, meta: "21 sale comps · 84 rent comps · refreshed today" },
  { name: "Salt Lake City, UT", lat: 40.76, lng: -111.89, n: 49, meta: "49 sale comps · 204 rent comps · new closing recorded", flag: true },
  { name: "Provo, UT", lat: 40.23, lng: -111.66, n: 19, meta: "19 sale comps · 78 rent comps · refreshed today" },
  { name: "Ogden, UT", lat: 41.22, lng: -111.97, n: 17, meta: "17 sale comps · 68 rent comps · refreshed today" },
  { name: "Dallas, TX", lat: 32.78, lng: -96.8, n: 92, meta: "92 sale comps · 356 rent comps · cap rate outside range", flag: true },
  { name: "Austin, TX", lat: 30.27, lng: -97.74, n: 63, meta: "63 sale comps · 248 rent comps · refreshed today" },
  { name: "San Antonio, TX", lat: 29.42, lng: -98.49, n: 45, meta: "45 sale comps · 182 rent comps · refreshed today" },
  { name: "Houston, TX", lat: 29.76, lng: -95.37, n: 74, meta: "74 sale comps · 294 rent comps · refreshed today" },
  { name: "Nashville, TN", lat: 36.16, lng: -86.78, n: 38, meta: "38 sale comps · 152 rent comps · refreshed today" },
];

/* ── logistics · Load board map ────────────────────────────────────────── */

export const LOAD_LANES: MapLane[] = [
  { id: "RJS-408122", from: [34.73, -86.59, "Huntsville, AL"], to: [32.51, -92.12, "Monroe, LA"], meta: "Bellmont Trucking · Van · 412 mi · $1,184 · 18.9% · Delivered" },
  { id: "RJS-408140", from: [27.51, -99.51, "Laredo, TX"], to: [35.15, -90.05, "Memphis, TN"], meta: "Cordova Freight · Reefer · 918 mi · $2,742 · 12.1% · In transit" },
  { id: "RJS-408155", from: [41.53, -88.08, "Joliet, IL"], to: [39.96, -82.99, "Columbus, OH"], meta: "Northway Carriers · Van · 342 mi · $886 · 18.7% · In transit" },
  { id: "RJS-408161", from: [34.09, -117.44, "Fontana, CA"], to: [33.45, -112.07, "Phoenix, AZ"], meta: "Sierra Line Haul · Van · 358 mi · $942 · 11.0% · Detention", flag: true },
  { id: "RJS-408177", from: [32.08, -81.09, "Savannah, GA"], to: [35.23, -80.84, "Charlotte, NC"], meta: "Ashcroft Logistics · Flatbed · 266 mi · $1,020 · 15.7% · At shipper" },
  { id: "RJS-408190", from: [39.1, -94.58, "Kansas City, MO"], to: [39.74, -104.99, "Denver, CO"], meta: "Bellmont Trucking · Van · 604 mi · $1,588 · 11.1% · Rate variance", flag: true },
  { id: "RJS-408204", from: [36.74, -119.78, "Fresno, CA"], to: [40.76, -111.89, "Salt Lake City, UT"], meta: "Cordova Freight · Reefer · 742 mi · $2,264 · 15.6% · In transit" },
  { id: "RJS-408218", from: [40.6, -75.48, "Allentown, PA"], to: [42.36, -71.06, "Boston, MA"], meta: "Northway Carriers · Van · 312 mi · $1,104 · 9.6% · Margin flag", flag: true },
];

export const LOAD_HUBS: MapDot[] = [
  { name: "Dallas, TX", lat: 32.78, lng: -96.8, n: 184, meta: "184 loads in flight · 62 carriers · 4 lanes over plan" },
  { name: "Atlanta, GA", lat: 33.75, lng: -84.39, n: 146, meta: "146 loads in flight · 51 carriers · on plan" },
  { name: "Chicago, IL", lat: 41.88, lng: -87.63, n: 138, meta: "138 loads in flight · 44 carriers · on plan" },
  { name: "Los Angeles, CA", lat: 34.05, lng: -118.24, n: 121, meta: "121 loads in flight · 39 carriers · capacity tight" },
  { name: "Memphis, TN", lat: 35.15, lng: -90.05, n: 98, meta: "98 loads in flight · 33 carriers · on plan" },
  { name: "Laredo, TX", lat: 27.51, lng: -99.51, n: 84, meta: "84 loads in flight · 27 carriers · cross-border" },
  { name: "Harrisburg, PA", lat: 40.27, lng: -76.88, n: 76, meta: "76 loads in flight · 29 carriers · on plan" },
  { name: "Salt Lake City, UT", lat: 40.76, lng: -111.89, n: 61, meta: "61 loads in flight · 22 carriers · on plan" },
  { name: "Denver, CO", lat: 39.74, lng: -104.99, n: 54, meta: "54 loads in flight · 19 carriers · reload thin" },
  { name: "Savannah, GA", lat: 32.08, lng: -81.09, n: 49, meta: "49 loads in flight · 18 carriers · port drayage" },
  { name: "Huntsville, AL", lat: 34.73, lng: -86.59, n: 42, meta: "42 loads in flight · 14 carriers · deadhead watch" },
  { name: "Portland, OR", lat: 45.52, lng: -122.68, n: 24, meta: "24 loads in flight · 11 carriers · on plan" },
];

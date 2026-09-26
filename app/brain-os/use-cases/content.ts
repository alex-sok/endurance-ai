import { CALENDLY_URL } from "@/lib/conversation-flows";

// Copy and figures for /brain-os/use-cases.
//
// CLAIMS DISCIPLINE. The reference deployment is a freight brokerage and its
// asset carrier, and it is never named, here or in the public repo. No
// employee names, no commission, margin, payroll or revenue figures, no
// security history, no hosts or identifiers. Every figure below names the
// window it was counted in. Sources: the deployment's usage database and
// session logs (weeks to 18, 24 and 25 September 2026) and its knowledge base
// (counted 22 September 2026). The truckload planning timing is customer
// reported and already on the homepage.

export const USE_CASES_META = {
  title: "Brain OS use cases and impact — Endurance AI Labs",
  description:
    "See how one freight operation uses Brain OS: the questions people ask, the actions they approve, and the usage recorded since June 2026.",
  canonical: "https://endurancelabs.ai/brain-os/use-cases",
};

export const HERO = {
  eyebrow: "BRAIN OS / USE CASES AND IMPACT",
  h1: ["The work it takes.", "The time it gives back."],
  lede: "At one freight operation, people use Brain OS to find a load, prepare an order, or check an invoice. Here is what they asked, what the system did, and what the records show. The deployment has been in production since June 2026.",
  primary: { label: "Tell us about your work", href: CALENDLY_URL },
  secondary: { label: "How it is built", href: "/brain-os/technical" },
};

export type Tile = { value: string; unit?: string; before?: string; label: string; source: string; blue?: boolean };

export const HEADLINE: Tile[] = [
  { before: "2 hrs", value: "30", unit: "sec", label: "To plan a truckload from a packing list", source: "Customer reported, for this workflow.", blue: true },
  { value: "33", label: "People who asked Brain OS something in one week", source: "Week to 18 September 2026." },
  { value: "375", label: "Changes written to the system of record in one week, each a draft first", source: "Monday 21 September to 11:09 Eastern on Friday 25 September 2026, from session logs." },
  { value: "153", label: "Operating rules taught in chat and kept", source: "Since 24 July 2026, counted 21 September." },
];

export type BeforeAfter = {
  ask: string;
  who: string;
  before: string;
  beforeMeta: string[];
  beforeSteps: string[];
  after: string;
  afterMeta: string[];
  afterSteps: string[];
  ratio?: { before: string; after: string; value: number };
  receipt: { figure: string; label: string };
};

export const BEFORE_AFTER = {
  kicker: "01 · BEFORE AND AFTER",
  title: ["The same ask.", "A different day."],
  lede: "Six familiar requests, with the steps they used to involve and how Brain OS handles them. The figures come from one operation in September 2026.",
  rows: [
    {
      ask: "“Where is my load?”",
      beforeSteps: ["Open the system of record", "Find the order", "Read the last driver text", "Search the inbox", "Call someone"],
      afterSteps: ["Ask"],
      who: "Dispatch, all day",
      before: "Open the system of record. Find the order. Check the last driver text. Search the inbox for the carrier’s email. Call someone if none of it agrees.",
      beforeMeta: ["Several systems", "A few people", "Minutes, if nothing is wrong"],
      after: "Brain OS brings the order, stops, estimated arrival, latest driver text, and latest email into one answer. Each fact names its source, so the dispatcher can check how the records fit together.",
      afterMeta: ["Read live at the moment of the question", "Sources attached"],
      receipt: { figure: "522", label: "distinct orders read in one week, week to 18 September" },
    },
    {
      ask: "“How many trucks does this shipment need?”",
      beforeSteps: ["Print the packing list", "Measure every piece", "Check legal limits", "Check deck heights", "Assign to trailers"],
      afterSteps: ["Paste the list"],
      ratio: { before: "Two hours by hand", after: "Thirty seconds with Brain OS", value: 30 / 7200 },
      who: "Open deck planners",
      before: "Print the packing list. Work every piece against legal length, width, height and weight, and against deck heights by trailer type, by hand.",
      beforeMeta: ["About two hours", "One person who knows the rules"],
      after: "Paste the packing list to get a plan by trailer type, with oversize and overweight items flagged. The system follows rules captured from the planner’s messages; this customer reported a planning time of thirty seconds.",
      afterMeta: ["Flatbed, stepdeck, double drop, lowboy"],
      receipt: { figure: "2 hrs to 30 sec", label: "customer reported. Nobody specified this feature; planners started pasting packing lists." },
    },
    {
      ask: "“Build this load.”",
      beforeSteps: ["Open the load sheet", "Retype each field", "Look up the customer’s rules", "Check for misses"],
      afterSteps: ["Paste the sheet", "Say yes"],
      who: "Dispatch, from a load sheet",
      before: "Retype the load sheet into the system of record, field by field. Look up the customer’s rules in a spreadsheet or a memory. Hope nothing was missed.",
      beforeMeta: ["One order at a time", "Rules in someone’s head"],
      after: "Paste the load sheet to prepare a draft from the last order on that lane. Brain OS applies the customer’s rules and flags discrepancies for review before the dispatcher confirms creation.",
      afterMeta: ["Draft first, then confirm", "Standing defaults per lane"],
      receipt: { figure: "94", label: "orders created in one week, 21 to 25 September, by five people" },
    },
    {
      ask: "“Who should I call for this lane?”",
      beforeSteps: ["Ask the room", "Search old emails", "Scroll the carrier list", "Start dialling"],
      afterSteps: ["Ask"],
      who: "Carrier sales",
      before: "Ask the room. Search old emails for the last carrier who ran it. Scroll the carrier list and start dialling.",
      beforeMeta: ["Memory and luck", "The newest person knows nobody"],
      after: "Nearly ten years of lane history becomes a ranked carrier list, with the last run, equipment, and a contact for each. The broker has enough context to choose whom to call.",
      afterMeta: ["Identity screened from an email address", "Backhaul matching across books"],
      receipt: { figure: "Nearly ten years", label: "of lane history behind every carrier answer, read live" },
    },
    {
      ask: "“Post it to the load board.”",
      beforeSteps: ["Open the board", "Retype the stops", "Type the rate and truck", "Update when it moves", "Take it down"],
      afterSteps: ["Say post", "Say yes"],
      who: "Brokers",
      before: "Open the board. Retype the stops, the rate and the truck type. Remember to update it when the rate moves and take it down when it covers.",
      beforeMeta: ["Retyped from the order", "Stale postings linger"],
      after: "Preview, then post, under the broker’s own load board login. Updated or taken down in a sentence. Shipper contact details stripped by default.",
      afterMeta: ["Certified by the load board for production", "Per person, never a shared account"],
      receipt: { figure: "192", label: "postings made in one week, 21 to 25 September" },
    },
    {
      ask: "“What is delivered but not billed?”",
      beforeSteps: ["Export delivered loads", "Filter for no bill date", "Chase paperwork by hand"],
      afterSteps: ["Read the digest"],
      who: "Billing, every morning",
      before: "A report someone assembles by hand, when there is time. Missing paperwork found when the customer asks why the invoice is late.",
      beforeMeta: ["Built by hand", "Found too late"],
      after: "A digest every morning without anyone asking: delivered loads with no bill date, delivered loads missing proof of delivery, and the carrier to chase for each.",
      afterMeta: ["Runs on a schedule", "Money questions behind access tiers"],
      receipt: { figure: "About forty", label: "scheduled jobs run this way, verified on the server 21 August" },
    },
  ] as BeforeAfter[],
};

export const ADOPTION = {
  kicker: "02 · ADOPTION",
  title: ["More people.", "More questions."],
  lede: "Brain OS opened to the whole company on 12 August 2026, with access tiers in place. Nobody was told to use it. This is what happened next.",
  people: {
    title: "People who asked Brain OS something, each week",
    note: "One operation, from the week the whole company was admitted. The last bar is the seven days to 24 September.",
    points: [
      { label: "21 Aug", value: 12 },
      { label: "28 Aug", value: 14 },
      { label: "4 Sep", value: 24 },
      { label: "11 Sep", value: 31 },
      { label: "18 Sep", value: 33 },
      { label: "24 Sep", value: 35 },
    ],
    source: "The operation’s usage database. Weeks end on the date shown; the last window is the seven days to 24 September 2026.",
  },
  weekdays: {
    title: "Questions per weekday, two weeks side by side",
    note: "Monday 14 to Friday 18 September, then Monday 21 to Friday 25 September 2026. Friday of the second week covers the morning only, to 11:09 Eastern.",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    lastWeek: [48, 113, 180, 259, 188],
    thisWeek: [198, 225, 209, 335, 28],
    source: "Messages sent to Brain OS in Teams, credited to the sender, Endurance’s own messages excluded. From the operation’s usage database, 25 September 2026.",
  },
  ranked: {
    title: "Questions per person, ranked, Monday 21 to Friday 25 September 2026",
    note: "Nineteen people sent 96% of the week’s questions. Names withheld. Ten more people asked between one and eight questions each, 36 in all.",
    points: [254, 101, 88, 87, 59, 47, 47, 42, 39, 31, 30, 26, 21, 20, 17, 17, 13, 10, 10].map((value, i) => ({ label: `${i + 1}`, value })),
    source: "The operation’s usage database, 25 September 2026, 11:09 Eastern.",
  },
  proof: [
    { value: "437 → 791 → 1,200", label: "questions in the weeks to 11, 18 and 24 September" },
    { value: "26%", label: "of questions from the heaviest user in the week of 21 September, down from 69% in August. Concentration moves week to week." },
    { value: "335", label: "questions on Thursday 24 September, the busiest day on record" },
  ],
};

export const TOPICS = {
  kicker: "03 · WHAT THEY ASK",
  title: ["Where the", "questions go."],
  lede: "Of 995 questions in the recorded week, nearly half concerned building orders or posting loads. The rest ranged from paperwork and billing to driver updates and carrier outreach.",
  chart: {
    title: "What 995 questions asked for, Monday 21 to Friday 25 September 2026",
    note: "Share of the week’s questions by topic, classified by keyword rules, accurate to a few points.",
    rows: [
      { label: "Building and editing orders", value: 24, sub: "17 people" },
      { label: "Posting loads to the load board", value: 23, sub: "7 people" },
      { label: "Paperwork: proof of delivery, bills of lading, chassis numbers", value: 9, sub: "13 people" },
      { label: "Margin, revenue and book performance", value: 8, sub: "6 people, behind access tiers" },
      { label: "Email, inbox and carrier outreach", value: 7, sub: "14 people" },
      { label: "Load status, check calls and drivers", value: 6, sub: "11 people" },
      { label: "Packing lists and trailer planning", value: 6, sub: "5 people" },
      { label: "Rates, quotes, lane history and prospecting", value: 4, sub: "11 people" },
      { label: "Questions about Brain OS itself", value: 4, sub: "5 people" },
      { label: "Looking up a customer, carrier or agent", value: 4, sub: "9 people" },
      { label: "Billing, receivables and customer credit", value: 2, sub: "5 people" },
      { label: "Other, greetings and thanks", value: 3, sub: "12 people" },
    ],
    source: "The operation’s usage database, 25 September 2026, 11:09 Eastern. Percent of 995 questions.",
  },
  callout: "Truckload planning began with planners pasting packing lists into chat. Their explanations became a page of rules for Brain OS to follow. In the week of 21 September, that work accounted for 6% of questions from five people. A useful capability took shape as the people doing the work taught the system what mattered.",
};

export const ACTIONS = {
  kicker: "04 · WHAT IT DID",
  title: ["One week of work,", "counted."],
  lede: "Actions completed at people’s request in one week. Every one was a draft first and a yes second. Scheduled jobs are excluded, so this is only what people asked for.",
  chart: {
    title: "Actions completed at people’s request, Monday 21 to Friday 25 September 2026",
    note: "Counted from session logs, one per successful action, credited to the person whose question triggered it. The window closes at 11:09 Eastern on the Friday.",
    rows: [
      { group: "System of record, 375 changes for 9 people", label: "Stop comments added", value: 116 },
      { group: "System of record, 375 changes for 9 people", label: "Orders created", value: 94, sub: "9 later voided through Brain OS" },
      { group: "System of record, 375 changes for 9 people", label: "Order fields edited", value: 70 },
      { group: "System of record, 375 changes for 9 people", label: "Stops cleared as arrived and departed", value: 32 },
      { group: "System of record, 375 changes for 9 people", label: "Stops rescheduled", value: 30 },
      { group: "System of record, 375 changes for 9 people", label: "Rates changed", value: 15 },
      { group: "System of record, 375 changes for 9 people", label: "Orders voided", value: 13 },
      { group: "System of record, 375 changes for 9 people", label: "Driver texts sent", value: 4 },
      { group: "System of record, 375 changes for 9 people", label: "Driver details updated", value: 1 },
      { group: "Load board", label: "Postings made", value: 192 },
      { group: "Load board", label: "Postings taken down", value: 91 },
      { group: "Load board", label: "Postings updated", value: 23 },
      { group: "Mail", label: "Emails sent on someone’s behalf", value: 51 },
    ],
    source: "The operation’s session logs, 25 September 2026. The previous week, same span, had 25 changes in the system of record.",
  },
  proof: [
    { value: "15×", label: "the previous week’s pace of changes in the system of record, 25 to 375" },
    { value: "0", label: "changes made without a draft shown first to the person who asked" },
  ],
};

export const ROLES = {
  kicker: "05 · BY ROLE",
  title: ["What each desk asks,", "in its own words."],
  lede: "These examples come from a production deployment; steps still awaiting verification are identified. For a configured user, “my loads” refers to their own book, and financial questions follow their access tier. Choose a role to see the work in context.",
  caption: "AN OPERATION IN PRODUCTION SINCE JUNE 2026",
};

export type Exchange = { they: string; does: string };
export type Role = { id: string; name: string; sub: string; exchanges: Exchange[] };

export const ROLE_TABS: Role[] = [
  {
    id: "dispatch",
    name: "Dispatch",
    sub: "Loads in motion",
    exchanges: [
      { they: "“Status on this load?”", does: "Order and movement status, stops and estimated arrival times, merged from the system of record, driver texts and email into one record." },
      { they: "“Are any of my loads running late?”", does: "A late sweep scoped to the asker’s book. Loads cancelled with a truck ordered not used fee are excluded, so it does not false alarm." },
      { they: "“Text the driver on this load. Pickup status?”", does: "Drafts a real text message, sends on a yes, and reads the reply back within about two minutes." },
      { they: "“Clear the pickup, in at 13, out at 15.”", does: "Drafts the stop update with the exact times and writes it to the system of record on confirm." },
      { they: "(pastes a load sheet) “Build this load.”", does: "A full order draft, cloned from the last order on that lane with the changes swapped in, customer rules applied and discrepancies flagged before anything is created." },
    ],
  },
  {
    id: "carrier",
    name: "Carrier sales",
    sub: "Covering freight",
    exchanges: [
      { they: "“Who’s run Warren, OH to Withee, WI?”", does: "Carriers ranked by runs on the lane, with last run, equipment and contact. A call list, not a search result." },
      { they: "“Find me a backhaul near Cleveland Thursday, flatbed.”", does: "Cross book reload matching, equipment matched, with cancelled and on hold loads excluded." },
      { they: "“Is this carrier’s email legit?”", does: "Identity screening: legal name, carrier numbers, dispatcher name and phone, blocked and lookalike flags." },
      { they: "“Cover it with X at $1,850.”", does: "Drafts the carrier and buy rate, refusing a buy above the sell and showing the margin in the draft. The write step was repaired on 24 September 2026 and had not been proven on a live load when this page was written." },
      { they: "“Post this to the load board.”", does: "Previews, then posts from an existing order or from two cities, a rate and a truck type, under the broker’s own login." },
    ],
  },
  {
    id: "billing",
    name: "Back office",
    sub: "Billing and paperwork",
    exchanges: [
      { they: "Unbilled loads, every morning", does: "A digest of delivered, ready to bill loads with no bill date. Nobody asks; it arrives." },
      { they: "Missing paperwork, every morning", does: "Delivered loads more than three days old with no proof of delivery, and the carrier to chase for each." },
      { they: "“Does this carrier invoice match what we agreed?”", does: "Compares the invoice with the agreed pay on the load and quotes the source line. A biller can check it without opening anything." },
      { they: "“Ask the carrier for the POD on this load.”", does: "Drafts the request from Brain OS’s own mailbox, shows it first, sends on a yes, and files the reply against the load." },
    ],
  },
  {
    id: "leadership",
    name: "Leadership",
    sub: "The numbers, with sources",
    exchanges: [
      { they: "“How many bills did each biller invoice last week?”", does: "Answered live from the system of record, per person, with the query it ran. Finance questions have been answered this way since 16 September." },
      { they: "Monday, daily and monthly digests", does: "Quiet customers, dormant lanes, hot areas, margin by agent. Anything touching money goes only to leadership and billing channels." },
      { they: "“Which customers have we not worked with in three months?”", does: "The list, from the system of record, with last load and last contact. Asked for the first time in the week of 21 September." },
      { they: "“Who is using Brain OS, and for what?”", does: "The Friday usage report: questions, people, actions, and what fell short, counted from the audit log." },
    ],
  },
  {
    id: "teach",
    name: "Teaching it",
    sub: "Corrections that stick",
    exchanges: [
      { they: "“That customer’s confirmation number is the BOL.”", does: "The rule is saved to the brain in the same reply and applies to everyone from the next question. 153 rules have been kept this way since 24 July." },
      { they: "“For this lane, pickup is 7 to 4 and delivery is 23:59.”", does: "Standing defaults per lane, so the next build starts from the right answer." },
      { they: "“Can you keep a running chassis list per work order?”", does: "Requests it cannot meet are logged verbatim to a requests inbox. This one was logged on 19 September. It was built on 20 September." },
      { they: "“Why is this wrong?”", does: "About 4 in every 100 questions in the week of 21 September were corrections. Wrong captures are visible, and a person removes them." },
    ],
  },
];

export const CALC = {
  kicker: "06 · TIME RETURNED, PRICED",
  title: ["Your numbers.", "Our arithmetic."],
  lede: "A model, not a promise. The defaults come from one operation’s own usage in September 2026. The minutes per question and the hourly cost are assumptions, and every input is yours to change.",
  foot: "Published pricing covers the brain: questions and answers, with sources attached. Writes into a system of record, a registered text number, load board posting and specialist desks are scoped and quoted for each operation.",
};

export const REVENUE = {
  kicker: "07 · WHERE REVENUE ENTERS",
  title: ["From a quote", "to a customer served."],
  lede: "We have not measured revenue attributable to Brain OS. What we can show is how it supports the work around a sale: pricing a lane, finding a carrier, and keeping a customer informed.",
  flow: [
    { n: "QUOTE", title: "Price from history", body: "Seasonality, who hauls it, backhaul potential. Nearly ten years of lane history in the time it takes to ask.", ask: "“What does this lane usually do?”" },
    { n: "COVER", title: "Call the right carrier", body: "A ranked call list for the lane. Identity for the carrier on the phone. A buy above the sell refused in the draft.", ask: "“Who is this MC number?”" },
    { n: "MOVE", title: "Fill the empty leg", body: "Cross book reload matching, equipment matched, cancelled and on hold loads excluded.", ask: "“Find me a backhaul near Cleveland Thursday, flatbed.”" },
    { n: "POST", title: "Put freight on the board", body: "A posting in a sentence, under the broker’s own login. 192 in the week of 21 September.", ask: "“Post it at $2,400.”" },
    { n: "PROSPECT", title: "Find the next shipper", body: "Shippers in a city, cross checked against the customer list. Customers gone quiet for three months. New in the week of 21 September, unprompted.", ask: "“Which shippers in Charlotte are not already ours?”" },
    { n: "SERVE", title: "Show the customer", body: "A public tracking link for one load, no login, instead of a promise to call back.", ask: "“Give me an update for the customer.”" },
  ],
  aside: {
    kicker: "A SEPARATE PRODUCT, A MEASURED RESULT",
    title: "The dollars we can show are in Margins.",
    body: "Margins calculates commissions from defined rules at the same operation. Its production ledger records the amounts below. These are Margins results and should be assessed separately from Brain OS.",
    rows: [
      { label: "Commission settled through Margins", sub: "20 closed weekly runs, 29 March to 16 August 2026", figure: "$4,015,094" },
      { label: "Duplicate payments stopped", sub: "about, across 20 loads that would have paid twice, caught before payday", figure: "$5,491" },
      { label: "A misrouted book, caught", sub: "about, before a dollar moved, back to the person who earned it", figure: "$39,400" },
    ],
    link: { label: "Read the Margins ledger", href: "/margins/proof" },
    source: "Queried from the operation’s production system on 24 August 2026.",
  },
};

export const FIT = {
  kicker: "08 · WHO IT IS FOR",
  title: ["A system of record.", "And a few people’s heads."],
  lede: "Closest fit: freight brokerages, third party logistics firms and asset carriers of 25 to 140 people, working in Microsoft Teams. Next: any operation where the answers live in a system of record and the rules live in inboxes and spreadsheets.",
  buyers: [
    { who: "The owner or president", why: "A way to handle more work with the team already in place." },
    { who: "The head of operations", why: "Fewer chases, faster answers, and a team that stops asking “where is it?”" },
    { who: "The finance lead", why: "Figures that can be checked against their sources, with access controls around financial information." },
    { who: "A senior operator", why: "The champion who uses it on live work every day and says bluntly what is wrong. Their corrections are the fastest way the brain grows." },
  ],
  triggers: [
    "Growth without hiring.",
    "A key person whose knowledge is not written down.",
    "Weekly reports someone builds by hand.",
    "A team drowning in “where is it?”",
    "A security review that stalled an earlier AI attempt.",
  ],
  notFor: [
    "Your knowledge already lives in one system everyone trusts. Brain OS solves a problem you do not have.",
    "Important knowledge has not been recorded. It needs to be captured before Brain OS can use it.",
    "Your system of record has no interface we can connect. Knowledge-based answers may still be possible, but actions need an integration.",
  ],
};

export const ROLLOUT = {
  kicker: "09 · THE ROLLOUT",
  title: ["One deployment.", "Nine weeks to company access."],
  lede: "The reference deployment began with read access in June 2026 and opened to the company in August. Actions were enabled one at a time, each with its own control. This is the record of that rollout.",
  timeline: [
    { iso: "2026-06-09", date: "9 June", short: "First version, read only", what: "First version: the Teams bot, live reads from the system of record, and the knowledge base." },
    { iso: "2026-07-15", dateTime: "2026-07", date: "July", short: "One dispatcher, daily, on live freight", what: "Daily use by one senior dispatcher on live freight, who became the product owner." },
    { iso: "2026-07-24", date: "24 July", short: "Rules taught in chat", what: "Rules taught in chat start saving themselves to the brain." },
    { iso: "2026-07-30", date: "30 July", short: "First orders built", what: "First orders built in the system of record from a conversation." },
    { iso: "2026-08-05", date: "5 August", short: "Drivers text paperwork", what: "Drivers text photos of signed paperwork to Brain OS’s number; they land in the inbox." },
    { iso: "2026-08-12", date: "12 August", short: "Opened to the company", what: "Opened to everyone with a company mailbox, access tiers unchanged." },
    { iso: "2026-08-13", date: "13 August", short: "Driver texting live", what: "Outbound driver texting on Brain OS’s own registered number." },
    { iso: "2026-08-18", date: "18 August", short: "Load board and tracking screens", what: "Load board screen, per load operations screen, and public customer tracking." },
    { iso: "2026-09-09", date: "9 September", short: "Load board posting certified", what: "Load board posting live on production, after the load board certified it." },
    { iso: "2026-09-16", date: "16 September", short: "Finance questions live", what: "Finance questions answered live from the system of record." },
    { iso: "2026-09-18", date: "18 September", short: "33 people in one week", what: "33 people in one week." },
    { iso: "2026-09-21", date: "21 September", short: "Specialist desks and tests", what: "Specialist desks, with an automated test suite." },
  ],
  months: [
    { iso: "2026-06-01", name: "June" },
    { iso: "2026-07-01", name: "July" },
    { iso: "2026-08-01", name: "August" },
    { iso: "2026-09-01", name: "September" },
  ],
  span: { start: "2026-06-01", end: "2026-09-30" },
  steps: [
    { title: "Connect", body: "Register the bot in your Microsoft tenant, connect the system of record, and give Brain OS its mailbox. Read only first." },
    { title: "Compile", body: "Ingest what the business already produces. Give every user a page with their book, their tier and their role." },
    { title: "Pilot with a champion", body: "One operator who uses it on live work every day and says what is wrong." },
    { title: "Open the company", body: "Admit the whole domain with tiers in place. Here it went from 12 to 31 weekly users in four weeks." },
    { title: "Turn on actions one at a time", body: "Each write runs in shadow first, reporting what it would have done. Then it is armed with its own switch, under the pause." },
  ],
};

export const CLOSE = {
  kicker: "NEXT",
  title: ["One workflow.", "Your systems.", "Your people in control."],
  body: "Bring one workflow and the people who know it. We’ll look at the systems involved, the decisions that take time, and a useful first step.",
  primary: { label: "Tell us about your work", href: CALENDLY_URL },
  links: [
    { label: "How it is built", href: "/brain-os/technical" },
    { label: "Pricing", href: "/brain/pricing" },
    { label: "Open the console", href: "/brain-os" },
  ],
  colophon:
    "Figures on this page come from one operation’s usage database and session logs in the weeks to 18, 24 and 25 September 2026. Its knowledge base was counted on 22 September 2026. The truckload planning timing is customer reported. The operation is not named here at their request. Read the figures as one deployment’s record, not as a forecast for yours.",
};

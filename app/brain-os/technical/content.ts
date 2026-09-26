import { CALENDLY_URL } from "@/lib/conversation-flows";

// Copy and figures for /brain-os/technical.
//
// CLAIMS DISCIPLINE. Same rules as the use-cases page: the reference
// deployment is never named, no employee names, no money figures, no hosts,
// numbers or account identifiers. Integrations are named because they are
// ours. Capability status is read from the live server, never recited from a
// page, so this page is dated and says so.

export const TECH_META = {
  title: "How Brain OS is built — Endurance AI Labs",
  description:
    "Compiled knowledge, live tools, and a guard in front of every action. The architecture of Brain OS, for the people who ask how before they ask how much.",
  canonical: "https://endurancelabs.ai/brain-os/technical",
};

export const HERO = {
  eyebrow: "BRAIN OS / TECHNICAL",
  h1: ["The parts.", "How they hold."],
  lede: "Brain OS is four parts. A brain compiled from what the business already produces. Live tools into the systems it runs. The places people already work. And a guard in the tool layer, in front of every action. This is the architecture, for the people who ask how before they ask how much.",
  primary: { label: "Talk architecture with us", href: CALENDLY_URL },
  secondary: { label: "See the use cases", href: "/brain-os/use-cases" },
};

export const SHAPE = {
  kicker: "01 · THE SHAPE",
  title: ["Four parts.", "One loop per message."],
  lede: "Knowledge the business already produces is compiled into the brain. Live systems are reached through tools. For every message, Brain OS reads the brain and calls the tools inside the asker’s access tier, and every write passes draft, confirm and a pause switch.",
  caption: "The guard sits in the tool layer, not in the prompt. What a person may see and do is enforced by which tools and pages their session is given, so no wording can talk Brain OS past it.",
};

export const BRAIN = {
  kicker: "02 · THE BRAIN",
  title: ["A wiki the model reads.", "Not a vector index."],
  lede: "The knowledge base is plain files in a git repository, three layers deep. Sources go in immutable. Synthesis pages are written over them by the model, under a schema people own. The model reads the schema first, every time.",
  layers: [
    {
      code: "raw/",
      owner: "SYNC JOBS WRITE. NOBODY EDITS.",
      title: "Immutable source material",
      body: "Mail and attachments, chat threads, rollups from the system of record, meeting notes. Written only by scheduled sync jobs, dated, never rewritten.",
      points: ["Mail synced every two minutes", "System of record rollups weekly, lane history daily", "More than 7,000 emails ingested at the reference deployment"],
    },
    {
      code: "wiki/",
      owner: "THE MODEL WRITES. PEOPLE DIRECT.",
      title: "Synthesis pages",
      body: "One page per real thing: a person, a customer, a carrier, a system, an office. One page per compiled thing: a process, a rule set, a project. Every claim on a synthesis page links to the raw source or entity page it came from.",
      points: ["157 pages: 66 people, 27 processes, 15 systems, and the rest", "Every claim cites a source. A claim without one does not ship", "When a page disagrees with the system of record, the record wins and the page is flagged"],
    },
    {
      code: "CLAUDE.md",
      owner: "PEOPLE AND THE MODEL, TOGETHER.",
      title: "The schema",
      body: "What each directory is, the page types, the citation rule, the authority order, and how to ingest and answer. The session starts inside the brain, so the model discovers it on every message.",
      points: ["Authority order: system of record, then derived calculations, then process docs, then meeting notes, then narrative", "People pages carry the book, the role and the access tier", "The schema co-evolves with the brain, in the same commits"],
    },
  ],
  pageCaption: "An illustrative entity page, with invented names. The frontmatter is what the runtime reads: who this is, whether the page is current, and what the asker may see. The body is the compiled knowledge, each claim carrying the link it came from.",
  cadence: {
    title: "How the brain grows: one week of writers",
    note: "Sync jobs are the only writers to the raw layer. Rules taught in chat are committed the moment they are given.",
    rows: [
      { what: "Mail and attachments into raw", every: "minutes", note: "Every two minutes, around the clock" },
      { what: "People ids onto people pages", every: "hourly", note: "Hourly, from the chat directory" },
      { what: "Lane history and carrier ledger", every: "daily", note: "Daily, before the day starts" },
      { what: "System of record rollups", every: "weekly", note: "Monday morning, one rollup" },
      { what: "Rules taught in chat", every: "event", note: "71 in the week of 21 September, drawn evenly across working hours", count: 71 },
    ] as { what: string; every: "minutes" | "hourly" | "daily" | "weekly" | "event"; note: string; count?: number }[],
    source: "Sync cadence from the reference deployment’s scheduler, 22 September 2026; rule count from the brain’s commit history, 25 September 2026.",
  },
  taught: {
    title: "Rules taught in chat, kept in the brain",
    note: "When an operator corrects Brain OS, the rule is committed to the brain in the same reply and applies to everyone from the next question. Wrong captures are visible and removed by a person.",
    rows: [
      { label: "Rules kept, 24 July to 21 September", value: 153 },
      { label: "Kept in the week of 21 September alone", value: 71 },
      { label: "Kept in the two weeks before that", value: 21 },
    ],
    source: "Counted from the brain’s commit history, 21 and 25 September 2026.",
  },
  pages: {
    title: "The brain, by page kind",
    note: "One deployment’s knowledge base on 22 September 2026, after fifteen weeks in production.",
    rows: [
      { label: "People", value: 66, sub: "one per staff member and payee, with tier and book" },
      { label: "Everything else", value: 49, sub: "customers, offices, rule sets, projects, reference" },
      { label: "Processes", value: 27, sub: "quote to cash, the weekly cycle, reconciliation, vetting" },
      { label: "Systems", value: 15, sub: "the tools the business runs on, with their limits" },
    ],
    source: "Counted from the reference deployment’s wiki directory, 22 September 2026. 157 pages in all.",
  },
};

export const TOOLS = {
  kicker: "03 · THE TOOLS",
  title: ["One tool per action.", "Reads live. Writes draft first."],
  lede: "Anything transactional or time sensitive is read from the live system at the moment of the question, never from a copy. Writes are two calls: the first returns a preview, and only a second, explicit confirm call writes.",
  body: [
    "Each system of record gets its own Model Context Protocol server. It is a small program that exposes that system’s reads and writes as named tools, with the request and response shapes fixed in code. The model does not compose queries. It picks a tool, and the tool does one thing.",
    "The reference deployment’s server for the transportation management system reuses the client logic already proven in the operation’s own portal software. The integration was tested by payroll before it was trusted by chat.",
  ],
  integrations: [
    { system: "McLeod, the transportation management system", what: "Orders, movements, stops, carriers, customers, lane history, credit and receivables, driver texts. Creates and updates orders, stops, rates, carriers and drivers.", access: "Read and write" },
    { system: "Microsoft Teams", what: "The interface: direct messages, group chats, proactive posts and mentions.", access: "Read and write" },
    { system: "Microsoft 365 mail", what: "Brain OS’s own mailbox, synced every two minutes and sent from. Personal mailboxes synced with consent, readable only by their owner.", access: "Read and write" },
    { system: "Twilio", what: "A registered text number: outbound driver texts, inbound replies, photos of signed paperwork.", access: "Read and write" },
    { system: "Truckstop", what: "Load board posting, updates and removal, each under the broker’s own login. Certified by Truckstop for production.", access: "Write, per user" },
    { system: "Highway", what: "Carrier identity screening from an email address, and ranked call lists from lane exports.", access: "Read" },
    { system: "Federal Motor Carrier Safety Administration", what: "Carrier lookup by motor carrier number, behind a local index.", access: "Read" },
    { system: "OpenStreetMap", what: "A pasted latitude and longitude into a place name.", access: "Read" },
    { system: "Microsoft Entra", what: "Sign in for the web screens, limited to the company domain.", access: "Sign in" },
  ],
  spokes: [
    { name: "McLeod, the TMS", access: "rw", note: "read and write" },
    { name: "Microsoft Teams", access: "rw", note: "read and write" },
    { name: "Microsoft 365 mail", access: "rw", note: "read and write" },
    { name: "Twilio", access: "rw", note: "texts, read and write" },
    { name: "Truckstop", access: "write", note: "write, per user" },
    { name: "Highway", access: "read", note: "read" },
    { name: "FMCSA", access: "read", note: "read" },
    { name: "OpenStreetMap", access: "read", note: "read" },
    { name: "Microsoft Entra", access: "signin", note: "sign in only" },
  ] as { name: string; access: "rw" | "read" | "write" | "signin"; note: string }[],
  notConnected: "Not connected at the reference deployment as of 22 September 2026: DAT (in development, not shipped), Samsara, QuickBooks, and documents stored inside the transportation management system. McLeod is one connector. A different system of record needs a different connector; the brain, the guard and the interface carry over.",
};

export const GUARD = {
  kicker: "04 · THE GUARD",
  title: ["Trust in the tool layer.", "Not in the prompt."],
  lede: "Every serious buyer in an operation that holds commission, payroll and customer margin data asks the same question. What stops it showing the wrong person the wrong thing, or doing something nobody asked for? This is the answer. It is enforced, not promised.",
  path: [
    { n: "01", title: "Ask", body: "A person asks for a change in plain language, in the chat they already use." },
    { n: "02", title: "Draft", body: "The first tool call returns a preview only: old and new values, the exact times, the margin, whatever the change touches." },
    { n: "03", title: "Yes", body: "The person reads the draft and says so. Specialist desks cannot reach this step; they hand back a draft." },
    { n: "04", title: "Write", body: "A second, explicit confirm call writes to the live system. The tool refuses to write without it.", write: true },
    { n: "05", title: "Audit", body: "One line per action in the audit log, credited to the person who asked. Scheduled writes stamp a comment on the record." },
  ],
  brake: "Anyone can say “pause writes”. Every write to the system of record, every driver text and every load board post stops, scheduled jobs included. Only leadership or a maintainer releases it. If the switch cannot be read, writes are refused rather than assumed allowed. It exists because an operator once needed a brake, and it has been used deliberately.",
  refusals: [
    { ask: "“Cover it with X at $Y.”", rule: "Refuses a buy above the sell, and shows the margin in the draft." },
    { ask: "“Void this order.”", rule: "Refuses on delivered or billed orders." },
    { ask: "“Fix the BOL and the weight.”", rule: "A safelisted set of order fields. Anything off the safelist is refused." },
    { ask: "“Email the carrier a rate confirmation.”", rule: "Refuses anything titled a rate confirmation. The system of record still sends those." },
    { ask: "“Text this driver.”", rule: "Refuses opted out numbers and blocked carriers. A location share is one fix per tap, never tracking." },
    { ask: "“Post it at $2,400.”", rule: "Shipper contact details stripped; stop notes flagged for review before the post." },
  ],
  tiers: {
    lede: "Every message is resolved to a person and a tier. Being allowed to talk to Brain OS is not a tier; everyone lands at dispatch unless their page says otherwise. The web screens enforce the same tiers.",
    columns: ["Dispatch", "Billing", "Leadership"],
    rows: [
      { what: "Loads, carriers, lanes and customers, read live", cells: ["yes", "yes", "yes"] },
      { what: "Drafted writes: orders, stops, rates, texts, postings", cells: ["yes", "yes", "yes"] },
      { what: "Billing, receivables and customer credit", cells: ["no", "yes", "yes"] },
      { what: "Settlement history and weekly revenue rollups", cells: ["no", "Set per operation", "yes"] },
      { what: "Commission pages and company wide totals", cells: ["no", "Set per operation", "yes"] },
      { what: "Money digests, in leadership and billing channels only", cells: ["no", "yes", "yes"] },
    ] as { what: string; cells: [string, string, string] }[],
    note: "For dispatch, the money tools and pages are not hidden; they are absent from the session, and the shell is disabled, so there is no way to read around them.",
  },
  also: [
    { what: "A spending cap on every message", how: "Each message runs under a cost ceiling. It cannot loop away." },
    { what: "A financial guard on outbound answers", how: "A warn only scan for commission, payroll and identifier patterns before an answer leaves." },
    { what: "Honest about its own state", how: "Whether a capability is on, off or paused is read from the live server at the moment of the question, never recited from a page that may have aged." },
    { what: "Says so when it cannot", how: "When it does not know, it says so. When it cannot do something, it logs the request instead of claiming to have passed it on." },
  ],
};

export const DESKS = {
  kicker: "05 · SPECIALIST DESKS",
  title: ["Specialists that advise.", "A ladder they climb on evidence."],
  lede: "Since 21 September 2026 the reference deployment delegates to three read only specialists: a finance desk, a load manager and a carrier desk. Each returns a sourced brief with at most one drafted action. Brain OS answers from the brief. The confirm step stays with Brain OS.",
  ladder: [
    { n: "LEVEL 1", title: "Advise", body: "Read only. Returns a sourced brief and at most one drafted action for Brain OS to confirm with the operator.", status: "All three desks, today", now: true },
    { n: "LEVEL 2", title: "Act with confirmation", body: "Holds specific write tools and runs draft and confirm itself, each write behind its switch and the pause.", status: "Two of six gates done" },
    { n: "LEVEL 3", title: "Own a task end to end", body: "Runs a bounded task, a book, a lane, a night shift, within a scope a person set. Every action logged, pausable and reversible.", status: "Destination, not a date" },
  ],
  testing: {
    title: "Tested like software",
    body: [
      "Every desk runs through an automated contract check before a change ships: read only tools, and no figures in its instruction files. Then behavioural test cases, under the exact production setup. The saved trace is read; the grader’s verdict is not trusted on its own.",
      "Every failure that is the desk’s fault becomes a permanent test. The third full run, on 21 September 2026, passed 29 of 31 cases; both misses were the grading, not the desk.",
    ],
  },
};

export const JOBS = {
  kicker: "06 · SCHEDULED WORK",
  title: ["About forty jobs", "that run without being asked."],
  lede: "Verified on the reference deployment’s server on 21 August 2026. Each runs in shadow first, reporting what it would have done, then is armed with its own switch, capped per run, stamped with an audit comment, and stopped by the pause.",
  groups: [
    { icon: "eye", title: "Load watching", body: "The loads board and backhaul scan, late pickup checks, uncovered load alerts as pickup approaches, and carrier shortlists for new loads, posted into the right chat." },
    { icon: "clock", title: "Check calls", body: "A morning pulse: drivers texted at 7:30, dispatchers emailed at 8:00, escalations at 8:15. Then estimated arrival refreshes on a fifteen minute cadence, replies matched back to the right load." },
    { icon: "file", title: "Stops and paperwork", body: "When a dock system emails that a truck has arrived, it asks the dispatcher whether to clear the stop. Proof of delivery requests and forwarding. Carrier replies matched to loads." },
    { icon: "inbox", title: "Order intake", body: "Orders that arrive by email become draft orders posted for approval. The dispatcher replies “build all”." },
    { icon: "receipt", title: "Money and audit", body: "The carrier invoice audit, the unbilled and missing paperwork digests, and a weekly carrier compliance email." },
    { icon: "chart", title: "Leadership", body: "Monday, daily and monthly digests: quiet customers, dormant lanes, hot areas, margin by agent. The Friday usage report. Money only to leadership and billing channels." },
  ],
};

export const RUNS = {
  kicker: "07 · WHERE IT RUNS",
  title: ["Your tenant.", "A dedicated server."],
  lede: "The bot is registered in the customer’s own Microsoft tenant. Credentials are held only on the server, never in the knowledge base. The reasoning model is Anthropic’s Claude, run with a spending cap on every message, and Brain OS does not train models on customer data.",
  spec: [
    { part: "Reasoning", what: "Anthropic’s Claude, run through the Claude Code agent runtime, with the session started inside the brain so the schema and the tools are discovered on every message.", note: "Spending cap per message" },
    { part: "Knowledge", what: "Markdown pages in a private git repository: raw sources, synthesis pages, and the schema. Every change is a commit, so the brain has a history.", note: "Git, plain files" },
    { part: "Tools", what: "One Model Context Protocol server per system of record, exposing named reads and writes with fixed shapes. Draft and confirm built into every write tool.", note: "TypeScript" },
    { part: "Interface", what: "Microsoft Teams through the Bot Framework, or Slack. A mailbox and a registered text number of its own. Web screens behind Microsoft Entra sign in.", note: "No new login" },
    { part: "Queue and store", what: "A Redis backed job queue for messages and scheduled work. A small database for sessions, messages and the audit log.", note: "Per deployment" },
    { part: "Sync", what: "Scheduled jobs on the server, each under a lock, are the only writers to the raw layer.", note: "cron" },
    { part: "Hosting", what: "A dedicated server per customer. Password sign in off, services bound to the loopback, secrets in the environment and a vault, never in the repository.", note: "One tenant, one box" },
  ],
  deploy: [
    {
      label: "YOUR MICROSOFT TENANT",
      nodes: [
        { title: "Teams", body: "The bot, registered in your tenant. Direct messages and group chats." },
        { title: "Mailboxes", body: "Brain OS’s own mailbox. Personal mailboxes only with consent, readable only by their owner." },
        { title: "Entra sign in", body: "The web screens, limited to your company domain." },
      ],
    },
    {
      label: "THE DEDICATED SERVER",
      core: true,
      nodes: [
        { title: "The runtime", body: "One session per message, started inside the brain, under a spending cap." },
        { title: "The brain", body: "A private git repository: raw sources, synthesis pages, the schema." },
        { title: "Tool servers", body: "One per system of record. Draft and confirm built into every write." },
        { title: "Queue, store, audit log", body: "Jobs, sessions, messages, and one line per action." },
        { title: "Scheduled jobs", body: "Sync, digests, check calls, each under a lock and the pause." },
      ],
    },
    {
      label: "OUTSIDE, THROUGH TOOLS",
      nodes: [
        { title: "System of record", body: "McLeod, read live and written as drafts." },
        { title: "Load board and text number", body: "Truckstop under each broker’s login. Twilio for driver texts." },
        { title: "Carrier vetting", body: "Highway and the federal carrier register, read only." },
        { title: "Model provider", body: "Anthropic’s Claude. No training on your data." },
      ],
    },
  ],
  conversation: {
    title: "The architecture conversation",
    lede: "Defined for your implementation, not left to assumption. We work through these with your team before anything connects.",
    rows: [
      { title: "Deployment and data location", body: "Which systems connect? Where will the service run, and where will your data reside?" },
      { title: "Access and permissions", body: "Which people and tools can read information, change records, or initiate work?" },
      { title: "Model data handling", body: "Which providers are involved? What information reaches them, and what are their training and retention terms?" },
      { title: "Retention and deletion", body: "What is stored, for how long, and who is responsible for deletion?" },
      { title: "Actions and accountability", body: "What can run automatically? Where is approval required, and what activity records does your team need?" },
    ],
    story: "The load board declined to certify the first integration, because every post went out under one shared account. We rebuilt it so each broker links their own login and posts as themselves, with no silent fallback, and the load board certified it for production. Before the first real load went up, the operator asked what exactly was being sent, read the preview, and had shipper contact details stripped by default. Build the thing that lets people check you, and they will.",
  },
};

export const TRAVELS = {
  kicker: "08 · THE PATTERN TRAVELS",
  title: ["One chassis.", "Three operations."],
  lede: "The chassis is shared: the brain’s three layers, the tool layer, the guard, the chat runtime. The industry layer is built for each operation and never transfers, because a freight desk and a construction office do not share a single rule.",
  deployments: [
    {
      name: "A freight brokerage and its asset carrier",
      status: "In production since June 2026",
      body: "Microsoft Teams, a transportation management system read and written live, a mailbox, a text number, the load board and carrier vetting. Thirty three people in one week, about forty scheduled jobs, three specialist desks.",
      facts: [["Interface", "Teams, mail, text, web"], ["System of record", "McLeod"], ["Brain", "157 pages"]],
    },
    {
      name: "Our own lab",
      status: "Running since spring 2026",
      body: "The same pattern on Slack, for an engineering team. It plans features, files the tickets, implements the change on a branch and answers review comments. Its brain ingests Slack, the issue tracker, GitHub, Notion, Google Docs, meeting transcripts and the sales system.",
      facts: [["Interface", "Slack"], ["Systems", "GitHub, Linear, Notion"], ["Work", "Plan, ticket, build, review"]],
    },
    {
      name: "A construction company",
      status: "In build, autumn 2026",
      body: "Microsoft Teams, a field service platform, and an on premise accounting ledger with no cloud interface. The brain reads a synced copy of the ledger and states its age with every figure. A number without its date is a guess.",
      facts: [["Interface", "Teams"], ["Systems", "Field service, accounting"], ["Brain", "27 pages at kickoff"]],
    },
  ],
};

export const NOT = {
  kicker: "09 · WHAT IT IS NOT",
  title: ["Honest limits.", "Dated, on purpose."],
  lede: "Things a prospect will assume Brain OS does, and the truth as of 22 September 2026. Status is checked on the server, never recited from a page, and this page is dated for the same reason.",
  rows: [
    { assume: "“The yes is checked by code.”", truth: "The write tools refuse to write without a second, explicit confirm call. The tool cannot itself prove a person typed yes. The model makes that call under a standing rule. For email, draft first is a standing rule rather than a code gate." },
    { assume: "“The pause covers everything.”", truth: "It covers the system of record, driver texts, load board posts and the scheduled jobs. It does not cover email." },
    { assume: "“Every action needs a yes.”", truth: "Every action a person asks for does. A few scheduled jobs write on a standing authorization for a book, each behind its own switch and the pause." },
    { assume: "“It covers loads.”", truth: "It drafts the carrier and buy rate and refuses a buy above the sell. The write step was repaired on 24 September 2026 and had not been proven on a live load when this page was written." },
    { assume: "“It posts to every load board.”", truth: "Truckstop only. A DAT connection is in development and has not shipped." },
    { assume: "“It sends rate confirmations.”", truth: "No. The system of record still sends them, and Brain OS refuses to email anything titled a rate confirmation." },
    { assume: "“It tracks drivers.”", truth: "No. It reads electronic logging device pings already in the system of record, and a driver can share one location fix per tap." },
    { assume: "“It clears carriers to haul.”", truth: "Never. It screens identity and history. Authority and insurance are checked in the vetting tool." },
    { assume: "“It reads any file.”", truth: "PDFs, images, text and short video in a direct message. Not Word or Excel files, yet." },
    { assume: "“The desks run on their own.”", truth: "Not yet. All three advise only. Level two needs four more gates, including per person write scopes that are designed but not built." },
    { assume: "“Orders it builds are flawless.”", truth: "Orders it built have had visibility problems in the system of record’s own search. A stop time defect for stops outside Eastern time was found on 25 September. Each incident produced a control. Said plainly, that is more credible than a clean record." },
    { assume: "“It works for everyone on day one.”", truth: "Only for people with a page carrying their book, role and tier. Without one, “my loads” means the whole company’s." },
  ],
};

export const CLOSE = {
  kicker: "NEXT",
  title: ["Walk the architecture", "with your team."],
  body: "Bring your security lead, and the person who knows where the bodies are buried in the spreadsheet. One conversation maps your systems, your tiers and your yes line.",
  primary: { label: "Talk architecture with us", href: CALENDLY_URL },
  links: [
    { label: "See the use cases and impact", href: "/brain-os/use-cases" },
    { label: "Security and trust", href: "/#trust" },
    { label: "Pricing", href: "/brain/pricing" },
  ],
  colophon:
    "Counts on this page come from the reference deployment’s knowledge base and code on 22 September 2026 and its session logs to 25 September 2026. The operation is not named at their request. Capability status is read from the live server at the time of a question, never from a page. This page will age the way any page does.",
};

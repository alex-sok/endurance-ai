export type RouteKey =
  | "home"
  | "mission_intake"
  | "what_we_do"
  | "who_we_are"
  | "how_we_work"
  | "who_we_help"
  | "difference"
  | "not_fit"
  | "support"
  | "contact"
  | "topic";

export type PromptChip = {
  id: string;
  label: string;
  value?: string;
  nextNodeId?: string;
};

export type ChatNode = {
  id: string;
  route: RouteKey;
  title?: string;
  message: string;
  promptChips?: PromptChip[];
  allowFreeText?: boolean;
  captureKey?:
    | "mission"
    | "obstacle"
    | "stakes"
    | "internalChallenges";
  nextNodeId?: string;
  nextNodeResolver?: string;
  cta?: {
    label: string;
    action: "link" | "route" | "email" | "reset";
    value: string;
  }[];
};

export type MissionIntakeData = {
  mission?: string;
  obstacle?: string;
  stakes?: string;
  internalChallenges?: string;
};

export const CALENDLY_URL = "https://cal.endurancelabs.ai/briefing";
export const CONTACT_EMAIL = "hello@endurancelabs.ai";

export const conversationFlows: Record<string, ChatNode> = {
  home: {
    id: "home",
    route: "home",
    title: "Welcome",
    message:
      "Welcome to Endurance AI Labs. Brief us on a critical initiative, explore what we do, or learn how we work.",
    promptChips: [
      { id: "home-1", label: "Brief us on a mission", nextNodeId: "mission-start" },
      { id: "home-2", label: "What does Endurance do?", nextNodeId: "what-we-do" },
      { id: "home-3", label: "Who are you?", nextNodeId: "who-we-are" },
      { id: "home-4", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "home-5", label: "Who do you help?", nextNodeId: "who-we-help" },
      { id: "home-6", label: "I need support", nextNodeId: "support" },
      { id: "home-7", label: "Talk to the team", nextNodeId: "contact" },
    ],
    allowFreeText: true,
  },

  "mission-start": {
    id: "mission-start",
    route: "mission_intake",
    title: "Mission Intake",
    message: "Let's start with the mission. What are you trying to accomplish?",
    allowFreeText: true,
    captureKey: "mission",
    nextNodeId: "mission-obstacle",
    promptChips: [
      { id: "ms-1", label: "Launch an AI initiative" },
      { id: "ms-2", label: "Automate a broken workflow" },
      { id: "ms-3", label: "Rescue a stalled initiative" },
      { id: "ms-4", label: "Build internal AI capability" },
      { id: "ms-5", label: "Make sense of our AI roadmap" },
    ],
  },

  "mission-obstacle": {
    id: "mission-obstacle",
    route: "mission_intake",
    message: "What is slowing this down right now?",
    allowFreeText: true,
    captureKey: "obstacle",
    nextNodeId: "mission-stakes",
    promptChips: [
      { id: "mo-1", label: "Unclear strategy" },
      { id: "mo-2", label: "Weak data foundations" },
      { id: "mo-3", label: "Too much bureaucracy" },
      { id: "mo-4", label: "Limited internal AI talent" },
      { id: "mo-5", label: "Previous effort stalled" },
      { id: "mo-6", label: "Tool overload" },
      { id: "mo-7", label: "Compliance or risk concerns" },
    ],
  },

  "mission-stakes": {
    id: "mission-stakes",
    route: "mission_intake",
    message: "What happens if this does not move in the next 6 to 12 months?",
    allowFreeText: true,
    captureKey: "stakes",
    nextNodeId: "mission-internal",
    promptChips: [
      { id: "mst-1", label: "We lose time" },
      { id: "mst-2", label: "We lose market position" },
      { id: "mst-3", label: "Costs continue to climb" },
      { id: "mst-4", label: "The team stays stuck" },
      { id: "mst-5", label: "We miss a strategic window" },
    ],
  },

  "mission-internal": {
    id: "mission-internal",
    route: "mission_intake",
    message: "What makes this difficult inside your organization?",
    allowFreeText: true,
    captureKey: "internalChallenges",
    nextNodeId: "mission-summary",
    promptChips: [
      { id: "mi-1", label: "Cross-functional complexity" },
      { id: "mi-2", label: "No clear owner" },
      { id: "mi-3", label: "Legacy systems" },
      { id: "mi-4", label: "Cultural resistance" },
      { id: "mi-5", label: "Too many stakeholders" },
      { id: "mi-6", label: "Uncertain ROI" },
    ],
    nextNodeResolver: "generateMissionSummary",
  },

  "mission-summary": {
    id: "mission-summary",
    route: "mission_intake",
    message:
      "Based on what you've shared, this looks less like a tooling problem and more like an execution problem. The likely path is a focused diagnostic, rapid prioritization, and a deployment around your highest-friction constraint.",
    promptChips: [
      { id: "msum-1", label: "How would Endurance approach this?", nextNodeId: "mission-approach" },
      { id: "msum-2", label: "Are we a fit?", nextNodeId: "mission-fit" },
      { id: "msum-3", label: "What would phase one look like?", nextNodeId: "mission-phase-one" },
      { id: "msum-4", label: "Talk to the team", nextNodeId: "contact" },
    ],
    cta: [
      { label: "Schedule a mission briefing", action: "link", value: CALENDLY_URL },
      { label: "Email the team", action: "email", value: CONTACT_EMAIL },
      { label: "Start over", action: "reset", value: "home" },
    ],
  },

  "mission-approach": {
    id: "mission-approach",
    route: "mission_intake",
    message:
      "We would usually begin with strategic recon to understand the real constraints, define the mission clearly, and sequence the work around the highest-leverage opportunity. From there, we move into a focused deployment designed to produce visible operational progress quickly.",
    promptChips: [
      { id: "map-1", label: "What would phase one look like?", nextNodeId: "mission-phase-one" },
      { id: "map-2", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "map-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "mission-fit": {
    id: "mission-fit",
    route: "mission_intake",
    message:
      "If the initiative is important, cross-functional, and difficult to move through the normal organization, there is a good chance we are a fit. We work best when leadership is serious about execution and ready to move once a direction is chosen.",
    promptChips: [
      { id: "mfit-1", label: "What are you not a fit for?", nextNodeId: "not-fit" },
      { id: "mfit-2", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "mission-phase-one": {
    id: "mission-phase-one",
    route: "mission_intake",
    message:
      "Phase one is usually strategic recon. We look at the goals, systems, constraints, prior attempts, and where leverage exists. The output is not a vague deck. It is a sharper understanding of what matters, what is in the way, and what the first serious move should be.",
    promptChips: [
      { id: "mp1-1", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "mp1-2", label: "Talk to the team", nextNodeId: "contact" },
      { id: "mp1-3", label: "Start over", nextNodeId: "home" },
    ],
  },

  "what-we-do": {
    id: "what-we-do",
    route: "what_we_do",
    title: "What We Do",
    message:
      "Endurance AI Labs helps leaders execute critical AI initiatives that cannot afford drag, bureaucracy, or failure. We work as a small senior team across strategy, architecture, automation, and internal capability building.",
    promptChips: [
      { id: "wwd-1", label: "Show capabilities", nextNodeId: "capabilities" },
      { id: "wwd-2", label: "How are you different?", nextNodeId: "difference" },
      { id: "wwd-3", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "wwd-4", label: "Who do you help?", nextNodeId: "who-we-help" },
      { id: "wwd-5", label: "Brief us on a mission", nextNodeId: "mission-start" },
    ],
  },

  capabilities: {
    id: "capabilities",
    route: "what_we_do",
    title: "Capabilities",
    message:
      "Our work usually falls into five areas: AI strategy and leadership, workflow automation, architecture and operating layer design, internal capability building, and initiative recovery. The through-line is execution. We help leadership move important work from ambition into operation.",
    promptChips: [
      { id: "cap-1", label: "How are you different?", nextNodeId: "difference" },
      { id: "cap-2", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "cap-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "who-we-are": {
    id: "who-we-are",
    route: "who_we_are",
    title: "Who We Are",
    message:
      "Endurance AI Labs is built by operators. Our background spans AI engineering, data architecture, product design, enterprise systems, and execution inside complex environments. We are not a deck-first consulting firm. We are a small senior team built for important work.",
    promptChips: [
      { id: "wwa-1", label: "What makes you different?", nextNodeId: "difference" },
      { id: "wwa-2", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "wwa-3", label: "Who do you help?", nextNodeId: "who-we-help" },
      { id: "wwa-4", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "how-we-work": {
    id: "how-we-work",
    route: "how_we_work",
    title: "How We Work",
    message:
      "We work in five phases: strategic recon, mission definition, rapid deployment, embedding, and capability transfer. The goal is not to run a vague AI program. The goal is to produce real outcomes and leave the organization stronger than we found it.",
    promptChips: [
      { id: "hww-1", label: "Walk me through the five phases", nextNodeId: "five-phases" },
      { id: "hww-2", label: "What happens in phase one?", nextNodeId: "mission-phase-one" },
      { id: "hww-3", label: "How long does this usually take?", nextNodeId: "timelines-topic" },
      { id: "hww-4", label: "How do you avoid consultant bloat?", nextNodeId: "difference" },
      { id: "hww-5", label: "Brief us on a mission", nextNodeId: "mission-start" },
    ],
  },

  "five-phases": {
    id: "five-phases",
    route: "how_we_work",
    title: "Five Phases",
    message:
      "Strategic recon helps us understand the real terrain. Mission definition turns ambiguity into a clear path. Rapid deployment creates visible progress. Embedding makes the system work inside the organization. Capability transfer ensures the client can sustain and extend the work over time.",
    promptChips: [
      { id: "fp-1", label: "What happens in phase one?", nextNodeId: "mission-phase-one" },
      { id: "fp-2", label: "Who do you help?", nextNodeId: "who-we-help" },
      { id: "fp-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "who-we-help": {
    id: "who-we-help",
    route: "who_we_help",
    title: "Who We Help",
    message:
      "We typically work with four kinds of organizations: professional services firms, mid-market operating companies, venture-backed companies, and larger enterprises pursuing complex transformation efforts.",
    promptChips: [
      { id: "wwh-1", label: "Do you work with firms like mine?", nextNodeId: "client-segments" },
      { id: "wwh-2", label: "What are you not a fit for?", nextNodeId: "not-fit" },
      { id: "wwh-3", label: "What problems do you usually solve?", nextNodeId: "capabilities" },
      { id: "wwh-4", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "client-segments": {
    id: "client-segments",
    route: "who_we_help",
    message:
      "Professional services firms often need workflow leverage and better knowledge systems. Mid-market operating companies are usually dealing with operational friction and disconnected data. Venture-backed companies need to move quickly without making bad architecture decisions. Large enterprises often struggle with stakeholder complexity and slow execution.",
    promptChips: [
      { id: "cs-1", label: "What makes you different?", nextNodeId: "difference" },
      { id: "cs-2", label: "Brief us on a mission", nextNodeId: "mission-start" },
      { id: "cs-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  difference: {
    id: "difference",
    route: "difference",
    title: "What Makes Us Different",
    message:
      "Most firms give you one piece of the puzzle. Consultants give advice. Integrators implement tools. Vendors sell software. Endurance combines strategy, architecture, engineering, and execution in one small senior team.",
    promptChips: [
      { id: "diff-1", label: "Are you a consultancy?", nextNodeId: "difference-detail" },
      { id: "diff-2", label: "What are you not a fit for?", nextNodeId: "not-fit" },
      { id: "diff-3", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "diff-4", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "difference-detail": {
    id: "difference-detail",
    route: "difference",
    message:
      "We can advise, but we are not built to stop there. We are built for situations where the initiative is too important to drift between departments, too sensitive for bloated teams, or too urgent for traditional transformation pace.",
    promptChips: [
      { id: "dd-1", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "dd-2", label: "Brief us on a mission", nextNodeId: "mission-start" },
      { id: "dd-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "not-fit": {
    id: "not-fit",
    route: "not_fit",
    title: "Not a Fit",
    message:
      "We are not the right fit for every situation. If you only want generic experimentation, the lowest-cost implementation vendor, or a software shopping assistant, there are better options. We work best when leadership is serious about execution and prepared to move.",
    promptChips: [
      { id: "nf-1", label: "What kinds of projects do fit?", nextNodeId: "capabilities" },
      { id: "nf-2", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "nf-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  support: {
    id: "support",
    route: "support",
    title: "Support",
    message:
      "Happy to help. Are you an existing client, reaching out with a general inquiry, or looking to speak with the team?",
    promptChips: [
      { id: "sup-1", label: "Existing client support", nextNodeId: "support-existing" },
      { id: "sup-2", label: "General inquiry", nextNodeId: "support-general" },
      { id: "sup-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "support-existing": {
    id: "support-existing",
    route: "support",
    message: `For existing client support, please email ${CONTACT_EMAIL} with your company name and a short note on the issue. We will route it to the right person quickly.`,
    promptChips: [
      { id: "se-1", label: "Talk to the team", nextNodeId: "contact" },
      { id: "se-2", label: "Start over", nextNodeId: "home" },
    ],
  },

  "support-general": {
    id: "support-general",
    route: "support",
    message: `For general inquiries, you can email ${CONTACT_EMAIL} or book time directly if the conversation is about a meaningful initiative.`,
    promptChips: [
      { id: "sg-1", label: "Talk to the team", nextNodeId: "contact" },
      { id: "sg-2", label: "Start over", nextNodeId: "home" },
    ],
  },

  contact: {
    id: "contact",
    route: "contact",
    title: "Talk to the Team",
    message:
      "The best next step is a mission briefing. Share a bit about the initiative, or book time directly with the team.",
    promptChips: [
      { id: "con-1", label: "Schedule a mission briefing", nextNodeId: "contact-schedule" },
      { id: "con-2", label: "Brief us first", nextNodeId: "mission-start" },
    ],
    cta: [
      { label: "Book a briefing →", action: "link", value: CALENDLY_URL },
      { label: "Email the team →", action: "email", value: CONTACT_EMAIL },
    ],
  },

  "contact-schedule": {
    id: "contact-schedule",
    route: "contact",
    message: `You can book a mission briefing here: ${CALENDLY_URL}`,
    promptChips: [
      { id: "csch-1", label: "Brief us on a mission", nextNodeId: "mission-start" },
      { id: "csch-2", label: "Start over", nextNodeId: "home" },
    ],
  },

  "pilots-topic": {
    id: "pilots-topic",
    route: "topic",
    title: "AI Pilots",
    message:
      "A pilot should reduce uncertainty, not create theater. The point is to test whether a meaningful use case can produce operational value under real conditions. A good pilot has a narrow scope, clear success criteria, real stakeholders, and a direct line to a broader operating decision.",
    promptChips: [
      { id: "pt-1", label: "Build vs buy?", nextNodeId: "build-vs-buy-topic" },
      { id: "pt-2", label: "How long does this usually take?", nextNodeId: "timelines-topic" },
      { id: "pt-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "build-vs-buy-topic": {
    id: "build-vs-buy-topic",
    route: "topic",
    title: "Build vs Buy",
    message:
      "It depends on what is strategic, what is commodity, and how differentiated the workflow is. Most companies should not build everything from scratch. But they also should not assume off-the-shelf tools will create durable advantage. The right answer is often selective architecture: buy the commodity, build the differentiator.",
    promptChips: [
      { id: "bvb-1", label: "How do you think about LLMs?", nextNodeId: "llm-topic" },
      { id: "bvb-2", label: "What about governance?", nextNodeId: "governance-topic" },
      { id: "bvb-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "llm-topic": {
    id: "llm-topic",
    route: "topic",
    title: "LLMs",
    message:
      "Model choice matters, but it is rarely the whole story. Most business outcomes depend more on workflow design, retrieval quality, orchestration, guardrails, and how the system fits into the operating environment than on picking a single magical model.",
    promptChips: [
      { id: "llm-1", label: "What about governance?", nextNodeId: "governance-topic" },
      { id: "llm-2", label: "How long does this usually take?", nextNodeId: "timelines-topic" },
      { id: "llm-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "governance-topic": {
    id: "governance-topic",
    route: "topic",
    title: "Governance",
    message:
      "Governance should protect the mission, not suffocate it. The right level depends on the stakes, the data involved, the degree of automation, and the regulatory environment. In practice, good governance means clear ownership, guardrails, visibility, and a way to monitor how the system behaves over time.",
    promptChips: [
      { id: "gov-1", label: "How long does this usually take?", nextNodeId: "timelines-topic" },
      { id: "gov-2", label: "What talent do we need?", nextNodeId: "talent-topic" },
      { id: "gov-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "timelines-topic": {
    id: "timelines-topic",
    route: "topic",
    title: "Timelines",
    message:
      "Timelines depend on the complexity of the mission, the quality of the data, the systems involved, and how quickly the organization can make decisions. A focused first deployment can move relatively quickly. A broader operating-layer transformation takes longer and usually unfolds in phases.",
    promptChips: [
      { id: "time-1", label: "What talent do we need?", nextNodeId: "talent-topic" },
      { id: "time-2", label: "How do you work?", nextNodeId: "how-we-work" },
      { id: "time-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "talent-topic": {
    id: "talent-topic",
    route: "topic",
    title: "Talent",
    message:
      "Most organizations do not need a giant AI team to get started. They need clear ownership, enough technical judgment to make good decisions, and the ability to connect business context to execution. Over time, the internal team should grow around the capabilities that matter most strategically.",
    promptChips: [
      { id: "tal-1", label: "How should we think about pricing?", nextNodeId: "pricing-topic" },
      { id: "tal-2", label: "Build vs buy?", nextNodeId: "build-vs-buy-topic" },
      { id: "tal-3", label: "Talk to the team", nextNodeId: "contact" },
    ],
  },

  "pricing-topic": {
    id: "pricing-topic",
    route: "topic",
    title: "Pricing",
    message:
      "Pricing depends on the shape of the engagement: diagnostic work, focused deployment, embedded execution, or broader capability building. The right way to think about pricing is in relation to the value of the constraint being removed, the speed required, and the importance of getting the architecture right.",
    promptChips: [
      { id: "price-1", label: "Brief us on a mission", nextNodeId: "mission-start" },
      { id: "price-2", label: "Talk to the team", nextNodeId: "contact" },
      { id: "price-3", label: "Start over", nextNodeId: "home" },
    ],
  },
};

export const topicKeywordRoutes: Record<string, string> = {
  pilot: "pilots-topic",
  pilots: "pilots-topic",
  "build vs buy": "build-vs-buy-topic",
  build: "build-vs-buy-topic",
  buy: "build-vs-buy-topic",
  llm: "llm-topic",
  llms: "llm-topic",
  model: "llm-topic",
  models: "llm-topic",
  governance: "governance-topic",
  risk: "governance-topic",
  timeline: "timelines-topic",
  timelines: "timelines-topic",
  talent: "talent-topic",
  hiring: "talent-topic",
  pricing: "pricing-topic",
  price: "pricing-topic",
};

export function generateMissionSummary(data: MissionIntakeData): string {
  const mission = data.mission?.trim() || "an important initiative";
  const obstacle = data.obstacle?.trim() || "execution friction";
  const stakes = data.stakes?.trim() || "meaningful business consequences";
  const internalChallenges =
    typeof data.internalChallenges === "string"
      ? data.internalChallenges
      : "internal complexity";

  return `Based on what you've shared, the mission is ${mission}. The main constraint appears to be ${obstacle}, with ${stakes} at stake if the work does not move. Internally, the effort seems complicated by ${internalChallenges}. This looks less like a simple tooling problem and more like an execution problem. The likely path is a focused diagnostic, sharp prioritization, and a deployment around the highest-friction constraint.`;
}

export function getNextNodeForFreeText(input: string): string {
  const normalized = input.toLowerCase().trim();

  if (
    normalized.includes("mission") ||
    normalized.includes("initiative") ||
    normalized.includes("automation") ||
    normalized.includes("workflow") ||
    normalized.includes("help us")
  ) return "mission-start";

  if (
    normalized.includes("what do you do") ||
    normalized.includes("services") ||
    normalized.includes("capabilities")
  ) return "what-we-do";

  if (
    normalized.includes("who are you") ||
    normalized.includes("about") ||
    normalized.includes("team")
  ) return "who-we-are";

  if (
    normalized.includes("how do you work") ||
    normalized.includes("process") ||
    normalized.includes("method")
  ) return "how-we-work";

  if (
    normalized.includes("who do you help") ||
    normalized.includes("industry") ||
    normalized.includes("fit")
  ) return "who-we-help";

  if (
    normalized.includes("support") ||
    normalized.includes("contact") ||
    normalized.includes("talk to someone")
  ) return "contact";

  for (const [keyword, nodeId] of Object.entries(topicKeywordRoutes)) {
    if (normalized.includes(keyword)) return nodeId;
  }

  return "";
}

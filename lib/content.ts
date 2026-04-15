import type { FollowUp, RouteId } from "@/types/chat";

// ─── Initial prompts shown on load ───────────────────────────────────────────
export const INITIAL_PROMPTS: { label: string; routeId: RouteId }[] = [
  { label: "Brief us on a mission", routeId: "mission-intake" },
  { label: "What does Endurance do?", routeId: "what-we-do" },
  { label: "Who are you?", routeId: "who-are-we" },
  { label: "How do you work?", routeId: "how-we-work" },
  { label: "Who do you help?", routeId: "who-we-help" },
  { label: "I need support", routeId: "support" },
  { label: "Talk to the team", routeId: "talk-to-team" },
];

// ─── Opening message ──────────────────────────────────────────────────────────
export const WELCOME_MESSAGE = `Welcome to Endurance AI Labs.

This is a space for leaders working on AI initiatives that matter — not experiments, not demos, but the kind of work that has real stakes.

How can we help you today?`;

// ─── Route: Mission Intake ────────────────────────────────────────────────────
export const MISSION_INTAKE = {
  intro: `Let's get oriented. I'll ask four questions. Don't overthink the answers — the more direct you are, the more useful this will be.

What are you trying to accomplish?`,

  step1_placeholder: "Describe the mission in a sentence or two — what does success look like?",

  step2: (goal: string) =>
    `Got it. Working toward: *${goal}*

What's standing between you and that outcome right now?`,

  step2_placeholder: "The main blocker — could be technical, organizational, resource-related, or all three",

  step3: (blocker: string) =>
    `Understood — *${blocker}*

What happens if this doesn't get resolved in the next twelve months?`,

  step3_placeholder: "Competitive position, cost, missed opportunity, regulatory risk — be direct",

  step4: `Last question: what makes this hard to solve with your existing team and resources?`,

  step4_placeholder: "Capacity, expertise, internal politics, legacy systems, vendor dependencies — whatever's true",

  summary: (data: {
    goal: string;
    blocker: string;
    stakes: string;
    internalFriction: string;
  }) => {
    // Attempt to classify the type of challenge based on keywords
    const text = [data.goal, data.blocker, data.stakes, data.internalFriction].join(" ").toLowerCase();

    let patternRead = "";
    if (text.includes("pilot") || text.includes("proof of concept") || text.includes("poc") || text.includes("demo")) {
      patternRead = `What I'm noticing: this has the shape of a **strategy-to-execution gap**. You likely have directional alignment at the top but the path from idea to production isn't clear — and pilots are filling that void without actually closing it.`;
    } else if (text.includes("vendor") || text.includes("partner") || text.includes("platform") || text.includes("tool")) {
      patternRead = `What I'm noticing: this sounds like a **capability dependency problem**. The tools and vendors exist, but the organization doesn't own the outcome — which means you're exposed every time a contract renews or a platform changes.`;
    } else if (text.includes("team") || text.includes("talent") || text.includes("hire") || text.includes("skill") || text.includes("expertise")) {
      patternRead = `What I'm noticing: this looks like an **organizational readiness gap**. The ambition is there but the internal capability to execute — and sustain — isn't yet built. That's a solvable problem, but it requires a different approach than hiring more people.`;
    } else if (text.includes("board") || text.includes("executive") || text.includes("ceo") || text.includes("mandate") || text.includes("stakeholder")) {
      patternRead = `What I'm noticing: this is partly a **trust and alignment problem**. The initiative may be technically sound, but it's stalled at the leadership layer — and that gap won't close with better technology. It closes with better framing, sequencing, and early wins.`;
    } else if (text.includes("data") || text.includes("infrastructure") || text.includes("legacy") || text.includes("system") || text.includes("integration")) {
      patternRead = `What I'm noticing: the core constraint here is **technical debt masquerading as an AI problem**. The ambition is real but the foundation isn't ready — and trying to build advanced AI on top of fragile infrastructure is a fast path to expensive failure.`;
    } else {
      patternRead = `What I'm noticing: this is a **multi-layer challenge** — the problem isn't purely technical, it isn't purely organizational, and that's exactly why it's hard. Single-thread solutions won't work.`;
    }

    return `Here's what I'm hearing:

**The mission:** ${data.goal}

**What's in the way:** ${data.blocker}

**The cost of inaction:** ${data.stakes}

**Why internal resources aren't enough:** ${data.internalFriction}

---

${patternRead}

This matters because the approach needs to match the actual constraint — not the surface-level symptom. A lot of failed AI engagements start with the wrong diagnosis of the problem type.

The right next step is a 45-minute briefing with a senior member of our team. We'll pressure-test this framing, identify the highest-leverage first move, and tell you honestly whether we're the right partner — or who might be.`;
  },

  followUps: [
    { label: "Schedule a briefing call", routeId: "talk-to-team" as RouteId },
    { label: "How do you work?", routeId: "how-we-work" as RouteId },
    { label: "Who else have you helped with this?", routeId: "who-we-help" as RouteId },
  ] as FollowUp[],
};

// ─── Route: What does Endurance do? ──────────────────────────────────────────
export const WHAT_WE_DO = {
  message: `Endurance AI Labs is a strategic AI advisory and implementation firm. We work with executive teams on AI initiatives where the stakes are high enough that getting it wrong is not an option.

The short version: we help organizations close the gap between AI ambition and AI reality.

**What that looks like in practice:**

- **Diagnostic work** — understanding where AI will actually move the needle in your specific context, and where it won't. Most organizations have been told AI can do everything. We tell them what it should do *first*, and why.

- **Strategic prioritization** — working with leadership to make a committed bet on the highest-leverage initiative, rather than running five pilots simultaneously and getting nothing to production.

- **Hands-on implementation** — building and shipping production systems alongside your team, with the explicit goal that you own and operate them when we leave.

- **Capability transfer** — embedding the practices, processes, and judgment that allow your internal team to continue improving the system without us.

We are not a software vendor. We don't have a platform to sell. We don't benefit from your dependency on us — in fact, a long engagement is usually a sign something went wrong.`,

  followUps: [
    { label: "What makes you different?", routeId: "what-we-do/different" as RouteId },
    { label: "What are you not?", routeId: "what-we-do/not" as RouteId },
    { label: "Walk me through the methodology", routeId: "how-we-work" as RouteId },
    { label: "Who do you work with?", routeId: "who-we-help" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const WHAT_WE_DO_DIFFERENT = {
  message: `Most firms that do "AI strategy" fall into one of three categories, and all three have the same failure mode.

**Management consultants** can frame the strategic question but can't execute. They hand you a roadmap and leave. You're back where you started, except now you have a 200-page document and six months less runway.

**System integrators** can build things but their incentive is billable hours, not outcomes. The engagement expands. The ownership never transfers. You end up dependent on a vendor relationship you didn't intend to create.

**AI vendors** will tell you their platform solves your problem. It might. But they have a direct financial interest in that answer, which makes independent judgment difficult by design.

We're none of those.

What makes Endurance different is the combination of things we're willing to say. We'll tell you the AI initiative isn't ready to be built yet. We'll tell you the vendor you're considering has a conflict of interest. We'll tell you the internal team dynamics are the real constraint — not the technology.

We can say those things because our only deliverable is a better outcome for the organization. We have no platform to protect, no headcount to keep billable, and no partner comp tied to closing a bigger deal.

That's a rarer position in this market than it should be.`,

  followUps: [
    { label: "What are you not a fit for?", routeId: "what-we-do/not" as RouteId },
    { label: "How do engagements work?", routeId: "how-we-work" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const WHAT_WE_DO_NOT = {
  message: `Being clear about what we're not is important — because the wrong engagement wastes everyone's time.

**We're not the right fit if:**

- You need staff augmentation. We're not a resource pool. We work as a focused team on a defined problem, not as contract labor filling headcount gaps.

- You want a platform recommendation. We'll help you evaluate vendors and structure a decision, but we don't do pure procurement consulting.

- You're looking for AI to automate a business you haven't diagnosed. AI amplifies what's already working. If the underlying process is broken, AI makes it fail faster and at scale.

- You need the work done in four weeks. Our shortest engagement is a focused diagnostic — typically four to six weeks — and that's the minimum needed to give you an honest answer. Anyone promising a comprehensive AI strategy in a two-week sprint is selling you a document, not a strategy.

- You need us to stay forever. If an engagement extends beyond six months without a clear reason, something has gone wrong. We plan for our own obsolescence from day one.

**We are a fit if:**

The initiative is real, the stakes are high, leadership is committed to execution rather than just exploration, and you want a partner who will tell you the truth even when it's inconvenient.`,

  followUps: [
    { label: "What does a typical engagement look like?", routeId: "how-we-work" as RouteId },
    { label: "Who do you work with?", routeId: "who-we-help" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

// ─── Route: Who are you? ──────────────────────────────────────────────────────
export const WHO_ARE_WE = {
  message: `Endurance AI Labs was founded by operators, not researchers.

Our team has spent careers inside organizations — not advising from the outside — making real technology decisions under real constraints. Budget pressure. Legacy systems. Skeptical boards. Execution risk. We've been in those rooms and we've shipped real systems, including ones that failed, which taught us more than the ones that worked.

**Our founder** brings over a decade of experience in applied AI, enterprise architecture, and executive advisory. Before Endurance, they led AI transformation efforts across financial services, healthcare, and infrastructure — organizations where the cost of a wrong decision is measured in regulatory exposure, patient outcomes, or critical infrastructure, not just missed quarterly targets.

**Our team** is small by design. Senior, experienced, and directly involved in every engagement. You will not be handed off to a junior associate six weeks in. The people you talk to in the sales process are the people who will do the work.

**Our philosophy** is grounded in a belief that the current AI market has a serious trust problem. Too many organizations have been sold hype and received mediocre results. Too many "AI strategies" live in slide decks. Too many pilots never reach production.

We named the firm Endurance because this work is hard and results take time. We're built for the long arc — not the quick win that looks good in a case study.`,

  followUps: [
    { label: "What does Endurance do?", routeId: "what-we-do" as RouteId },
    { label: "How do you work?", routeId: "how-we-work" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

// ─── Route: How do you work? ──────────────────────────────────────────────────
export const HOW_WE_WORK = {
  message: `Our method has five phases. Each one has a defined deliverable and a genuine decision point — meaning we check in with you before proceeding, and you can stop.

**1. Diagnose** — We embed in your context to understand the actual problem, not the stated one. Stakeholder interviews, data audits, process mapping. Duration: two to four weeks.

**2. Prioritize** — We work with your leadership to select the highest-leverage first initiative and build the internal case for resourcing it. One committed bet beats five scattered pilots. Duration: one to two weeks.

**3. Deploy** — We build alongside your team. We write code. We integrate. We get to production. Duration: six to fourteen weeks depending on scope.

**4. Embed** — As the system runs, we transfer operational knowledge — documentation, monitoring, governance frameworks, and direct training for the people who will own it. Duration: two to four weeks, concurrent with late deploy.

**5. Transfer** — We define what "done" looks like on day one, not day ninety. When the engagement ends, you are self-sufficient. We include a ninety-day post-transfer check-in in every engagement.

Total engagement: typically three to six months. We do not do open-ended retainers by default.`,

  followUps: [
    { label: "Tell me more about Diagnose", routeId: "how-we-work/diagnose" as RouteId },
    { label: "Tell me more about Prioritize", routeId: "how-we-work/prioritize" as RouteId },
    { label: "Tell me more about Deploy", routeId: "how-we-work/deploy" as RouteId },
    { label: "How do you transfer ownership?", routeId: "how-we-work/transfer" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const HOW_WE_WORK_DIAGNOSE = {
  message: `The Diagnose phase is the most undervalued part of any AI engagement — and the most commonly skipped.

Most organizations come in with a solution already in mind. "We need a chatbot." "We need a recommendation engine." "We need to automate this process." Our first job is to take that seriously and then interrogate it.

**What we actually do in diagnosis:**

We conduct structured interviews at three levels: executives who own the outcome, operators who run the process, and technical leads who understand the data and systems. These almost always surface different versions of the problem — and the gaps between those versions are where the real constraints live.

We do a data infrastructure audit. Not "what data do you have" but "what decisions are actually being made from data today, and how reliable is that process." AI models are only as good as their inputs, and most organizations dramatically overestimate the quality and readiness of their data.

We map the process that AI is supposed to improve. This sounds obvious but is almost never done rigorously. We want to understand where time is lost, where errors occur, where human judgment is genuinely valuable versus where it's just filling a gap that a better system would eliminate.

We do a risk scan. What could go wrong if the AI system is wrong? What's the error tolerance? Who is accountable for bad outputs?

**The output:**

A prioritized opportunity map with three to five initiatives ranked by impact, feasibility, and organizational readiness. Each one has a risk rating and an honest assessment of what would need to be true for it to succeed.

Often the biggest insight from diagnosis isn't what to build — it's what *not* to build, and why.`,

  followUps: [
    { label: "What comes after Diagnose?", routeId: "how-we-work/prioritize" as RouteId },
    { label: "Tell me about the Deploy phase", routeId: "how-we-work/deploy" as RouteId },
    { label: "How do you handle capability transfer?", routeId: "how-we-work/transfer" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const HOW_WE_WORK_PRIORITIZE = {
  message: `Prioritization is where most AI programs fail — even the ones that survive the strategy phase.

The failure mode is predictable: a committee selects multiple initiatives to run in parallel, resources are spread thin, nothing reaches production in a meaningful timeframe, and leadership loses confidence in the program.

**Our approach is deliberately restrictive.**

We force-rank every candidate initiative by a three-factor score: expected impact if it works, confidence in the underlying technical approach, and organizational readiness to absorb the change. The last factor is the one most often ignored.

A technically sound initiative that lands in a part of the organization that isn't ready for it will fail — not because the AI was wrong, but because change management was underestimated. We've seen this enough times to weight it heavily.

**We recommend one primary initiative and one secondary.**

The primary initiative is the one with the best combined score. The secondary is what you move to next, contingent on the primary succeeding. Everything else goes on a backlog with explicit conditions for when to revisit.

**We build the internal case.**

This includes the executive framing — how to present the initiative to stakeholders who need to fund it or change their workflows to accommodate it. We help you set realistic expectations upward and downward. Overpromising at this stage is one of the most common and most damaging mistakes in enterprise AI.

By the end of prioritization, leadership should be aligned, resourcing should be committed, and the success criteria should be agreed and written down.`,

  followUps: [
    { label: "What does Deploy look like?", routeId: "how-we-work/deploy" as RouteId },
    { label: "How do you handle embedding capability?", routeId: "how-we-work/embed" as RouteId },
    { label: "Why do AI pilots typically fail?", routeId: "topic/pilots" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const HOW_WE_WORK_DEPLOY = {
  message: `Deploy is where most consultants disappear and most vendors oversimplify.

We do neither. Our team writes code, integrates with your systems, and ships to production. We work alongside your engineering team — not as a black-box vendor delivering a finished artifact, but as collaborators who are building something you will own.

**What makes this phase hard:**

Data pipelines are almost never in the state they need to be. This isn't a criticism — it's a structural reality. The data was collected for operational purposes, not for training models. Cleaning, reshaping, and making it reliable for production inference is often the longest and least glamorous part of the work.

Legacy system integration is a constraint everywhere. We design for the systems you have, not the ones you wish you had. Our engineers are senior enough to make good architectural decisions under those constraints.

The last-mile problem is real. Getting an AI model to make a good prediction is often easier than getting that prediction into the actual workflow where it changes a decision. We focus intensely on the integration layer — how does the output of this system change what a person does, and does it actually change it for the better?

**What we ship:**

Working software in production. Not a prototype. Not a demo. A system that is being used, that has been tested against real data, and that has monitoring in place so you know when it's working and when it isn't.

We define "done" as: the system is in production, your team can operate it, and the outcome metric we agreed on in prioritization is moving in the right direction.`,

  followUps: [
    { label: "How do you transfer ownership?", routeId: "how-we-work/transfer" as RouteId },
    { label: "What about AI governance?", routeId: "topic/governance" as RouteId },
    { label: "Build vs. buy — how do you think about it?", routeId: "topic/build-vs-buy" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const HOW_WE_WORK_EMBED = {
  message: `The Embed phase is what separates an engagement from a handoff.

Most consulting engagements end with a deliverable. A document. A model. A system. And then the consulting firm leaves, and the organization discovers it doesn't know how to operate, debug, or improve what was built.

We design the Embed phase to prevent that.

**What embedding looks like:**

Operational documentation that is written for the people who will actually use it — not for a future auditor. Step-by-step runbooks for common situations, escalation paths for edge cases, clear ownership for each component of the system.

Monitoring dashboards and alerting. The system will drift. Data distributions shift. Model performance degrades. We build the visibility layer so your team knows when something is wrong before it causes a real problem.

Direct training with the operators. Not a one-time session, but working alongside the people who will run the system through real cases until they are confident and we are confident in them.

Governance frameworks. Who owns decisions when the AI is wrong? What's the process for escalation? How do you update the model when the underlying data or problem changes? These aren't hypothetical — they will happen, and having the answers written down before they happen is the difference between a manageable situation and a crisis.

**The goal:**

Our team is bored. When we're no longer needed to answer questions, debug edge cases, or make judgment calls — when your team is doing all of that — the Embed phase is complete.`,

  followUps: [
    { label: "What does Transfer look like?", routeId: "how-we-work/transfer" as RouteId },
    { label: "What about AI governance specifically?", routeId: "topic/governance" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const HOW_WE_WORK_TRANSFER = {
  message: `Transfer is a commitment we make before the engagement starts.

On day one, we ask: "What does it look like when this engagement is successfully complete?" We write that down. We agree on it with leadership. And we hold ourselves to it.

That definition of done always includes a version of: your team can run, monitor, debug, and improve this system without us.

**What transfer includes:**

Full technical documentation — architecture decisions, dependency rationale, known edge cases and how to handle them, the things we would want to know if we were taking over a codebase cold.

Operational documentation — the runbooks, monitoring guides, and escalation procedures built during Embed.

A formal handover session where we walk through every open question and make sure nothing is left ambiguous.

A ninety-day post-transfer check-in, included in every engagement at no additional cost. If something has gone wrong, or if the team has hit an edge case they didn't anticipate, we want to know. This isn't an upsell opportunity — it's a quality control measure.

**What happens after:**

Some clients retain us for ongoing advisory, typically at a reduced cadence and scope — occasional strategy sessions, model review, or evaluation of new capabilities. Many don't need that, and we're clear about when a client is genuinely self-sufficient versus when they're retaining us out of habit.

The test of a good engagement is whether the organization is stronger because of it — not whether it creates another engagement.`,

  followUps: [
    { label: "How do you price engagements?", routeId: "talk-to-team" as RouteId },
    { label: "Who do you typically work with?", routeId: "who-we-help" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

// ─── Route: Who do you help? ──────────────────────────────────────────────────
export const WHO_WE_HELP = {
  message: `We work with mid-market and enterprise organizations where AI decisions carry real weight.

**The organizations we work best with share a few characteristics:**

Leadership has a genuine commitment to execution — not just exploration. There's a real problem to solve, real resources behind it, and real accountability for outcomes. If the initiative exists primarily to demonstrate AI investment to a board or investor, we're not the right fit.

The stakes are high enough that a mediocre outcome is worse than no outcome. In regulated industries, healthcare, infrastructure, financial services — the cost of a wrong AI decision isn't just a missed opportunity. It's regulatory exposure, operational failure, or worse.

There's organizational readiness to absorb change. Not perfection — we've never worked with a perfectly ready organization — but enough leadership alignment and operational maturity that a serious implementation won't be killed by internal friction before it ships.

**Four types of clients:**

- Organizations in regulated industries navigating the compliance and governance dimension of AI
- Leadership teams with a board mandate and no credible roadmap
- Organizations recovering from a failed AI investment and trying to understand what went wrong
- Internal AI teams that have the technical capability but lack executive alignment and organizational backing

If you're unsure whether you fit, the best diagnostic is the mission intake.`,

  followUps: [
    { label: "Tell me about regulated industry work", routeId: "who-we-help/regulated" as RouteId },
    { label: "We had a failed AI initiative", routeId: "who-we-help/failed-pilot" as RouteId },
    { label: "We have a mandate but no roadmap", routeId: "who-we-help/mandate" as RouteId },
    { label: "We have a strong AI team internally", routeId: "who-we-help/internal-team" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const WHO_WE_HELP_REGULATED = {
  message: `Regulated industries are where AI ambition collides hardest with operational reality — and where the gap between "technically possible" and "deployable" is widest.

**The core tension:**

AI capabilities advance faster than regulatory frameworks can adapt to them. That's not going to change in the near term. Which means organizations in financial services, healthcare, energy, and insurance are making consequential AI decisions in an environment of genuine regulatory ambiguity — and the cost of guessing wrong is measured in more than missed targets.

**What we bring:**

We don't pretend to be your legal counsel or compliance officer. But we've worked in enough regulated environments to know how to design AI systems that can be audited, explained, and modified when requirements change.

That means explainability by design — not as a retrofit. It means building audit trails into the architecture from the beginning. It means risk tiering use cases by their exposure profile before a single line of code is written. It means governance frameworks that your compliance team can actually work with, not AI governance theater.

**Where we've seen this matter most:**

Credit and fraud decision systems where the model's reasoning needs to be defensible to a regulator. Clinical decision support where the liability for a wrong recommendation needs a clear ownership chain. Infrastructure optimization where a failure mode isn't a user complaint — it's a safety incident.

The pattern in all of these: the organizations that do this well are the ones that treated governance as a design constraint, not a compliance checkbox.`,

  followUps: [
    { label: "How do you approach AI governance?", routeId: "topic/governance" as RouteId },
    { label: "How do you work?", routeId: "how-we-work" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const WHO_WE_HELP_FAILED_PILOT = {
  message: `A failed AI initiative is one of the most common — and most recoverable — situations we work in.

The failure is almost never what it looks like on the surface.

**The four failure modes we see repeatedly:**

**Wrong problem.** The initiative was technically successful but solved a problem that didn't actually constrain the business. The model worked. Nothing changed. This usually traces back to a diagnostic that was too shallow — or a vendor who was more interested in selling than in understanding.

**Right problem, wrong approach.** The use case was correct but the technical method was overcomplicated, underspecified, or chosen because it was interesting rather than because it was appropriate. LLMs where a simpler classifier would have worked. Deep learning where a rules engine was sufficient. Complexity that couldn't be maintained.

**Right approach, poor execution.** The model was reasonable but it never reached production. Data pipelines weren't built. Integration was underestimated. The build partner shipped a prototype and considered their obligation complete.

**Right execution, poor change management.** The system reached production but the organization wasn't ready for it. Users didn't trust the output. Process redesign wasn't done. The initiative was technically complete and operationally dead.

**What a recovery engagement looks like:**

We start with a post-mortem — not to assign blame, but to correctly diagnose the failure mode. Then we identify what's salvageable. Usually more than teams think. Then we design a path forward that addresses the actual constraint, not the symptom.`,

  followUps: [
    { label: "Why do AI pilots typically fail?", routeId: "topic/pilots" as RouteId },
    { label: "How do you work?", routeId: "how-we-work" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const WHO_WE_HELP_MANDATE = {
  message: `"The board wants us to move on AI" is one of the most dangerous phrases in technology leadership right now.

Not because AI isn't important. It is. But because the pressure to move quickly creates predictable traps.

**The trap of over-promising:**

Leadership, eager to show momentum, commits to timelines and outcomes that aren't grounded in what the organization is actually ready to do. The pilot runs. The demo looks good. Production is eighteen months away and nobody says so until the sixth month. Trust is damaged.

**The trap of the wrong first bet:**

The initiative that's most visible — or most politically tractable — gets chosen over the one with the best probability of success. High-visibility projects concentrate risk. A failure here damages the entire program, not just one initiative.

**The trap of the vendor relationship:**

In the absence of a clear strategy, organizations default to vendor solutions. The vendor's product becomes the roadmap. The organization's specific context — its data, its workflows, its constraints — becomes secondary to what the platform can do.

**What we help with:**

Building a roadmap that is honest about constraints and realistic about timelines. Selecting the first initiative based on probability of success, not visibility. Giving you the vocabulary and framing to manage expectations at the board level and below. And designing a first engagement that, even if it underperforms, doesn't damage the program's credibility.

The goal is a durable AI capability, not a good AI story.`,

  followUps: [
    { label: "What does a first engagement look like?", routeId: "how-we-work" as RouteId },
    { label: "How do you prioritize initiatives?", routeId: "how-we-work/prioritize" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const WHO_WE_HELP_INTERNAL_TEAM = {
  message: `Having strong internal AI capability and still needing outside help is not a contradiction — it's actually the situation where outside perspective creates the most value.

**The pattern we see:**

The internal team is technically solid. They understand models, they can build pipelines, they've shipped things. But the work keeps getting deprioritized, redesigned, or redirected. Projects that should take six months take eighteen. Executive support is inconsistent. The team is doing good work that isn't landing.

**Why this happens:**

Technical teams and executive teams often speak different languages about the same problem. The engineering team is optimizing for correctness and scalability. Leadership is optimizing for business outcome and organizational change. Without someone who can operate fluently in both registers, the translation fails — repeatedly.

**What we provide in this context:**

Not technical execution — your team can do that. What we provide is the strategic layer: helping leadership understand what the team is building and why it matters, helping the team understand what leadership actually needs and what success looks like in business terms, and acting as a translator and advocate in the space between them.

We've also found that external validation carries weight in a way internal advocacy sometimes doesn't. When we tell a leadership team that their AI team's approach is sound and the blocker is organizational rather than technical, that assessment lands differently than when the AI team says it themselves.`,

  followUps: [
    { label: "How do you work with internal teams?", routeId: "how-we-work" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

// ─── Topic routes — accessible via free text or follow-ups ───────────────────

export const TOPIC_PILOTS = {
  message: `Pilot programs fail for predictable reasons. Understanding them is the first step to avoiding them.

**The most common failure mode: no production path defined at the start.**

A pilot is scoped as an exploration. Success is defined as "learn something." There's no answer to the question: if this works, what happens next? Who owns it? What infrastructure does it need? What processes change? When this is undefined at the start, success in the pilot creates a new problem — a working prototype that no one knows how to turn into a production system.

**The second most common: wrong success criteria.**

Output metrics instead of outcome metrics. "The model achieved 94% accuracy on the test set" is an output. "Underwriting decisions that used the model's recommendation resulted in 18% lower loss ratios" is an outcome. Organizations celebrate the first and wonder why nothing changed.

**The third: organizational readiness was assumed, not assessed.**

The technical work succeeded. The pilot proved the concept. And then the system sat on a shelf because the users didn't trust it, the workflow wasn't redesigned to incorporate it, or the team that built it was disbanded and nobody else was accountable for deployment.

**What pilots are actually good for:**

Validating a specific technical hypothesis under real data conditions. Measuring the actual effort of integration versus the estimated effort. Building early organizational buy-in before a full commitment.

What they're not good for: as a substitute for a committed decision to deploy. If the organization isn't willing to commit to deployment contingent on success, the pilot is theater — expensive learning with no path to impact.`,

  followUps: [
    { label: "How do you approach deployment?", routeId: "how-we-work/deploy" as RouteId },
    { label: "We had a failed pilot — can you help?", routeId: "who-we-help/failed-pilot" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const TOPIC_BUILD_VS_BUY = {
  message: `Build versus buy is one of the most consequential and most poorly analyzed decisions in AI strategy.

The default answer in enterprise technology has historically been "buy" — and for good reasons. Vendors carry development risk. Integrations are faster. Established products have been tested by many users.

AI changes some of those assumptions.

**When buying makes sense:**

The problem is generic. If you're doing something many organizations do — customer support routing, document extraction, churn prediction — a vendor solution is probably reasonable. You're not building a competitive advantage here; you're meeting a baseline operational need.

The speed of deployment matters more than the quality of the solution. Sometimes getting to 80% of optimal quickly is more valuable than getting to 100% in eighteen months.

You genuinely lack the capability to maintain what you build. This is more honest than most organizations are willing to be, but it's a legitimate reason.

**When building makes sense:**

The problem is specific to your context. Your data, your workflows, your constraints. A vendor solution will fit your problem the way a mass-market suit fits — adequately but not well.

You need to own the capability. If AI is going to be a durable competitive advantage, you cannot outsource its development without outsourcing the advantage itself.

The vendor's solution creates dependency that isn't justified by the value. Vendor lock-in isn't inherently bad if the value is real. But many organizations discover they've traded short-term convenience for long-term fragility.

**The honest answer:**

Most organizations should buy for commodity needs and build for differentiated ones. The error is usually building when buying would have been fine, or buying when they need to own the capability.`,

  followUps: [
    { label: "How do you evaluate AI vendors?", routeId: "talk-to-team" as RouteId },
    { label: "What does your build process look like?", routeId: "how-we-work/deploy" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const TOPIC_LLMS = {
  message: `Large language models are genuinely powerful and genuinely over-applied. Knowing which situation you're in matters more than most teams currently appreciate.

**Where LLMs are clearly the right tool:**

Tasks that require language understanding, generation, or synthesis at scale — document analysis, content generation, conversational interfaces, summarization of unstructured text, code assistance. If the core problem is "make sense of language" or "generate coherent language under constraints," LLMs are often the best available tool.

**Where LLMs are the wrong tool:**

Structured prediction problems. If you're predicting a number, a category, or a yes/no decision from structured data — customer churn, credit risk, equipment failure — you don't need an LLM. A gradient boosted tree or logistic regression will outperform an LLM, train on far less data, be faster, cheaper, and more interpretable.

Process automation that follows deterministic rules. LLMs introduce probabilistic behavior. If the process you're automating needs to follow rules reliably and be audited, a rules engine or simpler classifier is more appropriate.

High-stakes decisions where explainability is required. "The model thought this was the right answer" is not an acceptable explanation in a credit decision, a medical diagnosis, or a regulatory filing. There are ways to build explainability into LLM systems, but it requires significant additional engineering and is often not worth the effort when simpler models are available.

**The question worth asking:**

Before defaulting to an LLM: what is the simplest model class that could solve this problem at the required quality level? The answer is often surprising.`,

  followUps: [
    { label: "Build vs. buy on AI infrastructure", routeId: "topic/build-vs-buy" as RouteId },
    { label: "What about AI governance and risk?", routeId: "topic/governance" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

export const TOPIC_GOVERNANCE = {
  message: `AI governance is one of those topics that most organizations approach in one of two ways — both wrong.

The first: treat it as a compliance exercise. Build a framework document, get it signed off, file it somewhere, and proceed as though the risk is managed. The framework never touches the actual systems.

The second: defer it entirely. "We'll figure out governance once we have something deployed." By then, the decisions that governance was supposed to shape have already been made — in the architecture, in the data pipeline, in the user interface.

**What good governance actually requires:**

**Risk tiering at the use-case level.** Not all AI applications carry the same risk profile. A recommendation engine for content has different governance requirements than a credit decisioning system or a clinical decision support tool. Governance that treats these the same is governance that's not actually protecting anyone.

**Explainability as a design constraint, not a retrofit.** If you need to be able to explain why an AI system made a decision — to a regulator, to a customer, to an internal auditor — that requirement needs to shape the architecture from the beginning. Explainability bolted onto a black-box model after deployment is expensive and usually incomplete.

**Defined accountability.** When the AI is wrong, who is responsible? This question is uncomfortable and therefore often left unanswered. It should be answered before deployment, in writing, with clear escalation paths.

**Monitoring and drift detection.** AI systems degrade. Data distributions shift. The model that was performing well at deployment will perform differently twelve months later. Governance needs to include the ongoing operational layer, not just the deployment decision.

**Model cards and audit trails.** Documentation of training data, known limitations, test performance, and deployment decisions. Not for external consumption necessarily, but for the internal knowledge that makes it possible to debug, update, and defend the system over time.`,

  followUps: [
    { label: "Governance in regulated industries specifically", routeId: "who-we-help/regulated" as RouteId },
    { label: "How do you handle this in the deploy phase?", routeId: "how-we-work/deploy" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const TOPIC_TIMELINE = {
  message: `Timeline expectations in AI projects are consistently wrong, and usually wrong in the same direction.

**The honest picture:**

A focused, well-scoped AI initiative — from diagnosis through production deployment — takes three to six months. Not two weeks. Not a year. Three to six months, if the scope is controlled and the organization is reasonably prepared.

What makes it take longer than that is almost never the AI itself.

**The real timeline drivers:**

Data readiness is the most common constraint. Organizations routinely discover that the data they assumed was ready for AI isn't — it's incomplete, inconsistently labeled, stored in systems that don't have good export paths, or owned by teams that aren't aligned on sharing it. Resolving data issues typically adds four to eight weeks to any engagement.

Stakeholder alignment is the second most common constraint. The initiative that looked aligned in the kickoff meeting hits friction when it reaches the teams whose workflows will change. Navigating that friction without losing momentum is time-consuming.

Integration complexity is the third. Connecting a new AI system to existing infrastructure — enterprise software, legacy databases, real-time data feeds — is almost always harder than the initial estimate.

**What to tell leadership:**

The honest framing is: a focused first initiative in three to six months, followed by an evaluation of what to do next. Not "AI transformation by Q4." That framing is almost always wrong and sets up the kind of expectation gap that kills programs.

The organizations that sustain AI capability are the ones that sequence their ambition — early wins at a pace the organization can absorb, not a big bet that overwhelms it.`,

  followUps: [
    { label: "How do you scope an engagement?", routeId: "how-we-work" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],
};

export const TOPIC_TALENT = {
  message: `AI talent strategy is where organizations consistently make expensive mistakes — in both directions.

**The over-hire:**

Hiring a team of ML engineers before you have a production-ready use case. The team builds impressive things that don't connect to business outcomes. Eighteen months later, leadership concludes that AI isn't working, the team is frustrated, and a significant talent investment has been wasted.

The prerequisite for a strong AI team is a clear problem to solve, data infrastructure that can support it, and organizational processes that can absorb the output. Building the team before those conditions exist is building on sand.

**The under-invest:**

Treating AI as a one-time initiative rather than an ongoing capability. Bringing in a consulting firm, shipping something, and then having no one internally who can maintain, improve, or extend it. The initiative succeeds and then quietly degrades.

**What actually works:**

Start with a small, senior team rather than a large junior one. Three engineers who understand the full stack — data, modeling, deployment, monitoring — are worth more than ten who can each do one part.

Build internal capability in parallel with external delivery. Every engagement should be designed to make your internal team more capable at the end than at the beginning. If it doesn't, you've bought a deliverable, not a capability.

Treat AI ops as a real function. The team that builds models and the team that operates them in production have different skills. This distinction is often missed until it creates an operational problem.

**The talent question underneath the talent question:**

Most organizations don't actually need to hire more AI talent. They need to better direct the AI talent they already have. That's usually a strategy and alignment problem, not a headcount problem.`,

  followUps: [
    { label: "We have an internal AI team", routeId: "who-we-help/internal-team" as RouteId },
    { label: "How do you transfer capability to our team?", routeId: "how-we-work/embed" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

// ─── Route: Support ───────────────────────────────────────────────────────────
export const SUPPORT = {
  intro: `We're here. What kind of support do you need?`,

  followUps: [
    { label: "I'm an existing client", stepAction: "existing-client" },
    { label: "I have a general question", stepAction: "general-inquiry" },
    { label: "I want to reach someone directly", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],

  existingClient: `For existing clients, your first contact is your engagement lead. They have direct responsibility for your situation and the context to help.

If you can't reach them or the matter is time-sensitive, email **support@endurancelabs.ai** with your engagement name in the subject line. We treat client inquiries as priority and respond within four business hours during operating hours (9am–6pm ET, Monday through Friday).

For urgent situations outside those hours, your engagement lead's mobile is in your engagement kickoff document.`,

  generalInquiry: `The fastest path to the right person is a direct message.

Email us at **hello@endurancelabs.ai** — we read everything and respond within one business day. If your question is time-sensitive or complex, say so in the subject line and we'll prioritize accordingly.

Alternatively, the mission intake is a good starting point if you have a specific initiative in mind — it gives us the context to respond usefully rather than generically.`,

  existingClientFollowUps: [
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
  ] as FollowUp[],

  generalInquiryFollowUps: [
    { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
    { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
  ] as FollowUp[],
};

// ─── Route: Talk to the team ──────────────────────────────────────────────────
export const TALK_TO_TEAM = {
  message: `The best starting point is a briefing call — 45 minutes with a senior member of our team.

We don't do discovery calls disguised as sales calls. This is a direct conversation: you tell us what you're working on, we tell you honestly whether and how we can help, and if we're not the right fit, we'll say so and point you toward someone who might be.

**Schedule a call:**
[Book a briefing →](https://cal.endurancelabs.ai/briefing)

**Send a message:**
[hello@endurancelabs.ai](mailto:hello@endurancelabs.ai)

**LinkedIn:**
[Endurance AI Labs](https://linkedin.com/company/endurance-ai-labs)

If you've already done the mission intake, include that summary when you reach out — it saves the first fifteen minutes of the call and lets us come to the conversation better prepared.`,

  followUps: [
    { label: "Do the mission intake first", routeId: "mission-intake" as RouteId },
    { label: "Learn more about how we work", routeId: "how-we-work" as RouteId },
  ] as FollowUp[],
};

// ─── Free text intent matching ────────────────────────────────────────────────

interface IntentMatch {
  message: string;
  followUps: FollowUp[];
  routeId?: RouteId;
}

export function matchFreeTextIntent(input: string): IntentMatch | null {
  const lower = input.toLowerCase();
  const has = (...terms: string[]) => terms.some((t) => lower.includes(t));

  // Pricing / cost
  if (has("price", "cost", "rate", "fee", "how much", "pricing", "budget", "invoice")) {
    return {
      message: `We scope engagements individually based on the nature and duration of the work.

A focused diagnostic — four to six weeks, one or two senior people, a clear deliverable — is priced very differently from a full deploy-and-transfer engagement running four to five months.

We don't publish rates because the honest answer is: it depends on the problem, and quoting before we understand the problem leads to misaligned expectations on both sides.

The right starting point is a brief conversation. We'll understand your situation, tell you what kind of engagement would make sense, and give you a clear cost picture. If it doesn't fit your budget, we'll tell you that directly too.`,
      followUps: [
        { label: "Schedule a briefing call", routeId: "talk-to-team" as RouteId },
        { label: "What does a typical engagement involve?", routeId: "how-we-work" as RouteId },
      ],
    };
  }

  // Pilot / POC
  if (has("pilot", "proof of concept", "poc", "prototype", "experiment", "test the idea")) {
    return { message: TOPIC_PILOTS.message, followUps: TOPIC_PILOTS.followUps, routeId: "topic/pilots" };
  }

  // Build vs. buy
  if (has("build vs buy", "build versus buy", "make or buy", "vendor selection", "which vendor", "what tool", "what platform", "off the shelf")) {
    return { message: TOPIC_BUILD_VS_BUY.message, followUps: TOPIC_BUILD_VS_BUY.followUps, routeId: "topic/build-vs-buy" };
  }

  // LLMs / ChatGPT
  if (has("llm", "chatgpt", "gpt", "claude", "gemini", "openai", "anthropic", "language model", "large language", "generative ai", "gen ai")) {
    return { message: TOPIC_LLMS.message, followUps: TOPIC_LLMS.followUps, routeId: "topic/llms" };
  }

  // Governance / risk / compliance
  if (has("governance", "compliance", "regulation", "regulatory", "audit", "risk management", "explainability", "explainable", "bias", "fairness", "accountability")) {
    return { message: TOPIC_GOVERNANCE.message, followUps: TOPIC_GOVERNANCE.followUps, routeId: "topic/governance" };
  }

  // Timeline / how long
  if (has("how long", "timeline", "time frame", "timeframe", "when will", "duration", "how many months", "how many weeks", "how fast")) {
    return { message: TOPIC_TIMELINE.message, followUps: TOPIC_TIMELINE.followUps, routeId: "topic/timeline" };
  }

  // Talent / hiring / team
  if (has("hire", "hiring", "talent", "team", "headcount", "data scientist", "ml engineer", "machine learning engineer", "ai team", "build a team", "grow a team")) {
    return { message: TOPIC_TALENT.message, followUps: TOPIC_TALENT.followUps, routeId: "topic/talent" };
  }

  // Failed initiative / previous attempt
  if (has("failed", "failure", "didn't work", "didn't work out", "went wrong", "not working", "previous attempt", "tried before", "wasted", "sunk cost")) {
    return { message: WHO_WE_HELP_FAILED_PILOT.message, followUps: WHO_WE_HELP_FAILED_PILOT.followUps, routeId: "who-we-help/failed-pilot" };
  }

  // Board / executive / mandate
  if (has("board", "mandate", "investor", "ceo asked", "told us to", "leadership is asking", "pressure from", "executive directive")) {
    return { message: WHO_WE_HELP_MANDATE.message, followUps: WHO_WE_HELP_MANDATE.followUps, routeId: "who-we-help/mandate" };
  }

  // ROI / business case / value
  if (has("roi", "return on investment", "business case", "justify", "make the case", "value", "benefit", "how do i convince", "convince leadership")) {
    return {
      message: `Making the case for AI investment is a real challenge — and the framing matters more than most people realize.

The error most teams make is leading with technology capabilities. "We can build a model that achieves X accuracy." That framing loses leadership immediately, because it answers a question nobody was asking.

The frame that works: start with the cost of the status quo. Not the potential upside of AI, but the current cost of doing things the way they're done now — in time, in error rate, in missed revenue, in operational risk. Then describe what changes if that cost is reduced or eliminated.

**What a credible business case requires:**

A specific problem with a measurable baseline. "Our underwriters spend 40% of their time on data gathering that doesn't require human judgment" is a specific problem. "We want to improve efficiency with AI" is not.

A realistic estimate of improvement — not best case, but expected case. And an honest acknowledgment of what the system won't do and what risks it introduces.

A total cost of ownership that includes implementation, ongoing operation, and maintenance — not just the build cost.

A timeline that is honest about data readiness, integration complexity, and organizational change requirements.

The organizations that win internal approval are the ones who present a credible, conservative case rather than an optimistic one. Credibility is the asset.`,
      followUps: [
        { label: "How do you prioritize initiatives?", routeId: "how-we-work/prioritize" as RouteId },
        { label: "We have a board mandate", routeId: "who-we-help/mandate" as RouteId },
        { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
      ],
    };
  }

  // Data / data quality / data readiness
  if (has("data quality", "data readiness", "data problem", "data infrastructure", "data pipeline", "bad data", "messy data", "not enough data")) {
    return {
      message: `Data quality is the constraint that derails more AI initiatives than any other — and it's consistently underestimated at the outset.

The framing that causes the most damage: treating data readiness as a prerequisite that can be verified quickly. "Yes, we have the data" is almost never the complete answer. The relevant questions are: Is it labeled? Is it clean? Is it representative of the real distribution? Is it accessible in a form that can be used for training and inference? Is there a reliable pipeline to keep it current?

**The most common data failure modes:**

The data exists but isn't labeled. You have records of outcomes, but the labels needed to train a supervised model aren't there — or are inconsistently applied across sources or time periods.

The data was collected for a different purpose. Operational data is collected to run operations, not to train models. The fields that would be most predictive often aren't captured, or are captured inconsistently.

The data is fragmented. It lives across multiple systems, owned by different teams, with different schemas and different update frequencies. Unifying it takes engineering work that isn't visible in the initial estimate.

**What this means practically:**

Data work is typically 40-60% of the effort in an AI implementation. This is true even for experienced teams working in mature organizations. Build it into the timeline and the budget from the beginning.

The diagnostic phase is where we assess data readiness honestly — before any commitment to build.`,
      followUps: [
        { label: "What does your diagnostic look like?", routeId: "how-we-work/diagnose" as RouteId },
        { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
        { label: "Talk to the team", routeId: "talk-to-team" as RouteId },
      ],
    };
  }

  // Change management / adoption / user resistance
  if (has("change management", "adoption", "user resistance", "employees won't use", "team doesn't trust", "skepticism", "cultural resistance", "won't adopt")) {
    return {
      message: `Adoption failure is one of the most common — and least discussed — reasons AI initiatives underperform.

The pattern: a technically sound system ships to production, and usage is low, declining, or forced. Users don't trust the output. Workflows weren't redesigned. The system was added on top of existing processes rather than integrated into them.

**Why this happens:**

Change management is treated as a communication task rather than a design task. Sending an email announcing a new tool is not change management. Redesigning the workflow so the tool is the path of least resistance is change management.

The people whose work is changing aren't involved in the design. AI systems that change how work gets done need to be designed with input from the people doing the work — not just the people who assigned the project.

Adoption is assumed rather than measured. Nobody defined what "successful adoption" looks like before deployment, so there's no signal when adoption is failing.

**What actually works:**

Define adoption metrics before deployment — not usage rates (vanity metrics) but outcome metrics: are decisions better, faster, or less costly because of the system?

Involve end users in design and testing, not just UAT. Their understanding of edge cases and workflow reality is irreplaceable.

Design the system so the AI-assisted path is easier than the unassisted path. If using the AI requires more steps than not using it, it won't be used.

Treat resistance as information. Users who don't trust the system often have legitimate reasons — edge cases the model handles poorly, contexts where the recommendations are wrong. That feedback is valuable.`,
      followUps: [
        { label: "How do you handle embedding capability?", routeId: "how-we-work/embed" as RouteId },
        { label: "Why do pilots typically fail?", routeId: "topic/pilots" as RouteId },
        { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
      ],
    };
  }

  // What makes you different / competitors
  if (has("what makes you different", "why not mckinsey", "why not deloitte", "why not accenture", "vs consulting", "competitor", "how are you different", "other firms", "other consultants")) {
    return { message: WHAT_WE_DO_DIFFERENT.message, followUps: WHAT_WE_DO_DIFFERENT.followUps, routeId: "what-we-do/different" };
  }

  // AI strategy generally
  if (has("ai strategy", "ai roadmap", "strategic plan", "ai vision", "where to start with ai")) {
    return {
      message: `AI strategy is one of those phrases that means everything and nothing, depending on who's using it.

When organizations say they need an AI strategy, they usually mean one of three things — and those three things require very different work.

**"We don't know where to start."** The problem is orientation. There are too many possibilities, no clear prioritization framework, and no shared language for evaluating options. What's needed is a structured diagnostic — not a strategy document, but an assessment of where AI can create real value in your specific context.

**"We know where we want to go but can't get there."** The problem is execution. The strategy exists, but it's stuck at the planning layer. Pilots are running but nothing ships. Internal alignment keeps breaking down. What's needed is someone who can help you make and sustain a committed choice — and then actually build it.

**"We have something deployed but it's not working."** The problem is either technical, organizational, or both. What's needed is an honest post-mortem and a recovery plan.

The reason strategy work so often fails is that it addresses the first problem when the actual constraint is the second or third.

Which of these most describes where you are?`,
      followUps: [
        { label: "We don't know where to start", routeId: "how-we-work/diagnose" as RouteId },
        { label: "We're stuck in pilot mode", routeId: "topic/pilots" as RouteId },
        { label: "We had a failed initiative", routeId: "who-we-help/failed-pilot" as RouteId },
        { label: "Brief us on a mission", routeId: "mission-intake" as RouteId },
      ],
    };
  }

  return null;
}

// ─── Fallback for unmatched free text ────────────────────────────────────────
export const FREE_TEXT_FALLBACK = `That's a question worth taking seriously — and the honest answer is that context matters too much for a useful generic response.

The most direct path to a real answer is a conversation with our team, where we can understand your specific situation rather than guess at it.

Is there a particular aspect of AI strategy, implementation, or organizational change you're trying to think through? If you give me more context, I may be able to point you toward something specific.`;

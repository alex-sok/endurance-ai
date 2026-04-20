import OpenAI from "openai";
import { rateLimit, getIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = [
  "https://endurancelabs.ai",
  "https://www.endurancelabs.ai",
];

function sanitize(value: unknown, maxLen = 500): string {
  return String(value ?? "")
    .trim()
    .replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c] ?? c))
    .slice(0, maxLen);
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export type NotifyPayload =
  | {
      type: "mission-intake";
      name: string;
      email: string;
      company: string;
      mission: string;
      obstacle: string;
      stakes: string;
      internalChallenges: string;
      messages: ConversationMessage[];
    }
  | {
      type: "talk-to-team";
      messages: ConversationMessage[];
    }
  | {
      type: "lead-capture";
      name: string;
      email: string;
      company: string;
      messages: ConversationMessage[];
    };

interface ScoreResult {
  score: number;
  reasoning: string;
}

// ── Score the conversation with Grok ─────────────────────────────────────────
async function scoreConversation(
  messages: ConversationMessage[],
  context: string
): Promise<ScoreResult> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { score: 0, reasoning: "Scoring unavailable." };

  // Instantiate inside the function so the SDK never runs at build time
  const client = new OpenAI({ apiKey, baseURL: "https://api.x.ai/v1" });

  const transcript = messages
    .map((m) => `${m.role === "user" ? "Prospect" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  try {
    const res = await client.chat.completions.create({
      model: "grok-3",
      max_tokens: 256,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You score inbound prospect conversations for Endurance AI Labs, a strategic AI advisory firm.
Return ONLY valid JSON: { "score": number 0-100, "reasoning": "2-3 sentences max" }

Scoring criteria:
- 80-100: Strong buyer. Completed mission intake with specific problem, urgency/mandate signals, asks about pricing or timeline, decision-maker language.
- 60-79: Warm lead. Engaged deeply, real initiative in mind, substantive follow-up questions.
- 40-59: Exploratory. Browsing and learning, no specific initiative articulated yet.
- 20-39: Low engagement. Generic questions, no real problem shared.
- 0-19: Minimal signal. Bounced quickly or off-topic.`,
        },
        {
          role: "user",
          content: `Context: ${context}\n\nConversation:\n${transcript}`,
        },
      ],
    });

    const parsed = JSON.parse(res.choices[0]?.message?.content ?? "{}");
    return {
      score: typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 0,
      reasoning: parsed.reasoning ?? "",
    };
  } catch {
    return { score: 0, reasoning: "Scoring failed." };
  }
}

// ── Slack message ─────────────────────────────────────────────────────────────
function buildSlackMessage(payload: NotifyPayload, score: ScoreResult) {
  const emoji = score.score >= 75 ? "🔥" : score.score >= 50 ? "⚡" : "💬";
  const label = score.score >= 75 ? "Hot" : score.score >= 50 ? "Warm" : "Cool";

  const headerText =
    payload.type === "mission-intake" ? `${emoji} New Mission Intake`
    : payload.type === "lead-capture"  ? `${emoji} New Lead Captured`
    : `${emoji} Talk-to-Team Request`;

  const blocks: object[] = [
    {
      type: "header",
      text: { type: "plain_text", text: headerText, emoji: true },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: score.reasoning
          ? `*${label} lead — ${score.score}/100*\n${score.reasoning}`
          : `*${label} lead — ${score.score}/100*`,
      },
    },
    { type: "divider" },
  ];

  if (payload.type === "mission-intake") {
    blocks.push({
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name*\n${payload.name || "—"}` },
        { type: "mrkdwn", text: `*Email*\n${payload.email ? `<mailto:${payload.email}|${payload.email}>` : "—"}` },
        { type: "mrkdwn", text: `*Company*\n${payload.company || "—"}` },
      ],
    });
    blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Mission*\n${payload.mission}` },
        { type: "mrkdwn", text: `*Obstacle*\n${payload.obstacle}` },
        { type: "mrkdwn", text: `*Stakes*\n${payload.stakes}` },
        { type: "mrkdwn", text: `*Internal Challenges*\n${payload.internalChallenges}` },
      ],
    });
  } else if (payload.type === "lead-capture") {
    blocks.push({
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name*\n${payload.name || "—"}` },
        { type: "mrkdwn", text: `*Email*\n${payload.email ? `<mailto:${payload.email}|${payload.email}>` : "—"}` },
        { type: "mrkdwn", text: `*Company*\n${payload.company || "—"}` },
      ],
    });
  } else {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: "Someone clicked the briefing CTA." },
    });
  }

  blocks.push({
    type: "actions",
    elements: [
      {
        type: "button",
        text: { type: "plain_text", text: "Reply →", emoji: true },
        url: "mailto:hello@endurancelabs.ai",
        style: "primary",
      },
    ],
  });

  return { blocks };
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip = getIP(request);
  if (!rateLimit(ip, 10, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  // ── Origin check (production only) ────────────────────────────────────────
  if (process.env.NODE_ENV === "production") {
    const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
    if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  let payload: NotifyPayload;
  try {
    const raw = await request.json();
    // Sanitize all user-supplied string fields
    if (raw.name)               raw.name               = sanitize(raw.name);
    if (raw.email)              raw.email              = sanitize(raw.email, 254);
    if (raw.company)            raw.company            = sanitize(raw.company);
    if (raw.mission)            raw.mission            = sanitize(raw.mission);
    if (raw.obstacle)           raw.obstacle           = sanitize(raw.obstacle);
    if (raw.stakes)             raw.stakes             = sanitize(raw.stakes);
    if (raw.internalChallenges) raw.internalChallenges = sanitize(raw.internalChallenges);
    payload = raw as NotifyPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[notify] SLACK_WEBHOOK_URL is not set");
    return new Response("ok", { status: 200 });
  }

  const context =
    payload.type === "mission-intake"
      ? `Prospect completed the full mission intake. Name: ${payload.name || "unknown"}. Company: ${payload.company || "unknown"}. Mission: ${payload.mission}`
      : payload.type === "lead-capture"
      ? `Prospect provided contact info through chat. Name: ${payload.name || "unknown"}. Company: ${payload.company || "unknown"}.`
      : "Prospect clicked the Talk to Team CTA.";

  // Race scoring against a 6s timeout — Slack sends regardless
  const timeout = new Promise<ScoreResult>((resolve) =>
    setTimeout(() => resolve({ score: 0, reasoning: "" }), 6000)
  );
  const score = await Promise.race([
    scoreConversation(payload.messages, context),
    timeout,
  ]);

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildSlackMessage(payload, score)),
  }).catch((err) => {
    console.error("[notify] Slack fetch failed:", err);
    return null;
  });

  if (slackRes && !slackRes.ok) {
    const body = await slackRes.text().catch(() => "");
    console.error(`[notify] Slack returned ${slackRes.status}: ${body}`);
  }

  return new Response("ok", { status: 200 });
}

import OpenAI from "openai";

export const dynamic = "force-dynamic";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export type NotifyPayload =
  | {
      type: "mission-intake";
      goal: string;
      blocker: string;
      stakes: string;
      internalFriction: string;
      messages: ConversationMessage[];
    }
  | {
      type: "talk-to-team";
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
  const isMission = payload.type === "mission-intake";

  const blocks: object[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: isMission ? `${emoji} New Mission Intake` : `${emoji} Talk-to-Team Request`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${label} lead — ${score.score}/100*\n${score.reasoning}`,
      },
    },
    { type: "divider" },
  ];

  if (isMission) {
    blocks.push({
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Mission*\n${payload.goal}` },
        { type: "mrkdwn", text: `*Blocker*\n${payload.blocker}` },
        { type: "mrkdwn", text: `*Stakes*\n${payload.stakes}` },
        { type: "mrkdwn", text: `*Friction*\n${payload.internalFriction}` },
      ],
    });
  } else {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Someone clicked the briefing CTA.",
      },
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
  let payload: NotifyPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return new Response("ok", { status: 200 });

  const context =
    payload.type === "mission-intake"
      ? `Prospect completed the full mission intake. Goal: ${payload.goal}`
      : "Prospect clicked the Talk to Team CTA.";

  const score = await scoreConversation(payload.messages, context);

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildSlackMessage(payload, score)),
  }).catch(() => {});

  return new Response("ok", { status: 200 });
}

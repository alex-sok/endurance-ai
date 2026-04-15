import OpenAI from "openai";
import { Resend } from "resend";

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
  signals: string[];
}

// ── Score the conversation with Grok ─────────────────────────────────────────
async function scoreConversation(
  messages: ConversationMessage[],
  context: string
): Promise<ScoreResult> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { score: 0, reasoning: "Scoring unavailable.", signals: [] };

  const client = new OpenAI({ apiKey, baseURL: "https://api.x.ai/v1" });

  const transcript = messages
    .map((m) => `${m.role === "user" ? "Prospect" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  try {
    const res = await client.chat.completions.create({
      model: "grok-3",
      max_tokens: 512,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You score inbound prospect conversations for Endurance AI Labs, a strategic AI advisory firm.
Return ONLY valid JSON with this shape: { "score": number 0-100, "reasoning": "2-3 sentence summary", "signals": ["signal 1", "signal 2", ...] }

Scoring criteria:
- 80-100: Strong buyer. Completed mission intake with specific problem, mentions urgency/mandate, asks about pricing or timeline, decision-maker signals.
- 60-79: Warm lead. Engaged deeply with content, has a real initiative in mind, asked substantive follow-up questions.
- 40-59: Interested but exploratory. Browsing, learning, no specific initiative articulated yet.
- 20-39: Low engagement. Generic questions, no real problem shared.
- 0-19: Minimal signal. Bounced quickly or asked off-topic questions.`,
        },
        {
          role: "user",
          content: `Context: ${context}\n\nConversation:\n${transcript}`,
        },
      ],
    });

    const raw = res.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);
    return {
      score: typeof parsed.score === "number" ? Math.min(100, Math.max(0, parsed.score)) : 0,
      reasoning: parsed.reasoning ?? "",
      signals: Array.isArray(parsed.signals) ? parsed.signals : [],
    };
  } catch {
    return { score: 0, reasoning: "Scoring failed.", signals: [] };
  }
}

// ── Score badge colour ────────────────────────────────────────────────────────
function scoreColor(score: number) {
  if (score >= 75) return { hex: "#16a34a", label: "Hot" };
  if (score >= 50) return { hex: "#d97706", label: "Warm" };
  return { hex: "#6b7280", label: "Cool" };
}

// ── Build HTML email ──────────────────────────────────────────────────────────
function buildEmail(
  payload: NotifyPayload,
  score: ScoreResult
): { subject: string; html: string } {
  const { hex, label } = scoreColor(score.score);
  const isMission = payload.type === "mission-intake";

  const subject = isMission
    ? `[${label} ${score.score}/100] New Mission Intake`
    : `[${label} ${score.score}/100] Talk-to-Team Request`;

  const intakeBlock =
    isMission
      ? `
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;vertical-align:top;width:40%"><strong style="color:#1c1917;font-size:13px;">The mission</strong></td><td style="padding:10px 0 10px 16px;border-bottom:1px solid #e7e5e4;color:#44403c;font-size:14px;">${payload.goal}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;vertical-align:top"><strong style="color:#1c1917;font-size:13px;">What's in the way</strong></td><td style="padding:10px 0 10px 16px;border-bottom:1px solid #e7e5e4;color:#44403c;font-size:14px;">${payload.blocker}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;vertical-align:top"><strong style="color:#1c1917;font-size:13px;">Cost of inaction</strong></td><td style="padding:10px 0 10px 16px;border-bottom:1px solid #e7e5e4;color:#44403c;font-size:14px;">${payload.stakes}</td></tr>
      <tr><td style="padding:10px 0;vertical-align:top"><strong style="color:#1c1917;font-size:13px;">Why internal resources aren't enough</strong></td><td style="padding:10px 0 10px 16px;color:#44403c;font-size:14px;">${payload.internalFriction}</td></tr>
    </table>`
      : `<p style="color:#44403c;font-size:14px;margin-bottom:24px;">Someone clicked the "Talk to the team" CTA during their session.</p>`;

  const signalsList = score.signals
    .map((s) => `<li style="color:#44403c;font-size:13px;margin-bottom:4px;">${s}</li>`)
    .join("");

  const transcript = payload.messages
    .map(
      (m) =>
        `<div style="margin-bottom:12px;">
          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:${m.role === "user" ? "#1c1917" : "#78716c"};">${m.role === "user" ? "Prospect" : "Assistant"}</span>
          <p style="margin:4px 0 0;color:#44403c;font-size:13px;line-height:1.6;">${m.content.replace(/\n/g, "<br>")}</p>
        </div>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:40px auto;background:#fff;border:1px solid #e7e5e4;border-radius:8px;overflow:hidden;">

    <!-- Header -->
    <div style="padding:24px 32px;border-bottom:1px solid #e7e5e4;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:14px;font-weight:600;color:#1c1917;letter-spacing:-.01em;">Endurance AI Labs</span>
      <span style="font-size:12px;color:#78716c;">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
    </div>

    <div style="padding:32px;">

      <!-- Score -->
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px;">
        <div style="width:64px;height:64px;border-radius:50%;background:${hex};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="color:#fff;font-size:20px;font-weight:700;">${score.score}</span>
        </div>
        <div>
          <div style="font-size:18px;font-weight:600;color:#1c1917;margin-bottom:4px;">${label} lead — ${score.score}/100</div>
          <div style="font-size:13px;color:#78716c;line-height:1.5;">${score.reasoning}</div>
        </div>
      </div>

      <!-- Signals -->
      ${score.signals.length > 0 ? `
      <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:6px;padding:16px;margin-bottom:28px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#78716c;margin-bottom:8px;">Interest Signals</div>
        <ul style="margin:0;padding-left:16px;">${signalsList}</ul>
      </div>` : ""}

      <!-- Intake fields -->
      ${intakeBlock}

      <!-- CTA -->
      <a href="mailto:hello@endurancelabs.ai" style="display:inline-block;background:#1c1917;color:#fff;text-decoration:none;font-size:13px;font-weight:500;padding:10px 20px;border-radius:6px;margin-bottom:32px;">Reply to prospect →</a>

      <!-- Divider -->
      <div style="border-top:1px solid #e7e5e4;margin-bottom:24px;"></div>

      <!-- Transcript -->
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#78716c;margin-bottom:16px;">Full Conversation</div>
      ${transcript}

    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}

// ── Slack message ─────────────────────────────────────────────────────────────
function buildSlackMessage(payload: NotifyPayload, score: ScoreResult) {
  const { label } = scoreColor(score.score);
  const isMission = payload.type === "mission-intake";
  const emoji = score.score >= 75 ? "🔥" : score.score >= 50 ? "⚡" : "💬";

  const header = isMission
    ? `${emoji} *New Mission Intake* — ${label} lead ${score.score}/100`
    : `${emoji} *Talk-to-Team Request* — ${label} lead ${score.score}/100`;

  const blocks: object[] = [
    {
      type: "section",
      text: { type: "mrkdwn", text: header },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `_${score.reasoning}_` },
    },
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
  }

  if (score.signals.length > 0) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Signals*\n${score.signals.map((s) => `• ${s}`).join("\n")}` },
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

  const context =
    payload.type === "mission-intake"
      ? `Prospect completed the full mission intake. Goal: ${payload.goal}`
      : "Prospect clicked the Talk to Team CTA.";

  // Score and notify in parallel where possible
  const score = await scoreConversation(payload.messages, context);

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL ?? "hello@endurancelabs.ai";
  const fromEmail = process.env.NOTIFY_FROM_EMAIL ?? "notifications@endurancelabs.ai";

  await Promise.allSettled([
    // Slack
    webhookUrl
      ? fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildSlackMessage(payload, score)),
        })
      : Promise.resolve(),

    // Email
    (() => {
      if (!resendKey) return Promise.resolve();
      const resend = new Resend(resendKey);
      const { subject, html } = buildEmail(payload, score);
      return resend.emails.send({ from: fromEmail, to: toEmail, subject, html });
    })(),
  ]);

  return new Response("ok", { status: 200 });
}

export const dynamic = "force-dynamic";

export type NotifyPayload =
  | {
      type: "mission-intake";
      goal: string;
      blocker: string;
      stakes: string;
      internalFriction: string;
    }
  | {
      type: "talk-to-team";
    };

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    // Silently succeed if webhook isn't configured — don't break the UI
    return new Response("ok", { status: 200 });
  }

  let payload: NotifyPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const body =
    payload.type === "mission-intake"
      ? buildMissionIntakeMessage(payload)
      : buildTalkToTeamMessage();

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Slack returned ${res.status}`);
  } catch {
    // Log but don't surface to user
    console.error("[notify] Slack webhook failed");
  }

  return new Response("ok", { status: 200 });
}

function buildMissionIntakeMessage(payload: Extract<NotifyPayload, { type: "mission-intake" }>) {
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎯 New Mission Intake",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*The mission*\n${payload.goal}`,
          },
          {
            type: "mrkdwn",
            text: `*What's in the way*\n${payload.blocker}`,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Cost of inaction*\n${payload.stakes}`,
          },
          {
            type: "mrkdwn",
            text: `*Why internal resources aren't enough*\n${payload.internalFriction}`,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Reply →", emoji: true },
            url: "mailto:hello@endurancelabs.ai",
            style: "primary",
          },
        ],
      },
      { type: "divider" },
    ],
  };
}

function buildTalkToTeamMessage() {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "👋 *Someone wants to talk to the team* — they clicked the briefing CTA on endurancelabs.ai",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Book link →", emoji: true },
            url: "https://cal.endurancelabs.ai/briefing",
            style: "primary",
          },
        ],
      },
    ],
  };
}

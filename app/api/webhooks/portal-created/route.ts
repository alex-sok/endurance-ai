export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // ── Verify shared secret ────────────────────────────────────────────────
  const secret = process.env.SUPABASE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[portal-created] SUPABASE_WEBHOOK_SECRET is not set — refusing all requests");
    return new Response("Webhook not configured", { status: 503 });
  }
  const authHeader = request.headers.get("x-webhook-secret");
  if (authHeader !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  let record: Record<string, unknown>;
  try {
    const body = await request.json();
    // Supabase sends { type, table, schema, record, old_record }
    record = body.record ?? body;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const clientName = String(record.client_name ?? "Unknown");
  const slug = String(record.slug ?? "");
  const tagline = record.tagline ? String(record.tagline) : null;
  const isPublished = Boolean(record.is_published);
  // Masked hint set at portal creation time (e.g. "GT****").
  // Never derived algorithmically here — keeps the formula out of source code.
  const passwordHint = record.password_hint ? String(record.password_hint) : null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://endurancelabs.ai";
  const portalUrl = `${baseUrl}/mission/${slug}`;

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[portal-created] SLACK_WEBHOOK_URL not set");
    return new Response("ok", { status: 200 });
  }

  const statusEmoji = isPublished ? "🟢" : "🟡";
  const statusLabel = isPublished ? "Published" : "Draft";

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🚀 New Client Portal Created",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Client*\n${clientName}` },
        { type: "mrkdwn", text: `*Status*\n${statusEmoji} ${statusLabel}` },
        {
          type: "mrkdwn",
          text: `*Portal URL*\n<${portalUrl}|${portalUrl}>`,
        },
        ...(passwordHint
          ? [{ type: "mrkdwn", text: `*Access Code*\n\`${passwordHint}\`` }]
          : []),
        ...(tagline ? [{ type: "mrkdwn", text: `*Tagline*\n${tagline}` }] : []),
      ],
    },
    { type: "divider" },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "View Portal →", emoji: true },
          url: portalUrl,
          style: "primary",
        },
      ],
    },
  ];

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  }).catch((err) => console.error("[portal-created] Slack fetch failed:", err));

  return new Response("ok", { status: 200 });
}

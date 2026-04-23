import { cookies } from "next/headers";
import { rateLimit, getIP } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { computeAuthToken } from "@/app/api/portal/[slug]/auth/route";
import { embedText } from "@/lib/embed";

export const dynamic = "force-dynamic";

const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 3_000;

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Build the portal system prompt ────────────────────────────────────────────
function buildSystemPrompt(
  clientName: string,
  heroTitle: string | null,
  heroBody: string | null,
  retrievedContext: string
): string {
  return `You are the Mission AI for ${clientName}, a private AI advisor with access to ${clientName}'s documents, strategy, and engagement context.

You answer questions about ${clientName}'s business, strategy, and operations using the knowledge base below. You also help them understand the AI work Endurance AI Labs is doing with them.

## About this engagement
${heroTitle ? `Engagement title: ${heroTitle}` : ""}
${heroBody ? `Overview: ${heroBody}` : ""}

## Knowledge base
${retrievedContext || "No documents have been synced yet."}

## How to respond
- Be direct, specific, and concise. This is a C-suite audience.
- Answer questions using the knowledge base above whenever relevant.
- If a question isn't covered in the knowledge base, say so briefly and offer to connect them with the Endurance AI Labs team.
- Ask only one question per response. Never stack questions.
- When referencing the calendar link, always format it as a markdown hyperlink.
- Keep responses focused — this is an advisory context, not a chatbot.

## Endurance AI Labs
Founded by Alex Sok (CEO), Sid Bhambhani (CTO), and Nick Maxwell (Chief AI Officer).
Contact: hello@endurancelabs.ai
Book a call: [Schedule a briefing](https://calendar.notion.so/meet/alexsok/endurance-intro)`;
}


// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Rate limiting
  const ip = getIP(request);
  if (!rateLimit(ip, 15, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  // Fetch portal (service role to access password_hash for auth check)
  const supabase = await createClient(true);
  const { data: portal, error } = await supabase
    .from("portals")
    .select("id, client_name, hero_title, hero_body, is_published, password_hash")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !portal) {
    return new Response("Portal not found", { status: 404 });
  }

  // ── Auth gate: require valid portal cookie if portal is password-protected ──
  if (portal.password_hash) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(`portal_auth_${slug}`)?.value;
    const expectedToken = computeAuthToken(slug, portal.password_hash);
    if (authCookie !== expectedToken) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  // Parse messages
  let messages: Message[];
  try {
    const body = await request.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("messages array is required", { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response("Too many messages", { status: 400 });
    }
    for (const msg of messages) {
      if (typeof msg.content !== "string" || msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response("Message too long", { status: 400 });
      }
    }
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  // RAG: embed the last user message and retrieve relevant chunks
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  let retrievedContext = "";

  if (lastUserMessage) {
    const embedding = await embedText(lastUserMessage.content);
    if (embedding) {
      const { data: chunks } = await supabase.rpc("match_chunks", {
        query_embedding: embedding,
        match_portal_id: portal.id,
        match_count: 5,
        match_threshold: 0.3,
      });
      if (chunks && chunks.length > 0) {
        retrievedContext = chunks
          .map((c: { content: string }, i: number) => `[${i + 1}] ${c.content}`)
          .join("\n\n");
      }
    }
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  const systemPrompt = buildSystemPrompt(
    portal.client_name,
    portal.hero_title,
    portal.hero_body,
    retrievedContext
  );

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const res = await fetch("https://api.x.ai/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "grok-3",
            instructions: systemPrompt,
            input: messages.map((m) => ({ role: m.role, content: m.content })),
            stream: true,
          }),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(`API error ${res.status}: ${error}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const event = JSON.parse(data);
              if (event.type === "response.output_text.delta" && event.delta) {
                controller.enqueue(encoder.encode(event.delta));
              }
            } catch {
              // ignore malformed SSE lines
            }
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Stream error";
        controller.enqueue(encoder.encode(`\n\nError: ${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    },
  });
}

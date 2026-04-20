import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { rateLimit, getIP } from "@/lib/rate-limit";

// Never statically pre-render — requires a live API key at runtime
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 4_000; // characters per message

export interface ChatRequestMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip = getIP(request);
  if (!rateLimit(ip, 20, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    console.error("[chat] XAI_API_KEY is not set");
    return new Response("API key not configured", { status: 500 });
  }

  let messages: ChatRequestMessage[];
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
            model: "grok-4.20-reasoning",
            instructions: SYSTEM_PROMPT,
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
              // Only emit text deltas from the message output (not reasoning)
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
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
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

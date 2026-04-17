@AGENTS.md

# Endurance AI Labs — Claude Context

## Principles
- **Think before coding.** Understand the full problem before touching a file.
- **Simplicity first.** The least code that solves the problem is the right code.
- **Surgical changes.** Edit only what needs to change. Don't refactor bystanders.
- **Goal-driven execution.** Every change should trace back to a clear outcome.

---

## Project Overview
Single-page conversational website for Endurance AI Labs. A premium chat interface for executive prospects to learn about the firm and engage with an AI advisor powered by Grok.

**Live site:** https://endurancelabs.ai  
**GitHub:** https://github.com/alex-sok/endurance-ai  
**Deployment:** Vercel — pushes to `main` auto-deploy. Env var changes require a manual redeploy.

---

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config — no `tailwind.config.ts`)
- **Animation:** Framer Motion
- **LLM:** xAI Grok (`grok-4.20-reasoning`) via `/v1/responses` API (raw fetch + SSE)
- **Notifications:** Slack Incoming Webhooks + Grok interest scoring
- **Hosting:** Vercel

---

## Key Files
| File | Purpose |
|------|---------|
| `lib/conversation-flows.ts` | Node graph, welcome message, initial chips, `CALENDLY_URL`, `CONTACT_EMAIL` |
| `lib/system-prompt.ts` | Grok system prompt — operator-led tone, Endurance knowledge |
| `lib/conversation.ts` | Reducer, initial state, node helpers |
| `types/chat.ts` | `ChatMessage`, `MissionData`, `ChatState`, `ChatAction` types |
| `components/chat/ChatShell.tsx` | Main chat UI — all user interaction lives here |
| `components/chat/Message.tsx` | Message bubble renderer |
| `components/chat/PromptChips.tsx` | Initial suggestion chips |
| `components/chat/ChatInput.tsx` | Text input component |
| `app/api/chat/route.ts` | Grok streaming endpoint (`/api/chat`) |
| `app/api/notify/route.ts` | Slack notification + Grok interest scoring (`/api/notify`) |

---

## Architecture
- **All conversation is LLM-driven.** No scripted node paths during chat. The node graph (`conversation-flows.ts`) only provides the welcome message and initial chips.
- **Initial chips** are conversation starters — clicking one sends the label to the LLM as a user message.
- **"Talk to team"** chip fires a Slack notification (`/api/notify`) + sends to LLM.
- **Persistent CTAs** ("Book a briefing", "Talk to team") appear after the first exchange.
- **Streaming:** `/api/chat` parses `response.output_text.delta` SSE events from the xAI Responses API.

---

## Environment Variables
| Variable | Where | Purpose |
|----------|-------|---------|
| `XAI_API_KEY` | `.env.local` + Vercel | xAI Grok API key (expires — replace when broken) |
| `SLACK_WEBHOOK_URL` | `.env.local` + Vercel | Slack Incoming Webhook for lead notifications |

**Critical:** Vercel env vars require a manual redeploy to take effect. Go to Deployments → Redeploy after any env var change.

---

## Contact & Scheduling
- **Email:** hello@endurancelabs.ai
- **Calendar:** https://calendar.notion.so/meet/alexsok/endurance-intro
- Both are defined as constants in `lib/conversation-flows.ts` — change them there only.

---

## Common Gotchas
- **xAI API keys expire.** If chat returns the error message, the key is dead. Get a new one from console.x.ai and update both `.env.local` and Vercel.
- **Vercel won't pick up env var changes** until you manually redeploy the latest deployment.
- **Dev server must be restarted** after `.env.local` changes to pick up new values.
- **Tailwind v4** uses CSS-based config — don't create `tailwind.config.ts`.
- **API routes** use `export const dynamic = "force-dynamic"` to prevent static pre-rendering.
- **OpenAI SDK** is kept for the Slack scoring route (`/api/notify`) — don't remove it.

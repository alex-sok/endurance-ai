@AGENTS.md

# Endurance AI Labs — Claude Context

## Principles

**1. Think before coding**
Don't assume. Don't hide confusion. State ambiguity explicitly. Present multiple interpretations rather than silently picking one. Push back if a simpler approach exists. Stop and ask rather than guess.

**2. Simplicity first**
No features beyond what was asked. No abstractions for single-use code. No "flexibility" that wasn't requested. No error handling for impossible scenarios. The test: would a senior engineer say this is overcomplicated? If yes, rewrite it.

**3. Surgical changes**
Don't "improve" adjacent code. Don't refactor things that aren't broken. Match the existing style even if you'd do it differently. If you notice unrelated dead code, mention it, don't delete it. Every changed line should trace directly to the request.

**4. Goal-driven execution**
Transform "fix the bug" into "write a test that reproduces it, then make it pass." Transform "add validation" into "write tests for invalid inputs, then make them pass." Give it success criteria and watch it loop until done.

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
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` + Vercel | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel | Supabase anon/public key (safe to expose) |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` + Vercel | Supabase service role key — **server only, never expose** |
| `OPENAI_API_KEY` | `.env.local` + Vercel | OpenAI key for RAG embeddings (text-embedding-3-small) |

**Critical:** Vercel env vars require a manual redeploy to take effect. Go to Deployments → Redeploy after any env var change.

---

## Contact & Scheduling
- **Email:** hello@endurancelabs.ai
- **Calendar:** https://calendar.notion.so/meet/alexsok/endurance-intro
- Both are defined as constants in `lib/conversation-flows.ts` — change them there only.

---

## Mission Portal
Private, prospect-specific web experiences at `/mission/[slug]`. Each portal has:
- Hero section with engagement context
- 6 visual canvas sections (Overview, Problem, Solution, Roadmap, Team, Metrics)
- RAG-powered AI chat scoped to that client's documents
- All data in Supabase

**Key files:**
| File | Purpose |
|------|---------|
| `app/mission/[slug]/page.tsx` | Portal SSR page — fetches portal + sections from Supabase |
| `app/mission/[slug]/layout.tsx` | 404s unpublished slugs, sets metadata |
| `components/portal/PortalShell.tsx` | Client shell — nav, hero, canvas, chat drawer |
| `components/portal/PortalCanvas.tsx` | Scrollable section panels |
| `components/portal/SectionContent.tsx` | Per-section content renderers (dispatches by slug) |
| `components/portal/PortalChat.tsx` | RAG chat drawer |
| `app/api/portal/[slug]/chat/route.ts` | Portal chat API — RAG retrieval + Grok streaming |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client (SSR-compatible) |
| `types/portal.ts` | TypeScript types for all portal entities |
| `supabase/migrations/001_mission_portal.sql` | Full schema — run in Supabase SQL Editor |
| `supabase/migrations/002_seed_capfund1.sql` | CapFund1 seed data |

**RAG pipeline:** User message → OpenAI `text-embedding-3-small` → pgvector similarity search → top 5 chunks injected into system prompt → Grok `grok-3` response.

**Supabase project:** https://tjcphinjowcjmtrzptnj.supabase.co

---

## Common Gotchas
- **xAI API keys expire.** If chat returns the error message, the key is dead. Get a new one from console.x.ai and update both `.env.local` and Vercel.
- **Vercel won't pick up env var changes** until you manually redeploy the latest deployment.
- **Dev server must be restarted** after `.env.local` changes to pick up new values.
- **Tailwind v4** uses CSS-based config — don't create `tailwind.config.ts`.
- **API routes** use `export const dynamic = "force-dynamic"` to prevent static pre-rendering.
- **OpenAI SDK** is kept for the Slack scoring route (`/api/notify`) — don't remove it.
- **Supabase RLS:** portals/sections/chunks are publicly readable only when `is_published = true`. Sessions, messages, leads, and documents are service-role only.
- **pgvector must be enabled** before running the migration (Settings → Database → Extensions → vector).

# Handoff: Build /investments Investor Page

## Context

You are working on the **Endurance AI Labs** Next.js 16 monorepo at the root of this project.

We already shipped a polished investor pitch page at `/logistics` for the freight AI side of the business. Now we want to build an equivalent page at `/investments` for the investments arm of the business. The `/logistics` page is the **reference implementation** — same architecture, same patterns, new content and narrative.

---

## Repo at a Glance

```
Tech stack:  Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4
Fonts:       Inter Display + JetBrains Mono (via next/font)
Animation:   GSAP + ScrollTrigger, Lenis smooth scroll
Auth gate:   Edge middleware (proxy.ts) + httpOnly SHA-256 cookies
Hosting:     Vercel — main branch auto-deploys to endurancelabs.ai
```

**IMPORTANT — Tailwind:** This project uses **Tailwind v4 with CSS-based config**. There is no `tailwind.config.ts`. Do NOT create one.

**IMPORTANT — Vercel builds:** The GitHub-integrated Vercel preview builder has a stale `modifyConfig` bug that causes preview deployments to fail with `TypeError: The "path" argument must be of type string. Received undefined`. This is NOT a code issue — `npm run build` and `vercel build --yes` both pass clean. To deploy: run `vercel build --prod --yes` then `vercel deploy --prebuilt --prod`. The project is already linked (`endurance-ai-labs/endurance-ai`).

---

## The /logistics Reference Implementation

Study these files before writing a single line for /investments. The investments page follows the same patterns exactly.

### Core architecture (4 files to read first)

| File | What it does |
|------|------|
| `app/logistics/layout.tsx` | Nested dark layout, Lenis provider, font vars, metadata |
| `app/logistics/logistics.css` | All scoped CSS tokens (`--logi-*`), film grain, type utilities |
| `app/logistics/sections.css` | Per-section BEM rules |
| `app/logistics/page.tsx` | Just imports and sequences 11 section components |

### Pattern: Theme scoping
Every token is scoped under `.logistics-theme`. The investments page gets its own `.invest-theme` class (or whatever prefix makes sense). This keeps the two pages visually independent and prevents any bleed onto the main `endurancelabs.ai` marketing site.

```tsx
// layout.tsx pattern
<div className={`invest-theme ${interDisplay.variable} ${jetbrainsMono.variable}`}>
  <LenisProvider />
  <ProgressIndicator />
  {children}
</div>
```

The `html`/`body` background override:
```css
html:has(.invest-theme),
body:has(.invest-theme) {
  background: <your-bg-color>;
  height: auto;
  min-height: 100%;
}
```

### Pattern: Password gate
The gate is already wired for `/logistics`. For `/investments`, add a second gate in `proxy.ts`. The existing `proxy()` function already handles `/logistics/*` routes. You need to:

1. Add `INVESTMENTS_PASSWORD` env var check
2. Add a new cookie name (e.g. `endurance-investments-access`)
3. Add `/investments/access` page + `AccessForm.tsx` (copy `/logistics/access/` and change the API endpoint)
4. Add `/api/investments/access/route.ts` (copy `/api/logistics/access/route.ts`, change the cookie name and salt)
5. Update the matcher in `proxy.ts` to include `/investments` and `/investments/:path*`

### Pattern: Section shell
```tsx
// Every section wraps in SectionShell
import { SectionShell } from "../components/SectionShell";

export function MySection() {
  return (
    <SectionShell id="my-section" index="01" eyebrow="Eyebrow Label">
      {/* content */}
    </SectionShell>
  );
}
```

### Pattern: Data layer
Every section has a corresponding file in `data/`:
```
app/investments/data/thesis.ts     — investment thesis / philosophy
app/investments/data/team.ts       — partners and advisors
app/investments/data/portfolio.ts  — portfolio companies (if surfacing them)
app/investments/data/approach.ts   — deal types, check sizes, stages
app/investments/data/close.ts      — CTAs (book a call, submit a deal, etc.)
```

Keep all numbers, quotes, and copy in the data files — never hardcoded in JSX.

### Pattern: GSAP animations
All GSAP code lives in `"use client"` components. The setup in `lib/animations.ts` and `lib/lenis-provider.tsx` is shared — import from there.

```tsx
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/animations";

// Always guard with prefersReducedMotion()
if (prefersReducedMotion()) {
  // instant reveal
  return;
}

const ctx = gsap.context(() => {
  gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%" } })
    .from(el, { opacity: 0, y: 32, duration: 0.8 });
}, containerRef);

return () => ctx.revert(); // cleanup in useEffect return
```

### Pattern: CSS naming
```
/logistics  → .logi-*   (e.g. .logi-display-md, .logi-market__map)
/investments → .inv-*    (or whatever prefix you choose — just be consistent)
```

---

## Existing Shared Utilities (reuse, don't copy)

These live in `app/logistics/` but can be imported from investments if needed, or duplicated into `app/investments/` for independence:

| File | Notes |
|------|-------|
| `lib/animations.ts` | GSAP + ScrollTrigger exports, `prefersReducedMotion()` |
| `lib/lenis-provider.tsx` | Lenis smooth scroll, mounts once in layout |
| `lib/formatters.ts` | `fmtUSD`, `fmtInt`, `fmtPct` |
| `components/SectionShell.tsx` | Section wrapper (index label, anchor id) |
| `components/ProgressIndicator.tsx` | Right-edge scroll rail |
| `components/Marquee.tsx` | CSS-only seamless loop |

If you import directly from `app/logistics/`, be careful — a future rename of that path would break investments too. Safer to duplicate `lib/` into `app/investments/lib/` and keep both pages fully self-contained.

---

## File Structure to Build

```
app/investments/
├── layout.tsx                  # Dark layout, LenisProvider, font vars, metadata
├── page.tsx                    # Import + sequence all sections
├── investments.css             # --inv-* tokens, film grain, type utilities
├── sections.css                # Per-section styles
│
├── access/
│   ├── page.tsx                # Password gate page
│   └── AccessForm.tsx          # "use client" form → POST /api/investments/access
│
├── components/
│   ├── SectionShell.tsx        # Duplicate from logistics (or shared import)
│   ├── ProgressIndicator.tsx   # Duplicate or shared import
│   └── Marquee.tsx             # If needed for partner logos etc.
│
├── data/
│   ├── thesis.ts               # Investment philosophy / approach
│   ├── team.ts                 # Partners, advisors
│   ├── portfolio.ts            # Portfolio companies (if public)
│   ├── approach.ts             # Stages, check sizes, focus areas
│   └── close.ts                # CTAs (submit deal, book call, LP contact)
│
├── lib/
│   ├── animations.ts           # Duplicate from logistics/lib
│   ├── lenis-provider.tsx      # Duplicate from logistics/lib
│   └── formatters.ts           # Duplicate from logistics/lib
│
└── sections/
    ├── Hero.tsx                 # §1 - headline, visual
    ├── Thesis.tsx               # §2 - investment philosophy
    ├── Focus.tsx                # §3 - sectors / stages we target
    ├── Portfolio.tsx            # §4 - portfolio companies (if surfacing)
    ├── Team.tsx                 # §5 - partners + advisors
    ├── Approach.tsx             # §6 - how we work, what we offer beyond $
    ├── Close.tsx                # §7 - CTAs: submit a deal, LP inquiry, etc.

app/api/investments/
└── access/
    └── route.ts                # Edge runtime POST, password gate
```

---

## proxy.ts Changes Needed

The current `proxy.ts` only handles `/logistics`. Update it to also gate `/investments`:

```typescript
// In proxy.ts — add a second block after the logistics gate:

// Gate for /investments
if (pathname.startsWith("/investments") && pathname !== "/investments/access") {
  const password = process.env.INVESTMENTS_PASSWORD;
  if (!password) { /* redirect to /investments/access?err=config */ }
  const expected = await deriveToken(password, "investments-access-v1");
  const got = req.cookies.get("endurance-investments-access")?.value;
  if (got !== expected) { /* redirect to /investments/access */ }
}
```

Update the matcher:
```typescript
export const config = {
  matcher: [
    "/logistics", "/logistics/:path*",
    "/investments", "/investments/:path*",
  ],
};
```

---

## Vercel Env Vars to Add

After building, add these in the Vercel dashboard under **endurance-ai-labs/endurance-ai → Settings → Environment Variables**:

```
INVESTMENTS_PASSWORD   =  <choose a password>
```

Then deploy:
```bash
vercel build --prod --yes
vercel deploy --prebuilt --prod
```

---

## What I Need From Alex (Content to Fill In)

Before writing section copy, get answers to:

1. **What is the investments arm?** (venture fund, holding company, syndicate, family office, SPV, etc.)
2. **What stage / check size?** (pre-seed, seed, Series A; $25K–$250K, $500K–$2M, etc.)
3. **What sectors?** (AI, SaaS, logistics tech, deep tech, etc.)
4. **Portfolio companies to surface?** (names, descriptions, logos, or keep anonymous)
5. **What's the LP ask?** (raising a fund? accepting deal flow? LP commitments?)
6. **What's the CTA?** (submit a deal, become an LP, book a call — what action do we want?)
7. **Who are the partners?** (names, roles, bios, photos)
8. **What's the visual tone?** (same amber-on-dark as /logistics, or a different palette — e.g. deeper navy, sage green, etc.)
9. **What's the headline?** (e.g. "Capital with conviction.", "Built different. Backed different.", etc.)

---

## Build Order

1. **Read** `app/logistics/layout.tsx`, `app/logistics/logistics.css`, `app/logistics/page.tsx`, `app/logistics/sections.css` fully before writing any code
2. **Scaffold** `app/investments/layout.tsx` + `investments.css` with new token namespace
3. **Add gate** — `access/page.tsx`, `access/AccessForm.tsx`, `api/investments/access/route.ts`, update `proxy.ts`
4. **Build sections** in data-first order: write each `data/*.ts` file, then the section component that consumes it
5. **Wire page.tsx** to sequence the sections
6. **Add animations** last — scroll-reveal on headlines, stats, and one centerpiece animation per the investments narrative
7. **Update sitemap.ts** to include `/investments`
8. **Build and deploy**: `vercel build --prod --yes && vercel deploy --prebuilt --prod`

---

## Key Don'ts

- **Do NOT** use geographic data or complex SVGs unless the investments narrative specifically calls for it
- **Do NOT** import from `app/logistics/` in the investments page (keep them fully self-contained)
- **Do NOT** create `tailwind.config.ts` — the project uses Tailwind v4 CSS-based config
- **Do NOT** run `git push` and expect Vercel GitHub integration to build — use CLI deploy instead (see Vercel note above)
- **Do NOT** amend commits — always create new commits
- **Do NOT** hardcode copy in JSX — all strings live in `data/*.ts`

---

## Reference: /logistics Token Set (for inspiration)

```css
--logi-bg: #0a0b0d;          /* near-black background */
--logi-bg-elev: #101216;      /* slightly elevated surfaces */
--logi-fg: #f5f2ec;           /* warm off-white text */
--logi-fg-muted: #8a8b8f;     /* secondary text */
--logi-fg-faint: #4a4d54;     /* disabled/faint text */
--logi-signal: #f5a524;       /* amber accent — CTAs, highlights */
--logi-divider: rgba(245,242,236,0.08);
```

For investments, consider a different accent — amber reads as "freight/industrial." Something cooler (slate blue, sage, or a warmer gold) may read as more "institutional capital."

---

## Useful Commands

```bash
npm run build          # verify TypeScript + Next.js compile (fast check)
npx tsc --noEmit       # TypeScript only

# Deploy (use this, not git push → Vercel)
vercel build --prod --yes
vercel deploy --prebuilt --prod
```

---

*This handoff was generated at the end of the `/logistics` build session. All architectural decisions, patterns, and workarounds documented here were validated in production.*

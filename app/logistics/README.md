# /logistics — Endurance Logistics investor page

> **V2 "Night Freight" overhaul shipped (June 2026).** The page is now a
> full GSAP + Three.js scroll experience: a WebGL night-world of the real
> US interstate network bookends the page (aerial hero → road-level dawn
> close), §4 Product is the signature transcript-drives-the-map moment,
> and a night clock in the fixed nav advances 23:47 → 05:58 across the
> scroll. **The design contract is [`DESIGN-V2.md`](./DESIGN-V2.md)** —
> read it before changing any animation. The file map below predates V2
> but the section structure still holds (now 12 sections: §11 "The edge"
> was added, Close is §12). Key V2 additions: `lib/v2-motion.ts` (the only
> GSAP import path), `lib/v2-boot.ts`, `lib/placeholders.ts`,
> `components/three/` (SceneCanvas + NightScene), `components/V2Nav.tsx`,
> `components/Preloader.tsx`, and per-section styles in `styles/v2/`.

Phase 1 shipped the static skeleton; V2 shipped the choreography.

## What's here right now (Phase 1 map — see banner for V2 additions)

```
app/logistics/
  layout.tsx              — nested layout, dark theme, fonts, Lenis + progress rail
  page.tsx                — composes the 11 sections in narrative order
  logistics.css           — design tokens (scoped under .logistics-theme)
  sections.css            — per-section layout rules
  sections/
    Hero.tsx              — §1  headline + network silhouette
    Problem.tsx           — §2  three stats + pull quote
    Shift.tsx             — §3  incumbent vs Endurance split + three pillars
    Product.tsx           — §4  dashboard mock + scripted dispatcher transcript
    Traction.tsx          — §5  headline stat + chart placeholders + quotes
    Market.tsx            — §6  TAM/SAM/SOM + spend breakdown + lane corridors
    Moat.tsx              — §7  3-column comparison table
    Team.tsx              — §8  founder grid + advisor marquee
    Roadmap.tsx           — §9  4-window timeline
    Ask.tsx               — §10 round size + allocation + unlocks
    Close.tsx             — §11 CTAs + footer
  components/
    SectionShell.tsx      — section index + max-width container
    ProgressIndicator.tsx — thin amber rail at the right edge
    Marquee.tsx           — CSS-only seamless marquee
  lib/
    lenis-provider.tsx    — smooth scroll, honors prefers-reduced-motion
    config.ts             — PRIVATE_METRICS + HERO_3D_ENABLED flags
    formatters.ts         — fmtUSD / fmtInt / fmtPct
  data/
    *.ts                  — all copy + numbers, externalized
```

Every file the spec called out is in place. Things flagged in the spec
that intentionally **do not** ship in Phase 1 (and the phase they're queued
for):

- GSAP + ScrollTrigger choreography — Phase 3+
- Mapbox GL freight map (real, with lanes/trucks) — Phase 3 (§4, §6)
- Visx charts with scroll-driven path reveals — Phase 3 (§5, §10)
- R3F particle hero — gated behind `HERO_3D_ENABLED` (Phase 3, optional)
- PostHog/Plausible scroll-depth events — Phase 7
- OG image specific to /logistics — Phase 7
  (currently inherits `/og-image.png` so social previews never break)

## Decisions locked

- **Accent**: amber `#F5A524` (sodium-lamp)
- **Type stack**: Neue Haas Grotesk Display + Berkeley Mono are the
  declared targets. Phase 1 ships with **Inter Display + JetBrains Mono**
  as open-source drop-ins via `next/font`. See "Font license swap" below.
- **PRIVATE_METRICS**: `false`. Flip to `true` in
  `app/logistics/lib/config.ts` to render masked numbers for a
  public-facing share link.

## Running it

The page lives at `/logistics` on the same Next.js app as the marketing
site. Theme is fully scoped via `.logistics-theme` on a wrapper `<div>`
in `app/logistics/layout.tsx` — nothing leaks to `/` or `/mission/*`.

```bash
cd endurance-ai-labs
npm run dev
# open http://localhost:3000/logistics
```

Deploys to Vercel via the normal push-to-`main` path. A preview URL
will appear on the PR.

## Password protection

`/logistics` is gated behind a single shared password via `proxy.ts`
at the project root (Next.js 16's renamed `middleware`). The proxy
redirects every `/logistics/*` request to `/logistics/access` unless
the visitor presents a valid httpOnly cookie. The password itself
lives in the `LOGISTICS_PASSWORD` env var — it's never committed
and never sent to the client.

**Files involved:**

- `proxy.ts` — gate, runs on the Edge runtime
- `app/logistics/access/page.tsx` — the gate UI
- `app/logistics/access/AccessForm.tsx` — client form
- `app/api/logistics/access/route.ts` — constant-time password compare,
  sets the cookie on success

**To set the password in Vercel:**

1. Vercel dashboard → `endurance-ai-labs` project → **Settings → Environment Variables**.
2. Add a variable named exactly `LOGISTICS_PASSWORD`. Set it for
   **Production**, **Preview**, *and* **Development**.
3. Paste the password value. (For the current Phase 1 share link, the
   value Alex chose is stored in `.env.local` locally — never commit
   it.)
4. Redeploy: **Deployments** tab → click the most recent deploy →
   **Redeploy** (env vars don't apply to existing deployments
   automatically).

**Local dev:** Add the same line to `.env.local`:

```
LOGISTICS_PASSWORD=<paste the password>
```

**Rotating the password:** Update the value in Vercel + `.env.local`,
redeploy. Existing access cookies will be invalidated because the
cookie value is derived from the password.

**Removing the gate entirely:** Delete `proxy.ts` and the
`app/logistics/access/` + `app/api/logistics/access/` directories.

## Font license swap (one-line change)

When you have the Neue Haas Grotesk Display and Berkeley Mono `.woff2`
files:

1. Drop them in `public/fonts/`.
2. In `app/logistics/layout.tsx`, replace the two `next/font/google`
   imports with `next/font/local` pointing at the files.
3. Keep the variable names — `--font-logi-display` and `--font-logi-mono`
   — exactly as they are. The whole CSS layer reads from those CSS vars,
   so nothing else needs to change.

## Data hookup — what Alex still owes

Every placeholder is marked with a `TODO(alex):` comment. To find them:

```bash
grep -rn "TODO(alex)" app/logistics/
```

Priority order before showing to investors:

1. **§5 Traction** (`data/traction.ts`) — set `headlineStat.value`,
   `revenueByMonth`, `loadsPerWeek`, and the two customer quotes. Without
   real numbers, leave `PRIVATE_METRICS = true` so the page masks them.
2. **§2 Problem** (`data/problem.ts`) — confirm/replace the three stat
   sources. Lock the citation URLs for the investor memo footnote.
3. **§10 Ask** (`data/ask.ts`) — round size, allocation %, 18-mo unlocks,
   committed investors.
4. **§9 Roadmap** (`data/roadmap.ts`) — milestone deliverables + ARR
   anchors for each window.
5. **§8 Team** (`data/team.ts`) — bios + headshots in
   `/public/logistics/team/`.
6. **§11 Close** (`data/close.ts`) — point `deckUrl` at the deck PDF in
   `/public/logistics/`. Confirm `callUrl` is the right Cal.com link
   (currently the existing intro calendar).
7. **Lead form** — `closeCTAs.leadEndpoint` defaults to `/api/notify`
   (existing Slack endpoint) so leads still reach the team. Swap to
   Loops/Resend/HubSpot when you've picked one.

Customer logos (§5) and investor logos (§10) need monochrome SVGs in
`/public/logistics/`.

## OG image

When you have a hero still ready, drop it at `public/og-logistics.png`
(1200×630) and uncomment the override in `layout.tsx`. Until then the
page falls back to the main site's `/og-image.png`.

## Mapbox token

Phase 3 work — when wiring the real map in §4 and §6, set
`NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` + Vercel, URL-restricted to
`endurancelabs.ai`. Monitor MAU.

## Accessibility notes (what's already in)

- Reduced motion: Lenis is skipped entirely when
  `prefers-reduced-motion: reduce`. CSS animations are forced to ~0ms.
- One `<h1>` (Hero), ten `<h2>`s (sections 2–11). No duplicate headings.
- Designed focus rings (`outline: 2px solid var(--logi-signal)`), not
  browser defaults.
- The progress rail is `aria-hidden`; section anchors carry the real
  jump semantics.

What still needs the Phase 6 a11y pass: real Lighthouse run, VoiceOver
sweep, keyboard-only sweep, alt text once images land.

## Out-of-scope but worth queueing

- Lead-capture API route under `/api/logistics/lead` (right now we reuse
  the marketing site's `/api/notify`).
- A password-gated public/private metrics view — the `PRIVATE_METRICS`
  flag is the build-time hook; the URL-token gate is wiring still to do.
- Heatmap/scroll analytics — Phase 7 will wire PostHog scroll-depth
  events per section.

# /logistics Investor Page

A premium, animated investor pitch page for Endurance AI Labs' freight logistics platform. Password-protected, fully scoped dark theme, smooth scroll with GSAP animations.

> **⚠️ V2 "Night Freight" overhaul (June 2026) supersedes much of this doc.**
> The page was rebuilt as a GSAP + Three.js experience: WebGL night-world
> bookends (real OSM interstate point cloud — aerial hero, road-level dawn
> close), a transcript-driven §4 product demo, a night clock (23:47→05:58)
> in a new fixed nav, 12 sections (added §11 "The edge"), strict
> data-hygiene (placeholder TODOs hide their blocks), and a one-beat
> timestamp preloader. The binding design doc is
> **`app/logistics/DESIGN-V2.md`**. Sections below describing the §6 map,
> password gate, theme scoping, and env vars remain accurate; per-section
> animation details are V1 history.

**Route:** `/logistics`  
**Status:** V2 overhaul complete (uncommitted at time of writing)

---

## Features

### 1. Password Gate
- **Location:** `/logistics/access`
- **Auth:** Edge middleware (`proxy.ts`) + httpOnly cookies
- **Security:** SHA-256 cookie derivation, constant-time comparison
- **Entry point:** `/logistics` redirects unauthed users to gate
- **Env var:** `LOGISTICS_PASSWORD`

### 2. Scoped Dark Theme
- **Container:** `.logistics-theme` wrapper in `layout.tsx`
- **Variables:** All `--logi-*` tokens (bg, signal #f5a524, fg, fonts, etc.)
- **Isolation:** No global leak — only affects `/logistics` subtree
- **Fonts:** Inter Display (headlines), JetBrains Mono (stats/code)

### 3. Smooth Scroll
- **Library:** Lenis v1.3.23
- **Setup:** Mounted once in `layout.tsx`, piped to GSAP ScrollTrigger
- **Reduced Motion:** Skipped entirely if `prefers-reduced-motion` is set

### 4. 11 Narrative Sections (§1–§11)

| Section | File | Focus | Animation |
|---------|------|-------|-----------|
| §1 Hero | `Hero.tsx` | "Logistics, finally autonomous." | Network nodes + headlight cone |
| §2 Problem | `Problem.tsx` | $87B TAM, incumbent bottlenecks | Scroll-reveal stat grid |
| §3 Shift | `Shift.tsx` | Three pillars + stack comparison | Split-screen layout |
| §4 Product | `Product.tsx` | 4 KPIs, dashboard, transcript | **Trucks animate on 3 SVG lanes** |
| §5 Traction | `Traction.tsx` | Revenue/load charts (placeholder), quotes | Chart + figure stubs |
| §6 Market | `Market.tsx` | $1.8T breakdown, city network | **Lines draw in, cities pop** |
| §7 Moat | `Moat.tsx` | 3-column competitive matrix | Table + pull quote |
| §8 Team | `Team.tsx` | Founders (portraits, bios), advisors | Marquee loop (CSS-only) |
| §9 Roadmap | `Roadmap.tsx` | 4 milestones (Today → 24mo) | **Truck drives along timeline** |
| §10 Ask | `Ask.tsx` | Round size, allocation, unlocks | Bar chart + lists |
| §11 Close | `Close.tsx` | CTAs: book call, download deck, email | 3-button footer |

---

## Animations (GSAP + ScrollTrigger)

### §4 Product Dashboard
- **3 SVG lane paths** with truck SVGs
- **Truck movement:** Negative GSAP delay stagger (truck 1 starts first, truck 3 last)
- **Position calculation:** `pointOnPath(svgPath, progress)` returns (x, y, angle)
- **Rotation:** Truck rotates to face direction of travel
- **Duration:** Linked to scroll position
- **Fallback:** Instant reveal if `prefers-reduced-motion`

### §6 Market Network
- **11 connecting lines** between 10 major US cities
- **Animation:** Lines draw in via `stroke-dashoffset: length → 0`
- **Sequence:** Lines animate one-by-one (stagger 0.12s)
- **Cities:** Pop in with scale (0→1) + opacity (0→1), `back.out(2)` easing
- **Trigger:** Fires as section scrolls into view
- **SVG:** 800×480 viewBox, grid background, city labels

### §9 Roadmap Timeline
- **Truck SVG** slides left→right as user scrolls
- **Rail:** Fills behind truck (progress indicator)
- **Milestones:** Each has threshold, dims/brightens + scales on unlock
- **Desktop-only:** Mobile hides truck, shows milestone cards
- **Scrub:** ScrollTrigger.scrub(0.5) ties animation to scroll position

---

## Data Layer

### Market Map (§6)

**File:** `app/logistics/data/market-map.ts`

```typescript
export interface MarketMapCity {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface MarketMapLine {
  from: string;
  to: string;
}
```

**Cities:** 10 major US logistics hubs (BOS, NYC, DC, ATL, MIA, CHI, DEN, LA, SF, HOU)  
**Lines:** 11 connecting lines forming simplified network (east coast, midwest, west, south corridors)  
**No projection math:** Fixed x,y coordinates in SVG viewBox

### Other Data Files

| File | Purpose |
|------|---------|
| `data/market.ts` | TAM/SAM/SOM values, spend-breakdown percentages |
| `data/product.ts` | Scripted dispatcher transcript (8 exchanges), 4 KPI stubs |
| `data/traction.ts` | Placeholder revenue/load data, customer quote stubs |
| `data/team.ts` | 3 founder stubs + advisor list |
| `data/moat.ts` | 3×5 competitive matrix (traditional / digital / Endurance) |
| `data/roadmap.ts` | 4 milestone windows with ARR anchors |
| `data/ask.ts` | Round size, allocation, unlocks, investor list |
| `data/close.ts` | CTAs (Cal.com link, deck URL stub, contact email) |
| `data/shift.ts` | 3 pillars, incumbent vs Endurance stack |

---

## Component Architecture

### Layout & Theme
- **`layout.tsx`:** Nested dark layout, Lenis provider, font variables
- **`logistics.css`:** Root theme tokens, film grain, display/body/mono utilities
- **`sections.css`:** Per-section BEM rules (§1–§11), responsive utilities

### Reusable Components
- **`SectionShell.tsx`:** Wrapper for all sections (anchor, index label)
- **`ProgressIndicator.tsx`:** Right-edge scroll position indicator (amber rail)
- **`Marquee.tsx`:** CSS-only seamless loop (pauses on hover)
- **`MarketRevealClient.tsx`:** Scroll-trigger animations for §6 (headline, stats, spend bar)
- **`AnimatedDashboardMap.tsx`:** §4 truck animation (3 SVG lanes)
- **`RoadmapTruckClient.tsx`:** §9 scroll-driven truck + milestone unlocks

### Page Composition
- **`page.tsx`:** Renders all 11 sections in sequence
- **`access/page.tsx`:** Password gate form
- **`access/AccessForm.tsx`:** "use client" form, POST to `/api/logistics/access`

### APIs
- **`/api/logistics/access`:** Edge-runtime POST, password compare, set httpOnly cookie

---

## Styling & CSS Strategy

### Theme Scoping
- **Container:** `.logistics-theme` wraps entire route in `layout.tsx`
- **Variable namespace:** All color/font/motion tokens prefixed `--logi-`
- **Isolation:** Root `<html>` + `<body>` use `:has(.logistics-theme)` selector to avoid leak
- **Result:** Theme affects only `/logistics` subtree; main site unaffected

### Responsive Design
- **Viewport:** Designed for desktop first (1440px+)
- **Mobile fallback:** Sections still render, some animations disabled (e.g., §9 truck)
- **Breakpoints:** None explicitly defined (adaptive layout via Flex/Grid)

### Motion Preferences
- **Detection:** `prefersReducedMotion()` in `lib/animations.ts`
- **Behavior:**
  - If set: Skip all GSAP animations, reveal content instantly
  - Lenis is skipped entirely (replaced with native scroll)
  - ScrollTrigger animations are disabled

### Typography
- **Display:** `Inter Display` (headlines, §1 hero)
- **Body:** `Inter Display` (normal weight for body text)
- **Mono:** `JetBrains Mono` (stats, code, transcripts, labels)
- **Fallback:** System fonts if web fonts fail to load

---

## Local Development

### Environment Setup
```bash
# Clone repo
git clone https://github.com/alex-sok/endurance-ai.git
cd endurance-ai

# Install deps
npm install

# Create .env.local with password
echo "LOGISTICS_PASSWORD=your-password-here" > .env.local

# Dev server
npm run dev
```

### Access the Page
1. Navigate to `http://localhost:3000/logistics`
2. Redirects to `/logistics/access` (password gate)
3. Enter password set in `LOGISTICS_PASSWORD`
4. Redirected to `/logistics` on success

### Testing Reduced Motion
```bash
# In browser DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
# Set to "prefers-reduced-motion"
```

---

## Vercel Deployment

### Env Var Setup
1. Vercel Dashboard → Settings → Environment Variables
2. Add `LOGISTICS_PASSWORD` (keep value private)
3. **Important:** After adding env var, manually trigger a redeploy in Deployments tab
   - Environment variables don't take effect until redeploy

### Live URL
- **Staging:** [pending deployment]
- **Production:** [pending deployment]

---

## Recent Refactoring (Simplification Commit)

### What Changed
The §6 Market map was originally built with real OpenStreetMap interstate geometry:
- Overpass API extraction script (`extract-interstates.mjs`)
- 5 interstate corridors (I-95, I-10, I-80, I-75, I-35)
- Complex RDP simplification + backtrack detection
- Continental US outline + Canada/Mexico hints
- Equirectangular projection (lon/lat → SVG)

**User feedback:** "the lines don't look good. it just needs to be a simple animation. lines, connect to dots."

### Solution
Replaced with minimal visualization:
- **10 city nodes** at fixed SVG coordinates
- **11 connecting lines** forming simplified network
- **No projection math:** Direct x,y placement
- **Clean animation:** Lines draw, cities pop
- **Removed:** 572 lines of extraction code + projection utilities

### Benefits
- ✅ Faster to understand and maintain
- ✅ No external API dependencies
- ✅ Cleaner visual hierarchy
- ✅ Simpler animation model
- ✅ Offline-compatible (no Overpass calls)

---

## Known Limitations & Future Work

### Phase 1 (Current)
- ✅ Static skeleton with 11 sections
- ✅ Password gate + dark theme
- ✅ Lenis smooth scroll
- ✅ GSAP animations (trucks, corridors, timeline)
- ✅ Reduced-motion support
- ✅ Minimal market map

### Phase 2 (Future)
- [ ] Real data ingestion (Airtable / Supabase)
- [ ] Live metrics (TBD dashboard feeds)
- [ ] A/B testing (variant sections, CTA placement)
- [ ] Form submit handling (lead capture)
- [ ] Email follow-up automation

### Phase 3 (Possible)
- [ ] 3D hero visualization (Spline or Three.js)
- [ ] Video backgrounds (key sections)
- [ ] Mapbox integration (§4 dashboard, real geolocation)
- [ ] Interactive pitch deck (embedded Figma / PDF)
- [ ] Grok AI chat (questions + context)

---

## Files & Directory Structure

```
/logistics
├── layout.tsx                    # Nested dark layout, Lenis provider
├── page.tsx                      # Main page, renders all 11 sections
├── logistics.css                 # Root theme tokens
├── sections.css                  # Per-section styles
│
├── components/
│   ├── SectionShell.tsx         # Section wrapper
│   ├── ProgressIndicator.tsx    # Scroll indicator
│   ├── Marquee.tsx              # CSS-only loop
│   ├── MarketRevealClient.tsx   # §6 scroll animations
│   ├── AnimatedMarketMap.tsx    # §6 map (lines + cities)
│   ├── AnimatedDashboardMap.tsx # §4 trucks
│   └── RoadmapTruckClient.tsx   # §9 truck + milestones
│
├── data/
│   ├── market-map.ts            # City nodes + connecting lines
│   ├── market.ts                # TAM/SAM/SOM, spend breakdown
│   ├── product.ts               # Transcript, KPIs
│   ├── traction.ts              # Revenue, customer quotes
│   ├── team.ts                  # Founders, advisors
│   ├── moat.ts                  # Competitive matrix
│   ├── roadmap.ts               # Milestones
│   ├── ask.ts                   # Round size, allocations
│   ├── close.ts                 # CTAs, contact info
│   └── shift.ts                 # Pillars, stack comparison
│
├── sections/
│   ├── Hero.tsx                 # §1
│   ├── Problem.tsx              # §2
│   ├── Shift.tsx                # §3
│   ├── Product.tsx              # §4
│   ├── Traction.tsx             # §5
│   ├── Market.tsx               # §6
│   ├── Moat.tsx                 # §7
│   ├── Team.tsx                 # §8
│   ├── Roadmap.tsx              # §9
│   ├── Ask.tsx                  # §10
│   └── Close.tsx                # §11
│
├── access/
│   ├── page.tsx                 # Password gate page
│   └── AccessForm.tsx           # Form component
│
└── lib/
    ├── animations.ts            # GSAP/ScrollTrigger exports
    └── config.ts                # Feature flags
```

---

## Contact & Questions

- **Email:** alex@endurancelabs.ai
- **GitHub:** https://github.com/alex-sok/endurance-ai
- **Branch:** `logistics-real-interstates` (ready for review/merge)

---

## Changelog

### Commit: efdddeb (Latest)
**refactor: simplify §6 Market map to minimal lines + cities visualization**
- Replace OSM extraction pipeline with fixed x,y city network
- Remove interstates.ts, us-outline.ts, extract-interstates.mjs
- AnimatedMarketMap: 310 → 150 lines
- Total: -572 lines deleted, cleaner code

### Commit: 36f6064
**§6 Market: real US interstate geometry from OpenStreetMap**
- Added Overpass extraction script
- Interstate corridors with RDP simplification
- Equirectangular projection

### Commit: 606d518
**Animate /logistics: §4 trucks, §6 corridor map, §9 timeline truck**
- GSAP + ScrollTrigger integration
- Truck animations (dashboard + roadmap)
- Scroll-driven corridor ignition

### Commit: a601335
**Add /logistics: investor page Phase 1 with password gate**
- 11 static sections
- Password gate + dark theme
- Lenis smooth scroll

# Endurance Logistics — V2 "NIGHT FREIGHT" Design Spec (rev 2, post-critique)

The /logistics page overhauled into an award-grade scroll experience. One idea
everywhere: **the freight network at night — working while the world sleeps.**
This is not just a palette: the page literally moves through one night shift.
A mono clock in the nav advances from **23:47** at the hero to **05:58** at the
close, where the horizon reads as dawn. The same 3D world (real US interstate
geometry, headlight pulses) opens the page from above and closes it from road
level — the journey completed.

Rev 2 changes after a three-lens critique (creative director / performance
engineer / investor UX): signature moments designated, tropes cut, animation
never gates data, strict boot sequence for ScrollTrigger correctness.

## Hierarchy — loud vs. quiet (non-negotiable)

**Signature moments (the only "loud" sections):**
- **§1 Hero** — WebGL: the real interstate network at night, from above.
- **§4 Product** — THE page's one unforgettable moment: the dispatcher
  transcript causally drives the lane map. Text fires → map reacts.
- **§11 Edge** — $150M seeding network (exists; light polish only).
- **§12 Close** — the SAME WebGL world re-shot from road level at dawn.

**Standard sections** (§2 Problem, §6 Market, §9 Roadmap, §10 Ask): one
choreographed entrance + counters. No pins except §2 (≤150vh).

**Quiet sections** (§3 Shift, §5 Traction, §7 Moat, §8 Team): exactly ONE
`blockReveal` entrance each. No parallax, no scrub, no counters beyond what
already exists. Silence creates the crescendo.

## Hard rules (every agent, every section)

1. **Animation never gates data.** Count-ups ≤800ms, trigger-once on entry —
   never scrub-linked. Charts/draws complete on a timer ≤1s after entering
   viewport even if scrolling stops. A mid-scroll abandon must leave final
   values on screen. Reduced-motion = identical final states, zero animation.
2. **ScrambleText appears exactly twice on the whole page**: hero eyebrow and
   §12 kicker (≤400ms each). Nowhere else — no data labels, no table cells.
3. **No animated filters or box-shadows.** Glow = pre-rendered pseudo-element,
   animate its opacity. No blur tweens anywhere.
4. **One smoothing layer**: Lenis does the smoothing; all scrubbed triggers use
   `scrub: true` (never numeric scrub on top of Lenis).
5. **Pins**: only §2, ≤150vh, desktop ≥1024px via `gsap.matchMedia()`,
   `anticipatePin: 1`. Pin end-state must show ALL content side-by-side
   (staging order only — nothing dims or leaves).
6. **Count-up restraint**: numbers count once, fast (≤800ms). The §11 $150M
   HARD-CUTS to final value — it never counts. Conviction, not theatre.
7. **Magnetic hover exists once**: the §12 primary CTA. Nowhere else.
8. **Data hygiene**: any string matching `isPlaceholder()` (lib/placeholders.ts:
   /TODO|\[Customer|\[N\]|\[target/) hides its block entirely rather than
   rendering placeholder text in display type. Traction charts render empty
   axes + "Full figures in the deck →" note, never a fabricated curve shape.
9. **Copy and data are otherwise unchanged.** `PRIVATE_METRICS` respected.
10. All GSAP in `gsap.context` reverted on unmount; entrances `once: true`;
    transform/opacity only; `will-change` only while animating.

## Motion language

- Entrances: `power4.out`, 0.9–1.4s, stagger 0.06–0.1 (`EASE.out`).
- Transitions: `expo.inOut` (`EASE.inOut`).
- Display headlines: masked line-rise via `riseIn()` (SplitText `autoSplit` +
  `mask: "lines"` — font-swap safe). Signature + standard sections only;
  quiet sections use `blockReveal` on the whole block.
- Light always travels with direction. Nothing bounces. Freight has mass.

## Global systems (owner: main loop)

- **lib/v2-motion.ts** — plugin registry + `riseIn`, `scrambleIn`, `countUp`,
  `blockReveal`, `magnetize`, `EASE`. The only GSAP import path for v2 code.
- **lib/v2-boot.ts** — boot sequence: `ScrollTrigger.config({ignoreMobileResize})`,
  `document.fonts.ready` → `ScrollTrigger.refresh()`, second refresh after
  preloader curtain (`logi:intro-done`). Mounted once by LenisProvider.
- **lib/placeholders.ts** — `isPlaceholder()` for data hygiene (server-safe).
- **components/three/SceneCanvas.tsx** — WebGL lifecycle: context created when
  section enters a 100%-rootMargin IO band, disposed (incl. forceContextLoss)
  when it leaves — hero & close contexts never coexist. DPR ≤2 desktop, ≤1.5
  coarse pointers. Renders only while intersecting. Reduced-motion = single
  static frame.
- **components/three/NightScene.ts** — ONE shared world, two camera modes:
  `"aerial"` (hero: low-oblique above the continent) and `"road"` (close:
  near ground, long lens toward a dawn horizon). Built from:
  - US land as faint dot-matrix (`data/us-shape.ts` grid, ~3.5k pts, twinkle);
  - **real interstate geometry** (`data/interstates.ts`, restored from OSM
    extraction) sampled into a point cloud; headlight pulses run along
    individual ways in both directions — ambient traffic, not sync'd arcs;
  - 10 hub-city glow sprites (`data/market-map.ts` coords);
  - fog; transparent clear; amber `#f5a524` / road-line `#f5d524` on dark.
  Mode "road": camera at ~y1.2 looking down-corridor; warm horizon glow
  (dawn); pulses stream past camera.
- **Preloader** — ONE beat, ≤900ms, never locks scroll, any input skips it:
  mono timestamp ticks 00:00→**23:47 EST** + "NETWORK LIVE", curtain lifts
  `expo.inOut`. No percentage counter. Hydration-safe: inline script in layout
  stamps `data-logi-intro` pre-paint from sessionStorage; component keys off
  the attribute. Fires `logi:intro-done`.
- **V2Nav** — appears after ~80vh: wordmark; **clickable** section index with
  "The ask →" shortcut (pin-aware offsets); the **night clock** — mono
  HH:MM advancing 23:47→05:58 with overall scroll progress; "Book a call" CTA
  (plain hover, not magnetic).
- **Facts strip (hero)** — zero-animation mono strip under the hero sub:
  stage + the $150M strategic backer + beachhead + contact. The 90-second
  skimmer gets the thesis without scrolling.
- Progress rail: keep existing; restyle ticks only.

## Section storyboards

### §1 HERO — "The network, 23:47" (owner: main)
Static SVG network (current hero art) renders unconditionally as base layer —
LCP safe, no pop-in. WebGL canvas crossfades over it on its first rendered
frame (`HERO_3D_ENABLED` stays as kill-switch). Aerial camera, slow drift,
pointer parallax (fine pointers). Copy: eyebrow scrambles (allowed use #1),
H1 masked-rise, sub `blockReveal`, facts strip plain, scroll cue pulses.
Scroll-out: scrub lifts camera + fades world; copy parallaxes up.

### §2 PROBLEM — stat theatre, honest version
Desktop: pin ≤150vh. Headline rises; strike-through draws across "phone calls"
(the page's ONLY strike-through). Stats stage in one at a time (count-up
≤800ms each) but END side-by-side in the grid — nothing dims or leaves.
Pull quote rises last. Mobile: no pin, staggered reveals.

### §3 SHIFT — quiet
One `blockReveal` per column. Incumbent column sits at 60% opacity (static
CSS); Endurance column full. That contrast IS the design. Nothing else.

### §4 PRODUCT — ★ SIGNATURE: the dispatcher demonstrates itself
No pin. Dashboard panel enters once (y+opacity, shadow via pseudo-element).
Then the transcript lines fade in staggered (≤2.5s total, no typewriter) and
**each line causally fires a map event** via a shared GSAP timeline:
"Scanning open loads" → lane map grid pulses; "Load #4471 Atlanta→Memphis" →
origin pip flares, route draws; "Matched carrier Mason TX-114" → carrier pip
slides onto lane; "Backhaul 92%" → ghost return-leg draws dashed;
"Negotiating … locked" → rate chip flips; "Booking confirmed" → route goes
solid amber, KPI "Loads booked today" ticks 146→147. KPIs otherwise static.
Replay button (like §6's). This is the moment people remember — agent should
spend their effort here, modifying AnimatedDashboardMap as needed (they own it).

### §5 TRACTION — quiet + honest
One `blockReveal`. Charts: empty axes + gridlines + mono note
"Full figures in the deck →" (mailto). NO fabricated curve (delete the fake
path data usage). Headline stat respects PRIVATE_METRICS/zero → masked
"$ — — —" with static shimmer (CSS, no JS). Quotes hidden while placeholder
(`isPlaceholder`).

### §6 MARKET — "the funnel line" (Vectr-style journey)
The headline taken literally: ONE continuous amber line draws down the
section (scrubbed — decoration only), weaving through three numbered scenes
that alternate around it — 01 Total market $1.8T (+ spend bar) → 02
Serviceable $400B → 03 Beachhead $12B ("where we start", amber) — narrowing
its stroke at each gate like the market does, then diving into the map
frame, where the existing I-95 corridor story is its continuation. Line
geometry is MEASURED from real DOM node positions at runtime (rebuilt on
resize); glow = twin stroke, never SVG filters. Scene stats/kickers/bar
reveal once on entry (≤800ms counts, never scrub-gated). Desktop-only line
(≥1024px); mobile gets a static rail per scene. `AnimatedMarketMap`
unchanged inside its zoom wrapper (scale 1.05→1 scrub on the wrapper only).

### §7 MOAT — quiet
One `blockReveal` of the matrix. Endurance column has a static amber edge +
glow (CSS pseudo-element, no animation). `moatClose` line rises once.

### §8 TEAM — quiet
One `blockReveal` staggered over cards. No tilt, no rim light, no scramble.
Monogram portraits get a static amber-duotone treatment (CSS). Marquee keeps +
edge fade masks + pause on hover.

### §9 ROADMAP — the long haul
Keep scroll-driven truck + rail (existing, scrub: true). Milestone unlock =
one-shot headlight sweep (pre-rendered gradient pseudo-element, opacity+x).
Labels fade plainly (no scramble). Mobile cards slide in.

### §10 ASK — readable first
Legend (names, %, blurbs) fully visible on entry — only the bar segments
animate (grow once, `expo.inOut`, 0.12 stagger). Round size resolves ≤800ms
(masked "$ — — —" shimmer if zero/private). Unlocks list hidden while
placeholder. Committed block: existing fallback already correct.

### §11 EDGE — polish only
Keep concept + layout. $150M **hard-cuts** (remove count-up). Kicker fades
(no scramble — not one of the two). Chips/lines/particles keep current
behavior; nudge timings to house easing. Smallest diff of any section.

### §12 CLOSE — "05:58, dawn" — the bookend
Same NightScene, mode "road": low camera on a corridor, pulses streaming
past toward a warm dawn horizon. Kicker scrambles (allowed use #2):
"05:58 EST · SHIFT COMPLETE". "Join the convoy." masked-rises. Primary CTA
magnetic (the only one) + glow pulse on pseudo-element opacity. Footer
hairline draws once.

## Engineering rules

- Three.js only via lazy `import()` in client islands; never in main chunk.
- `gsap.matchMedia()` for any viewport-conditional behavior (NOT the removed
  ScrollTrigger.matchMedia). `invalidateOnRefresh: true` on viewport-relative
  scrubs.
- Initial hidden states set via `gsap.set()` at effect time — never in CSS
  (no-JS and LCP must see content).
- Lenis owns smoothing: `scrub: true` everywhere; no `normalizeScroll`, no
  `syncTouch`.
- CSS: new styles in `app/logistics/styles/v2/<section>.css` (imported via
  `styles/v2/index.css` in the layout), class prefix `v2-<section>__`. Reuse
  `logistics.css` utilities (logi-display, logi-stat, logi-mono, logi-panel,
  logi-tag, logi-cta…). New DOM must NOT reuse old per-section BEM classes
  (`logi-problem__*` etc.) unless intentionally keeping that styling — dead
  blocks in sections.css get pruned in a follow-up pass by the main loop.
- No new dependencies. No Tailwind in /logistics. TypeScript strict.
- a11y: decorative canvases/SVG `aria-hidden`; semantics unchanged; visible
  focus styles on nav/CTAs.

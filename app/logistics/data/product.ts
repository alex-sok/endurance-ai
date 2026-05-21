/**
 * Scripted, deterministic transcript of the AI dispatcher reasoning,
 * shown in §4 — Product. Do NOT swap for a live LLM call; the demo
 * needs to be offline-safe, identical across loads, and inspectable
 * by investors who pause mid-scroll.
 *
 * Each entry renders as a streamed line in the side panel. Timings
 * (ms) drive the typewriter cadence — keep total under ~14s so the
 * pinned section completes within its scroll budget.
 */

export const dispatcherTranscript = [
  { t: 0, kind: "system", body: "Scanning open loads — Southeast region." },
  {
    t: 800,
    kind: "thinking",
    body: "Load #4471 — Atlanta GA → Memphis TN. 22,400 lbs dry van.",
  },
  {
    t: 1600,
    kind: "thinking",
    body: "Market rate $1.94/mi. Shipper budget $2.30/mi. Margin headroom: $0.36/mi.",
  },
  {
    t: 2400,
    kind: "thinking",
    body: "Matched carrier: Mason TX-114. 6.5 hrs HOS remaining. 11 mi from origin.",
  },
  {
    t: 3200,
    kind: "thinking",
    body: "Backhaul: 92% probability Memphis → Birmingham within 36 hrs.",
  },
  {
    t: 4000,
    kind: "action",
    body: "Negotiating with Mason at $2.18/mi — locked.",
  },
  { t: 4800, kind: "action", body: "Booking confirmed. ETA pickup 14:20 CT." },
  {
    t: 5600,
    kind: "system",
    body: "Load #4472 — next in queue. Birmingham AL → Nashville TN.",
  },
] as const;

export const dispatcherKpis = [
  { label: "Loads booked today", value: "147" },
  { label: "Gross margin", value: "18.4%" },
  { label: "On-time %", value: "96.1%" },
  { label: "Deadhead %", value: "11%" },
] as const;

// TODO(alex): if we want the camera-zoom-on-single-load effect from the
// spec, we'll need GeoJSON for ~12 active routes here. Phase 3 work.

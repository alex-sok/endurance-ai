/**
 * §11 — Close & CTA wiring.
 *
 * Reuses the main marketing site's existing Calendly + contact email
 * for now (so the page works end-to-end on day one). Swap in the
 * /logistics-specific Cal.com link once Alex creates it.
 */

export const closeCTAs = {
  // TODO(alex): swap for a /logistics-specific Cal.com link if desired —
  // currently pointing at the main intro calendar.
  callUrl: "https://calendar.notion.so/meet/alexsok/endurance-intro",
  callLabel: "Book a call with Alex",

  // TODO(alex): drop the deck PDF in /public/logistics/endurance-logistics-deck.pdf
  // and optionally gate behind a password. Until then we link to the
  // hello@ email so requests aren't silently dropped.
  deckUrl: null as string | null, // e.g. "/logistics/endurance-logistics-deck.pdf"
  deckLabel: "Download the deck",

  // TODO(alex): pick a backend — Loops, Resend, or HubSpot — and wire
  // POST /api/logistics/lead to it. Phase 1 stub posts to /api/notify
  // (the existing Slack endpoint) so leads still reach the team.
  leadEndpoint: "/api/notify",
  leadLabel: "Drop your email",

  contactEmail: "hello@endurancelabs.ai",
};

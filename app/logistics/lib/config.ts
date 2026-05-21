/**
 * PRIVATE_METRICS — when true, the page renders public-safe placeholders
 * in place of sensitive numbers (traction, ARR, customer logos, etc.).
 * Used to publish a public-facing version and gate full numbers behind
 * a tokenized URL or password.
 *
 * Default: false during scaffolding. Flip to true once real numbers are
 * wired in if we need a public preview link.
 */
export const PRIVATE_METRICS = false;

/**
 * Feature flag for the optional R3F hero. Defaults off so the SVG hero
 * ships even if 3D work slips. Phase 3+ work.
 */
export const HERO_3D_ENABLED = false;

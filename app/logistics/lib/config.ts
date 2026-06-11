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
 * Kill-switch for the WebGL hero (V2). The static SVG network always
 * renders as the base layer; this flag only controls whether the 3D
 * scene crossfades over it. Flip to false to ship SVG-only.
 */
export const HERO_3D_ENABLED = true;

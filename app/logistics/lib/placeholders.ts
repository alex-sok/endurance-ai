/**
 * Data hygiene for the investor page (DESIGN-V2.md hard rule #8).
 *
 * Placeholder strings (TODO markers, bracketed stand-ins) must hide their
 * block entirely rather than render in display type — an investor seeing
 * "TODO(alex): 18-mo milestone 1" in a $-display font is worse than the
 * block not existing. Server-safe: no "use client".
 */
export function isPlaceholder(s: string | null | undefined): boolean {
  if (!s) return true;
  return /TODO|\[Customer|\[N\]|\[target/i.test(s);
}

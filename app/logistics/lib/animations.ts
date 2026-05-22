"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Helpers for the scroll-driven animations in /logistics.
 *
 * Every helper:
 * - Returns a cleanup function (kill the GSAP context) for useEffect.
 * - Honors prefers-reduced-motion by skipping the timeline and jumping
 *   to final state.
 * - Uses GSAP's `context` API so all tweens + triggers are killable in
 *   one call on unmount or HMR.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Walk an SVG path and return the (x, y) at progress p ∈ [0, 1].
 * Used by the truck-along-path animations. Pure DOM, no GSAP plugin.
 */
export function pointOnPath(
  path: SVGPathElement,
  p: number,
): { x: number; y: number; angle: number } {
  const length = path.getTotalLength();
  const point = path.getPointAtLength(p * length);
  // Angle in degrees: use a nearby point to compute the tangent.
  const lookahead = Math.min(p + 0.001, 1);
  const next = path.getPointAtLength(lookahead * length);
  const angle = (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;
  return { x: point.x, y: point.y, angle };
}

export { gsap, ScrollTrigger };

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    DrawSVGPlugin,
    MotionPathPlugin,
  );
  // QA handle: lets headless checks force final states / inspect triggers
  // (the bundled ESM gsap is otherwise unreachable from the console).
  (window as Window & { __logiGsap?: typeof gsap }).__logiGsap = gsap;
}

/**
 * V2 motion library — the single import for all /logistics animation.
 *
 * Registers every GSAP plugin once and exposes the house motion language
 * as composable helpers. All helpers:
 * - are no-ops (jump to final state) when prefers-reduced-motion is set;
 * - are designed to be called inside a `gsap.context` so the caller's
 *   cleanup reverts everything;
 * - default to once-only ScrollTrigger entrances at "top 80%".
 *
 * House rules (see DESIGN-V2.md): entrances are slow and weighty
 * (power4.out, 0.9–1.4s), transitions are expo.inOut, light always
 * travels with direction. Don't invent new easings per section.
 */

export const EASE = {
  /** Entrances — heavy thing gliding to rest. */
  out: "power4.out",
  /** Transitions / pinned beats. */
  inOut: "expo.inOut",
  /** Soft secondary reveals. */
  rise: "power3.out",
} as const;

export const SCRAMBLE_CHARS = "ENDURANCE0123456789▪";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface TriggerOpts {
  /** Element that triggers the entrance; defaults to the target itself. */
  trigger?: Element | null;
  /** ScrollTrigger start; default "top 80%". */
  start?: string;
  delay?: number;
}

function entranceTrigger(target: Element, opts?: TriggerOpts) {
  return {
    trigger: opts?.trigger ?? target,
    start: opts?.start ?? "top 80%",
    once: true,
  };
}

/**
 * Masked line-rise for display type. Splits into lines (re-splits on
 * font load / resize via autoSplit) and rises each line from below its
 * mask. The house headline entrance.
 */
export function riseIn(
  target: Element,
  opts?: TriggerOpts & { stagger?: number; duration?: number },
): SplitText | null {
  if (prefersReducedMotion()) return null;
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    linesClass: "v2-line",
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 112,
        duration: opts?.duration ?? 1.15,
        ease: EASE.out,
        stagger: opts?.stagger ?? 0.09,
        delay: opts?.delay ?? 0,
        scrollTrigger: entranceTrigger(target, opts),
      });
    },
  });
}

/**
 * Mono-label scramble-in. Target keeps its SSR text (no FOUC); the
 * scramble resolves to the original content.
 */
export function scrambleIn(
  target: Element,
  opts?: TriggerOpts & { duration?: number },
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  return gsap.to(target, {
    duration: opts?.duration ?? 0.38,
    delay: opts?.delay ?? 0,
    scrambleText: {
      text: "{original}",
      chars: SCRAMBLE_CHARS,
      speed: 0.4,
    },
    scrollTrigger: entranceTrigger(target, opts),
  });
}

/**
 * Count a number up inside an element. Final formatted value must equal
 * the SSR-rendered content so reduced-motion and no-JS read identically.
 */
export function countUp(
  target: Element,
  to: number,
  opts?: TriggerOpts & {
    duration?: number;
    format?: (n: number) => string;
  },
): gsap.core.Tween | null {
  const format = opts?.format ?? ((n: number) => String(Math.round(n)));
  if (prefersReducedMotion()) {
    target.textContent = format(to);
    return null;
  }
  const state = { v: 0 };
  return gsap.to(state, {
    v: to,
    duration: opts?.duration ?? 0.7,
    ease: "power2.out",
    delay: opts?.delay ?? 0,
    onUpdate() {
      target.textContent = format(state.v);
    },
    scrollTrigger: entranceTrigger(target, opts),
  });
}

/**
 * Standard block entrance: rise + fade with weight. Use for cards,
 * panels, paragraphs — anything that isn't display type.
 */
export function blockReveal(
  targets: Element | Element[] | NodeListOf<Element>,
  opts?: TriggerOpts & { stagger?: number; y?: number },
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  const list = targets instanceof Element ? [targets] : Array.from(targets);
  if (list.length === 0) return null;
  return gsap.from(list, {
    y: opts?.y ?? 56,
    opacity: 0,
    duration: 1.2,
    ease: EASE.out,
    stagger: opts?.stagger ?? 0.08,
    delay: opts?.delay ?? 0,
    scrollTrigger: entranceTrigger(list[0], { trigger: opts?.trigger ?? list[0], start: opts?.start }),
  });
}

/**
 * Magnetic hover for CTAs (desktop, fine pointers only). Element drifts
 * toward the cursor and springs back on leave. Returns a cleanup fn —
 * call it in the component's effect cleanup.
 */
export function magnetize(el: HTMLElement, strength = 0.3): () => void {
  if (
    prefersReducedMotion() ||
    typeof window === "undefined" ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return () => {};
  }
  const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
  // Resting center is measured once per hover (minus any in-flight
  // magnet offset) — reading getBoundingClientRect inside mousemove on
  // an element quickTo is translating would thrash layout at 120Hz.
  let center: { x: number; y: number } | null = null;
  const enter = () => {
    const r = el.getBoundingClientRect();
    const dx = Number(gsap.getProperty(el, "x")) || 0;
    const dy = Number(gsap.getProperty(el, "y")) || 0;
    center = {
      x: r.left + r.width / 2 - dx,
      y: r.top + r.height / 2 - dy,
    };
  };
  const move = (e: MouseEvent) => {
    if (!center) return;
    xTo((e.clientX - center.x) * strength);
    yTo((e.clientY - center.y) * strength);
  };
  const leave = () => {
    center = null;
    xTo(0);
    yTo(0);
  };
  el.addEventListener("mouseenter", enter);
  el.addEventListener("mousemove", move);
  el.addEventListener("mouseleave", leave);
  return () => {
    el.removeEventListener("mouseenter", enter);
    el.removeEventListener("mousemove", move);
    el.removeEventListener("mouseleave", leave);
    xTo(0);
    yTo(0);
  };
}

export { gsap, ScrollTrigger, SplitText };

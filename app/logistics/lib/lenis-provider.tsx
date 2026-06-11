"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bootV2 } from "./v2-boot";

// Register the plugin once, only in the browser, before any component
// tries to use it. Server-side registration is a no-op.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    /** The /logistics Lenis instance — preloader + nav use stop()/start(). */
    __logiLenis?: Lenis;
  }
}

/**
 * Mounts a single Lenis instance for /logistics AND wires it to
 * GSAP ScrollTrigger so scroll-driven animations stay in sync with
 * Lenis's interpolated scroll position (otherwise triggers fire at
 * the wrong scrollY and feel "off").
 *
 * - Honors prefers-reduced-motion: skips Lenis entirely. ScrollTrigger
 *   still works against native scroll for any reveal-on-enter triggers
 *   that components register; they'll just behave like instant fades
 *   because the animations branch on prefers-reduced-motion themselves.
 * - Lenis owns ALL scroll smoothing. V2 doctrine (DESIGN-V2.md): every
 *   scrubbed ScrollTrigger uses `scrub: true` — never a numeric scrub,
 *   which would lerp on top of Lenis's lerp and feel rubbery.
 * - Teardown is scoped: each component reverts its own gsap.context.
 *   (A previous version killed ALL ScrollTriggers here, which raced
 *   child re-mounts under StrictMode/HMR.)
 */
export function LenisProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    bootV2();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    window.__logiLenis = lenis;

    // Pipe Lenis scroll events to ScrollTrigger so every ScrollTrigger
    // recalculates progress against Lenis's interpolated position, not
    // the browser's raw position.
    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP's ticker drive Lenis. Single RAF loop for everything.
    const rafTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafTick);
      lenis.destroy();
      if (window.__logiLenis === lenis) delete window.__logiLenis;
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin once, only in the browser, before any component
// tries to use it. Server-side registration is a no-op.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
 * - Tears down cleanly on route change so the rest of the site returns
 *   to native scroll.
 *
 * GSAP free + ScrollTrigger free as of 2024 — no Club license needed.
 */
export function LenisProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
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
      // Kill any ScrollTriggers a child component forgot to clean up,
      // so navigating away from /logistics doesn't leave stale triggers
      // running on the marketing site.
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

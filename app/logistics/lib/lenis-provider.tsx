"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a single Lenis instance for the /logistics route.
 *
 * - Honors prefers-reduced-motion (Lenis is skipped entirely).
 * - Mounts once on first render and tears down on unmount, so navigating
 *   away from /logistics returns the browser to native scroll on the
 *   rest of the site.
 * - Future GSAP ScrollTrigger work will connect via lenis.on("scroll",
 *   ScrollTrigger.update). That wiring belongs in a Phase 3+ animation
 *   provider — not here.
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

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

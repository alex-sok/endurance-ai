"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";

/**
 * Mounts the §6 Market scroll-reveal animations.
 *
 * - `[data-reveal]` elements fade + slide up on enter
 * - `[data-reveal-bar]` (the spend-breakdown bar) wipes in from left,
 *   then each slice scales up from the bar's left edge
 * - `[data-reveal-stat]` (TAM/SAM/SOM) stamps in with overshoot
 *
 * Reduced motion: jumps to final state, no triggers registered.
 *
 * Lives as its own client component so the parent Market section can
 * stay a server component (smaller hydration payload).
 */
export function MarketRevealClient() {
  useEffect(() => {
    const section = document.getElementById("market");
    if (!section) return;

    if (prefersReducedMotion()) {
      // Nothing to do — CSS opacity defaults to 1, transforms to none.
      return;
    }

    const ctx = gsap.context(() => {
      const reveals = section.querySelectorAll<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Spend-breakdown bar — slices scale up from the left edge.
      const bar = section.querySelector<HTMLElement>("[data-reveal-bar]");
      if (bar) {
        const slices = bar.querySelectorAll<HTMLElement>(".logi-market__slice");
        gsap.fromTo(
          slices,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // TAM/SAM/SOM blocks stamp in with overshoot.
      const stats = section.querySelectorAll<HTMLElement>("[data-reveal-stat]");
      stats.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return null;
}

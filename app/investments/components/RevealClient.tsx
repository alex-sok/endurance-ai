"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";

/**
 * Mounts global scroll-reveal animations for /investments.
 *
 * Any element marked with `data-reveal` fades + slides up on enter.
 * Optional `data-reveal-delay` adds a stagger relative to the trigger.
 *
 * Reduced motion: jumps to final state, no triggers registered (the CSS
 * default of opacity: 1 covers it).
 */
export function RevealClient() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

"use client";

import { ScrollTrigger } from "./v2-motion";

let booted = false;

/**
 * One-time ScrollTrigger boot sequence (DESIGN-V2.md). Trigger positions
 * are measured at mount, but cold production loads shift layout twice
 * afterward: when the webfonts swap (line wraps change) and when the
 * preloader curtain lifts. Dev/HMR never shows this (fonts cached, no
 * preloader), so the refreshes below are what keep first-visit investors
 * from seeing every pin and entrance offset. Mounted by LenisProvider.
 */
export function bootV2(): void {
  if (booted || typeof window === "undefined") return;
  booted = true;

  ScrollTrigger.config({ ignoreMobileResize: true });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  window.addEventListener("logi:intro-done", () => ScrollTrigger.refresh(), {
    once: true,
  });
}

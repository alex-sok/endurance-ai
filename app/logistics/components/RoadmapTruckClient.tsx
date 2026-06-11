"use client";

import { useEffect } from "react";
import {
  gsap,
  riseIn,
  blockReveal,
  prefersReducedMotion,
  EASE,
} from "../lib/v2-motion";

interface RoadmapTruckClientProps {
  milestoneCount: number;
}

/**
 * Choreography for §9 Roadmap (DESIGN-V2.md — "the long haul").
 *
 * Desktop (>900px):
 * - One choreographed entrance: headline masked-rise, then the track +
 *   milestone columns blockReveal together.
 * - A single scrubbed timeline (scrub: true — Lenis is the only
 *   smoothing layer; invalidateOnRefresh re-measures the rail) drives
 *   the truck across the rail and fills it (scaleX, transform-only).
 * - As the truck passes each column, the column unlocks ONCE: the
 *   `is-locked` dim lifts (plain opacity fades — no scramble) and the
 *   `is-unlocked` class fires the one-shot CSS headlight sweep
 *   (pre-rendered gradient pseudo-element, transform + opacity only).
 *
 * Mobile (≤900px): no truck (track is display:none in CSS) — cards
 * slide in individually; the sweep stamps each card as it lands.
 *
 * Animation never gates data: locked columns stay readable (dimmed,
 * never hidden), unlocks are one-shot, and reduced-motion users get
 * the final state with zero motion (CSS hides the truck, fills the
 * rail by default, and disables the sweep keyframes).
 */
export function RoadmapTruckClient({ milestoneCount }: RoadmapTruckClientProps) {
  useEffect(() => {
    const section = document.getElementById("roadmap");
    if (!section) return;

    // Reduced motion: CSS already renders the final state (truck
    // hidden, rail full, columns unlocked). No JS needed.
    if (prefersReducedMotion()) return;

    const truck = section.querySelector<HTMLElement>("[data-roadmap-truck]");
    const railFill = section.querySelector<HTMLElement>(
      "[data-roadmap-rail-fill]",
    );
    const track = section.querySelector<HTMLElement>("[data-roadmap-track]");
    const grid = section.querySelector<HTMLElement>("[data-roadmap-grid]");
    const milestones = Array.from(
      section.querySelectorAll<HTMLElement>("[data-roadmap-milestone]"),
    );
    const count = milestones.length || milestoneCount;

    // One-shot unlock: lifts the dim and fires the CSS headlight sweep.
    const unlock = (m: HTMLElement) => {
      if (m.classList.contains("is-unlocked")) return;
      m.classList.remove("is-locked");
      m.classList.add("is-unlocked");
    };

    const ctx = gsap.context(() => {
      const headline = section.querySelector(".v2-roadmap__headline");
      if (headline) riseIn(headline);
    }, section);

    const mm = gsap.matchMedia();

    // Desktop: the truck drives the rail; columns unlock as it passes.
    mm.add("(min-width: 901px)", () => {
      if (!truck || !railFill || !grid) return;

      // Locked dim applied at effect time (never in CSS) so no-JS and
      // reduced-motion users see everything unlocked.
      milestones.forEach((m) => {
        if (!m.classList.contains("is-unlocked")) m.classList.add("is-locked");
      });

      blockReveal(track ? [track, ...milestones] : milestones, {
        trigger: grid,
        start: "top 80%",
        stagger: 0.08,
        y: 48,
      });

      const rail = railFill.parentElement;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate(st) {
              milestones.forEach((m, i) => {
                if (st.progress >= (i + 0.5) / count) unlock(m);
              });
            },
          },
        })
        .fromTo(
          truck,
          { x: 0 },
          {
            x: () => (rail ? rail.clientWidth - truck.offsetWidth : 0),
            ease: "none",
          },
          0,
        )
        .fromTo(railFill, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

      return () => {
        milestones.forEach((m) => m.classList.remove("is-locked"));
      };
    });

    // Mobile: cards slide in; the headlight sweep stamps each on landing.
    mm.add("(max-width: 900px)", () => {
      milestones.forEach((m) => {
        gsap.from(m, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: EASE.out,
          scrollTrigger: { trigger: m, start: "top 85%", once: true },
          onComplete: () => unlock(m),
        });
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [milestoneCount]);

  return null;
}

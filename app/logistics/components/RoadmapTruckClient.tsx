"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "../lib/animations";

interface RoadmapTruckClientProps {
  milestoneCount: number;
}

/**
 * Scroll-driven truck animation for §9 Roadmap.
 *
 * The truck and the rail-fill bar are positioned in JSX above (with
 * `data-roadmap-truck` and `data-roadmap-rail-fill`). This client hook
 * connects them to a single ScrollTrigger that scrubs across the
 * section: the truck translates from 0 → 100% of the timeline's width
 * and the rail fills behind it.
 *
 * Each milestone node (`data-roadmap-milestone="N"`) unlocks (CSS class
 * `is-unlocked`) when the scroll progress passes its position.
 *
 * Reduced motion: the truck is hidden via CSS, the rail is fully filled,
 * and all milestones render in their unlocked state immediately.
 *
 * Mobile (< 900px): the truck rail collapses to vertical via CSS, and
 * we skip the horizontal truck tween — the milestone unlocks still fire
 * on enter via independent ScrollTriggers.
 */
export function RoadmapTruckClient({ milestoneCount }: RoadmapTruckClientProps) {
  useEffect(() => {
    const section = document.getElementById("roadmap");
    if (!section) return;

    const truck = section.querySelector<HTMLElement>("[data-roadmap-truck]");
    const railFill = section.querySelector<HTMLElement>(
      "[data-roadmap-rail-fill]",
    );
    const milestones = Array.from(
      section.querySelectorAll<HTMLElement>("[data-roadmap-milestone]"),
    );

    if (prefersReducedMotion()) {
      if (railFill) railFill.style.width = "100%";
      if (truck) truck.style.display = "none";
      milestones.forEach((m) => m.classList.add("is-unlocked"));
      return;
    }

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      // Milestone unlocks fire on enter regardless of mobile/desktop.
      milestones.forEach((m) => {
        gsap.to(m, {
          scrollTrigger: {
            trigger: m,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onEnter: () => m.classList.add("is-unlocked"),
            onLeaveBack: () => m.classList.remove("is-unlocked"),
          },
        });
      });

      // Truck + rail-fill: desktop only. The whole grid section drives
      // the scrub — when the section is mid-viewport, the truck is
      // mid-way across the timeline.
      if (isMobile || !truck || !railFill) return;

      const grid = section.querySelector<HTMLElement>(".logi-roadmap__grid");
      if (!grid) return;

      gsap.fromTo(
        truck,
        { xPercent: 0 },
        {
          xPercent: 100,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        },
      );
      gsap.fromTo(
        railFill,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [milestoneCount]);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/v2-motion";

const TARGET_MIN = 23 * 60 + 47; // 23:47

/**
 * One-beat intro (DESIGN-V2.md): a mono timestamp ticks to 23:47 EST,
 * "NETWORK LIVE" confirms, the curtain lifts. ≤900ms, once per session,
 * never locks scroll, any input skips it. No fake percentages.
 *
 * Hydration-safe: an inline script in layout.tsx (the next sibling in
 * the DOM, so it runs during parse, before paint) stamps `data-run` on
 * THIS overlay div for first-visit + motion-OK sessions. CSS keeps the
 * overlay display:none without the attribute, so repeat visitors never
 * see a flash. The div sets suppressHydrationWarning because the
 * attribute is parser-applied before React hydrates. This component
 * only ever reads the attribute — never storage — so server and client
 * render identically.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!el.hasAttribute("data-run")) {
      setDead(true);
      return;
    }

    const finish = () => {
      el.removeAttribute("data-run");
      window.dispatchEvent(new Event("logi:intro-done"));
      setDead(true);
    };

    let tl: gsap.core.Timeline | null = null;
    const skip = () => {
      if (tl && tl.progress() < 1) tl.progress(1);
    };

    const ctx = gsap.context(() => {
      const time = el.querySelector<HTMLElement>(".v2-preloader__time")!;
      const live = el.querySelector<HTMLElement>(".v2-preloader__live")!;
      const state = { m: 0 };

      tl = gsap.timeline({ onComplete: finish });
      tl.to(state, {
        m: TARGET_MIN,
        duration: 0.5,
        ease: "power3.inOut",
        onUpdate() {
          const mm = Math.round(state.m);
          const hh = String(Math.floor(mm / 60)).padStart(2, "0");
          const m2 = String(mm % 60).padStart(2, "0");
          time.textContent = `${hh}:${m2} EST`;
        },
      })
        .to(live, { opacity: 1, duration: 0.16 }, "-=0.08")
        .to(el, { yPercent: -100, duration: 0.55, ease: "expo.inOut" }, "+=0.16");
    }, el);

    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      ctx.revert();
    };
  }, []);

  if (dead) return null;

  return (
    <div
      ref={ref}
      className="v2-preloader"
      role="presentation"
      suppressHydrationWarning
    >
      <noscript>
        <style>{`.v2-preloader{display:none}`}</style>
      </noscript>
      <div className="v2-preloader__row logi-mono">
        <span className="v2-preloader__time">00:00 EST</span>
        <span className="v2-preloader__live">● NETWORK LIVE</span>
      </div>
    </div>
  );
}

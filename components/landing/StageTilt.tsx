"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The stage in depth: it arrives leaning back and settles flat as it rises
// into view, with a whisper of pan following the pointer. Under reduced
// motion it holds the resting lean and never moves.
export function StageTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      el.style.setProperty("--tilt", "7deg");
      return;
    }
    let pan = 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 while the stage is still below the fold, 1 once its top reaches 30% of the viewport.
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
      const eased = 1 - Math.pow(1 - progress, 3);
      // A resting lean of 7 degrees keeps the depth readable once it has settled.
      el.style.setProperty("--tilt", `${(7 + 9 * (1 - eased)).toFixed(2)}deg`);
      el.style.setProperty("--pan", `${pan.toFixed(2)}deg`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onPointer = (e: PointerEvent) => {
      pan = ((e.clientX / Math.max(1, window.innerWidth)) - 0.5) * 5;
      schedule();
    };
    update();
    window.addEventListener("load", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={ref} className="lp-stage3d">
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/** The 12 narrative beats, in page order (see page.tsx). */
const SECTION_IDS = [
  "hero",
  "problem",
  "shift",
  "product",
  "traction",
  "market",
  "moat",
  "team",
  "roadmap",
  "ask",
  "edge",
  "close",
] as const;

/**
 * Right-edge progress rail, v2: twelve hairline ticks — one per
 * section — with the active section's tick in amber.
 *
 * - Active = the last section whose top has crossed the viewport
 *   midline. Works through the §2 pin too: a pinned section reports
 *   rect.top ≈ 0 while fixed, and its spacer keeps everything after
 *   it in flow.
 * - Tracks raw documentElement scroll (Lenis drives it), raf-throttled;
 *   setState bails out unless the active index actually changed.
 * - aria-hidden: decoration. The nav + section anchors carry the real
 *   navigation semantics.
 */
export function ProgressIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const midline = window.innerHeight * 0.5;
      let next = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top <= midline) next = i;
      }
      setActive(next);
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="v2-nav__rail">
      {SECTION_IDS.map((id, i) => (
        <span
          key={id}
          className={
            i === active ? "v2-nav__tick v2-nav__tick--active" : "v2-nav__tick"
          }
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Thin amber progress rail pinned to the right edge of the viewport.
 *
 * - Tracks raw documentElement scroll, which Lenis drives.
 * - Pure CSS height transform — no per-frame React state churn beyond
 *   the percent number, which only rerenders on raf-throttled scroll.
 * - aria-hidden because it's a decoration; the section anchors below
 *   carry the real navigation semantics.
 */
export function ProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
      setProgress(next);
      raf = 0;
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="logi-progress-rail"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 2,
        height: "100vh",
        background: "var(--logi-divider)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${progress * 100}%`,
          background: "var(--logi-signal)",
          boxShadow: "0 0 12px var(--logi-signal-glow)",
          transition: "height 80ms linear",
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

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
      className="inv-progress-rail"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 2,
        height: "100vh",
        background: "var(--inv-divider)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${progress * 100}%`,
          background: "var(--inv-signal)",
          boxShadow: "0 0 12px var(--inv-signal-glow)",
          transition: "height 80ms linear",
        }}
      />
    </div>
  );
}

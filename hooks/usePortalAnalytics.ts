"use client";

import { useEffect, useRef } from "react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  for (const part of document.cookie.split(";")) {
    const [k, v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v ?? "");
  }
  return null;
}

function post(slug: string, payload: Record<string, unknown>) {
  fetch(`/api/portal/${slug}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export function usePortalAnalytics(slug: string, activeSection: string | null) {
  const sessionId     = useRef<string | null>(null);
  const sessionStart  = useRef<number>(Date.now());
  const sectionStart  = useRef<number>(Date.now());
  const prevSection   = useRef<string | null>(null);

  // Read session ID from cookie on mount
  useEffect(() => {
    sessionId.current = getCookie(`portal_sid_${slug}`);
    sessionStart.current = Date.now();
  }, [slug]);

  // On section change: emit the section that just finished
  useEffect(() => {
    if (!sessionId.current) return;

    if (prevSection.current && prevSection.current !== activeSection) {
      const duration = Math.round((Date.now() - sectionStart.current) / 1000);
      post(slug, {
        session_id:       sessionId.current,
        type:             "section_view",
        section_slug:     prevSection.current,
        duration_seconds: duration,
      });
    }

    prevSection.current  = activeSection;
    sectionStart.current = Date.now();
  }, [activeSection, slug]);

  // On page exit: beacon total session duration + flush last section
  useEffect(() => {
    const handleUnload = () => {
      if (!sessionId.current) return;
      const totalDuration    = Math.round((Date.now() - sessionStart.current) / 1000);
      const sectionDuration  = Math.round((Date.now() - sectionStart.current) / 1000);

      const payload = JSON.stringify({
        session_id:            sessionId.current,
        type:                  "page_exit",
        duration_seconds:      totalDuration,
        last_section:          prevSection.current,
        last_section_duration: prevSection.current ? sectionDuration : null,
      });

      navigator.sendBeacon(
        `/api/portal/${slug}/track`,
        new Blob([payload], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [slug]);
}

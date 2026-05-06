"use client";

import { useEffect, useRef, useCallback } from "react";

const IDLE_TIMEOUT_MS   = 30 * 60 * 1000;   // 30 min no activity → close session
const HIDDEN_TIMEOUT_MS = 15 * 60 * 1000;   // 15 min tab hidden  → close session

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

function beacon(slug: string, payload: Record<string, unknown>) {
  navigator.sendBeacon(
    `/api/portal/${slug}/track`,
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
}

export function usePortalAnalytics(slug: string, activeSection: string | null) {
  const sessionId    = useRef<string | null>(null);
  const sessionStart = useRef<number>(Date.now());
  const sectionStart = useRef<number>(Date.now());
  const prevSection  = useRef<string | null>(null);
  const sessionEnded = useRef(false);
  const idleTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hiddenTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Grab the session cookie on mount
  useEffect(() => {
    sessionId.current  = getCookie(`portal_sid_${slug}`);
    sessionStart.current = Date.now();
  }, [slug]);

  // Send page_exit beacon — guarded so it only fires once per mount
  const sendExit = useCallback(() => {
    if (sessionEnded.current || !sessionId.current) return;
    sessionEnded.current = true;

    if (idleTimer.current)  { clearTimeout(idleTimer.current);  idleTimer.current  = null; }
    if (hiddenTimer.current) { clearTimeout(hiddenTimer.current); hiddenTimer.current = null; }

    const totalDuration   = Math.round((Date.now() - sessionStart.current) / 1000);
    const sectionDuration = Math.round((Date.now() - sectionStart.current) / 1000);

    beacon(slug, {
      session_id:            sessionId.current,
      type:                  "page_exit",
      duration_seconds:      totalDuration,
      last_section:          prevSection.current,
      last_section_duration: prevSection.current ? sectionDuration : null,
    });
  }, [slug]);

  // Reset the idle countdown whenever the user does anything
  const resetIdle = useCallback(() => {
    if (sessionEnded.current) return;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(sendExit, IDLE_TIMEOUT_MS);
  }, [sendExit]);

  // ── Activity listeners + initial idle timer ────────────────────────────────
  useEffect(() => {
    const EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;
    EVENTS.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle(); // start the clock

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdle]);

  // ── Visibility change: close when tab stays hidden for 15 min ─────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        hiddenTimer.current = setTimeout(sendExit, HIDDEN_TIMEOUT_MS);
      } else {
        if (hiddenTimer.current) { clearTimeout(hiddenTimer.current); hiddenTimer.current = null; }
        if (!sessionEnded.current) resetIdle(); // resuming — restart idle clock
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (hiddenTimer.current) clearTimeout(hiddenTimer.current);
    };
  }, [sendExit, resetIdle]);

  // ── Section change: emit the section that just finished ───────────────────
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
    if (!sessionEnded.current) resetIdle(); // navigating counts as activity
  }, [activeSection, slug, resetIdle]);

  // ── beforeunload fallback (tab/window close) ───────────────────────────────
  useEffect(() => {
    window.addEventListener("beforeunload", sendExit);
    return () => window.removeEventListener("beforeunload", sendExit);
  }, [sendExit]);
}

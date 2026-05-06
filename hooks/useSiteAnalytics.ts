"use client";

import { useEffect, useRef, useCallback } from "react";

function post(payload: Record<string, unknown>, beacon = false) {
  const url  = "/api/site/track";
  const body = JSON.stringify(payload);
  if (beacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body }).catch(() => {});
  }
}

export function useSiteAnalytics() {
  const sessionId    = useRef<string | null>(null);
  const sessionStart = useRef<number>(Date.now());
  const sectionStart = useRef<number>(Date.now());
  const activeSection = useRef<string | null>(null);

  // Create session on mount
  useEffect(() => {
    fetch("/api/site/track", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ type: "session_start" }),
    })
      .then((r) => r.json())
      .then((d) => {
        sessionId.current    = d.session_id ?? null;
        sessionStart.current = Date.now();
      })
      .catch(() => {});
  }, []);

  // Track when a section enters view
  const onSectionEnter = useCallback((slug: string) => {
    if (!sessionId.current) return;

    // Flush previous section
    if (activeSection.current && activeSection.current !== slug) {
      const duration = Math.round((Date.now() - sectionStart.current) / 1000);
      post({ type: "section_view", session_id: sessionId.current, section_slug: activeSection.current, duration_seconds: duration });
    }

    activeSection.current = slug;
    sectionStart.current  = Date.now();
  }, []);

  // Track chat open
  const onChatOpen = useCallback(() => {
    if (!sessionId.current) return;
    post({ type: "chat_open", session_id: sessionId.current });
  }, []);

  // Track CTA click
  const onCtaClick = useCallback((label: string) => {
    if (!sessionId.current) return;
    post({ type: "cta_click", session_id: sessionId.current, section_slug: label });
  }, []);

  // Beacon on page exit
  useEffect(() => {
    const handleUnload = () => {
      if (!sessionId.current) return;
      const total           = Math.round((Date.now() - sessionStart.current)  / 1000);
      const sectionDuration = Math.round((Date.now() - sectionStart.current) / 1000);
      post({
        type:                  "page_exit",
        session_id:            sessionId.current,
        duration_seconds:      total,
        last_section:          activeSection.current,
        last_section_duration: activeSection.current ? sectionDuration : null,
      }, true);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return { onSectionEnter, onChatOpen, onCtaClick };
}

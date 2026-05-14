"use client";

import { useEffect } from "react";

export function ApolloTracker() {
  useEffect(() => {
    const n = Math.random().toString(36).substring(7);
    const script = document.createElement("script");
    script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${n}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.trackingFunctions) {
        w.trackingFunctions.onLoad({ appId: "694ae0d3e06005002190100b" });
      }
    };
    document.head.appendChild(script);
  }, []);

  return null;
}

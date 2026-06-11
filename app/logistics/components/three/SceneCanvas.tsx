"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/v2-motion";

/**
 * Generic WebGL canvas lifecycle for /logistics scenes.
 *
 * Contract (DESIGN-V2.md):
 * - The scene module (and three.js itself) loads lazily via the `load`
 *   prop — three never enters the main chunk.
 * - The GL context is created only when the canvas enters a ±100%
 *   rootMargin IntersectionObserver band, and FULLY disposed (incl.
 *   forceContextLoss inside the scene's dispose) when it leaves — so the
 *   hero and close scenes never hold GPU memory at the same time.
 * - Renders only while intersecting and the tab is visible, on GSAP's
 *   ticker (one RAF loop page-wide, shared with Lenis).
 * - DPR is capped at 2 (1.5 on coarse pointers).
 * - Reduced motion: the scene init renders a single static frame and
 *   returns no update fn — the ticker then never draws.
 * - `data-ready` is stamped on the canvas after the first scene init so
 *   CSS can crossfade it over a static base layer (no pop-in).
 */

export interface SceneAPI {
  update?: (timeSec: number, deltaMs: number) => void;
  resize?: (width: number, height: number) => void;
  /** Optional scroll hook (e.g. hero camera lift). 0..1. */
  setProgress?: (p: number) => void;
  dispose: () => void;
}

export interface SceneInitOpts {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  dpr: number;
  reduced: boolean;
}

export interface SceneModule {
  init: (opts: SceneInitOpts) => Promise<SceneAPI> | SceneAPI;
}

interface SceneCanvasProps {
  /** Stable module loader, e.g. `() => import("./HeroScene")`. */
  load: () => Promise<SceneModule>;
  className?: string;
  /** Fires on every (re)creation — store the api in a ref. */
  onReady?: (api: SceneAPI) => void;
  /** WebGL unavailable / scene init threw — render a fallback. */
  onError?: (err: unknown) => void;
}

export function SceneCanvas({
  load,
  className,
  onReady,
  onError,
}: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cbRef = useRef({ load, onReady, onError });
  cbRef.current = { load, onReady, onError };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let api: SceneAPI | null = null;
    let creating = false;
    let destroyed = false;
    let intersecting = false;

    const tick = (timeSec: number, deltaMs: number) => {
      if (api?.update && intersecting && !document.hidden) {
        api.update(timeSec, deltaMs);
      }
    };

    const create = async () => {
      if (api || creating || destroyed) return;
      creating = true;
      try {
        const mod = await cbRef.current.load();
        if (destroyed) return;
        const rect = canvas.getBoundingClientRect();
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        const next = await mod.init({
          canvas,
          width: Math.max(1, rect.width),
          height: Math.max(1, rect.height),
          dpr: Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2),
          reduced: prefersReducedMotion(),
        });
        if (destroyed || !intersecting) {
          // The canvas left the band (or unmounted) while the lazy import
          // / init was in flight — keeping the context would let hero and
          // close contexts coexist, which this component exists to prevent.
          next.dispose();
          return;
        }
        api = next;
        canvas.dataset.ready = "true";
        cbRef.current.onReady?.(api);
      } catch (err) {
        cbRef.current.onError?.(err);
      } finally {
        creating = false;
      }
    };

    const destroy = () => {
      if (!api) return;
      api.dispose();
      api = null;
      // Remove data-ready so the static base layer returns to full opacity
      // while the scene reinitialises on the next intersection — avoids
      // showing a black/transparent canvas frame as the fallback.
      delete canvas.dataset.ready;
    };

    const io = new IntersectionObserver(
      (entries) => {
        // Records are appended oldest-first; only the newest reflects the
        // current state when crossings batch up under fast scrolling.
        const entry = entries[entries.length - 1];
        intersecting = entry.isIntersecting;
        if (entry.isIntersecting) void create();
        else destroy();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) api?.resize?.(width, height);
    });
    ro.observe(canvas);

    gsap.ticker.add(tick);

    return () => {
      destroyed = true;
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

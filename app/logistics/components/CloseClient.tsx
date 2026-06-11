"use client";

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  ScrollTrigger,
  riseIn,
  scrambleIn,
  blockReveal,
  magnetize,
  prefersReducedMotion,
  EASE,
} from "../lib/v2-motion";
import { SceneCanvas, type SceneAPI } from "./three/SceneCanvas";
import { closeCTAs } from "../data/close";

const loadCloseScene = () => import("./three/CloseScene");

/**
 * §12 close — "05:58, dawn" (DESIGN-V2.md).
 *
 * The bookend: the SAME night world as the hero, re-shot from road
 * level. A scrubbed ScrollTrigger feeds section progress to the scene
 * so the dawn horizon brightens as the investor reaches the end. A CSS
 * dawn gradient sits behind the canvas as the no-WebGL / pre-ready base
 * layer (the canvas crossfades over it via .v2-scene[data-ready]).
 *
 * Choreography: kicker scrambles (allowed use #2 of 2), "Join the
 * convoy." masked-rises, sub + CTAs blockReveal, footer hairline draws
 * once. The primary CTA is the page's ONLY magnetic element, with a
 * glow pulse on a pre-rendered pseudo-element (opacity only).
 */
export function CloseClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const apiRef = useRef<SceneAPI | null>(null);
  const progressRef = useRef(0);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = (root.closest("#close") as HTMLElement) ?? root;

    const ctx = gsap.context(() => {
      const kicker = root.querySelector(".v2-close__kicker");
      const headline = root.querySelector(".v2-close__headline");
      const below = root.querySelectorAll(".v2-close__below");
      const hairline = root.querySelector(".v2-close__hairline");

      if (kicker) scrambleIn(kicker);
      if (headline) riseIn(headline, { delay: 0.12 });
      if (below.length) {
        blockReveal(below, { delay: 0.35, stagger: 0.12, y: 40 });
      }

      if (!prefersReducedMotion()) {
        // Dawn brightens with section progress. Scrub only feeds the
        // scene — no DOM state depends on it (animation never gates data).
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (st) => {
            progressRef.current = st.progress;
            apiRef.current?.setProgress?.(st.progress);
          },
        });

        if (hairline) {
          gsap.from(hairline, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: EASE.inOut,
            scrollTrigger: {
              trigger: hairline,
              start: "top 98%",
              once: true,
            },
          });
        }
      }
    }, root);

    const demagnetize = primaryRef.current
      ? magnetize(primaryRef.current)
      : () => {};

    return () => {
      demagnetize();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="v2-close__root">
      <div className="v2-close__frame" aria-hidden="true">
        <div className="v2-close__fallback" />
        {!webglFailed ? (
          <SceneCanvas
            load={loadCloseScene}
            className="v2-scene v2-close__canvas"
            onReady={(api) => {
              apiRef.current = api;
              // Canvas mounts lazily — sync it to wherever the scrub is.
              api.setProgress?.(progressRef.current);
            }}
            onError={() => setWebglFailed(true)}
          />
        ) : null}
      </div>

      <div className="v2-close__copy">
        <p className="logi-tag v2-close__kicker">
          05:58 EST — shift complete
        </p>
        <h2 className="logi-display v2-close__headline">
          Join the <span className="v2-close__accent">convoy</span>.
        </h2>
        <p className="logi-body logi-body-muted v2-close__sub v2-close__below">
          We&rsquo;re raising the round that builds the next freight network.
          Pick the door.
        </p>

        <div className="v2-close__ctas v2-close__below">
          <a
            ref={primaryRef}
            className="logi-cta v2-close__primary"
            href={closeCTAs.callUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {closeCTAs.callLabel} →
          </a>
          {closeCTAs.deckUrl ? (
            <a
              className="logi-cta logi-cta--ghost"
              href={closeCTAs.deckUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {closeCTAs.deckLabel} ↓
            </a>
          ) : (
            <a
              className="logi-cta logi-cta--ghost"
              href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Logistics deck`}
            >
              {closeCTAs.deckLabel} ↓
            </a>
          )}
          <a
            className="logi-cta logi-cta--ghost"
            href={`mailto:${closeCTAs.contactEmail}?subject=Endurance Logistics — intro`}
          >
            {closeCTAs.leadLabel} →
          </a>
        </div>

        <footer className="v2-close__footer logi-mono">
          <span className="v2-close__hairline" aria-hidden="true" />
          <span>© 2026 Endurance Labs.</span>
          <a href={`mailto:${closeCTAs.contactEmail}`}>
            {closeCTAs.contactEmail}
          </a>
        </footer>
      </div>
    </div>
  );
}

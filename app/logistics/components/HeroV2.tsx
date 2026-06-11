"use client";

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  ScrollTrigger,
  riseIn,
  scrambleIn,
  blockReveal,
  prefersReducedMotion,
} from "../lib/v2-motion";
import { SceneCanvas, type SceneAPI } from "./three/SceneCanvas";
import { HeroStaticNetwork } from "./HeroStaticNetwork";
import { HERO_3D_ENABLED } from "../lib/config";
import { closeCTAs } from "../data/close";

const loadHeroScene = () => import("./three/HeroScene");

/**
 * §1 hero — "The network, 23:47" (DESIGN-V2.md).
 *
 * Layers: static SVG network renders always (LCP-safe base);
 * the WebGL aerial scene crossfades over it when its first frame is
 * ready. Copy choreography: eyebrow scramble (allowed use #1 of 2),
 * H1 masked line-rise, sub + facts strip + cue blockReveal. Scrolling
 * out lifts the 3D camera and parallaxes the copy.
 *
 * The facts strip is deliberately zero-animation: a 90-second skimmer
 * gets stage, backer, beachhead, and contact without scrolling.
 */
export function HeroV2() {
  const rootRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneAPI | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = (root.closest("#hero") as HTMLElement) ?? root;

    let introHandler: (() => void) | null = null;
    // `self` (the context, passed to its own callback) is used for late
    // additions instead of the outer `ctx` const — which is still in its
    // TDZ while this callback runs synchronously.
    const ctx = gsap.context((self) => {
      const eyebrow = root.querySelector(".v2-hero__eyebrow");
      const h1 = root.querySelector(".v2-hero__headline");
      const below = root.querySelectorAll(".v2-hero__below");

      const run = () => {
        if (eyebrow) scrambleIn(eyebrow, { start: "top 95%" });
        if (h1) riseIn(h1, { delay: 0.15, start: "top 95%" });
        if (below.length) {
          blockReveal(below, { delay: 0.55, stagger: 0.12, start: "top 95%", y: 36 });
        }
      };

      // First visit: hold the entrance until the preloader curtain lifts.
      // The deferred call goes through ctx.add() so the animations it
      // creates are recorded by this context and die with it on unmount
      // (a bare run() here would leak the SplitText + triggers).
      if (document.querySelector(".v2-preloader[data-run]")) {
        introHandler = () => self.add(run);
        window.addEventListener("logi:intro-done", introHandler, {
          once: true,
        });
      } else {
        run();
      }

      // Scroll out: lift the 3D camera, fade the world, copy rises faster.
      // Reduced motion: no scroll-driven motion at all (hard rule #1) —
      // the scene renders one static frame and the copy stays put.
      if (!prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (st) => apiRef.current?.setProgress?.(st.progress),
        });
        gsap.to(root.querySelector(".v2-hero__copy"), {
          yPercent: -14,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => {
      if (introHandler) {
        window.removeEventListener("logi:intro-done", introHandler);
      }
      ctx.revert();
    };
  }, []);

  const show3D = HERO_3D_ENABLED && !webglFailed;

  return (
    <div ref={rootRef} className="v2-hero">
      <div className="logi-hero__frame v2-hero__frame" aria-hidden="true">
        <div className="v2-hero__static">
          <HeroStaticNetwork />
        </div>
        {show3D ? (
          <SceneCanvas
            load={loadHeroScene}
            className="v2-scene v2-hero__canvas"
            onReady={(api) => {
              apiRef.current = api;
            }}
            onError={() => setWebglFailed(true)}
          />
        ) : null}
        <div className="logi-hero__fog" />
      </div>

      <div className="logi-hero__copy v2-hero__copy">
        <div className="logi-tag v2-hero__eyebrow">
          23:47 EST — network live
        </div>
        <h1 className="logi-display logi-hero__headline v2-hero__headline">
          Logistics, finally{" "}
          <span className="logi-hero__accent">autonomous.</span>
        </h1>
        <p className="logi-body logi-hero__sub v2-hero__below">
          Endurance Logistics is the first end-to-end AI-native freight
          network. The dispatcher, the marketplace, and the fleet — one
          system, running itself.
        </p>

        {/* Zero-animation by spec: the 90-second skimmer's row. */}
        <dl className="v2-hero__facts logi-mono">
          <div className="v2-hero__fact">
            <dt>Raising</dt>
            <dd>Series A</dd>
          </div>
          <div className="v2-hero__fact">
            <dt>Backed by</dt>
            <dd>$150M brokerage — partner &amp; investor</dd>
          </div>
          <div className="v2-hero__fact">
            <dt>Beachhead</dt>
            <dd>SE + Midwest dry van</dd>
          </div>
          <div className="v2-hero__fact">
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${closeCTAs.contactEmail}`}>
                {closeCTAs.contactEmail}
              </a>
            </dd>
          </div>
        </dl>

        <div className="logi-hero__scroll v2-hero__below" aria-hidden="true">
          <span className="logi-mono">Scroll</span>
          <span className="logi-hero__chevron" />
        </div>
      </div>
    </div>
  );
}

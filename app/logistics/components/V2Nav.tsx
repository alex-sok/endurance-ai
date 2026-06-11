"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  prefersReducedMotion,
} from "../lib/v2-motion";
import { closeCTAs } from "../data/close";

/** 23:47 — where the night shift begins (hero eyebrow). */
const NIGHT_START_MIN = 23 * 60 + 47;
/** 371 minutes later it's 05:58 — dawn at the close. */
const NIGHT_SPAN_MIN = 371;
/** Fixed bar height — jump targets land just below it. */
const NAV_OFFSET = 56;

/**
 * V2 fixed nav (DESIGN-V2.md "Global systems / V2Nav").
 *
 * - Hidden until ~80vh scrolled, then slides down (reduced-motion:
 *   appears with zero motion). Hidden state is set via gsap.set at
 *   effect time, never CSS — no-JS visitors get a working static bar.
 * - Center: the NIGHT CLOCK — mono HH:MM mapping overall document
 *   scroll progress linearly 23:47 → 05:58 (crossing midnight). One
 *   ScrollTrigger spans the whole page; textContent only mutates when
 *   the displayed minute changes.
 * - Right: section shortcuts + "Book a call" CTA (plain hover — the
 *   only magnetic CTA on the page is §12's).
 * - Jumps go through Lenis (which accounts for the §2 pin spacer,
 *   it's in-flow) and fall back to scrollIntoView.
 */
export function V2Nav() {
  const rootRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Hidden until the reveal threshold. autoAlpha → visibility:hidden,
      // so the links aren't tab-stops while off screen.
      gsap.set(root, { yPercent: -100, autoAlpha: 0 });

      const show = () => {
        if (reduced) {
          gsap.set(root, { yPercent: 0, autoAlpha: 1 });
          return;
        }
        gsap.to(root, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: EASE.out,
          overwrite: "auto",
        });
      };
      const hide = () => {
        if (reduced) {
          gsap.set(root, { yPercent: -100, autoAlpha: 0 });
          return;
        }
        gsap.to(root, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.5,
          ease: EASE.out,
          overwrite: "auto",
        });
      };

      ScrollTrigger.create({
        start: () => window.innerHeight * 0.8,
        end: "max",
        onEnter: show,
        onLeaveBack: hide,
      });

      // The night clock. Snaps to whole minutes; writes only on change.
      let last = "";
      const applyClock = (progress: number) => {
        const el = clockRef.current;
        if (!el) return;
        const p = Math.min(1, Math.max(0, progress));
        const mins =
          (NIGHT_START_MIN + Math.round(p * NIGHT_SPAN_MIN)) % (24 * 60);
        const text = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
        if (text !== last) {
          last = text;
          el.textContent = text;
        }
      };
      const clockTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        scrub: true,
        onUpdate: (self) => applyClock(self.progress),
      });
      applyClock(clockTrigger.progress);
    }, root);

    return () => ctx.revert();
  }, []);

  const jumpTo =
    (selector: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const lenis = window.__logiLenis;
      if (lenis) {
        lenis.scrollTo(selector, { offset: -NAV_OFFSET });
      } else {
        document.querySelector(selector)?.scrollIntoView();
      }
    };

  return (
    <nav ref={rootRef} className="v2-nav" aria-label="Page sections">
      <a
        className="v2-nav__wordmark logi-mono"
        href="#hero"
        onClick={jumpTo("#hero")}
      >
        ENDURANCE <span className="v2-nav__dot">▪</span> LOGISTICS
      </a>

      <div className="v2-nav__clock logi-mono" aria-hidden="true">
        <span ref={clockRef} className="v2-nav__clock-time">
          23:47
        </span>
        <span className="v2-nav__clock-zone">EST</span>
      </div>

      <div className="v2-nav__links">
        <a
          className="v2-nav__link logi-mono"
          href="#product"
          onClick={jumpTo("#product")}
        >
          Product
        </a>
        <a
          className="v2-nav__link logi-mono"
          href="#traction"
          onClick={jumpTo("#traction")}
        >
          Traction
        </a>
        <a
          className="v2-nav__link v2-nav__link--ask logi-mono"
          href="#ask"
          onClick={jumpTo("#ask")}
        >
          The ask →
        </a>
        <a
          className="v2-nav__cta logi-mono"
          href={closeCTAs.callUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}

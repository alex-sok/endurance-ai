"use client";

import { useEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  riseIn,
  countUp,
  blockReveal,
  prefersReducedMotion,
} from "../lib/v2-motion";

/**
 * §6 Market — "the funnel line" choreography (DESIGN-V2.md).
 *
 * One continuous line draws down the journey as you scroll, weaving
 * through the scene nodes and narrowing at each gate ($1.8T → $400B →
 * $12B → the map). Implementation contract:
 *
 * - Geometry is MEASURED from the real DOM (node centers, map frame
 *   top-center) and rebuilt on resize, so the curve always passes
 *   exactly through the nodes regardless of viewport or font metrics.
 * - The line is decoration → scrubbed (`scrub: true`, Lenis owns
 *   smoothing). Stats/kickers/bar reveal ONCE on scene entry and are
 *   never scrub-gated (hard rule #1); a mid-scroll abandon leaves all
 *   values readable.
 * - No SVG filters on the line (it redraws every scroll frame): the
 *   glow is a wider low-opacity twin stroke under each segment.
 * - Desktop (≥1024px) only — mobile hides the SVG and shows a static
 *   CSS rail per scene. Reduced motion: line fully drawn, nodes lit,
 *   zero animation.
 * - Late/rebuilt animations are wrapped in ctx.add() so unmount revert
 *   still kills them (the HeroV2 review finding).
 */

/** Parses an SSR stat like "$1.8T" / "$400B" into count-up parts. */
const STAT_RE = /^\$(\d+(?:\.\d+)?)([A-Z]?)$/;

/** Funnel stroke widths, start → map. The line narrows as the market does. */
const SEG_WIDTHS = [4, 3, 2, 1.4];
const GLOW_EXTRA = 7;

interface Pt {
  x: number;
  y: number;
}

/** Gentle S-curve between two anchors: verticals ease out/in via cubic. */
function sCurve(a: Pt, b: Pt): string {
  const midY = (a.y + b.y) / 2;
  return `M${a.x},${a.y} C${a.x},${midY} ${b.x},${midY} ${b.x},${b.y}`;
}

export function MarketRevealClient() {
  useEffect(() => {
    const section = document.getElementById("market");
    if (!section) return;
    const reduced = prefersReducedMotion();

    const journey = section.querySelector<HTMLElement>(".v2-market__journey");
    const svg = section.querySelector<SVGSVGElement>(".v2-market__line-svg");
    const scenes = Array.from(
      section.querySelectorAll<HTMLElement>(".v2-market__scene"),
    );

    // `self` = this context (safe during the synchronous callback, when
    // the outer `ctx` const is still in its TDZ).
    const ctx = gsap.context((self) => {
      /* ── Headline ───────────────────────────────────────────────── */
      const headline = section.querySelector(".v2-market__headline");
      if (headline) riseIn(headline);

      /* ── Per-scene ignition: once on entry, never scrub-gated ──── */
      scenes.forEach((scene) => {
        const node = scene.querySelector<HTMLElement>(".v2-market__node");
        const body = scene.querySelector<HTMLElement>(".v2-market__scene-body");
        const stat = scene.querySelector<HTMLElement>(".v2-market__stat");
        const bar = scene.querySelector<HTMLElement>(".v2-market__breakdown");

        if (reduced) {
          node?.classList.add("is-lit");
          return;
        }

        ScrollTrigger.create({
          trigger: scene,
          start: "top 78%",
          once: true,
          onEnter: () => node?.classList.add("is-lit"),
        });

        if (body) {
          blockReveal(Array.from(body.children), {
            trigger: scene,
            start: "top 78%",
            stagger: 0.1,
            y: 44,
          });
        }

        if (stat) {
          const m = STAT_RE.exec(stat.textContent?.trim() ?? "");
          if (m) {
            const value = parseFloat(m[1]);
            const suffix = m[2];
            const decimals = (m[1].split(".")[1] ?? "").length;
            countUp(stat, value, {
              trigger: scene,
              start: "top 78%",
              duration: 0.8,
              format: (n) => `$${n.toFixed(decimals)}${suffix}`,
            });
          }
        }

        if (bar) {
          const slices = bar.querySelectorAll<HTMLElement>(".v2-market__slice");
          if (slices.length) {
            // 0.1 + 0.6 + 4×0.06 = 0.94s — the whole chart lands inside
            // hard rule #1's ≤1s budget after entering the viewport.
            gsap.from(slices, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.6,
              ease: EASE.inOut,
              stagger: 0.06,
              delay: 0.1,
              scrollTrigger: { trigger: scene, start: "top 78%", once: true },
            });
          }
        }
      });

      /* ── The continuous line (desktop only) ────────────────────── */
      if (!svg || !journey || scenes.length === 0) return;

      const segs = Array.from(
        svg.querySelectorAll<SVGPathElement>(".v2-market__line-seg"),
      );
      const glows = Array.from(
        svg.querySelectorAll<SVGPathElement>(".v2-market__line-glow"),
      );
      const headDot = svg.querySelector<SVGCircleElement>(
        ".v2-market__line-head",
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        let lineTl: gsap.core.Timeline | null = null;
        let lengths: number[] = [];

        const measureAnchors = (): Pt[] => {
          const jr = journey.getBoundingClientRect();
          const rel = (r: DOMRect): Pt => ({
            x: r.left + r.width / 2 - jr.left,
            y: r.top + r.height / 2 - jr.top,
          });
          const pts: Pt[] = [{ x: jr.width / 2, y: 0 }];
          scenes.forEach((scene) => {
            const node = scene.querySelector<HTMLElement>(".v2-market__node");
            if (node) pts.push(rel(node.getBoundingClientRect()));
          });
          return pts;
        };

        const build = () => {
          lineTl?.scrollTrigger?.kill();
          lineTl?.kill();
          lineTl = null;

          const jr = journey.getBoundingClientRect();
          svg.setAttribute("viewBox", `0 0 ${jr.width} ${jr.height}`);

          const anchors = measureAnchors();
          lengths = [];
          segs.forEach((seg, i) => {
            const a = anchors[i];
            const b = anchors[i + 1];
            const glow = glows[i];
            if (!a || !b) {
              seg.style.display = "none";
              if (glow) glow.style.display = "none";
              return;
            }
            const d = sCurve(a, b);
            const w = SEG_WIDTHS[Math.min(i, SEG_WIDTHS.length - 1)];
            seg.setAttribute("d", d);
            seg.style.display = "";
            seg.style.strokeWidth = `${w}`;
            if (glow) {
              glow.setAttribute("d", d);
              glow.style.display = "";
              glow.style.strokeWidth = `${w + GLOW_EXTRA}`;
            }
            const len = seg.getTotalLength();
            lengths.push(len);
            [seg, glow].forEach((p) => {
              if (!p) return;
              p.style.strokeDasharray = `${len}`;
              p.style.strokeDashoffset = reduced ? "0" : `${len}`;
            });
          });

          if (reduced) {
            if (headDot) headDot.style.opacity = "0";
            return;
          }

          const total = lengths.reduce((s, l) => s + l, 0) || 1;
          const placeHead = (progress: number) => {
            if (!headDot) return;
            const target = progress * total;
            let acc = 0;
            for (let i = 0; i < lengths.length; i++) {
              if (target <= acc + lengths[i] || i === lengths.length - 1) {
                const pt = segs[i].getPointAtLength(
                  Math.max(0, Math.min(target - acc, lengths[i])),
                );
                headDot.setAttribute("cx", `${pt.x}`);
                headDot.setAttribute("cy", `${pt.y}`);
                break;
              }
              acc += lengths[i];
            }
            headDot.style.opacity =
              progress > 0.002 && progress < 0.998 ? "1" : "0";
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: journey,
              start: "top 62%",
              end: "bottom 78%",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (st) => placeHead(st.progress),
            },
          });
          segs.forEach((seg, i) => {
            const glow = glows[i];
            const pair = glow ? [seg, glow] : [seg];
            tl.to(pair, {
              strokeDashoffset: 0,
              duration: (lengths[i] ?? 0) / total,
              ease: "none",
            });
          });
          placeHead(tl.scrollTrigger?.progress ?? 0);
          lineTl = tl;
        };

        build();

        // Layout shifts (font swap, viewport resize) move the nodes —
        // remeasure and redraw. Late rebuilds go through ctx.add so
        // unmount revert still kills them.
        let raf = 0;
        const ro = new ResizeObserver(() => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => self.add(build));
        });
        ro.observe(journey);

        return () => {
          ro.disconnect();
          cancelAnimationFrame(raf);
          lineTl?.scrollTrigger?.kill();
          lineTl?.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  EASE,
  riseIn,
  blockReveal,
  prefersReducedMotion,
} from "../lib/v2-motion";
import { dispatcherTranscript, dispatcherKpis } from "../data/product";
import { AnimatedDashboardMap, MAP_POINTS } from "./AnimatedDashboardMap";

/**
 * §4 Product — ★ the page's signature moment (DESIGN-V2.md).
 *
 * The dashboard panel enters once (y+opacity, shadow bloom on a real
 * glow element whose opacity tweens — no animated box-shadow). Then ONE
 * shared timeline fades the transcript lines in (staggered, ≤2.5s, no
 * typewriter) and each line causally fires a lane-map event:
 *
 *   line 0 "Scanning open loads"   → scanline sweep + amber grid pulse
 *   line 1 "Load #4471 ATL→MEM"    → Atlanta pip flares, route draws
 *   line 2 "Market rate $1.94/mi"  → rate chip rises (market face)
 *   line 3 "Matched Mason TX-114"  → carrier pip slides onto the lane
 *   line 4 "Backhaul: 92%"         → ghost return-leg draws dashed
 *   line 5 "Negotiating … locked"  → rate chip flips + flash
 *   line 6 "Booking confirmed"     → route snaps solid amber, KPI
 *                                    ticks 146→147, carrier departs
 *   line 7 "Load #4472 next"       → Birmingham pip pulses
 *
 * Animation never gates data: the SSR markup IS the final state
 * (route solid, ghost drawn, KPI 147, chip locked). With motion
 * allowed we rewind at effect time and play forward once on entry —
 * the timeline is time-based, so a mid-scroll abandon still finishes.
 * Reduced motion: nothing is rewound; the final state just sits there.
 */

/** Ambient traffic — lane index ↔ .v2-product__lane[data-lane]. */
const AMBIENT = [
  { lane: 0, offset: 0.1, duration: 16 },
  { lane: 0, offset: 0.55, duration: 14 },
  { lane: 1, offset: 0.3, duration: 15 },
  { lane: 1, offset: 0.75, duration: 17 },
  { lane: 2, offset: 0.2, duration: 12 },
  { lane: 3, offset: 0.5, duration: 13 },
] as const;

/** Demo starts this long after the trigger so the panel lands first. */
const T0 = 0.8;
/** One transcript line every 0.3s → 8 lines in 2.1s (≤2.5s budget). */
const lineAt = (i: number) => T0 + i * 0.3;

// getTotalLength() forces geometry work; the lanes never change, so
// cache per path — ambient loops call this every frame on six trucks.
const pathLengths = new WeakMap<SVGPathElement, number>();

function pointOnPath(path: SVGPathElement, p: number) {
  let len = pathLengths.get(path);
  if (len === undefined) {
    len = path.getTotalLength();
    pathLengths.set(path, len);
  }
  const at = Math.max(0, Math.min(1, p)) * len;
  const pt = path.getPointAtLength(at);
  const a = path.getPointAtLength(Math.max(0, at - 1));
  const b = path.getPointAtLength(Math.min(len, at + 1));
  return {
    x: pt.x,
    y: pt.y,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
}

export function ProductDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = (root.closest("#product") as HTMLElement) ?? root;

    const svg = root.querySelector<SVGSVGElement>(".v2-product__svg");
    const wrap = root.querySelector<HTMLElement>(".v2-product__panel-wrap");
    if (!svg || !wrap) return;

    const lanes = Array.from(
      svg.querySelectorAll<SVGPathElement>(".v2-product__lane"),
    );
    const ambient = Array.from(
      svg.querySelectorAll<SVGGElement>(".v2-product__ambient"),
    );

    // Park ambient trucks on their lanes immediately — this is also the
    // reduced-motion static state ("live loads on the network").
    ambient.forEach((g, i) => {
      const cfg = AMBIENT[i];
      const path = cfg ? lanes[cfg.lane] : null;
      if (!cfg || !path) return;
      const { x, y, angle } = pointOnPath(path, cfg.offset);
      g.setAttribute("transform", `translate(${x} ${y}) rotate(${angle})`);
      g.style.opacity = "1";
    });

    // Reduced motion: the markup already shows the booked end state.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      /* ── Section entrance ──────────────────────────────────────── */
      const headline = section.querySelector(".v2-product__headline");
      if (headline) riseIn(headline);

      blockReveal(wrap, { y: 72 });
      const glow = root.querySelector(".v2-product__panel-glow");
      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.6,
            ease: EASE.out,
            delay: 0.45,
            scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
          },
        );
      }

      /* ── Ambient traffic loops ─────────────────────────────────── */
      // Created paused; a visibility trigger runs them only while the
      // section is on screen (infinite loops must not tick off-screen).
      const ambientLoops: gsap.core.Tween[] = [];
      ambient.forEach((g, i) => {
        const cfg = AMBIENT[i];
        const path = cfg ? lanes[cfg.lane] : null;
        if (!cfg || !path) return;
        const state = { p: cfg.offset };
        ambientLoops.push(
          gsap.to(state, {
            p: cfg.offset + 1,
            duration: cfg.duration,
            ease: "none",
            repeat: -1,
            paused: true,
            onUpdate: () => {
              const { x, y, angle } = pointOnPath(path, state.p % 1);
              g.setAttribute(
                "transform",
                `translate(${x} ${y}) rotate(${angle})`,
              );
            },
          }),
        );
      });
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          ambientLoops.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });

      /* ── Story elements ────────────────────────────────────────── */
      const pending = svg.querySelector<SVGPathElement>(
        ".v2-product__route-pending",
      );
      const routeFinal = svg.querySelector(".v2-product__route-final");
      const routeFlash = svg.querySelector(".v2-product__route-flash");
      const ghostReveal = svg.querySelector<SVGPathElement>(
        ".v2-product__ghost-reveal",
      );
      const backhaul = svg.querySelector(".v2-product__backhaul");
      const scan = svg.querySelector(".v2-product__scan");
      const gridPulse = svg.querySelector(".v2-product__gridpulse");
      const carrier = svg.querySelector<SVGGElement>(".v2-product__carrier");
      const hull = svg.querySelector<SVGGElement>(".v2-product__carrier-hull");
      const chip = root.querySelector<HTMLElement>(".v2-product__rate");
      const chipCol = root.querySelector(".v2-product__rate-col");
      const chipFlash = root.querySelector(".v2-product__rate-flash");
      const rollCol = root.querySelector(".v2-product__kpi-roll-col");
      const replay = root.querySelector<HTMLElement>(".v2-product__replay");
      const lines = Array.from(
        root.querySelectorAll<HTMLElement>(".v2-product__line"),
      );
      const cityInner = (id: string) =>
        svg.querySelector(`[data-city="${id}"] .v2-product__city-inner`);
      const cityPip = (id: string) =>
        svg.querySelector(`[data-city="${id}"] .v2-product__city-pip`);
      const cityRing = (id: string) =>
        svg.querySelector(`[data-city="${id}"] .v2-product__city-ring`);

      if (!pending || !routeFinal || !ghostReveal || !carrier || !chip || !chipCol) {
        return;
      }

      const routeLen = pending.getTotalLength();
      const ghostLen = ghostReveal.getTotalLength();
      const start = MAP_POINTS.carrierStart;
      const slideAngle =
        (Math.atan2(MAP_POINTS.atl.y - start.y, MAP_POINTS.atl.x - start.x) *
          180) /
        Math.PI;

      const setCarrier = (x: number, y: number, angle?: number) => {
        carrier.setAttribute("transform", `translate(${x} ${y})`);
        if (hull && angle !== undefined) {
          hull.setAttribute("transform", `rotate(${angle})`);
        }
      };

      /** Rewind to the pre-story state (effect time + each replay). */
      const setPreState = () => {
        gsap.set(lines, { autoAlpha: 0, y: 10 });
        gsap.set(pending, {
          strokeDasharray: routeLen,
          strokeDashoffset: routeLen,
        });
        gsap.set(routeFinal, { opacity: 0 });
        gsap.set(ghostReveal, {
          strokeDasharray: ghostLen,
          strokeDashoffset: ghostLen,
        });
        if (backhaul) gsap.set(backhaul, { opacity: 0 });
        for (const id of ["atl", "mem", "bhm"]) {
          const inner = cityInner(id);
          const pip = cityPip(id);
          if (inner) gsap.set(inner, { opacity: 0 });
          if (pip) {
            gsap.set(pip, { scale: 0, transformOrigin: "center center" });
          }
        }
        gsap.set(carrier, { opacity: 0 });
        setCarrier(start.x, start.y, slideAngle);
        gsap.set(chip, { autoAlpha: 0, y: 10 });
        gsap.set(chipCol, { yPercent: 0 });
        chip.removeAttribute("data-locked");
        if (rollCol) gsap.set(rollCol, { yPercent: 0 });
        if (scan) gsap.set(scan, { x: 0, opacity: 0 });
        if (gridPulse) gsap.set(gridPulse, { opacity: 0 });
      };
      setPreState();
      resetRef.current = setPreState;

      /* ── The shared timeline — every map event hangs off a line ── */
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      lines.forEach((line, i) => {
        tl.to(
          line,
          { autoAlpha: 1, y: 0, duration: 0.35, ease: EASE.rise },
          lineAt(i),
        );
      });

      const popCity = (id: string, at: number) => {
        const inner = cityInner(id);
        const pip = cityPip(id);
        const ring = cityRing(id);
        if (inner) {
          tl.to(inner, { opacity: 1, duration: 0.3, ease: "none" }, at);
        }
        if (pip) {
          tl.to(
            pip,
            { scale: 1, duration: 0.45, ease: "back.out(2)" },
            at,
          );
        }
        if (ring) {
          tl.fromTo(
            ring,
            { scale: 0.4, opacity: 0.9, transformOrigin: "center center" },
            { scale: 2.4, opacity: 0, duration: 0.7, ease: "power2.out" },
            at,
          );
        }
      };

      // 0 — "Scanning open loads": scanline sweep + grid pulse
      if (scan) {
        tl.to(scan, { opacity: 0.35, duration: 0.18, ease: "none" }, lineAt(0));
        tl.to(scan, { x: 1020, duration: 1, ease: "power1.inOut" }, lineAt(0));
        tl.to(scan, { opacity: 0, duration: 0.3, ease: "none" }, lineAt(0) + 0.7);
      }
      if (gridPulse) {
        tl.to(
          gridPulse,
          { opacity: 0.5, duration: 0.35, yoyo: true, repeat: 1, ease: "power1.inOut" },
          lineAt(0) + 0.05,
        );
      }

      // 1 — "Load #4471 Atlanta→Memphis": origin flares, route draws
      popCity("atl", lineAt(1));
      tl.to(
        pending,
        { strokeDashoffset: 0, duration: 0.75, ease: "power2.inOut" },
        lineAt(1) + 0.1,
      );
      popCity("mem", lineAt(1) + 0.8);

      // 2 — "Market rate $1.94/mi": rate chip rises (market face)
      tl.to(chip, { autoAlpha: 1, y: 0, duration: 0.4, ease: EASE.rise }, lineAt(2));

      // 3 — "Matched carrier Mason TX-114": pip slides onto the lane
      tl.to(carrier, { opacity: 1, duration: 0.25, ease: "none" }, lineAt(3));
      const slide = { x: start.x, y: start.y };
      tl.fromTo(
        slide,
        { x: start.x, y: start.y },
        {
          x: MAP_POINTS.atl.x,
          y: MAP_POINTS.atl.y,
          duration: 0.6,
          ease: "power3.out",
          onUpdate: () => setCarrier(slide.x, slide.y, slideAngle),
        },
        lineAt(3),
      );

      // 4 — "Backhaul 92%": ghost return-leg draws dashed
      tl.to(
        ghostReveal,
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
        lineAt(4),
      );
      if (backhaul) {
        tl.to(backhaul, { opacity: 1, duration: 0.35, ease: "none" }, lineAt(4) + 0.3);
      }
      popCity("bhm", lineAt(4) + 0.55);

      // 5 — "Negotiating … locked": rate chip flips + flash
      tl.to(chipCol, { yPercent: -50, duration: 0.4, ease: EASE.inOut }, lineAt(5));
      tl.call(() => chip.setAttribute("data-locked", "true"), [], lineAt(5) + 0.25);
      if (chipFlash) {
        tl.fromTo(
          chipFlash,
          { opacity: 0 },
          { opacity: 0.9, duration: 0.14, yoyo: true, repeat: 1, ease: "power1.in" },
          lineAt(5) + 0.25,
        );
      }

      // 6 — "Booking confirmed": route snaps solid, KPI ticks 146→147
      tl.to(routeFinal, { opacity: 1, duration: 0.12, ease: "none" }, lineAt(6));
      if (routeFlash) {
        tl.fromTo(
          routeFlash,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.in" },
          lineAt(6),
        );
      }
      if (rollCol) {
        tl.to(rollCol, { yPercent: -50, duration: 0.5, ease: EASE.inOut }, lineAt(6) + 0.1);
      }
      const travel = { p: 0 };
      tl.fromTo(
        travel,
        { p: 0 },
        {
          p: 1,
          duration: 3.2,
          ease: "power1.inOut",
          onUpdate: () => {
            const { x, y, angle } = pointOnPath(pending, travel.p);
            setCarrier(x, y, angle);
          },
        },
        lineAt(6) + 0.35,
      );

      // 7 — "Load #4472 next in queue": Birmingham pings
      const bhmRing = cityRing("bhm");
      if (bhmRing) {
        tl.fromTo(
          bhmRing,
          { scale: 0.4, opacity: 0.8, transformOrigin: "center center" },
          { scale: 2.2, opacity: 0, duration: 0.8, ease: "power2.out" },
          lineAt(7) + 0.2,
        );
      }

      // Replay affordance — appears once the booking lands, stays.
      if (replay) {
        tl.call(() => replay.setAttribute("data-visible", "true"), [], lineAt(7) + 0.9);
      }

      ScrollTrigger.create({
        trigger: wrap,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, root);

    return () => {
      tlRef.current = null;
      resetRef.current = null;
      ctx.revert();
    };
  }, []);

  function handleReplay() {
    if (!tlRef.current) return;
    resetRef.current?.();
    tlRef.current.restart();
  }

  const booked = dispatcherKpis[0];
  const bookedFinal = Number.parseInt(booked.value, 10);
  const bookedPrev = Number.isFinite(bookedFinal)
    ? String(bookedFinal - 1)
    : booked.value;

  return (
    <div ref={rootRef} className="v2-product">
      <div className="v2-product__panel-wrap">
        <div className="v2-product__panel-glow" aria-hidden="true" />
        <div className="logi-panel v2-product__panel">
          {/* KPI strip — only "Loads booked today" animates (146→147) */}
          <div className="v2-product__kpis" role="list">
            {dispatcherKpis.map((kpi, i) => (
              <div key={kpi.label} className="v2-product__kpi" role="listitem">
                <div className="logi-mono v2-product__kpi-label">
                  {kpi.label}
                </div>
                {i === 0 ? (
                  <div className="v2-product__kpi-value">
                    <span className="v2-product__sr">{booked.value}</span>
                    <span className="v2-product__kpi-roll" aria-hidden="true">
                      <span className="v2-product__kpi-roll-col">
                        <span>{bookedPrev}</span>
                        <span>{booked.value}</span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="v2-product__kpi-value">{kpi.value}</div>
                )}
              </div>
            ))}
          </div>

          <div className="v2-product__body">
            {/* Lane map + overlays */}
            <div className="v2-product__map">
              <div className="v2-product__map-art" aria-hidden="true">
                <AnimatedDashboardMap />
                <div className="v2-product__map-overlay logi-mono">
                  <span>SOUTHEAST · LIVE</span>
                  <span>{booked.value} loads</span>
                </div>
                {/* Rate chip — flips MKT → LOCKED on the negotiation beat */}
                <div className="v2-product__rate logi-mono" data-locked="true">
                  <span className="v2-product__rate-flash" />
                  <span className="v2-product__rate-window">
                    <span className="v2-product__rate-col">
                      <span className="v2-product__rate-row">
                        MKT&ensp;$1.94/MI
                      </span>
                      <span className="v2-product__rate-row v2-product__rate-row--locked">
                        LOCKED&ensp;$2.18/MI
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="v2-product__replay logi-mono"
                onClick={handleReplay}
                aria-label="Replay dispatcher demo"
              >
                <span aria-hidden="true">↺</span> Replay
              </button>
            </div>

            {/* Transcript */}
            <aside className="logi-panel--inset v2-product__transcript">
              <header className="v2-product__transcript-header logi-mono">
                <span className="v2-product__pulse" aria-hidden="true" />
                Dispatcher · live
              </header>
              <ol className="v2-product__feed">
                {dispatcherTranscript.map((line, i) => (
                  <li
                    key={i}
                    className={`v2-product__line v2-product__line--${line.kind}`}
                  >
                    <span
                      className="logi-mono v2-product__line-tag"
                      aria-hidden="true"
                    >
                      {line.kind === "system"
                        ? "SYS"
                        : line.kind === "thinking"
                          ? "→"
                          : "✓"}
                    </span>
                    <span className="v2-product__line-body">{line.body}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

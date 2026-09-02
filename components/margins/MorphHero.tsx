"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { HERO } from "./content";
import { BACKDROP, SCREEN } from "./morph-screen";

// The spreadsheet the run used to live in, and the run that replaced it.
// Everything on the screen is typeset, not photographed, so the numbers hold
// up under inspection. Demo data throughout.
const COLS = ["Load", "Customer", "Agent", "Revenue", "Carrier", "Margin", "Split", "Commission"];
const ROWS: string[][] = [
  ["L284100", "Harbor Logistics", "HUTCGRCO", "$2,140", "$1,727", "$413", "70%", "$274.00"],
  ["L284112", "Northline Foods", "THEOYOH", "$1,860", "$1,505", "$355", "7%", "$24.85"],
  ["L284126", "Ashby Paper", "BECKZFL", "$3,210", "$2,514", "$696", "flat", "$396.00"],
  ["L284140", "Cobalt Steel", "MAYABFL", "$2,480", "$2,611", "-$131", "50%", "$0.00"],
  ["L284155", "Prairie Grain", "NYLARTX", "$1,975", "$1,588", "$387", "50%", "$193.50"],
  ["L284171", "Tidewater Auto", "WRENDAZ", "$2,905", "$2,297", "$608", "50%", "$304.00"],
  ["L284188", "Summit Beverage", "ALEXJCO", "$1,640", "$1,338", "$302", "", ""],
  ["L284203", "Kestrel Plastics", "DOTXUOH", "$2,260", "$1,795", "$465", "50%", "$232.50"],
  ["L284233", "Meridian Lumber", "BECKZFL", "$2,720", "$2,119", "$601", "flat", "$396.00"],
  ["L284249", "Bluff City Tire", "IVOXAFL", "$1,530", "$1,244", "$286", "50%", "$143.00"],
  ["L284233", "Meridian Lumber", "BECKZFL", "$2,720", "$2,119", "$601", "flat", "$396.00"],
  ["L284260", "Redwood Freight", "HUTCGRCO", "$2,015", "$1,596", "$419", "70%", "$293.30"],
];
const LETTERS = "ABCDEFGH".split("");
const FORMULA = '=IF(F7<0,0,IF($C7="HUTCGRCO",F7*0.7,IFERROR(F7*VLOOKUP($C7,Splits!$A:$B,2,FALSE),"?")))';

// Deterministic per-cell noise, so the server and the client agree.
function noise(i: number, k: number) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function ramp(p: number, a: number, b: number) {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

type CellVars = React.CSSProperties & Record<`--${string}`, string>;

function cellVars(row: number, col: number, rows: number, cols: number): CellVars {
  const i = row * cols + col;
  const ang = noise(i, 1) * Math.PI * 2;
  const mag = 160 + noise(i, 2) * 320;
  // Cells nearer the edges leave first; the centre lingers, then goes.
  const cx = (col + 0.5) / cols - 0.5;
  const cy = (row + 0.5) / rows - 0.5;
  const edge = Math.max(Math.abs(cx), Math.abs(cy)) * 2;
  const delay = Math.min(1, Math.max(0, (1 - edge) * 0.7 + noise(i, 3) * 0.3));
  return {
    "--dx": `${Math.max(-60, Math.cos(ang) * mag * 0.8 + cx * 220 + 140).toFixed(1)}px`,
    "--dy": `${(Math.sin(ang) * mag * 0.9 + cy * 160 - 90).toFixed(1)}px`,
    "--dr": `${((noise(i, 4) - 0.5) * 34).toFixed(1)}deg`,
    "--dl": delay.toFixed(3),
    "--cxu": (-cx).toFixed(4),
    "--cyu": (-cy).toFixed(4),
  };
}

interface Props {
  onCtaClick: (label: string) => void;
}

export function MorphHero({ onCtaClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(1);
  const readyRef = useRef(false);
  const reducedRef = useRef(false);
  const [phase, setPhase] = useState(1);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const el = stageRef.current;
    if (!el || reducedRef.current) return;
    el.style.setProperty("--p", p.toFixed(4));
    el.style.setProperty("--b", ramp(p, 0.14, 0.5).toFixed(4));
    el.style.setProperty("--c", ramp(p, 0.46, 0.76).toFixed(4));
    el.style.setProperty("--r", ramp(p, 0.58, 0.84).toFixed(4));
    el.style.setProperty("--l", ramp(p, 0.78, 0.96).toFixed(4));
    const ph = p < 0.14 ? 1 : p < 0.58 ? 2 : 3;
    if (ph !== phaseRef.current) {
      phaseRef.current = ph;
      setPhase(ph);
    }
    const rd = p >= 0.955;
    if (rd !== readyRef.current) {
      readyRef.current = rd;
      setReady(rd);
    }
  });

  // Put the display over the photographed one: object-fit cover, worked out.
  useEffect(() => {
    const stage = stageRef.current;
    const display = displayRef.current;
    if (!stage || !display) return;
    // Reduced motion: the finished state, set once; the stylesheet does the rest.
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) {
      for (const k of ["--p", "--b", "--c", "--r", "--l"]) stage.style.setProperty(k, "1");
    }
    const place = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const s = Math.max(W / BACKDROP.w, H / BACKDROP.h);
      const rw = BACKDROP.w * s;
      const rh = BACKDROP.h * s;
      const ox = (W - rw) / 2;
      const oy = (H - rh) / 2;
      stage.style.setProperty("--sx", `${(ox + SCREEN.x0 * rw).toFixed(1)}px`);
      stage.style.setProperty("--sy", `${(oy + SCREEN.y0 * rh).toFixed(1)}px`);
      stage.style.setProperty("--sw", `${((SCREEN.x1 - SCREEN.x0) * rw).toFixed(1)}px`);
      stage.style.setProperty("--sh", `${((SCREEN.y1 - SCREEN.y0) * rh).toFixed(1)}px`);
      // The converging cells aim for the display as it is actually laid out.
      const r = display.getBoundingClientRect();
      stage.style.setProperty("--dw", `${r.width.toFixed(1)}px`);
      stage.style.setProperty("--dh", `${r.height.toFixed(1)}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="lp-morph" id="top" data-section="hero" ref={sectionRef}>
      <div className="lp-morph-stage" ref={stageRef} data-phase={phase}>
        <img
          className="lp-morph-bg"
          src={BACKDROP.src}
          alt=""
          width={BACKDROP.w}
          height={BACKDROP.h}
          decoding="async"
          fetchPriority="high"
        />
        <div className="lp-morph-scrim" aria-hidden="true" />

        <div className="lp-morph-copy">
          <p className="lp-eyebrow">{HERO.kicker}</p>
          <h1>
            {HERO.h1}
            <em>{HERO.h1Em}</em>
          </h1>
          <p className="lp-hero-lede">{HERO.lede}</p>
          <div className="lp-hero-actions">
            <a className="lp-btn lp-btn-fill" href={HERO.fillHref} onClick={() => onCtaClick(HERO.fillLabel)}>
              {HERO.fillLabel}
            </a>
            <a
              className="lp-btn-quiet"
              href={HERO.lineHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCtaClick(HERO.lineLabel)}
            >
              {HERO.lineLabel}
            </a>
          </div>
        </div>

        <div className="lp-morph-display" ref={displayRef} aria-hidden="true">
          <div className="lp-morph-glass">
            {/* The spreadsheet: chrome that fades, cells that fly. */}
            <div className="lp-sheet-chrome">
              <div className="lp-sheet-bar">
                <span className="lp-sheet-ref">H7</span>
                <span className="lp-sheet-fx">fx</span>
                <span className="lp-sheet-formula">{FORMULA}</span>
              </div>
              <div className="lp-sheet-letters">
                <span />
                {LETTERS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <div className="lp-sheet-numbers">
                {Array.from({ length: ROWS.length + 1 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className="lp-sheet-tabs">
                <span className="is-on">Week 25</span>
                <span>Splits</span>
                <span>Overrides</span>
                <span>Reserve</span>
                <span>Payroll export</span>
              </div>
            </div>
            <div className="lp-sheet-cells">
              {COLS.map((c, ci) => (
                <span key={`h${ci}`} className="lp-cell is-head" style={cellVars(0, ci, ROWS.length + 1, COLS.length)}>
                  {c}
                </span>
              ))}
              {ROWS.map((row, ri) =>
                row.map((v, ci) => (
                  <span
                    key={`${ri}-${ci}`}
                    className={
                      "lp-cell" +
                      (ci >= 3 ? " is-num" : "") +
                      (ri === 5 && ci === 7 ? " is-active" : "") +
                      (v.startsWith("-") ? " is-neg" : "")
                    }
                    style={cellVars(ri + 1, ci, ROWS.length + 1, COLS.length)}
                  >
                    {v}
                  </span>
                ))
              )}
            </div>

            {/* The run, as the product shows it. */}
            <div className={"lp-run" + (ready ? " is-ready" : "")}>
              <div className="lp-run-head">
                <p className="lp-run-title">Commissions · Week ending Jun 20th</p>
                <p className="lp-run-sub">Here&rsquo;s everything standing between this run and payday on Friday.</p>
              </div>
              <div className="lp-run-body">
                <div className="lp-run-card">
                  <p className="lp-run-label">Ready to pay</p>
                  <p className="lp-run-big">$201,480</p>
                  <p className="lp-run-note">
                    across <b>54 people</b> · nothing sent yet
                  </p>
                  <div className="lp-run-status">
                    <div className="lp-run-track">
                      <div className="lp-run-fill" />
                    </div>
                    <div className="lp-run-state">
                      <span className="lp-run-building">Building the run</span>
                      <span className="lp-run-done">
                        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                          <polyline points="3,8.5 6.5,12 13.5,4.5" pathLength={1} />
                        </svg>
                        Ready for review
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lp-run-tiles">
                  <div>
                    <p className="lp-run-label">Loads imported</p>
                    <p className="lp-run-fig">1,077</p>
                    <p className="lp-run-fine">From your TMS · automatic</p>
                  </div>
                  <div>
                    <p className="lp-run-label">Blockers</p>
                    <p className="lp-run-fig is-flare">1</p>
                    <p className="lp-run-fine">Must fix to run</p>
                  </div>
                  <div>
                    <p className="lp-run-label">Payday in</p>
                    <p className="lp-run-fig">2 days</p>
                    <p className="lp-run-fine">Friday, Jun 27</p>
                  </div>
                  <div>
                    <p className="lp-run-label">Warnings</p>
                    <p className="lp-run-fig">15</p>
                    <p className="lp-run-fine">Worth a look</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-morph-foot" aria-hidden="true">
          <p className="lp-morph-scroll">Scroll</p>
          <ol className="lp-morph-steps">
            <li>
              <span>01 · The spreadsheet</span>
              <i />
            </li>
            <li>
              <span>02 · It breaks</span>
              <i />
            </li>
            <li>
              <span>03 · The run</span>
              <i />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

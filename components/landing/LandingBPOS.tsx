"use client";

import { useState } from "react";
import { BPOS_INDUSTRIES } from "./bpos-content";
import { BPOS_VIEWS, BPOS_SOURCES, BPOS_WORKLIST } from "./bpos-views";

/**
 * The BPOS console, shown rather than described.
 *
 * Industry chips swap the whole product; the module bar swaps the page inside
 * it. Two things had to be true for this to read as seven real products
 * rather than one template:
 *
 * 1. The first tab of every industry is the flagship view and nothing else
 *    looks like it — the command centre for the portfolio businesses, the
 *    contract board for the book-of-jobs ones. It appears once.
 * 2. The other four tabs are working screens: a headline figure, stat cards
 *    and the worklist for that module, with its own header. The run checklist
 *    only appears on the module the run actually belongs to, since "run the
 *    prebills" is not what a capacity screen does.
 */
function Spark({ points }: { points: number[] }) {
  const w = 120;
  const h = 26;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="bpos-spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true" preserveAspectRatio="none">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function LandingBPOS() {
  const [ind, setInd] = useState(0);
  const [mod, setMod] = useState(0);

  const d = BPOS_INDUSTRIES[ind];
  const m = d.mods[mod];
  const view = BPOS_VIEWS[d.id];
  const conn = BPOS_SOURCES[d.id];

  /** The flagship view — shown on the first tab only, never repeated. */
  const flagship = mod === 0;
  /** The run checklist belongs to one module, not to all five. */
  const showChecklist = view.layout === "run" && mod === view.runModule;
  /** Every non-flagship tab is a working screen with its own worklist. */
  const showWorklist = view.layout === "run" || !flagship;
  const worklistTitle = BPOS_WORKLIST[`${d.id}.${m.nav}`] ?? "Needs a look";

  function pickIndustry(i: number) {
    setInd(i);
    setMod(0);
  }

  function onTabKey(e: React.KeyboardEvent, i: number) {
    const last = BPOS_INDUSTRIES.length - 1;
    let n: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = i === 0 ? last : i - 1;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = last;
    if (n === null) return;
    e.preventDefault();
    pickIndustry(n);
    document.getElementById(`bpos-tab-${n}`)?.focus();
  }

  const showBand = view.layout === "command" && flagship;
  const showBars = view.layout === "board" && flagship && view.bars;
  const showGrid = view.grid && flagship;

  return (
    <section className="lp-sheet" id="bpos" data-section="bpos" aria-label="Inside a BPOS">
      <p className="lp-kicker">03 · Inside a BPOS</p>
      <h2 className="lp-h2">Pick an industry. Look inside the system.</h2>
      <p className="lp-lede">
        Each of these is a product already running. The shape changes with the
        operation, because the operation is what it is wired into.
      </p>

      <div className="bpos-tabs" role="tablist" aria-label="Industry">
        {BPOS_INDUSTRIES.map((x, i) => (
          <button
            key={x.id}
            id={`bpos-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === ind}
            tabIndex={i === ind ? 0 : -1}
            className="bpos-tab"
            onClick={() => pickIndustry(i)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="bpos-app">
        <div className="bpos-bar">
          <span className="bpos-brand">
            <span className="bpos-sq">B</span>
            <b>BPOS</b>
            <span className="bpos-plat">{d.name}</span>
          </span>
          <nav className="bpos-mods" aria-label="Modules">
            {d.mods.map((x, j) => (
              <button
                key={x.nav}
                type="button"
                className="bpos-mod"
                aria-current={j === mod ? "page" : undefined}
                onClick={() => setMod(j)}
              >
                {x.nav}
              </button>
            ))}
          </nav>
        </div>

        {conn ? (
          <div className="bpos-wire">
            <span className="bpos-live">
              <i className="bpos-pulse" />
              Live · synced {conn.synced}
            </span>
            <span className="bpos-srcs">
              {conn.sources.map((s) => (
                <span className="bpos-src" key={s.name}>
                  <b>{s.kind}</b>
                  {s.name}
                  {s.note ? <em>{s.note}</em> : null}
                </span>
              ))}
            </span>
          </div>
        ) : null}

        <div className="bpos-body" aria-live="polite">
          {showBand ? (
            <div className="bpos-band">
              {view.ticker ? (
                <div className="bpos-ticker" aria-label="Market inputs">
                  <span className="bpos-tick-kick">
                    <i className="bpos-pulse" />
                    Market
                  </span>
                  <div className="bpos-tick-scroll">
                    {view.ticker.map((t) => (
                      <span className="bpos-tick" key={t[0]}>
                        <em>{t[0]}</em>
                        <b>{t[1]}</b>
                        {t[2] ? <i>{t[2]}</i> : null}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="bpos-band-in">
                <div className="bpos-band-head">
                  <div>
                    <p className="bpos-band-kick">{d.name} — period operating report</p>
                    <h3>{view.bandTitle}</h3>
                  </div>
                  <span className="bpos-band-meta">{view.bandMeta}</span>
                </div>
                <p className="bpos-band-sub">{view.bandSub}</p>
                <div className="bpos-band-grid">
                  {view.band?.map((k) => (
                    <div className="bpos-bcard" key={k.label}>
                      <p className="bpos-bk">{k.label}</p>
                      <p className="bpos-bv">{k.value}</p>
                      <p className="bpos-bd">▲ {k.delta}</p>
                      <p className="bpos-bs">{k.sub}</p>
                      <Spark points={k.spark} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="bpos-crumb">{m.crumb}</p>
              <div className="bpos-head">
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.sub}</p>
                </div>
                <span className="bpos-btn">{m.cta}</span>
              </div>

              <div className="bpos-grid">
                <div className="bpos-card bpos-hero">
                  <p className="bpos-lab">{m.hero[0]}</p>
                  <p className="bpos-big">{m.hero[1]}</p>
                  <p className="bpos-sm">{m.hero[2]}</p>
                  <span className="bpos-btn bpos-btn-ghost">{m.hero[3]} &rarr;</span>
                </div>
                {m.stats.map((s) => (
                  <div className="bpos-card" key={s[1]}>
                    <p className="bpos-lab">
                      <i className={`bpos-dot${s[0] ? ` ${s[0]}` : ""}`} />
                      {s[1]}
                    </p>
                    <p className="bpos-mid">{s[2]}</p>
                    <p className="bpos-sm">{s[3]}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {showBars ? (
            <div className="bpos-card bpos-bars">
              <div className="bpos-crow">
                <p className="bpos-ct">{view.barsTitle}</p>
                <span className="bpos-sm">{view.barsMeta}</span>
              </div>
              {view.bars?.map((b) => (
                <div className="bpos-brow" key={b.name}>
                  <div className="bpos-bmeta">
                    <p className="bpos-bname">
                      {b.flag ? <i className="bpos-bar-flag" /> : null}
                      {b.name}
                    </p>
                    <p className="bpos-sm">{b.meta}</p>
                  </div>
                  <div className="bpos-track">
                    <span
                      className={`bpos-fill${b.flag ? " flag" : ""}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                  <span className="bpos-bright">{b.right}</span>
                </div>
              ))}
            </div>
          ) : null}

          {showGrid && view.grid ? (
            <div className="bpos-card bpos-gridcard">
              <div className="bpos-crow">
                <p className="bpos-ct">{view.grid.title}</p>
                <span className="bpos-sm">{view.grid.meta}</span>
              </div>
              <div className="bpos-scroll">
                <table className="bpos-tab-list bpos-wide">
                  <thead>
                    <tr>
                      {view.grid.cols.map((c, i) => (
                        <th key={c} className={i > 1 ? "r" : undefined}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {view.grid.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((cell, i) => (
                          <td
                            key={`${r[0]}-${i}`}
                            className={i > 1 ? "r bpos-num-cell" : i === 0 ? "bpos-first" : undefined}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {showWorklist ? (
            <div className={`bpos-low${showChecklist ? "" : " bpos-low-wide"}`}>
              <div className="bpos-card">
                <div className="bpos-crow">
                  <p className="bpos-ct">{worklistTitle}</p>
                  <span className="bpos-pills">
                    <span className="bpos-pill on">{m.pills[0]}</span>
                    <span className="bpos-pill rd">{m.pills[1]}</span>
                    <span className="bpos-pill">{m.pills[2]}</span>
                  </span>
                </div>
                <table className="bpos-tab-list">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Issue</th>
                      <th className="r">{m.unit}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {m.rows.map((r, k) => (
                      <tr key={`${r[0]}-${k}`}>
                        <td className="bpos-code">
                          {r[4] === 1 ? <i className="bpos-bar-flag" /> : null}
                          {r[0]}
                        </td>
                        <td>
                          <span className={`bpos-ico${r[4] === 1 ? " b" : ""}`}>
                            {r[4] === 1 ? "ⓘ" : "⚠"}
                          </span>
                          {r[1]}
                        </td>
                        <td className="r">{r[2]}</td>
                        <td className="r">
                          <span className="bpos-act">{r[3]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bpos-foot">
                  <span className="bpos-more">+{m.more} more on the worklist &rarr;</span>
                  <span className="bpos-btn">Fix it for me</span>
                </div>
              </div>

              {showChecklist ? (
                <div className="bpos-card">
                  <p className="bpos-ct">Run checklist</p>
                  <p className="bpos-sm">1 of 5 steps clear</p>
                  <ul className="bpos-steps">
                    {d.steps.map((s, i) => (
                      <li key={s[0]} className={s[1] === "lock" ? "lock" : undefined}>
                        <span className={`bpos-num${s[1] === "done" ? " done" : s[1] === "now" ? " now" : ""}`}>
                          {s[1] === "done" ? "✓" : i + 1}
                        </span>
                        <span className="bpos-stxt">{s[0]}</span>
                        <span className="bpos-sright">{s[2]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bpos-locked">
                    <b>{d.lock[0]}</b>
                    <p>{d.lock[1]}</p>
                    <span className="bpos-btn">Open the worklist &rarr;</span>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="bpos-trace">
            Every figure links to the record behind it — no exports, no
            spreadsheet rebuilds.
          </p>
        </div>
      </div>
    </section>
  );
}

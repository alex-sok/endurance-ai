"use client";

import { useState } from "react";
import { BPOS_INDUSTRIES } from "./bpos-content";
import { BPOS_VIEWS, BPOS_SOURCES } from "./bpos-views";

/**
 * The BPOS console, shown rather than described.
 *
 * Industry chips swap the whole product; the module bar swaps the page inside
 * it. The products do not look alike in real life, so the page shape changes
 * with the industry: a command band over a data grid for the portfolio
 * businesses, a KPI strip over progress rows for the book-of-jobs businesses,
 * a headline figure over a locked run for the periodic ones.
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

  const grid = view.grid;

  return (
    <section className="lp-sheet" id="bpos" data-section="bpos" aria-label="Brain powered operating systems">
      <p className="lp-kicker">Brain powered operating systems</p>
      <h2 className="lp-h2">
        Your whole company&rsquo;s operations, automated before anybody asks.
      </h2>
      <p className="lp-lede">
        One system per industry, wired into what you already run. Deterministic
        by design: ask twice, get the same answer, and every figure traces back
        to a source of truth.
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
          {view.layout === "command" ? (
            <div className="bpos-band">
              <p className="bpos-band-kick">
                {d.name} — period operating report · all {m.nav.toLowerCase()}
              </p>
              <div className="bpos-band-head">
                <h3>{view.bandTitle}</h3>
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

          {view.layout === "board" && view.bars ? (
            <div className="bpos-card bpos-bars">
              <div className="bpos-crow">
                <p className="bpos-ct">{view.barsTitle}</p>
                <span className="bpos-sm">{view.barsMeta}</span>
              </div>
              {view.bars.map((b) => (
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

          {grid ? (
            <div className="bpos-card bpos-gridcard">
              <div className="bpos-crow">
                <p className="bpos-ct">{grid.title}</p>
                <span className="bpos-sm">{grid.meta}</span>
              </div>
              <div className="bpos-scroll">
                <table className="bpos-tab-list bpos-wide">
                  <thead>
                    <tr>
                      {grid.cols.map((c, i) => (
                        <th key={c} className={i > 1 ? "r" : undefined}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grid.rows.map((r) => (
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

          {view.layout === "run" ? (
            <div className="bpos-low">
              <div className="bpos-card">
                <div className="bpos-crow">
                  <p className="bpos-ct">Needs a look</p>
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
            </div>
          ) : (
            <p className="bpos-trace">
              Every figure links to the record behind it — no exports, no
              spreadsheet rebuilds.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

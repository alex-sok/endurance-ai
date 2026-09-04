"use client";

import { useState } from "react";
import { BPOS_INDUSTRIES } from "./bpos-content";

/**
 * The BPOS console, shown rather than described.
 *
 * Two levels of navigation: the industry chips swap the whole product, the
 * module bar swaps the page inside it. Every module resolves to a real page —
 * module names and KPI labels are taken from the portals themselves.
 */
export function LandingBPOS() {
  const [ind, setInd] = useState(0);
  const [mod, setMod] = useState(0);

  const d = BPOS_INDUSTRIES[ind];
  const m = d.mods[mod];

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
            <span className="bpos-plat">Platform</span>
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

        <div className="bpos-body" aria-live="polite">
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
        </div>
      </div>
    </section>
  );
}

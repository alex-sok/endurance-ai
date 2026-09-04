"use client";

/* The two screens that are the product rather than a summary of it: the asset
   book as it comes out of the portfolio system, and the underwriting bench
   with the assumptions, the model, the waterfall and the returns on one page
   — which is the entire argument for the bench existing. */

import { ASSET_BOOK, UW_BENCH } from "./bpos-panels";

function Trend({ points, label }: { points: number[]; label: string }) {
  const w = 260;
  const h = 44;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const xy = points.map((p, i) => [
    (i / (points.length - 1)) * w,
    h - ((p - min) / span) * (h - 6) - 3,
  ]);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg className="bpos-trend" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-label={label}>
      <path className="bpos-trend-fill" d={area} />
      <path className="bpos-trend-line" d={line} />
      <circle className="bpos-trend-end" cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r={2.6} />
    </svg>
  );
}

export function AssetBook() {
  const b = ASSET_BOOK;
  return (
    <div className="bpos-card bpos-book">
      <div className="bpos-book-head">
        <div>
          <p className="bpos-ct">{b.property}</p>
          <p className="bpos-sm">{b.address}</p>
        </div>
        <span className="bpos-btn bpos-btn-ghost">Open the general ledger &rarr;</span>
      </div>

      <div className="bpos-chips">
        {b.chips.map((c) => (
          <span className="bpos-chip" key={c[0]}>
            <em>{c[0]}</em>
            <b>{c[1]}</b>
          </span>
        ))}
      </div>

      <div className="bpos-book-body">
        <div className="bpos-scroll">
          <table className="bpos-tab-list bpos-book-tab">
            <thead>
              <tr>
                <th>Operating statement</th>
                <th className="r">Actual</th>
                <th className="r">Budget</th>
                <th className="r">Variance</th>
              </tr>
            </thead>
            <tbody>
              {b.lines.map((l) => (
                <tr key={l.label} className={l.total ? "is-total" : undefined}>
                  <td>{l.label}</td>
                  <td className="r bpos-num-cell">{l.actual}</td>
                  <td className="r bpos-num-cell">{l.budget}</td>
                  <td className={`r bpos-num-cell${l.bad ? " is-bad" : " is-good"}`}>{l.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bpos-book-side">
          <div className="bpos-side-block">
            <p className="bpos-lab">{b.trend.label}</p>
            <Trend points={b.trend.occ} label="Occupancy, trailing twelve months" />
            <p className="bpos-sm">
              Occupancy 94.1% &rarr; 95.9% &middot; in-place rent $2,118 &rarr; $2,226
            </p>
            <Trend points={b.trend.rent} label="In-place rent, trailing twelve months" />
          </div>
          <div className="bpos-side-block">
            <p className="bpos-lab">Debt</p>
            <dl className="bpos-defs">
              {b.debt.map((r) => (
                <div key={r[0]}>
                  <dt>{r[0]}</dt>
                  <dd>{r[1]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <p className="bpos-calc-note">{b.note}</p>
    </div>
  );
}

export function UnderwritingBench() {
  const u = UW_BENCH;
  const s = u.sensitivity;
  return (
    <div className="bpos-card bpos-bench">
      <div className="bpos-book-head">
        <div>
          <p className="bpos-ct">Underwriting bench &middot; {u.deal}</p>
          <p className="bpos-sm">{u.stage}</p>
        </div>
        <span className="bpos-btn bpos-btn-ghost">Open the model &rarr;</span>
      </div>

      <div className="bpos-bench-grid">
        <section className="bpos-bench-col">
          <p className="bpos-lab">Assumptions</p>
          <dl className="bpos-calc-in">
            {u.assumptions.map((a) => (
              <div className="bpos-field" key={a[0]}>
                <dt>{a[0]}</dt>
                <dd>{a[1]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bpos-bench-col">
          <p className="bpos-lab">Model &middot; five-year cash flow</p>
          <div className="bpos-scroll">
            <table className="bpos-tab-list bpos-model">
              <thead>
                <tr>
                  {u.model.cols.map((c, i) => (
                    <th key={c || "l"} className={i ? "r" : undefined}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {u.model.rows.map((r) => (
                  <tr key={r[0]} className={r[0] === "Net operating income" || r[0] === "Cash flow after debt" ? "is-total" : undefined}>
                    {r.map((cell, i) => (
                      <td key={`${r[0]}-${i}`} className={i ? "r bpos-num-cell" : undefined}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="bpos-lab bpos-lab-gap">Waterfall &middot; distributions over the hold</p>
          <div className="bpos-scroll">
            <table className="bpos-tab-list bpos-fall">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th className="r">Limited partners</th>
                  <th className="r">General partner</th>
                </tr>
              </thead>
              <tbody>
                {u.waterfall.map((t) => (
                  <tr key={t.tier} className={t.total ? "is-total" : undefined}>
                    <td>
                      {t.tier}
                      <span className="bpos-sm bpos-fall-note">{t.note}</span>
                    </td>
                    <td className="r bpos-num-cell">{t.lp}</td>
                    <td className="r bpos-num-cell">{t.gp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="bpos-bench-low">
        <div className="bpos-returns">
          {u.returns.map((r, i) => (
            <div className={`bpos-out${i === 0 ? " lead" : ""}`} key={r[0]}>
              <p className="bpos-lab">{r[0]}</p>
              <p className={i === 0 ? "bpos-big" : "bpos-mid"}>{r[1]}</p>
              <p className="bpos-sm">{r[2]}</p>
            </div>
          ))}
        </div>

        <div className="bpos-sens">
          <p className="bpos-lab">{s.title}</p>
          <div className="bpos-scroll">
            <table className="bpos-tab-list bpos-sens-tab">
              <thead>
                <tr>
                  <th />
                  {s.cols.map((c) => (
                    <th key={c} className="r">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((row, ri) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    {row[1].map((v, ci) => (
                      <td
                        key={`${row[0]}-${ci}`}
                        className={`r bpos-num-cell${ri === s.at[0] && ci === s.at[1] ? " is-base" : ""}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="bpos-calc-note">{u.note}</p>
    </div>
  );
}

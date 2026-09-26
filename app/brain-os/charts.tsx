import { Fragment, type ReactNode } from 'react';

/* Charts for the Brain OS pages, drawn in the page's own hand.
   Columns are SVG so they scale with the card; ranked lists are HTML so the
   labels stay crisp and wrap. Marks are thin, gridlines are hairlines, and
   only the extremes carry a direct label: the axis and the table under each
   chart carry the rest. Every chart has a table twin under "The numbers". */

export type Point = { label: string; value: number; sub?: string; partial?: boolean };
export type Row = { label: string; value: number; sub?: string; group?: string; tone?: 'blue' | 'warm' | 'light' };

const fmt = (n: number) => n.toLocaleString('en-US');

function niceTop(max: number) {
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  return { step, top: Math.ceil(max / step) * step };
}

// A column with a 4px rounded cap and a square foot on the baseline.
function column(x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.min(radius, h, w / 2);
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
}

export function ChartCard({ title, note, source, children, columns, rows, wide }: {
  title: string;
  note?: string;
  source: string;
  children: ReactNode;
  columns: [string, string] | [string, string, string];
  rows: (string | number)[][];
  wide?: boolean;
}) {
  return (
    <figure className={`bp-chart${wide ? ' is-wide' : ''}`}>
      <figcaption className="bp-chart-head">
        <div>
          <p className="bp-chart-title">{title}</p>
          {note ? <p className="bp-chart-note">{note}</p> : null}
        </div>
      </figcaption>
      {children}
      <p className="bp-source">{source}</p>
      <details className="bp-chart-table">
        <summary>The numbers</summary>
        <table>
          <thead><tr>{columns.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>{r.map((cell, j) => <td key={j}>{typeof cell === 'number' ? fmt(cell) : cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

export function ColumnChart({ points, unit, label }: { points: Point[]; unit?: string; label: string }) {
  const W = 640, H = 250, L = 44, R = 12, T = 28, B = 48;
  const plotW = W - L - R, plotH = H - T - B;
  const { step, top } = niceTop(Math.max(...points.map(p => p.value)));
  const ticks: number[] = [];
  for (let t = 0; t <= top + 1e-9; t += step) ticks.push(t);
  const band = plotW / points.length;
  const bw = Math.min(24, band * 0.5);
  const y = (v: number) => T + plotH - (v / top) * plotH;
  const extreme = points.reduce((m, p, i, a) => (p.value > a[m].value ? i : m), 0);
  return (
    <div className="bp-svg-scroll">
    <svg className="bp-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {ticks.map(t => (
        <g key={t}>
          <line className="bp-axis" x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
          <text x={L - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
        </g>
      ))}
      {points.map((p, i) => {
        const x = L + band * i + (band - bw) / 2;
        const yTop = y(p.value);
        const labelled = i === 0 || i === points.length - 1 || i === extreme;
        return (
          <g key={p.label}>
            <title>{`${p.label}${p.sub ? `, ${p.sub}` : ''}: ${fmt(p.value)}${unit ? ` ${unit}` : ''}`}</title>
            <path d={column(x, yTop, bw, T + plotH - yTop, 4)} fill={p.partial ? '#8fb0e8' : '#3b66ce'} />
            {labelled ? <text className="bp-value" x={x + bw / 2} y={yTop - 9} textAnchor="middle">{fmt(p.value)}</text> : null}
            <text x={x + bw / 2} y={T + plotH + 19} textAnchor="middle">{p.label}</text>
            {p.sub ? <text x={x + bw / 2} y={T + plotH + 35} textAnchor="middle" fontSize="11">{p.sub}</text> : null}
          </g>
        );
      })}
    </svg>
    </div>
  );
}

export type Series = { name: string; color: string; values: (number | null)[]; partialLast?: boolean };

export function PairedColumnChart({ labels, series, label }: { labels: string[]; series: [Series, Series]; label: string }) {
  const W = 640, H = 250, L = 44, R = 12, T = 28, B = 40;
  const plotW = W - L - R, plotH = H - T - B;
  const all = series.flatMap(s => s.values).filter((v): v is number => v !== null);
  const { step, top } = niceTop(Math.max(...all));
  const ticks: number[] = [];
  for (let t = 0; t <= top + 1e-9; t += step) ticks.push(t);
  const band = plotW / labels.length;
  const bw = Math.min(20, band * 0.28);
  const gap = 2;
  const y = (v: number) => T + plotH - (v / top) * plotH;
  return (
    <>
      <div className="bp-svg-scroll">
      <svg className="bp-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
        {ticks.map(t => (
          <g key={t}>
            <line className="bp-axis" x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
            <text x={L - 8} y={y(t) + 4} textAnchor="end">{fmt(t)}</text>
          </g>
        ))}
        {labels.map((lab, i) => {
          const x0 = L + band * i + (band - (bw * 2 + gap)) / 2;
          return (
            <g key={lab}>
              {series.map((s, k) => {
                const v = s.values[i];
                if (v === null) return null;
                const x = x0 + k * (bw + gap);
                const yTop = y(v);
                const isMax = v === Math.max(...s.values.filter((n): n is number => n !== null));
                const partial = s.partialLast && i === labels.length - 1;
                return (
                  <g key={s.name}>
                    <title>{`${s.name}, ${lab}: ${fmt(v)}${partial ? ' (part of the day)' : ''}`}</title>
                    <path d={column(x, yTop, bw, T + plotH - yTop, 4)} fill={s.color} opacity={partial ? 0.45 : 1} />
                    {isMax ? <text className="bp-value" x={x + bw / 2} y={yTop - 9} textAnchor="middle">{fmt(v)}</text> : null}
                  </g>
                );
              })}
              <text x={x0 + bw + gap / 2} y={T + plotH + 19} textAnchor="middle">{lab}</text>
            </g>
          );
        })}
      </svg>
      </div>
      <div className="bp-legend" aria-hidden="true">
        {series.map(s => <span key={s.name}><i style={{ background: s.color }} />{s.name}</span>)}
      </div>
    </>
  );
}

export function BarList({ rows, max, suffix = '' }: { rows: Row[]; max?: number; suffix?: string }) {
  const top = max ?? Math.max(...rows.map(r => r.value));
  return (
    <ul className="bp-bars">
      {rows.map((r, i) => {
        const header = r.group && r.group !== rows[i - 1]?.group ? r.group : null;
        return (
          <Fragment key={`${r.group ?? ''}-${r.label}`}>
            {header ? <li className="bp-bars-group">{header}</li> : null}
            <li title={`${r.label}: ${fmt(r.value)}${suffix}`}>
              <span className="bp-bar-label">{r.label}{r.sub ? <small>{r.sub}</small> : null}</span>
              <span className="bp-track"><span className={`bp-fill${r.tone && r.tone !== 'blue' ? ` is-${r.tone}` : ''}`} style={{ width: `${Math.max(0.5, (r.value / top) * 100)}%` }} /></span>
              <span className="bp-bar-value">{fmt(r.value)}{suffix}</span>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

/* ---- Second pass: more visuals ---- */

// N small steps before, one or two after. The counts are the steps in the copy.
export function StepsStrip({ steps, unit }: { steps: string[]; unit: 'steps' | 'asks' }) {
  const n = steps.length;
  return (
    <p className="bp-strip" aria-label={`${n} ${unit}`}>
      <b>{n} {n === 1 ? unit.replace(/s$/, '') : unit}</b>
      {steps.map(s => <span key={s}>{s}</span>)}
    </p>
  );
}

// Two hours, and where thirty seconds sits inside it.
export function RatioBar({ beforeLabel, afterLabel, ratio }: { beforeLabel: string; afterLabel: string; ratio: number }) {
  return (
    <div className="bp-ratio" role="img" aria-label={`${afterLabel} is one part in ${Math.round(1 / ratio)} of ${beforeLabel}`}>
      <div className="bp-ratio-track"><span className="bp-ratio-fill" style={{ width: `${Math.max(0.3, ratio * 100)}%` }} /></div>
      <p className="bp-ratio-legend"><span>{afterLabel}, the blue sliver</span><span>{beforeLabel}, the whole bar</span></p>
    </div>
  );
}

export type Milestone = { iso: string; date: string; short: string };

const dayOf = (iso: string) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10))) / 86400000;

// Dots on a date axis, labels staggered above and below with leader lines.
export function TimelineChart({ events, start, end, months, label }: { events: Milestone[]; start: string; end: string; months: { iso: string; name: string }[]; label: string }) {
  const W = 1200, H = 290, L = 24, R = 24, AXIS = 150;
  const d0 = dayOf(start), span = dayOf(end) - d0;
  const x = (iso: string) => L + ((dayOf(iso) - d0) / span) * (W - L - R);
  const above = [AXIS - 30, AXIS - 50, AXIS - 70, AXIS - 90];
  const below = [AXIS + 40, AXIS + 60, AXIS + 80, AXIS + 100];
  // Labels alternate sides, then take the lowest level on that side where they
  // do not overlap a label already placed. Width is estimated from the text.
  const placed: { above: [number, number][][]; below: [number, number][][] } = { above: [[], [], [], []], below: [[], [], [], []] };
  const layout = events.map((e, i) => {
    const cx = x(e.iso);
    const width = (e.date.length + e.short.length + 3) * 6.6 + 8;
    const endAnchor = cx + width > W - R;
    const span: [number, number] = endAnchor ? [cx - width, cx] : [cx, cx + width];
    const side: 'above' | 'below' = i % 2 === 0 ? 'above' : 'below';
    const levels = placed[side];
    let level = levels.findIndex(l => l.every(([a, b]) => span[1] + 10 < a || span[0] - 10 > b));
    if (level < 0) level = levels.length - 1;
    levels[level].push(span);
    return { cx, side, level, endAnchor };
  });
  return (
    <svg className="bp-svg bp-timeline-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      <line className="bp-axis" x1={L} x2={W - R} y1={AXIS} y2={AXIS} />
      {months.map(m => (
        <g key={m.iso}>
          <line className="bp-axis" x1={x(m.iso)} x2={x(m.iso)} y1={AXIS - 6} y2={AXIS + 6} />
          <text x={x(m.iso) + 6} y={AXIS + 20} fontSize="11">{m.name}</text>
        </g>
      ))}
      {events.map((e, i) => {
        const { cx, side, level, endAnchor } = layout[i];
        const ly = side === 'above' ? above[level] : below[level];
        return (
          <g key={e.iso + e.short}>
            <title>{`${e.date}: ${e.short}`}</title>
            <line x1={cx} x2={cx} y1={AXIS} y2={side === 'above' ? ly + 6 : ly - 12} stroke="#b0c5d7" strokeWidth="1" />
            <circle cx={cx} cy={AXIS} r={5} fill="#3b66ce" stroke="#ffffff" strokeWidth="2" />
            <text x={endAnchor ? cx - 6 : cx + 6} y={ly} textAnchor={endAnchor ? 'end' : 'start'}>
              <tspan className="bp-value">{e.date}</tspan>
              <tspan> · {e.short}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export type CadenceRow = { what: string; every: 'minutes' | 'hourly' | 'daily' | 'weekly' | 'event'; note: string; count?: number };

// One week as a strip per job: how often each writer touches the brain.
export function CadenceChart({ rows, label }: { rows: CadenceRow[]; label: string }) {
  const W = 1200, LBL = 300, R = 16, ROW = 44, TOP = 8;
  const plotW = W - LBL - R;
  const H = TOP + rows.length * ROW + 34;
  const dayX = (d: number) => LBL + (d / 7) * plotW;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="bp-svg-scroll">
    <svg className="bp-svg is-wide" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {days.map((d, i) => (
        <g key={d}>
          <line className="bp-axis" x1={dayX(i)} x2={dayX(i)} y1={TOP} y2={TOP + rows.length * ROW} />
          <text x={dayX(i) + 6} y={TOP + rows.length * ROW + 20} fontSize="11">{d}</text>
        </g>
      ))}
      <line className="bp-axis" x1={dayX(7)} x2={dayX(7)} y1={TOP} y2={TOP + rows.length * ROW} />
      {rows.map((r, i) => {
        const y = TOP + i * ROW;
        const mid = y + ROW / 2;
        let marks: React.ReactNode = null;
        if (r.every === 'minutes') marks = <rect x={dayX(0)} y={mid - 5} width={plotW} height={10} fill="#3b66ce" rx={2} />;
        if (r.every === 'hourly') marks = <>{Array.from({ length: 168 }, (_, h) => <line key={h} x1={dayX(h / 24)} x2={dayX(h / 24)} y1={mid - 5} y2={mid + 5} stroke="#3b66ce" strokeWidth="1" />)}</>;
        if (r.every === 'daily') marks = <>{Array.from({ length: 7 }, (_, d) => <line key={d} x1={dayX(d + 5 / 24)} x2={dayX(d + 5 / 24)} y1={mid - 7} y2={mid + 7} stroke="#3b66ce" strokeWidth="2" />)}</>;
        if (r.every === 'weekly') marks = <line x1={dayX(6.25 / 24)} x2={dayX(6.25 / 24)} y1={mid - 8} y2={mid + 8} stroke="#3b66ce" strokeWidth="3" />;
        if (r.every === 'event') {
          const n = r.count ?? 0;
          marks = <>{Array.from({ length: n }, (_, k) => {
            const t = (k / n) * 5;
            const day = Math.floor(t);
            const hour = 8 + (t - day) * 10;
            const xx = dayX(day + hour / 24);
            return <line key={k} x1={xx} x2={xx} y1={mid - 6} y2={mid + 6} stroke="#3b66ce" strokeWidth="1.5" />;
          })}</>;
        }
        return (
          <g key={r.what}>
            <title>{`${r.what}: ${r.note}`}</title>
            {i > 0 ? <line className="bp-axis" x1={0} x2={W - R} y1={y} y2={y} /> : null}
            <text x={0} y={mid - 2} className="bp-value" fontSize="13">{r.what}</text>
            <text x={0} y={mid + 14} fontSize="11">{r.note}</text>
            {marks}
          </g>
        );
      })}
    </svg>
    </div>
  );
}

export type Spoke = { name: string; access: 'rw' | 'read' | 'write' | 'signin'; note: string };

// Brain OS in the middle, every system on a spoke, arrows for the direction data moves.
export function IntegrationMap({ spokes, label }: { spokes: Spoke[]; label: string }) {
  const W = 1200, H = 560, cx = W / 2, cy = H / 2, HUB = 64, RX = 440, RY = 200, NW = 190, NH = 46;
  const edge = (dx: number, dy: number) => Math.min(Math.abs(dx) > 1e-6 ? (NW / 2) / Math.abs(dx) : Infinity, Math.abs(dy) > 1e-6 ? (NH / 2) / Math.abs(dy) : Infinity);
  return (
    <>
      <div className="bp-svg-scroll">
      <svg className="bp-svg is-wide" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
        <defs>
          <marker id="bp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 Z" fill="#3b66ce" />
          </marker>
        </defs>
        {spokes.map((s, i) => {
          const a = -Math.PI / 2 + (i / spokes.length) * Math.PI * 2;
          const nx = cx + RX * Math.cos(a), ny = cy + RY * Math.sin(a);
          const dx = nx - cx, dy = ny - cy, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
          const hx = cx + ux * (HUB + 6), hy = cy + uy * (HUB + 6);
          const t = edge(ux, uy) + 6;
          const ex = nx - ux * t, ey = ny - uy * t;
          const toHub = s.access === 'read' || s.access === 'rw';
          const toSystem = s.access === 'write' || s.access === 'rw';
          return (
            <g key={s.name}>
              <title>{`${s.name}: ${s.note}`}</title>
              <line x1={hx} y1={hy} x2={ex} y2={ey} stroke={s.access === 'signin' ? '#9db6cb' : '#3b66ce'} strokeWidth="1.5" markerStart={toHub ? 'url(#bp-arrow)' : undefined} markerEnd={toSystem ? 'url(#bp-arrow)' : undefined} />
              <rect x={nx - NW / 2} y={ny - NH / 2} width={NW} height={NH} rx={8} fill="#ffffff" stroke="#c9dce9" />
              <text x={nx} y={ny + 4} textAnchor="middle" className="bp-value" fontSize="13">{s.name}</text>
              <text x={nx} y={ny + NH / 2 + 16} textAnchor="middle" fontSize="11">{s.note}</text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={HUB} fill="#e3effb" stroke="#a7c0dc" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="bp-value" fontSize="17">Brain OS</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11">one tool per action</text>
      </svg>
      </div>
      <div className="bp-legend" aria-hidden="true">
        <span><i style={{ background: '#3b66ce', width: 18, height: 2, borderRadius: 1 }} />Arrow into Brain OS: a read, live at the moment of the question</span>
        <span><i style={{ background: '#3b66ce', width: 18, height: 2, borderRadius: 1 }} />Arrow out: a write, drafted first and confirmed second</span>
        <span><i style={{ background: '#9db6cb', width: 18, height: 2, borderRadius: 1 }} />Grey: sign in only</span>
      </div>
    </>
  );
}

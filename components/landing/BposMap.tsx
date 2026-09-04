"use client";

/* The map, drawn rather than embedded. State outlines and a Mercator
   projection ship as data, so a market or a lane is placed by its actual
   coordinates instead of being nudged into position by eye. No map library,
   no tiles, nothing fetched at runtime. */

import { useMemo, useState } from "react";
import usMap from "./us-map.json";

const MAP = usMap as unknown as {
  viewBox: [number, number];
  mercator: { scale: number; tx: number; ty: number };
  paths: { name: string; d: string }[];
};

const RAD = Math.PI / 180;
function project(lat: number, lng: number): [number, number] {
  const { scale, tx, ty } = MAP.mercator;
  return [
    +(scale * (lng * RAD) + tx).toFixed(1),
    +(ty - scale * Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))).toFixed(1),
  ];
}

export interface MapDot {
  name: string;
  lat: number;
  lng: number;
  /** drives the radius — comps in the set, loads on the lane */
  n: number;
  meta: string;
  flag?: boolean;
}

export interface MapLane {
  id: string;
  from: [lat: number, lng: number, label: string];
  to: [lat: number, lng: number, label: string];
  meta: string;
  flag?: boolean;
}

function arc(a: [number, number], b: [number, number]): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(26, len * 0.16);
  const mx = (a[0] + b[0]) / 2 + (-dy / len) * bow;
  const my = (a[1] + b[1]) / 2 + (dx / len) * bow;
  return `M${a[0]},${a[1]} Q${mx.toFixed(1)},${my.toFixed(1)} ${b[0]},${b[1]}`;
}

export function BposMap({
  title,
  meta,
  dots = [],
  lanes = [],
  legend,
}: {
  title: string;
  meta: string;
  dots?: MapDot[];
  lanes?: MapLane[];
  legend: string;
}) {
  const [w, h] = MAP.viewBox;
  const [hot, setHot] = useState<string | null>(null);

  const placed = useMemo(
    () => dots.map((d) => ({ ...d, p: project(d.lat, d.lng) })),
    [dots],
  );
  const drawn = useMemo(
    () =>
      lanes.map((l) => {
        const a = project(l.from[0], l.from[1]);
        const b = project(l.to[0], l.to[1]);
        return { ...l, a, b, d: arc(a, b) };
      }),
    [lanes],
  );

  const max = Math.max(1, ...placed.map((d) => d.n));
  const r = (n: number) => 3 + Math.sqrt(n / max) * 8;

  const live = hot
    ? placed.find((d) => d.name === hot) ?? drawn.find((l) => l.id === hot)
    : null;

  return (
    <div className="bpos-card bpos-mapcard">
      <div className="bpos-crow">
        <p className="bpos-ct">{title}</p>
        <span className="bpos-sm">{meta}</span>
      </div>
      <div className="bpos-map">
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title}. ${legend}`}>
          <g className="bpos-map-states">
            {MAP.paths.map((s) => (
              <path key={s.name} d={s.d} />
            ))}
          </g>

          {drawn.map((l) => (
            <g
              key={l.id}
              className={`bpos-lane${l.flag ? " flag" : ""}${hot === l.id ? " on" : ""}`}
              onMouseEnter={() => setHot(l.id)}
              onMouseLeave={() => setHot(null)}
            >
              <path d={l.d} className="bpos-lane-hit" />
              <path d={l.d} className="bpos-lane-line" />
              <circle cx={l.a[0]} cy={l.a[1]} r={3.4} className="bpos-lane-a" />
              <circle cx={l.b[0]} cy={l.b[1]} r={3.4} className="bpos-lane-b" />
            </g>
          ))}

          {placed.map((d) => (
            <g
              key={d.name}
              className={`bpos-dot-g${d.flag ? " flag" : ""}${hot === d.name ? " on" : ""}`}
              onMouseEnter={() => setHot(d.name)}
              onMouseLeave={() => setHot(null)}
            >
              <circle cx={d.p[0]} cy={d.p[1]} r={r(d.n) + 6} className="bpos-dot-hit" />
              <circle cx={d.p[0]} cy={d.p[1]} r={r(d.n)} className="bpos-dot-ring" />
              <circle cx={d.p[0]} cy={d.p[1]} r={2} className="bpos-dot-core" />
            </g>
          ))}
        </svg>
      </div>
      <div className="bpos-map-foot">
        <span className="bpos-map-legend">{legend}</span>
        <span className="bpos-map-read" aria-live="polite">
          {live
            ? `${"name" in live ? live.name : `${live.from[2]} → ${live.to[2]}`} · ${live.meta}`
            : "Hover a market to read it"}
        </span>
      </div>
    </div>
  );
}

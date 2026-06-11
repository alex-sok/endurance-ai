/**
 * §4 Product — the dispatcher's lane map (V2 "Night Freight").
 *
 * Presentational SVG only — ALL choreography lives in ProductDemo.tsx,
 * which drives these elements from one shared GSAP timeline so each
 * transcript line causally fires a map event (DESIGN-V2.md §4).
 *
 * The markup renders the FINAL story state (route booked solid amber,
 * ghost backhaul drawn, all pips visible, carrier delivered at Memphis)
 * so no-JS / reduced-motion / LCP all see the finished booking.
 * ProductDemo rewinds everything to the pre-story state at effect time.
 *
 * Geography is real: equirectangular projection of the Southeast,
 * same formula as AnimatedMarketMap. Load #4471 Atlanta→Memphis,
 * backhaul Memphis→Birmingham (data/product.ts transcript).
 */

const BBOX = { s: 31.4, w: -92.5, n: 37.6, e: -81.5 } as const;
const VW = 800;
const VH = 480;
const MX = 50;
const MY = 44;

function proj(lon: number, lat: number) {
  return {
    x: MX + ((lon - BBOX.w) / (BBOX.e - BBOX.w)) * (VW - 2 * MX),
    y: MY + ((BBOX.n - lat) / (BBOX.n - BBOX.s)) * (VH - 2 * MY),
  };
}

const ATL = proj(-84.39, 33.75); // Atlanta — load #4471 origin
const MEM = proj(-90.05, 35.15); // Memphis — destination
const BHM = proj(-86.8, 33.52); // Birmingham — 92% backhaul
const BNA = proj(-86.78, 36.16); // Nashville — ambient node
const CHA = proj(-85.31, 35.05); // Chattanooga — ambient node
const JAN = proj(-90.18, 32.3); // Jackson MS — ambient node

const f = (p: { x: number; y: number }) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

/** Load #4471 lane, Atlanta→Memphis (gentle north arc, I-24/I-40 feel). */
const ROUTE_D = `M${f(ATL)} C470,222 330,182 ${f(MEM)}`;

/** Ghost backhaul, Memphis→Birmingham. */
const GHOST_D = `M${f(MEM)} Q295,272 ${f(BHM)}`;

/** Ambient corridors — background traffic, not part of the story. */
const LANES = [
  `M${f(BNA)} C455,185 510,235 ${f(ATL)}`, // I-24 Nashville→Atlanta
  `M${f(MEM)} C270,165 345,142 ${f(BNA)}`, // I-40 Memphis→Nashville
  `M${f(ATL)} C625,272 695,255 758,242`, // I-85 Atlanta→northeast
  `M${f(JAN)} C200,315 202,255 ${f(MEM)}`, // I-55 Jackson→Memphis
];

/** Coordinates ProductDemo needs to slide the carrier onto the lane. */
export const MAP_POINTS = {
  atl: ATL,
  mem: MEM,
  bhm: BHM,
  /** Mason TX-114 idles "11 mi from origin" — just off the Atlanta pip. */
  carrierStart: { x: 598, y: 318 },
} as const;

const STORY_CITIES = [
  { id: "atl", label: "ATLANTA", x: ATL.x, y: ATL.y, labelY: -13 },
  { id: "mem", label: "MEMPHIS", x: MEM.x, y: MEM.y, labelY: -13 },
  { id: "bhm", label: "BIRMINGHAM", x: BHM.x, y: BHM.y, labelY: 22 },
] as const;

const AMBIENT_NODES = [
  { id: "bna", label: "NASHVILLE", x: BNA.x, y: BNA.y },
  { id: "cha", label: null, x: CHA.x, y: CHA.y },
  { id: "jan", label: null, x: JAN.x, y: JAN.y },
] as const;

/** Background trucks — count must match ProductDemo's AMBIENT config. */
const AMBIENT_TRUCK_COUNT = 6;

const MONO = "var(--logi-font-mono, monospace)";

export function AnimatedDashboardMap() {
  return (
    <svg
      className="v2-product__svg"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="v2-prod-dots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="0.6" fill="rgba(245,242,236,0.06)" />
        </pattern>
        <pattern
          id="v2-prod-dots-amber"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="0.8" fill="rgba(245,165,36,0.5)" />
        </pattern>
        <radialGradient id="v2-prod-cityglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="v2-prod-truckglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="v2-prod-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--logi-signal)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--logi-signal)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--logi-signal)" stopOpacity="0" />
        </linearGradient>
        {/* The dashed ghost leg "draws" by revealing through this mask —
            ProductDemo animates the white path's dashoffset. Without JS
            the mask is fully open and the ghost reads complete. */}
        <mask id="v2-prod-ghostmask">
          <path
            className="v2-product__ghost-reveal"
            d={GHOST_D}
            fill="none"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* Base dot grid */}
      <rect width={VW} height={VH} fill="url(#v2-prod-dots)" />
      {/* Amber grid pulse — flares while "scanning open loads" */}
      <rect
        className="v2-product__gridpulse"
        width={VW}
        height={VH}
        fill="url(#v2-prod-dots-amber)"
        opacity="0"
      />

      {/* Ambient corridors */}
      <g
        stroke="rgba(245,242,236,0.07)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      >
        {LANES.map((d, i) => (
          <path key={i} className="v2-product__lane" data-lane={i} d={d} />
        ))}
      </g>

      {/* Ambient nodes */}
      {AMBIENT_NODES.map((n) => (
        <g
          key={n.id}
          className="v2-product__node"
          transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
        >
          <circle r="2" fill="var(--logi-fg-faint)" />
          {n.label ? (
            <text
              y={-9}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="8"
              letterSpacing="0.1em"
              fill="var(--logi-fg-faint)"
            >
              {n.label}
            </text>
          ) : null}
        </g>
      ))}

      {/* Ambient trucks — positioned + looped by ProductDemo */}
      {Array.from({ length: AMBIENT_TRUCK_COUNT }).map((_, i) => (
        <g key={i} className="v2-product__ambient">
          <circle r="7" fill="url(#v2-prod-truckglow)" opacity="0.5" />
          <rect
            x="-4"
            y="-2"
            width="8"
            height="4"
            rx="0.5"
            fill="var(--logi-signal-dim)"
          />
        </g>
      ))}

      {/* Ghost backhaul leg — Memphis→Birmingham, 92% probability */}
      <path
        className="v2-product__ghost"
        d={GHOST_D}
        fill="none"
        stroke="var(--logi-signal-dim)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        strokeLinecap="round"
        mask="url(#v2-prod-ghostmask)"
      />
      <text
        className="v2-product__backhaul"
        x="296"
        y="246"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="0.12em"
        fill="var(--logi-fg-muted)"
      >
        BACKHAUL 92%
      </text>

      {/* Load #4471 lane — candidate draw, then the booked snap */}
      <path
        className="v2-product__route-pending"
        d={ROUTE_D}
        fill="none"
        stroke="var(--logi-signal-dim)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="v2-product__route-flash"
        d={ROUTE_D}
        fill="none"
        stroke="var(--logi-signal)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0"
      />
      <path
        className="v2-product__route-final"
        d={ROUTE_D}
        fill="none"
        stroke="var(--logi-signal)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />

      {/* Story pips */}
      {STORY_CITIES.map((c) => (
        <g
          key={c.id}
          className="v2-product__city"
          data-city={c.id}
          transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`}
        >
          <g className="v2-product__city-inner">
            {/* Pip circles get their own group so the scale-pop's
                transformOrigin is the pip center, not the bbox center
                skewed by the label text. */}
            <g className="v2-product__city-pip">
              <circle r="14" fill="url(#v2-prod-cityglow)" />
              <circle r="3.2" fill="var(--logi-signal)" />
            </g>
            <text
              y={c.labelY}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="9"
              letterSpacing="0.1em"
              fill="var(--logi-fg-muted)"
            >
              {c.label}
            </text>
          </g>
          <circle
            className="v2-product__city-ring"
            r="8"
            fill="none"
            stroke="var(--logi-signal)"
            strokeWidth="1.2"
            opacity="0"
          />
        </g>
      ))}

      {/* Mason TX-114 — rests at Memphis in the final/no-JS state */}
      <g
        className="v2-product__carrier"
        transform={`translate(${MEM.x.toFixed(1)} ${MEM.y.toFixed(1)})`}
      >
        <circle r="12" fill="url(#v2-prod-truckglow)" />
        <g className="v2-product__carrier-hull">
          <rect x="-6" y="-3" width="12" height="6" rx="1" fill="var(--logi-signal)" />
          <rect x="3.4" y="-1.6" width="2.6" height="3.2" fill="#fff" />
        </g>
        <text
          className="v2-product__carrier-label"
          y="-17"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9"
          letterSpacing="0.1em"
          fill="var(--logi-fg)"
        >
          MASON TX-114
        </text>
      </g>

      {/* Scanline — sweeps once on "Scanning open loads" */}
      <rect
        className="v2-product__scan"
        x="-160"
        y="0"
        width="140"
        height={VH}
        fill="url(#v2-prod-scan)"
        opacity="0"
      />
    </svg>
  );
}

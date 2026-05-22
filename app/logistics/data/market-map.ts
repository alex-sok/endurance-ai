/**
 * Minimal market map visualization: city nodes and connecting lines.
 *
 * Cities are positioned at fixed SVG coordinates (no projection math needed).
 * Lines connect cities to form a simplified US logistics network.
 * Animation: lines draw in, dots pop in on scroll via GSAP.
 */

export interface MarketMapCity {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface MarketMapLine {
  from: string;
  to: string;
}

// City positions in SVG viewBox (800×480)
// Placed roughly to suggest US geography without needing projection math.
export const marketMapCities: MarketMapCity[] = [
  { id: "bos", label: "BOS", x: 750, y: 95 },
  { id: "nyc", label: "NYC", x: 745, y: 125 },
  { id: "dc", label: "DC", x: 730, y: 155 },
  { id: "atl", label: "ATL", x: 700, y: 250 },
  { id: "mia", label: "MIA", x: 720, y: 340 },
  { id: "chi", label: "CHI", x: 570, y: 185 },
  { id: "den", label: "DEN", x: 380, y: 175 },
  { id: "la", label: "LA", x: 150, y: 280 },
  { id: "sf", label: "SF", x: 100, y: 220 },
  { id: "hou", label: "HOU", x: 530, y: 310 },
];

// Lines connecting cities to form the network.
// Order matters: lines are animated in sequence.
export const marketMapLines: MarketMapLine[] = [
  // East Coast corridor
  { from: "bos", to: "nyc" },
  { from: "nyc", to: "dc" },
  { from: "dc", to: "atl" },
  { from: "atl", to: "mia" },

  // Central corridor
  { from: "dc", to: "chi" },
  { from: "chi", to: "den" },
  { from: "chi", to: "hou" },

  // West Coast corridor
  { from: "sf", to: "la" },
  { from: "la", to: "hou" },
  { from: "den", to: "la" },

  // South-Southeast
  { from: "hou", to: "atl" },
];

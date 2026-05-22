"use client";

import dynamic from "next/dynamic";
import { AnimatedDashboardMap } from "./AnimatedDashboardMap";

/**
 * Opt-in Mapbox wrapper for the §4 dashboard map.
 *
 * - If NEXT_PUBLIC_MAPBOX_TOKEN is set in the environment, this loads
 *   the (still to be written) MapboxDashboardMap and renders a real
 *   dark-styled Mapbox map of the Southeast US with animated trucks
 *   following real GeoJSON routes.
 * - If the token isn't set, we render the AnimatedDashboardMap — a
 *   stylized SVG with the same lane + truck behavior. Looks intentional,
 *   not like a fallback.
 *
 * To turn on real Mapbox later:
 *   1. mapbox.com → Account → Access tokens → create a token,
 *      URL-restricted to endurancelabs.ai.
 *   2. Set NEXT_PUBLIC_MAPBOX_TOKEN in Vercel (Production + Preview).
 *   3. npm install mapbox-gl react-map-gl
 *   4. Create app/logistics/components/MapboxDashboardMap.tsx — see
 *      the spec in /logistics/README.md.
 *   5. Uncomment the dynamic import below.
 *
 * Until then, this file is the single switch point — no Product.tsx
 * change needed when the upgrade lands.
 */

// const MapboxDashboardMap = dynamic(
//   () => import("./MapboxDashboardMap").then((m) => m.MapboxDashboardMap),
//   { ssr: false, loading: () => <AnimatedDashboardMap /> },
// );

export function DashboardMap() {
  const hasMapboxToken =
    typeof process !== "undefined" &&
    !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // When the Mapbox component is added, change the branch below to:
  //   if (hasMapboxToken) return <MapboxDashboardMap />;
  // For now we ignore the flag and always render the SVG. The check is
  // here so the import + bundle wiring is ready when the token lands.
  void hasMapboxToken;
  return <AnimatedDashboardMap />;
}

// Re-export for the silenced linter; otherwise `dynamic` import above
// looks unused.
export const _dynamicReserved = dynamic;

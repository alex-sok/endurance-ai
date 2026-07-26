import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * The link-preview card. Mirrors the hero: Terminal navy ground, the manifold
 * point field, the branded wordmark rendered as-is, and the positioning line.
 *
 * Using the file convention rather than a static PNG means Next emits an
 * absolute og:image URL for whichever deployment is serving it — so preview
 * links carry their own card instead of inheriting production's.
 */
export const alt = "Endurance AI Labs — an AI research and development company in Silicon Valley";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic LCG so the field is identical on every render.
function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export default async function Image() {
  const logo = readFileSync(
    join(process.cwd(), "public", "logo-endurance-white.svg")
  ).toString("base64");

  const rand = makeRandom(97);
  const dots = Array.from({ length: 190 }, () => {
    const r = rand();
    return {
      x: rand() * 1200,
      y: rand() * 630,
      d: 2 + r * 7,
      // Muted steel through signal blue, matching the resolved field.
      color: r > 0.72 ? "#4a86f7" : r > 0.5 ? "#7fa9ff" : "#93a3c0",
      o: 0.08 + rand() * 0.5,
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a1120",
          position: "relative",
        }}
      >
        {dots.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.d,
              height: p.d,
              borderRadius: p.d,
              background: p.color,
              opacity: p.o,
            }}
          />
        ))}

        {/* Rim glow, the same cool wash the site carries at its edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow:
              "inset 0 0 170px rgba(74,134,247,0.16), inset 0 0 60px rgba(127,169,255,0.08)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 96px",
            position: "relative",
          }}
        >
          {/* Branded wordmark, rendered as-is */}
          <img
            src={`data:image/svg+xml;base64,${logo}`}
            width={620}
            height={89}
            alt=""
          />

          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 35,
              lineHeight: 1.25,
              color: "#f4f6fa",
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
            }}
          >
            AI research and development company in Silicon Valley.
          </div>
        </div>
      </div>
    ),
    size
  );
}

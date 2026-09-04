import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Link-preview card for Margins. Field, wordmark, the hero lines as they ship.
 * Kept in step with HERO in components/margins/content.ts: a share card that
 * quotes a retired headline is worse than no share card.
 * File convention so Next emits an absolute og:image URL per deployment.
 */
export const alt = "One person knows the spreadsheet. Everyone is paid from it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = readFileSync(
    join(process.cwd(), "public", "logo-endurance.svg")
  ).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fcfbff",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 96px",
            position: "relative",
          }}
        >
          <img
            src={`data:image/svg+xml;base64,${logo}`}
            width={420}
            height={60}
            alt=""
          />
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(28, 25, 22, 0.58)",
            }}
          >
            Product · Margins
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 44,
              lineHeight: 1.15,
              color: "#1b1a22",
              letterSpacing: "-0.02em",
            }}
          >
            <div>One person knows the spreadsheet.</div>
            <div style={{ fontStyle: "italic", marginTop: 16 }}>
              Everyone is paid from it.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

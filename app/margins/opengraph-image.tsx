import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Link-preview card for Margins. Field, wordmark, the approved hero lines.
 * File convention so Next emits an absolute og:image URL per deployment.
 */
export const alt = "Pay for the margin, not the load.";
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
          background: "#e4d8c6",
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
              color: "#1c1916",
              letterSpacing: "-0.02em",
            }}
          >
            <div>Pay for the margin,</div>
            <div style={{ fontStyle: "italic", marginTop: 16 }}>
              not the load.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

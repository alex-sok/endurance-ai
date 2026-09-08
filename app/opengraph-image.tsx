import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Link-preview card. The page's own ground, the wordmark, the eyebrow, the
 * three-beat claim on one line, and the positioning line under it.
 * File convention so Next emits an absolute og:image URL per deployment.
 */
export const alt = "We research. We build. We ship.";
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
          background: "#fbfaf8",
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
              alignItems: "center",
              marginTop: 56,
              fontSize: 22,
              letterSpacing: "0.16em",
              color: "#55535c",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                background: "#3672c4",
                marginRight: 18,
              }}
            />
            RESEARCH · ENGINEERING · VERTICAL SOFTWARE
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#1e1d24",
              letterSpacing: "-0.02em",
            }}
          >
            <span>We research. We build.&nbsp;</span>
            <span style={{ color: "#3672c4" }}>We ship.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#55535c",
              maxWidth: 1010,
            }}
          >
            Endurance is an AI engineering group based in San Francisco, CA.
            We make Fortune 500-grade AI research and engineering available to
            every business.
          </div>
        </div>
      </div>
    ),
    size
  );
}

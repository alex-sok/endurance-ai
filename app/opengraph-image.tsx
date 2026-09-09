import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Link-preview card. The page's own ground, the wordmark, the eyebrow, the
 * live claim on one line, and the positioning line under it.
 * File convention so Next emits an absolute og:image URL per deployment.
 * Claim and lede are word spans with gap — Satori collapses regular
 * spaces in the default OG font (the live card has the same defect).
 */
export const alt = "Give people their time back.";
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
          background: "#f7fafc",
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
              color: "#526d80",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                background: "#3b66ce",
                marginRight: 18,
              }}
            />
            A BETTER WORKING LIFE IS POSSIBLE
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: 18,
              marginTop: 24,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#193b51",
              letterSpacing: "-0.02em",
            }}
          >
            <span>Give</span>
            <span>people</span>
            <span>their</span>
            <span>time</span>
            <span style={{ color: "#315f8d" }}>back.</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#526d80",
              maxWidth: 1010,
            }}
          >
            <span>Brain</span>
            <span>OS</span>
            <span>connects</span>
            <span>what</span>
            <span>your</span>
            <span>business</span>
            <span>knows</span>
            <span>with</span>
            <span>the</span>
            <span>work</span>
            <span>it</span>
            <span>needs</span>
            <span>to</span>
            <span>do.</span>
            <span>A</span>
            <span>better</span>
            <span>business.</span>
            <span>A</span>
            <span>better</span>
            <span>working</span>
            <span>life.</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}

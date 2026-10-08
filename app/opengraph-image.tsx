import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Homepage sharing card: Artfield's sunrise, wordmark, Geist typography,
 * and exact headline. The small local assets keep rendering self-contained.
 * Next's file convention supplies both OG and Twitter image metadata.
 */
export const alt = "Endurance AI Labs — Give people back their time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const sunrise = readFileSync(
    join(process.cwd(), "public/social/homepage-sunrise.jpg")
  ).toString("base64");
  const logo = readFileSync(
    join(process.cwd(), "public/social/endurance-wordmark-ink.png")
  ).toString("base64");
  const geist = readFileSync(
    join(process.cwd(), "public/fonts/Geist-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#b8daf1",
          color: "#193b51",
          fontFamily: "Geist",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${sunrise}`}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", inset: 0 }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(90deg, rgba(238,248,255,0.96) 0%, rgba(239,248,255,0.90) 28%, rgba(237,247,255,0.50) 53%, rgba(237,247,255,0) 78%), linear-gradient(0deg, rgba(234,245,250,0.92) 0%, rgba(234,245,250,0) 24%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: 64,
            top: 46,
          }}
        >
          <img
            src={`data:image/png;base64,${logo}`}
            width={230}
            height={40}
            alt=""
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 56,
              fontSize: 14,
              letterSpacing: "0.12em",
              color: "#42647b",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: "#3f6ba9",
                marginRight: 12,
              }}
            />
            A BETTER WORKING LIFE IS POSSIBLE
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontSize: 88,
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
            }}
          >
            <div style={{ display: "flex" }}>Give people</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <span style={{ color: "#315f8d" }}>back</span>
              <span>their time.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              maxWidth: 554,
              fontSize: 23,
              lineHeight: 1.5,
              color: "#35566d",
            }}
          >
            Brain OS connects the knowledge and systems your business already
            runs, on any ERP or system of record.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 38,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#35576d",
          }}
        >
          <span style={{ letterSpacing: "0.06em" }}>BRAIN OS / BUILT BY ENDURANCE</span>
          <span>endurancelabs.ai</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }],
    }
  );
}

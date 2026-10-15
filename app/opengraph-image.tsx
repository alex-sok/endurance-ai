import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Keep the public sharing preview aligned with the cinematic homepage.
export const alt = "Endurance — A company brain for the businesses building our future.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const city = readFileSync(join(process.cwd(), "public/modern-city.png")).toString("base64");
  const logo = readFileSync(join(process.cwd(), "public/social/endurance-wordmark-ink.png")).toString("base64");
  const geist = readFileSync(join(process.cwd(), "public/fonts/Geist-Regular.ttf"));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff", color: "#20201e", fontFamily: "Geist" }}>
      <div style={{ height: 72, padding: "0 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={`data:image/png;base64,${logo}`} width={184} height={32} alt="" />
        <span style={{ fontSize: 15 }}>endurancelabs.ai</span>
      </div>
      <div style={{ position: "relative", display: "flex", flex: 1, justifyContent: "center" }}>
        <img src={`data:image/png;base64,${city}`} width={1200} height={558} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 28, textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 40, lineHeight: 1.15, letterSpacing: "-0.035em" }}>
            <span>A company brain for the</span>
            <span>businesses building our future.</span>
          </div>
          <div style={{ maxWidth: 550, marginTop: 18, fontSize: 18, lineHeight: 1.5 }}>
            Brain OS organizes your company’s knowledge, learns from every task, and helps everyone do more.
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }] },
  );
}

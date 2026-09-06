// /foundations — the Foundations marketplace demo, served exactly as built
// in the Claude Code session (loopboard v30), shell recolored to the
// Margins palette. Static HTML lives in public/foundations-app.html.
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

export async function GET() {
  const html = readFileSync(
    join(process.cwd(), "public", "foundations-app.html"),
    "utf8",
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

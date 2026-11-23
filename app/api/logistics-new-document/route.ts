import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const UPSTREAM = "https://endurance-ai-labs.github.io/endurance-logistics/index.html";
const ROBOTS = '<meta name="robots" content="noindex, nofollow">';

// /logistics/new is a GitHub Pages rewrite. Upstream responses drop our
// headers, so the document is fetched here and marked noindex before it
// is sent. Asset requests stay on the rewrite.
export async function GET() {
  const upstream = await fetch(UPSTREAM, { cache: "no-store" });
  const html = await upstream.text();
  const body = html.includes('name="robots"') ? html : html.replace("<head>", `<head>${ROBOTS}`);
  return new NextResponse(body, {
    status: upstream.ok ? 200 : upstream.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

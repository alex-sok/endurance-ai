// /foundations/admin — passcode-gated exhibit room: the decade verdict
// dashboard (heat matrix, corridor map, chart pack, conclusions) plus the
// live proforma solver. Gate is client-side (demo-grade, passcode
// "endurancedemo") — move behind real auth before any sensitive rollout
// beyond the partner circle.
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

export async function GET() {
  const html = readFileSync(
    join(process.cwd(), "public", "foundations-admin.html"),
    "utf8",
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

import bcrypt from "bcryptjs";
import {
  findPublishedProposal,
  proposalToken,
} from "@/lib/mission-proposals/server";
import { rateLimit, getIP } from "@/lib/rate-limit";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!rateLimit(`proposal-auth:${getIP(request)}`, 10, 60000))
    return new Response("Please try again shortly.", { status: 429 });
  const { slug } = await params;
  let code: string;
  try {
    const v = await request.json();
    code = typeof v.code === "string" ? v.code.trim() : "";
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
  if (code.length < 8 || code.length > 100)
    return new Response("Check your access code.", { status: 401 });
  const p = await findPublishedProposal(slug);
  if (!p || !(await bcrypt.compare(code, p.password_hash)))
    return new Response("Check your access code.", { status: 401 });
  const cookie = `proposal_auth_${slug}=${proposalToken(slug, p.password_hash)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
  return new Response("ok", {
    headers: { "Set-Cookie": cookie, "Cache-Control": "no-store" },
  });
}

import bcrypt from "bcryptjs";
import { authorizePublish } from "@/lib/portal-publish-auth";
import { createClient } from "@/lib/supabase/server";
import { publishSchema } from "@/lib/mission-proposals/model";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  if (!authorizePublish(request))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.PORTAL_SESSION_SECRET)
    return Response.json(
      { error: "Session configuration missing" },
      { status: 503 },
    );
  if (Number(request.headers.get("content-length")) > 3200000)
    return new Response("Payload too large", { status: 413 });
  const raw = await request.text();
  if (raw.length > 3200000)
    return new Response("Payload too large", { status: 413 });
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = publishSchema.safeParse(input);
  if (!parsed.success)
    return Response.json({ error: "Invalid proposal" }, { status: 400 });
  const { code, ...p } = parsed.data;
  if (!Buffer.from(p.pdf, "base64").subarray(0, 5).equals(Buffer.from("%PDF-")))
    return Response.json({ error: "Invalid PDF" }, { status: 400 });
  if (
    /^(water-mission|denso|franmore|rjs-briefing|general-trucking$)/.test(
      p.slug,
    )
  )
    return Response.json({ error: "Reserved portal" }, { status: 409 });
  const db = await createClient(true);
  const { data, error } = await db.rpc("publish_proposal", {
    p,
    p_password_hash: code ? await bcrypt.hash(code, 12) : null,
  });
  if (error)
    return Response.json({ error: "Publication failed" }, { status: 500 });
  if (data !== "ok")
    return Response.json(
      { error: data },
      { status: data === "code_required" ? 400 : 409 },
    );
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? request.url)
    .origin;
  return Response.json({
    id: p.id,
    operation: p.operation,
    url: `${origin}/mission/${p.slug}`,
    active: p.active,
    revision: p.revision,
  });
}

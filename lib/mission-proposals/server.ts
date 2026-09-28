import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { proposalSchema, type Proposal } from "./model";

export type PublishedProposal = {
  id: string;
  slug: string;
  revision: number;
  content: Proposal;
  password_hash: string;
  issued_at: string;
};
export async function findPublishedProposal(
  slug: string,
): Promise<PublishedProposal | null> {
  const db = await createClient(true);
  const { data, error } = await db
    .from("proposal_publications")
    .select("id,slug,revision,content,password_hash,issued_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) {
    // Website can deploy before the additive migration; old portals still work.
    if (error.code === "42P01" || error.code === "PGRST205") return null;
    throw new Error("Mission briefing unavailable.");
  }
  if (!data) return null;
  return { ...data, content: proposalSchema.parse(data.content) };
}
export function proposalToken(slug: string, passwordHash: string) {
  const secret = process.env.PORTAL_SESSION_SECRET;
  if (!secret) throw new Error("Portal session secret is not configured.");
  return createHmac("sha256", secret)
    .update(`proposal:${slug}:${passwordHash}`)
    .digest("hex");
}
export async function canReadProposal(p: PublishedProposal) {
  const offered = (await cookies()).get(`proposal_auth_${p.slug}`)?.value ?? "";
  const expected = proposalToken(p.slug, p.password_hash);
  const a = Buffer.from(offered),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

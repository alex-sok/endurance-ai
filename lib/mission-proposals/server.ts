import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import postgres from "postgres";
import { proposalSchema, type Proposal } from "./model";

export type PublishedProposal = {
  id: string;
  slug: string;
  revision: number;
  content: Proposal;
  password_hash: string;
  issued_at: string;
};
let connection: ReturnType<typeof postgres> | undefined;
function publicationDb() {
  // Preview must never fall back to the production reader credential.
  const url = (
    process.env.VERCEL_ENV === "preview"
      ? process.env.PREVIEW_PROPOSAL_DATABASE_URL
      : process.env.PROPOSAL_DATABASE_URL
  )?.trim();
  if (!url) return null;
  return (connection ??= postgres(url, {
    max: 3,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 10,
  }));
}
export async function findPublishedProposal(
  slug: string,
): Promise<PublishedProposal | null> {
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return null;
  const db = publicationDb();
  if (!db) return null;
  const [row] = await db<
    PublishedProposal[]
  >`select id,slug,revision,content,password_hash,issued_at from mission_published_proposals where slug=${slug} limit 1`;
  return row ? { ...row, content: proposalSchema.parse(row.content) } : null;
}
export async function readPublishedPdf(
  p: PublishedProposal,
): Promise<string | null> {
  const db = publicationDb();
  if (!db) return null;
  const [row] = await db<
    { pdf: string }[]
  >`select pdf from mission_published_proposals where id=${p.id} and revision=${p.revision} and password_hash=${p.password_hash} limit 1`;
  return row?.pdf ?? null;
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
  const a = Buffer.from(offered),
    b = Buffer.from(proposalToken(p.slug, p.password_hash));
  return a.length === b.length && timingSafeEqual(a, b);
}

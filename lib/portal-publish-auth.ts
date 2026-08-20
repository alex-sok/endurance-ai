import { timingSafeEqual } from "crypto";

/**
 * Bearer gate for POST /api/internal/portals/sections.
 * Unset PORTAL_PUBLISH_SECRET denies every request.
 */
export function authorizePublish(request: Request): boolean {
  const secret = process.env.PORTAL_PUBLISH_SECRET;
  if (!secret) return false;

  const offered = request.headers.get("authorization");
  if (!offered) return false;

  const a = Buffer.from(offered);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

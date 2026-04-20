/**
 * Simple in-memory sliding-window rate limiter.
 * Works per serverless instance — good enough to block abuse without
 * requiring an external store like Redis.
 */

interface Record {
  count: number;
  resetAt: number;
}

const store = new Map<string, Record>();

// Periodically prune expired entries so memory doesn't grow unbounded
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key);
  }
}, 60_000);

/**
 * Returns true if the request is within the allowed rate, false if blocked.
 * @param key      Unique identifier (e.g. IP address)
 * @param limit    Max requests per window (default 20)
 * @param windowMs Window duration in ms (default 60s)
 */
export function rateLimit(key: string, limit = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;

  record.count++;
  return true;
}

/** Extract the real client IP from Vercel/Next.js request headers. */
export function getIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

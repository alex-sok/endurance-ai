import { createHmac } from "crypto";

// Include the password hash so changing the password invalidates all sessions.
export function computeAuthToken(slug: string, passwordHash: string): string {
  const secret = process.env.PORTAL_SESSION_SECRET ?? "dev-secret-change-in-prod";
  return createHmac("sha256", secret).update(`${slug}:${passwordHash}`).digest("hex");
}

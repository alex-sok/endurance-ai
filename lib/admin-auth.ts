import { createHmac } from "crypto";

export function computeAdminToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "";
  if (!secret) return "";
  return createHmac("sha256", secret).update("endurance-admin-v1").digest("hex");
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Password gate for /logistics.
 *
 * Runs on the Edge runtime. Reads LOGISTICS_PASSWORD from env, derives
 * a SHA-256 cookie value, and lets the request through if the request's
 * cookie matches. Otherwise redirects to /logistics/access.
 *
 * The password itself is NEVER sent to the client. The cookie carries
 * the derived hash, and is httpOnly + secure. If LOGISTICS_PASSWORD is
 * missing in the environment, the gate fails closed (redirects with
 * ?err=config) so a missing env var can't accidentally open the page.
 *
 * The matcher only runs on /logistics/* and explicitly excludes the
 * /logistics/access page so it's reachable.
 */

const COOKIE_NAME = "endurance-logistics-access";

async function deriveToken(password: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${password}:logistics-access-v1`),
  );
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The gate page itself must be reachable.
  if (pathname === "/logistics/access") {
    return NextResponse.next();
  }

  const password = process.env.LOGISTICS_PASSWORD;
  if (!password) {
    const url = req.nextUrl.clone();
    url.pathname = "/logistics/access";
    url.searchParams.set("err", "config");
    return NextResponse.redirect(url);
  }

  const expected = await deriveToken(password);
  const got = req.cookies.get(COOKIE_NAME)?.value;
  if (got === expected) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/logistics/access";
  if (pathname !== "/logistics") {
    url.searchParams.set("from", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/logistics", "/logistics/:path*"],
};

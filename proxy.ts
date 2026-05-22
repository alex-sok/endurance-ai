import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Password gates for /logistics and /investments.
 *
 * Each route has its own password env var, cookie name, and salt so a
 * leaked credential to one page never compromises the other.
 *
 * Edge runtime. The cookie carries the SHA-256-derived hash, never the
 * plaintext password. Missing env vars fail closed.
 */

interface GateConfig {
  cookieName: string;
  passwordEnv: string;
  salt: string;
  routePrefix: string;
  accessPath: string;
}

const GATES: GateConfig[] = [
  {
    cookieName: "endurance-logistics-access",
    passwordEnv: "LOGISTICS_PASSWORD",
    salt: "logistics-access-v1",
    routePrefix: "/logistics",
    accessPath: "/logistics/access",
  },
  {
    cookieName: "endurance-investments-access",
    passwordEnv: "INVESTMENTS_PASSWORD",
    salt: "investments-access-v1",
    routePrefix: "/investments",
    accessPath: "/investments/access",
  },
];

async function deriveToken(password: string, salt: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${password}:${salt}`),
  );
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const gate = GATES.find((g) => pathname.startsWith(g.routePrefix));
  if (!gate) return NextResponse.next();

  if (pathname === gate.accessPath) {
    return NextResponse.next();
  }

  const password = process.env[gate.passwordEnv];
  if (!password) {
    const url = req.nextUrl.clone();
    url.pathname = gate.accessPath;
    url.searchParams.set("err", "config");
    return NextResponse.redirect(url);
  }

  const expected = await deriveToken(password, gate.salt);
  const got = req.cookies.get(gate.cookieName)?.value;
  if (got === expected) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = gate.accessPath;
  if (pathname !== gate.routePrefix) {
    url.searchParams.set("from", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/logistics",
    "/logistics/:path*",
    "/investments",
    "/investments/:path*",
  ],
};

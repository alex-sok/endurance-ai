import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/investments/access
 *
 * Constant-time compares the submitted password against INVESTMENTS_PASSWORD.
 * On match, sets the httpOnly access cookie and returns 200.
 */

export const runtime = "edge";

const COOKIE_NAME = "endurance-investments-access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function deriveToken(password: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${password}:investments-access-v1`),
  );
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    diff |= ca ^ cb;
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const expected = process.env.INVESTMENTS_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "config" }, { status: 503 });
  }

  let submitted = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    submitted = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!constantTimeEqual(submitted, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await deriveToken(expected);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

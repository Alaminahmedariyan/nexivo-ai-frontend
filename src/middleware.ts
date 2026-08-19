import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_PATHS = [
  "/dashboard",
  "/leads",
  "/clients",
  "/projects",
  "/notifications",
  "/settings",
  "/users",
  "/ai",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isProtectedRoute = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const sessionCookie = getSessionCookie(request);

  const hasSession = !!sessionCookie;

  /**
   * Protected route + no session cookie
   * → login
   */
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "redirect",
      `${pathname}${request.nextUrl.search}`
    );

    return NextResponse.redirect(loginUrl);
  }

  /**
   * IMPORTANT:
   *
   * Do NOT redirect authenticated users from /login
   * to /dashboard here.
   *
   * Actual session validation happens server-side.
   */

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/clients/:path*",
    "/projects/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/ai/:path*",

    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
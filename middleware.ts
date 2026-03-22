import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require a logged-in user
const PROTECTED_ROUTES = [
  "/dashboard",
  "/saved",
  "/profile",
  "/billing",
  "/api/generate",
  "/api/ideas",
  "/api/stripe/checkout",
  "/api/user",
];

// Routes only for guests
// Logged-in users get redirected away from these
const GUEST_ONLY_ROUTES = [
  "/sign-in",
  "/sign-up",
];

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  // ── Check if route needs auth ─────────────
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected && !isLoggedIn) {
    // Remember where they were trying to go
    // After login they'll be sent back here
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // ── Redirect logged-in users away from auth pages ──
  const isGuestOnly = GUEST_ONLY_ROUTES.some(
    (route) => pathname === route
  );

  if (isGuestOnly && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// Tell Next.js which paths to run middleware on
// Skip static files, images, and Next.js internals
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
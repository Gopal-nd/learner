import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/verifyToken";

export async function middleware(request: NextRequest) {

  const sessionCookie: any = request.cookies.get("better-auth.session_token");

  // Redirect to /sign-in if no session cookie is found
  if (!sessionCookie && !request.nextUrl.pathname.startsWith('/sign-in')) {
    console.log("Redirecting to /sign-in because no session cookie found.");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is on /sign-in and has a session, redirect to /dashboard
  if (request.nextUrl.pathname.startsWith('/sign-in') && sessionCookie) {
    console.log("Redirecting to /dashboard because session exists.");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/server", 
    "/api/me", 
    "/admin/:path*", 
    "/sign-in"
  ], 
};

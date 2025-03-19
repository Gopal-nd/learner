import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/verifyToken";

export async function middleware(request: NextRequest) {

    const sessionCookie:any = request.cookies.get("better-auth.session_token");

    
    if (!sessionCookie) {
        console.log("Redirecting to /sign-in because no session cookie found.");
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/server", "/api/me", "/admin/:path*"], 
};

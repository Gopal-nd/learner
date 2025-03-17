import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/verifyToken";

export async function middleware(request: NextRequest) {

    const sessionCookie:any = request.cookies.get("better-auth.session_token");
    console.log("Session Cookie:", sessionCookie);

    // const session = await verifySession(sessionCookie.value);
    //     console.log("Decoded Session:", session);
    if (!sessionCookie) {
        console.log("Redirecting to /sign-in because no session cookie found.");
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*","/", "/server", "/api/me", "/admin/:path*"], 
};

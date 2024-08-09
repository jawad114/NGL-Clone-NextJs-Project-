import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware"; // Corrected import
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) { // Changed to async function
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname === '/' // Fixed the extra `||`
    )) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next(); // Added to pass through if no conditions are met
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}

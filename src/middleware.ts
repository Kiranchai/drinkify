import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/cards"];
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || // exclude all API routes
    pathname.startsWith("/static")
  )
    return NextResponse.next();
}

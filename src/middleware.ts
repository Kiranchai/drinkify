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

  const response: NextResponse = new NextResponse();
  response.headers.set("Cache-Control", "public");
  return response;
}

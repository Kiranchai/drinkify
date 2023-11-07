import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // if (path === "/verification/email") {
  //   const token = request.nextUrl.searchParams.get("token");
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   console.log(tokenFound);
  // }
  console.log(request.ip);
  console.log(request.geo.country);
  console.log(request.geo.city);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

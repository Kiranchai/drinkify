import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getLimiterHeaders from "@/app/utils/getLimiterHeaders";

export async function POST(request: NextRequest) {
  try {
    const { limiter, headers } = await getLimiterHeaders({
      request: request,
      limitPerSecond: 10,
      duration: 60,
      endpoint: "verificationEmail",
    });

    if (!limiter.success) {
      return new NextResponse(
        JSON.stringify({
          message: "Zbyt wiele prób. Spróbuj ponownie za chwilę",
          type: "error",
        }),
        { status: 429, headers: headers }
      );
    }

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { type: "error", message: "an_error_occured" },
        { status: 404, headers: headers }
      );
    }

    const tokenFound = await prisma.emailVerificationToken.findFirst({
      where: { hash: token },
      select: {
        expireAt: true,
        user: true,
      },
    });

    if (!tokenFound) {
      return NextResponse.json(
        { type: "error", message: "link_expired_or_not_exists" },
        { status: 404, headers: headers }
      );
    }

    if (tokenFound.user.emailVerified) {
      return NextResponse.json(
        {
          type: "error",
          message: "user_already_verified",
        },
        { status: 400, headers: headers }
      );
    }

    const date = new Date();
    if (date > tokenFound.expireAt) {
      return NextResponse.json(
        { type: "error", message: "link_expired_or_not_exists" },
        { status: 400, headers: headers }
      );
    }

    const updatedUser = await prisma.user.update({
      data: { emailVerified: true },
      where: { id: tokenFound.user.id },
    });

    console.log(`Successfuly verified email: ${updatedUser.email}`);
    return NextResponse.json(
      { type: "success", message: "user_verified_successfuly" },
      { status: 200, headers: headers }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        type: "error",
        message: "Wystąpił błąd",
      },
      { status: 404 }
    );
  }
}

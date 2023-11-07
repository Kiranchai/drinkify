import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { type: "error", message: "an_error_occured" },
        { status: 404 }
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
        { status: 404 }
      );
    }

    if (tokenFound.user.emailVerified) {
      return NextResponse.json(
        {
          type: "error",
          message: "user_already_verified",
        },
        { status: 400 }
      );
    }

    const date = new Date();
    if (date > tokenFound.expireAt) {
      return NextResponse.json(
        { type: "error", message: "link_expired_or_not_exists" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      data: { emailVerified: true },
      where: { id: tokenFound.user.id },
    });

    console.log(`Successfuly verified email: ${updatedUser.email}`);
    return NextResponse.json(
      { type: "success", message: "user_verified_successfuly" },
      { status: 200 }
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

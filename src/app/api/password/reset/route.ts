import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { newPassword, hash } = await request.json();

    if (!newPassword || !hash) {
      return NextResponse.json(
        { type: "error", message: "Nie podano hasła" },
        { status: 400 }
      );
    }

    if (
      !newPassword.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      return NextResponse.json(
        {
          type: "error",
          message: "Podane hasło nie spełnia naszych wymagań",
        },
        { status: 400 }
      );
    }

    console.log(`Password reset attempt occured`);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { hash: hash },
      select: {
        expireAt: true,
        userId: true,
      },
    });

    const date = new Date();
    if (!passwordResetToken || passwordResetToken.expireAt < date) {
      return NextResponse.json(
        {
          type: "error",
          message: "Link wygasł lub nie istnieje",
        },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const user = await prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
      select: {
        email: true,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        hash: hash,
      },
    });

    console.log(`Password changed successfully for ${user.email}`);

    return NextResponse.json({
      message: "password_changed_successfuly",
      type: "success",
    });
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

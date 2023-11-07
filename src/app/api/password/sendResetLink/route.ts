import { sendPasswordResetLink } from "@/app/utils/emailSender";
import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          type: "error",
          message: "Nie podano adresu email",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        message:
          "Jeśli konto istnieje, wysłaliśmy link do zmiany hasła na podany email",
        type: "success",
      });
    }

    await prisma.passwordResetToken
      .delete({
        where: {
          userId: user.id,
        },
      })
      .catch((err) => {
        console.error(err);
      });

    const generatedToken = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        hash: cryptoRandomString({ length: 128, type: "alphanumeric" }),
      },
    });

    await sendPasswordResetLink(email, generatedToken.hash);

    return NextResponse.json({
      message:
        "Jeśli konto istnieje, wysłaliśmy link do zmiany hasła na podany email",
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

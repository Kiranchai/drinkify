import { sendVerificationLink } from "@/app/utils/emailSender";
import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      {
        type: "error",
        message: "Podaj adres email, na który ma być wysłany link",
      },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        emailVerified: true,
        emailVerificationToken: true,
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        message:
          "Jeśli konto istnieje, wysłaliśmy link aktywacyjny na podany email",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          type: "error",
          message: "Konto jest już zweryfikowane",
        },
        { status: 404 }
      );
    }

    await prisma.emailVerificationToken
      .delete({
        where: {
          userId: user.id,
        },
      })
      .catch((err) => {
        console.error(err);
      });

    const token = await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        hash: cryptoRandomString({ length: 128, type: "alphanumeric" }),
      },
    });

    await sendVerificationLink(email, token.hash);

    return NextResponse.json({
      message:
        "Jeśli konto istnieje, wysłaliśmy link aktywacyjny na podany email",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        type: "error",
        message: "Wystąpił błąd",
      },
      { status: 404 }
    );
  }
}

import { sendVerificationLink } from "@/app/utils/emailSender";
import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getLimiterHeaders from "@/app/utils/getLimiterHeaders";

export async function POST(request: NextRequest) {
  const { limiter, headers } = await getLimiterHeaders({
    request: request,
    limitPerSecond: 3,
    duration: 60,
    endpoint: "verificationResendLink",
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

  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      {
        type: "error",
        message: "Podaj adres email, na który ma być wysłany link",
      },
      { status: 400, headers: headers }
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
      return NextResponse.json(
        {
          message:
            "Jeśli konto istnieje, wysłaliśmy link aktywacyjny na podany email",
        },
        { status: 200, headers: headers }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          type: "error",
          message: "Konto jest już zweryfikowane",
        },
        { status: 404, headers: headers }
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

    return NextResponse.json(
      {
        message:
          "Jeśli konto istnieje, wysłaliśmy link aktywacyjny na podany email",
      },
      { status: 200, headers: headers }
    );
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

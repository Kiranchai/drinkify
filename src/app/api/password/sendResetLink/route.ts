import { sendPasswordResetLink } from "@/app/utils/emailSender";
import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getLimiterHeaders from "@/app/utils/getLimiterHeaders";

export async function POST(request: NextRequest) {
  try {
    const { limiter, headers } = await getLimiterHeaders({
      request: request,
      limitPerSecond: 5,
      duration: 60,
      endpoint: "sendPasswordResetLink",
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
          message: "Nie podano adresu email",
        },
        { status: 400, headers: headers }
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
      return NextResponse.json(
        {
          message:
            "Jeśli konto istnieje, wysłaliśmy link do zmiany hasła na podany email",
          type: "success",
        },
        { status: 200, headers: headers }
      );
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

    return NextResponse.json(
      {
        message:
          "Jeśli konto istnieje, wysłaliśmy link do zmiany hasła na podany email",
        type: "success",
      },
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

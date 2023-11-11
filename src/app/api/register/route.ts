import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import cryptoRandomString from "crypto-random-string";
import { sendVerificationLink } from "@/app/utils/emailSender";
import prisma from "@/app/utils/db";
import getLimiterHeaders from "@/app/utils/getLimiterHeaders";

export async function POST(request: NextRequest) {
  const { limiter, headers } = await getLimiterHeaders({
    request: request,
    limitPerSecond: 5,
    duration: 60,
    endpoint: "register",
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

  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({
          message: "Nie podano danych do rejestracji",
          type: "error",
        }),
        { status: 400, headers: headers }
      );
    }

    if (
      !email.match(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
      )
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Niepoprawny email", type: "error" }),
        { status: 400, headers: headers }
      );
    }

    if (
      !password.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      return new NextResponse(
        JSON.stringify({
          type: "error",
          message: "Podane hasło nie spełnia naszych wymagań",
        }),
        { status: 400, headers: headers }
      );
    }

    console.log(`Registration attempt occured: ${email}`);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExists) {
      return new NextResponse(
        JSON.stringify({
          message: "Podany email jest już zajęty",
          type: "error",
        }),
        { status: 400, headers: headers }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const emailVerificationToken = await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        hash: cryptoRandomString({ length: 128, type: "alphanumeric" }),
      },
    });

    await sendVerificationLink(user.email, emailVerificationToken.hash);

    return new NextResponse(
      JSON.stringify({
        message: "Utworzono konto. Wysłaliśmy link aktywacyjny na podany email",
        type: "success",
      }),
      { status: 201, headers: headers }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({
        message: "Niepoprawne żądanie",
        type: "error",
      }),
      { status: 400, headers: headers }
    );
  }
}

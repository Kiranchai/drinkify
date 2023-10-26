import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import cryptoRandomString from "crypto-random-string";
import { sendVerificationLink } from "@/app/utils/emailSender";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Nie podano danych do rejestracji",
          type: "error",
        },
        { status: 400 }
      );
    }

    if (
      !email.match(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
      )
    ) {
      return NextResponse.json(
        { message: "Niepoprawny email", type: "error" },
        { status: 400 }
      );
    }

    if (
      !password.match(
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

    console.log(`Registration attempt occured: ${email}`);

    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          message: "Podany email jest już zajęty",
          type: "error",
        },
        { status: 400 }
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

    //SEND AN EMAIL
    await sendVerificationLink(user.email, emailVerificationToken.hash);

    return NextResponse.json(
      {
        message: "Utworzono konto. Wysłaliśmy link aktywacyjny na podany email",
        email: email,
        type: "success",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Niepoprawne żądanie",
      },
      { status: 400 }
    );
  }
}

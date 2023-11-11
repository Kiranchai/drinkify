import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (secret !== "123") {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const giftcode = await prisma.giftCode.create({
      data: {
        code: cryptoRandomString({ length: 12 }).toUpperCase(),
        productId: "clo0jcgpc0000ka6smvwm05nu",
      },
    });

    return NextResponse.json({ giftcode }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

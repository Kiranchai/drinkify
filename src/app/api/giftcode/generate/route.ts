import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function POST(req: NextRequest) {
  const { secret, productId } = await req.json();

  if (secret !== process.env.GIFTCODE_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const giftcode = await prisma.giftCode.create({
      data: {
        code: cryptoRandomString({ length: 12 }).toUpperCase(),
        productId: productId,
      },
    });

    return NextResponse.json({ giftcode }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

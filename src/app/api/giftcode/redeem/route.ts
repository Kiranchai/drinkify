import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getLimiterHeaders from "@/app/utils/getLimiterHeaders";

export async function POST(req: NextRequest) {
  try {
    const { limiter, headers } = await getLimiterHeaders({
      request: req,
      limitPerSecond: 10,
      duration: 60,
      endpoint: "redeem",
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Musisz być zalogowany", type: "error" },
        { status: 401, headers: headers }
      );
    }

    const { giftcode } = await req.json();

    if (!giftcode) {
      return NextResponse.json(
        { message: "Nie podano kodu", type: "error" },
        { status: 400, headers: headers }
      );
    }

    const foundGiftCode = await prisma.giftCode.findUnique({
      where: {
        code: giftcode,
      },
    });

    if (!foundGiftCode) {
      return NextResponse.json(
        { message: "Podany kod jest niepoprawny", type: "error" },
        { status: 400, headers: headers }
      );
    }

    if (foundGiftCode.redeemed) {
      return NextResponse.json(
        { message: "Podany kod został już wykorzystany", type: "error" },
        { status: 400, headers: headers }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        ownedProducts: true,
      },
    });

    const ownedProducts = user.ownedProducts.map((product) => {
      return product.id;
    });

    if (ownedProducts.includes(foundGiftCode.productId)) {
      return NextResponse.json(
        {
          message: "Już posiadasz produkt przypisany do tego kodu",
          type: "error",
        },
        { status: 400, headers: headers }
      );
    }

    await prisma.product.update({
      where: {
        id: foundGiftCode.productId,
      },
      data: {
        owners: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await prisma.giftCode.update({
      where: {
        id: foundGiftCode.id,
      },
      data: {
        userId: user.id,
        redeemed: true,
      },
    });

    console.log(
      `Redeemed Gift Code: ${giftcode} | Email: ${session.user.email}`
    );

    return NextResponse.json(
      {
        message: "Pomyślnie wykorzystano kod podarunkowy",
        type: "success",
      },
      { status: 200, headers: headers }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Wystąpił błąd", type: "error" },
      { status: 404 }
    );
  }
}

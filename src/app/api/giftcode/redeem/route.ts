import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Musisz być zalogowany", type: "error" },
        { status: 401 }
      );
    }

    const { giftcode } = await req.json();

    if (!giftcode) {
      return NextResponse.json(
        { message: "Nie podano kodu", type: "error" },
        { status: 400 }
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
        { status: 400 }
      );
    }

    if (foundGiftCode.redeemed) {
      return NextResponse.json(
        { message: "Podany kod został już wykorzystany", type: "error" },
        { status: 400 }
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
        { status: 400 }
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
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Wystąpił błąd", type: "error" },
      { status: 404 }
    );
  }
}

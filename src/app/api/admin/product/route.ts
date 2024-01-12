import adminStatusVerification from "@/app/utils/adminStatusVerification";
import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const adminStatus = await adminStatusVerification();
  if (!adminStatus) {
    return NextResponse.json({ message: "Brak dostępu" }, { status: 403 });
  }

  const { product } = await req.json();

  try {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });

    return NextResponse.json({ createdProduct }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest) {
  const adminStatus = await adminStatusVerification();
  if (!adminStatus) {
    return NextResponse.json({ message: "Brak dostępu" }, { status: 403 });
  }

  const { product } = await req.json();

  try {
    const productInDb = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        ...product,
      },
    });

    return NextResponse.json({ productInDb }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

import adminStatusVerification from "@/app/utils/adminStatusVerification";
import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const adminStatus = await adminStatusVerification();
  if (!adminStatus) {
    return NextResponse.json({ message: "Brak dostępu" }, { status: 403 });
  }

  const { card } = await req.json();

  try {
    if (typeof card.forbiddenWords === "string") {
      card.forbiddenWords = card.forbiddenWords?.split(",");
    }

    const cardInDb = await prisma.card.create({
      data: {
        ...card,
      },
    });

    return NextResponse.json({ cardInDb }, { status: 200 });
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

  const { card } = await req.json();

  try {
    if (typeof card.forbiddenWords === "string") {
      card.forbiddenWords = card.forbiddenWords?.split(",");
    }

    const cardInDb = await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        ...card,
      },
    });

    return NextResponse.json({ cardInDb }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

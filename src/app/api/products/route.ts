import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      pubName: true,
      thumbnail: true,
      name: true,
      price: true,
    },
  });

  return NextResponse.json({ products });
}

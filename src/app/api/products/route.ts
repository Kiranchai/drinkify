import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    orderBy: { priority: "desc" },
    select: {
      pubName: true,
      thumbnail: true,
      name: true,
      price: true,
      isBestseller: true,
      isNew: true,
    },
    where: {
      isPublished: true,
    },
  });

  return NextResponse.json({ products });
}

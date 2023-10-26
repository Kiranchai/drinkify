import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

export async function GET() {
  //   const obj = [
  //     {
  //       title: "Kryptowaluty",
  //       forbiddenWords: [
  //         "bitcoin",
  //         "inwestycja",
  //         "kopalnia",
  //         "cyfrowy",
  //         "waluta",
  //       ],
  //     },
  //     {
  //       title: "TikTok",
  //       forbiddenWords: ["aplikacja", "taniec", "krótkie", "influencer", "trend"],
  //     },
  //     {
  //       title: "Kac",
  //       forbiddenWords: [
  //         "alkohol",
  //         "ból głowy",
  //         "wymioty",
  //         "samopoczucie",
  //         "odwodnienie",
  //       ],
  //     },
  //   ];

  //   await obj.forEach(async (obj) => {
  //     await prisma.demoCard.create({
  //       data: {
  //         title: obj.title,
  //         productId: "clo0jegn50001ka6sejd7uroy",
  //         description: "",
  //         forbiddenWords: obj.forbiddenWords,
  //       },
  //     });
  //   });

  return NextResponse.json({ m: "ok" });
}

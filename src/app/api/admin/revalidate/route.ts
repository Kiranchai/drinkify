import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { secret, tag } = await req.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    revalidateTag(tag);

    return NextResponse.json({ tag }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Wystąpił błąd" }, { status: 404 });
  }
}

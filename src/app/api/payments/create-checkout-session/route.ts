import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/app/utils/db";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json(
      {
        message: "Musisz być zalogowany",
        type: "error",
      },
      { status: 401 }
    );
  }
  try {
    const { cartItems } = await req.json();

    if (!cartItems) {
      return NextResponse.json(
        {
          message: "Nie wybrano produktu",
          type: "error",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
      include: {
        ownedProducts: {
          select: {
            stripeId: true,
          },
        },
      },
    });
    const ownedProducts = user.ownedProducts.map((product) => {
      return product.stripeId;
    });

    if (
      cartItems.filter((item) => !ownedProducts.includes(item.id)).length !==
      cartItems.length
    ) {
      return NextResponse.json(
        { message: "Już posiadasz ten produkt", type: "error" },
        { status: 400 }
      );
    }

    let customer;
    customer = await stripe.customers.search({
      query: `metadata['userId']:'${session.user.id}'`,
    });

    if (customer.data.length !== 0) {
      customer = customer.data[0];
    } else {
      customer = await stripe.customers.create({
        name: user.email,
        metadata: {
          userId: session?.user?.id,
        },
      });
    }

    let prices = [];
    await Promise.all(
      cartItems.map(async (item) => {
        let retrievedProd = await stripe.products.retrieve(item.id);
        let retrievedPrice = await retrievedProd.default_price;
        prices.push({ price: retrievedPrice, quantity: 1 });
      })
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: prices,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/canceled`,
    });
    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Wystąpił błąd",
        type: "error",
      },
      { status: 400 }
    );
  }
}

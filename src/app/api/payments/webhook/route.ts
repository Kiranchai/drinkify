import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
});
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let event = await req.json();
  let data = event?.data?.object;

  switch (event.type) {
    case "checkout.session.completed":
      let checkoutSession;

      try {
        checkoutSession = await stripe.checkout.sessions.retrieve(data.id);
        let checkoutLineItems = await stripe.checkout.sessions.listLineItems(
          data.id,
          {}
        );

        let products = [];
        checkoutLineItems.data.forEach((item) => {
          products.push(item.price.product);
        });

        let checkoutCustomer = await stripe.customers.retrieve(data.customer);

        if (checkoutCustomer.deleted !== true) {
          let databaseUser = await prisma.user.findUnique({
            where: {
              id: checkoutCustomer.metadata.userId,
            },
            select: {
              id: true,
              email: true,
            },
          });

          await Promise.all(
            products.map(async (product) => {
              const updatedProduct = await prisma.product.update({
                where: { stripeId: product },
                data: {
                  owners: {
                    connect: { id: databaseUser.id },
                  },
                },
              });
            })
          );

          console.log(`Checkout completed for ${databaseUser.email}`);

          //   sendPurchaseConfirmation(
          //     checkoutSession.customer_details.email,
          //     checkoutSession.payment_intent,
          //     checkoutSession.amount_total,
          //     checkoutSession.currency,
          //     checkoutSession.created
          //   );
        }
      } catch (err) {
        console.log(err);
      }
  }

  return new NextResponse();
}

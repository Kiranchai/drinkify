import ProductForm from "@/app/components/ProductForm";
import prisma from "@/app/utils/db";
import React from "react";

export default async function page({ params }) {
  const { id } = params;

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      cards: {
        orderBy: {
          createdAt: "desc",
        },
      },
      DemoCard: {},
    },
  });

  return (
    <main className="w-full bg-slate-200 p-8 min-h-screen">
      <h1 className="text-[#602c5d] text-2xl font-bold mb-8">
        {product?.name}
      </h1>
      <ProductForm
        initialValues={product}
        cards={product.cards}
        demoCards={product.DemoCard}
      />
    </main>
  );
}

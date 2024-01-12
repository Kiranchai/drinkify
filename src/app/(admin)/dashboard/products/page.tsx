import DataTable from "@/app/components/DataTable";
import prisma from "@/app/utils/db";
import React from "react";

export default async function page() {
  const products = await prisma.product.findMany({
    select: {
      pubName: true,
      name: true,
      price: true,
      priority: true,
      id: true,
    },
    orderBy: {
      priority: "desc",
    },
  });

  const filteredProducts = products.map((prod) => {
    return {
      name: prod.name,
      price: `${prod.price} zł`,
      priority: prod.priority,
      _id: prod.id,
    };
  });

  return (
    <main className="w-full bg-slate-200 p-8 min-h-screen">
      <h1 className="text-[#602c5d] text-2xl font-bold mb-8">Produkty</h1>
      <DataTable
        columns={["Nazwa", "Cena", "Priorytet"]}
        data={filteredProducts}
        clickable
      />
    </main>
  );
}

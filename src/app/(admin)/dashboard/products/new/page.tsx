import ProductForm from "@/app/components/ProductForm";
import React from "react";

export default function page() {
  return (
    <main className="w-full bg-slate-200 p-8 min-h-screen">
      <h1 className="text-[#602c5d] text-2xl font-bold mb-8">Nowy produkt</h1>
      <ProductForm create />
    </main>
  );
}

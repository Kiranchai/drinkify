import { FaPersonCirclePlus } from "react-icons/fa6";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdAttachMoney } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import React from "react";
import TestChart from "@/app/components/Chart";
import ProgressBar from "@/app/components/ProgressBar";
import DataTable from "@/app/components/DataTable";
import prisma from "@/app/utils/db";

export default async function page() {
  type KEYS = "Ilość kont" | "Transakcje" | "Przychód" | "Coś";

  const accountsCount = await prisma.user.count();
  const allInvoices = await prisma.invoice.findMany({
    select: {
      amount: true,
      user: true,
      createdAt: true,
      products: true,
    },
    where: {
      wasAGiftCode: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalAmount = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.amount),
    0
  );
  const stats: { key: KEYS; value: string | number }[] = [
    {
      key: "Ilość kont",
      value: accountsCount,
    },
    {
      key: "Transakcje",
      value: allInvoices.length,
    },
    {
      key: "Przychód",
      value: `${totalAmount / 100} zł`,
    },
    {
      key: "Coś",
      value: "1,234",
    },
  ];

  const recentInvoices = allInvoices.slice(0, 5).map((invoice) => {
    return {
      email: invoice.user.email,
      purchaseDate: invoice.createdAt,
      price: invoice.amount,
    };
  });

  const productCounts = {};

  allInvoices.forEach((invoice) => {
    invoice.products.forEach((product) => {
      const productName = product.name;
      productCounts[productName] = (productCounts[productName] || 0) + 1;
    });
  });

  return (
    <>
      <main className="w-full bg-slate-200 p-8 min-h-screen">
        <h1 className="text-[#602c5d] text-2xl font-bold mb-8">Panel główny</h1>
        <div className="grid grid-cols-4 gap-4 800:gap-8">
          {stats.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-md col-span-4 xs:col-span-2 h-24 shadow-md flex items-center justify-center gap-3 text-[#602c5d] w-full 800:col-span-1"
              >
                <div className="flex justify-center items-center text-3xl p-3 rounded-full bg-[#ffd3fc] ">
                  {item.key === "Ilość kont" && (
                    <FaPersonCirclePlus style={{ fill: "#009bff" }} />
                  )}
                  {item.key === "Transakcje" && (
                    <LiaExchangeAltSolid style={{ fill: "#ff2424" }} />
                  )}
                  {item.key === "Przychód" && (
                    <MdAttachMoney style={{ fill: "#01e000" }} />
                  )}
                  {item.key === "Coś" && (
                    <FaQuestion style={{ fill: "#4c4ceb" }} />
                  )}
                </div>
                <div className="flex flex-col justify-center text-primary">
                  <span className="text-primary font-bold">{item.value}</span>
                  <span className="text-primary opacity-70 text-sm">
                    {item.key}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="w-full bg-slate-50 rounded-md shadow-md col-span-4 p-4 h-[25rem] divide-y flex flex-col gap-2 sm:col-span-3">
            <span className="text-primary font-bold text-xl">
              Sprzedaż produktów
            </span>
            <TestChart data={productCounts} />
          </div>
          <div className="w-full bg-slate-50 rounded-md shadow-md p-4 divide-y row-span-3 h-[25rem] flex flex-col gap-2 col-span-4 sm:col-span-1">
            <span className="text-primary font-bold text-xl">Cel</span>
            <div className="h-full w-full flex items-center justify-center">
              <ProgressBar transactionCount={allInvoices.length} goal={1000} />
            </div>
          </div>
          <div className="grid col-span-4 bg-slate-50 rounded-md shadow-md p-4 ">
            <h2 className="font-bold text-xl text-primary mb-3 ">
              Ostatnie transakcje
            </h2>
            <DataTable data={recentInvoices} />
          </div>
        </div>
      </main>
    </>
  );
}

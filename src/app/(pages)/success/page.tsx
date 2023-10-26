"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    router.replace("/cards");
  }, []);

  return;
}

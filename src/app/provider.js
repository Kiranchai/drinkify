"use client";

import { CartProvider } from "@/app/contexts/CartContext";
import { SessionProvider } from "next-auth/react";

export function Provider({ children, session }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}

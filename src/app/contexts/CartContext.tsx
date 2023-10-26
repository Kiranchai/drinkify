"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface ICartItem {
  id: String;
  name: String;
  price: String;
  thumbnail: string;
}

interface CartContextProps {
  cartItems: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: String) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

const getLocalCart = () => {
  if (typeof window !== "undefined") {
    let newCartData = localStorage.getItem("cart");
    if (newCartData === null) {
      return [];
    } else {
      return JSON.parse(newCartData);
    }
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, status } = useSession();
  const [cartItems, setCartItems] = useState(getLocalCart());
  const ownedCards = user?.user.ownedProducts?.map((product) => {
    return product.stripeId;
  });

  const addToCart = (item: ICartItem) => {
    if (!(cartItems.filter((e) => e.name === item.name).length > 0)) {
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromCart = (id: String) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    if (ownedCards !== undefined) {
      setCartItems(cartItems.filter((item) => !ownedCards?.includes(item.id)));
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

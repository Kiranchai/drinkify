"use client";
import { useState } from "react";
import { useCart } from "@/app/contexts/CartContext";
import styles from "@/app/(pages)/offer/[pubName]/page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// type componentParams = {
//   product
// };

export default function BuyNowButton({ product }) {
  const router = useRouter();
  const [error, setError] = useState<string>(null);
  const [buttonText, setButtonText] = useState("Dodaj do koszyka");
  const { addToCart } = useCart();
  const { data: user, status } = useSession();
  const owners = product.owners.map((obj) => {
    return obj.email;
  });
  const userOwnsProduct: boolean = owners.includes(user?.user.email);

  return (
    <>
      {status === "authenticated" ? (
        <button
          className={styles.product_buy_btn}
          disabled={userOwnsProduct}
          onClick={() => {
            addToCart({
              id: product.stripeId,
              price: product.price,
              thumbnail: product.thumbnail,
              name: product.name,
            });

            setButtonText("Dodano");
            router.push("/cart");
          }}
        >
          {userOwnsProduct ? "Już to posiadasz" : buttonText}
        </button>
      ) : (
        <button
          className={styles.product_buy_btn}
          onClick={() => {
            addToCart({
              id: product.stripeId,
              price: product.price,
              thumbnail: product.thumbnail,
              name: product.name,
            });
            setButtonText("Dodano");
            router.push("/cart");
          }}
        >
          {buttonText}
        </button>
      )}

      {error && (
        <div
          style={{
            color: "red",
            textShadow: "none",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}

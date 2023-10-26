"use client";

import { useCart } from "@/app/contexts/CartContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import styles from "@/app/(pages)/cart/page.module.css";
import cardsStyles from "@/app/(pages)/cards/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartComponent() {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += Number(item.price);
    });
    setTotal(sum);
  }, [cartItems]);

  if (cartItems?.length === 0) {
    return (
      <div className={cardsStyles.mycards_empty_container}>
        <header className={cardsStyles.mycards_empty_header}>
          Aktualnie twój koszyk jest pusty
        </header>
        <span className={cardsStyles.mycards_empty_span}>
          Znajdź coś dla siebie
        </span>
        <Link href={"/offer"} className={cardsStyles.mycards_empty_button}>
          Nasza oferta
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.continue_shopping_container}>
        <Link className={styles.continue_shopping_btn} href={"/offer"}>
          Kontynuuj zakupy
        </Link>
      </div>
      <div className={styles.cart_details_container}>
        <ul className={styles.cart_list}>
          {cartItems?.map((item, idx) => {
            return (
              <li className={styles.cart_list_item} key={idx}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: ".5rem",
                  }}
                >
                  <div className={styles.cart_item_img_wrapper}>
                    <Image
                      className={styles.cart_item_img}
                      src={item.thumbnail}
                      alt="product thumbnail"
                      width={60}
                      height={60}
                    />
                  </div>
                  <span className={styles.cart_item_name}>{item.name}</span>
                </div>
                <div className={styles.cart_item_details_container}>
                  <span style={{ width: "100%" }}>{`${item.price} zł`}</span>
                  <ImCross
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                    style={{ fontSize: "1.25rem", cursor: "pointer" }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.total_container}>
        <span>Suma: {`${total} zł`}</span>
        <button
          className={styles.buy_btn}
          onClick={async () => {
            setButtonDisabled(true);
            setError(null);
            const res = await fetch("/api/payments/create-checkout-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cartItems,
              }),
            });
            if (res.status === 401) {
              return router.push("/login");
            }

            const data = await res.json();

            if (data.url) {
              router.replace(data.url);
            }
            if (data.type === "error") {
              setError(data.message);
            }
            setButtonDisabled(false);
          }}
        >
          {buttonDisabled ? <CircularProgress /> : "Zapłać"}
        </button>
        {error && <>{error}</>}
      </div>
    </>
  );
}

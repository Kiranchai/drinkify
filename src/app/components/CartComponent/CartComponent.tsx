"use client";

import { useCart } from "@/app/contexts/CartContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import styles from "@/app/(pages)/cart/page.module.css";
import cardsStyles from "@/app/(pages)/cards/page.module.css";
import Image from "next/image";

export default function CartComponent() {
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
          onClick={() => {
            // setButtonDisabled(true);
            // setError(null);
            // axios
            //   .post(
            //     `${SERVER_DOMAIN}/api/payments/create-checkout-session`,
            //     {
            //       item: cartItems,
            //     },
            //     {
            //       headers: {
            //         "x-access-token": sessionStorage.getItem("token") as string,
            //       },
            //     }
            //   )
            //   .then((res) => {
            //     if (res.data.url) {
            //       window.location.href = res.data.url;
            //     } else if (res.data.type === "auth-fail") {
            //       navigate("/login");
            //     } else if (res.data.type === "error") {
            //       setError(res.data.message);
            //     } else {
            //       console.log(res.data);
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   })
            //   .finally(() => {
            //     setButtonDisabled(false);
            //   });
          }}
        >
          {buttonDisabled ? <CircularProgress /> : "Zapłać"}
        </button>
        {error && <>{error}</>}
      </div>
    </>
  );
}

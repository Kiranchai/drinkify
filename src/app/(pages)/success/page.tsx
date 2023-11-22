"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useEffect } from "react";
import styles from "./page.module.css";
import { BsCheck2Circle } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import logo from "public/logo-no-background.png";

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <section className={`mh ${styles.success_page}`}>
      <BsCheck2Circle />
      <h1 className={styles.success_header}>
        Dziękujemy za zakupy w{" "}
        <strong
          style={{
            color: "#de1aff",
          }}
        >
          Drinkify
        </strong>
        !
      </h1>
      <span className={styles.subheader}>
        Zakupione karty powinny znajdować się już na twoim koncie!
      </span>
      <div className={styles.buttonsWrapper}>
        <Link className={`${styles.continueButton}`} href={"/offer"}>
          Kontynuuj zakupy
        </Link>
        <Link
          className={`${styles.continueButton} ${styles.buttonGhost}`}
          href={"/cards"}
        >
          Moje karty
        </Link>
      </div>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="drinkify logo" />
      </div>
    </section>
  );
}

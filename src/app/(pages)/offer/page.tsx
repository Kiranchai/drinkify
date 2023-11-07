import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import styles from "./page.module.css";
import Image from "next/image";

export default async function Offer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/api/products`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const { products } = data;

  return (
    <div className={styles.offer}>
      <section className={`mh ${styles.offer_section}`}>
        <h1 className={styles.offer_header}>Oferta</h1>
        <div className={styles.offer_products}>
          {products.map((product, idx) => {
            return (
              <div
                className={styles.offer_single_product}
                key={product.pubName as React.Key}
              >
                <Link
                  className={styles.offer_inner_wrapper}
                  href={`/offer/${product.pubName}`}
                  key={product.pubName as React.Key}
                >
                  {product.pubName === "alkokarty" && (
                    <span className={styles.offer_bestseller_flag}>
                      BESTSELLER
                    </span>
                  )}

                  <div className={styles.offer_image_wrapper}>
                    <Image
                      src={product.thumbnail}
                      alt="drink"
                      width={300}
                      height={220}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className={styles.offer_description_container}>
                    {" "}
                    {product.name}
                    <span>{product.price} zł</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

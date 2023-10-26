import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import styles from "./page.module.css";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function Offer() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className={styles.offer}>
      <section className={`mh ${styles.offer_section}`}>
        <h1 className={styles.offer_header}>Oferta</h1>
        <div className={styles.offer_products}>
          {products.map((product) => {
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

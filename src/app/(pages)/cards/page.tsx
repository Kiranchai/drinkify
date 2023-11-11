import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./page.module.css";
import prisma from "@/app/utils/db";

export default async function MyCards() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const userProducts = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      ownedProducts: {
        select: {
          pubName: true,
          thumbnail: true,
          name: true,
        },
      },
    },
  });
  const cards = userProducts.ownedProducts;

  return (
    <div style={{ background: "var(--bg-color)" }}>
      <section className={`mh ${styles.mycards_section}`}>
        <h1 className={styles.mycards_header}>Moje karty</h1>

        {cards?.length === 0 ? (
          <div className={styles.mycards_empty_container}>
            <header className={styles.mycards_empty_header}>
              Aktualnie nie posiadasz żadnych kart
            </header>
            <span className={styles.mycards_empty_span}>
              Znajdź coś dla siebie
            </span>
            <Link href={"/offer"} className={styles.mycards_empty_button}>
              Nasza oferta
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.mycards_container}>
              {cards &&
                cards.map((card, idx) => {
                  return (
                    <Link
                      href={`/cards/${card.pubName}`}
                      className={styles.mycards_card}
                      key={card.pubName as React.Key}
                    >
                      <div className={styles.mycards_img_wrapper}>
                        <Image
                          src={card.thumbnail}
                          alt="drink"
                          width={300}
                          height={300}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>

                      <span className={styles.mycards_card_span}>
                        {card.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

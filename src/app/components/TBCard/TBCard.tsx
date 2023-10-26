"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "@/app/(pages)/cards/[pubName]/page.module.css";

const TBCard = ({
  title,
  forbiddenWords,
  image,
}: {
  title: string;
  forbiddenWords: Array<string>;
  image: string;
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {revealed ? null : (
        <>
          <div
            style={{
              top: "50%",
              left: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              transform: "translate(-50%,-50%)",
              zIndex: "20",
            }}
          >
            <button
              className={styles.reveal_btn}
              onClick={(e) => {
                e.preventDefault();
                setRevealed(true);
              }}
            >
              Naciśnij aby odkryć
            </button>
          </div>
        </>
      )}

      <div
        className={revealed ? "" : styles.unrevealed}
        style={{
          transition: " opacity .3s ease-in-out",
          transitionDelay: ".15s",
        }}
      >
        <div className={styles.gamecard_tb_container}>
          <h3 className={styles.gamecard_tb_title}>{title}</h3>
          <span className={styles.gamecard_tb_dont}>Nie używaj:</span>
          {forbiddenWords.map((word, idx) => {
            return (
              <h4 className={styles.gamecard_tb_description} key={idx}>
                {word}
              </h4>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
            filter: "opacity(.2)",
          }}
        >
          <Image
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="drink"
            width={700}
            height={700}
          />
        </div>
      </div>
    </>
  );
};

export default TBCard;

"use client";

import React from "react";
import { useState, useEffect, createRef, useRef } from "react";
import { handleTouchMove, handleTouchStart } from "@/app/utils/SwipeListener";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { CardTypes } from "@/app/types/CardTypes";
import styles from "@/app/(pages)/cards/[pubName]/page.module.css";
import Image from "next/image";
import TBCard from "../TBCard/TBCard";

const Game = ({ cards, isDemo, cardImage, gameType }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [renderItems, setRenderItems] = useState([]);

  const getItemsRef = () => {
    itemsRef.current = itemsRef.current.slice(currentCard, cards.length);
    replaceClasses();
  };

  const replaceClasses = () => {
    itemsRef.current[currentCard]?.classList.replace(
      `${styles.hidden}`,
      `${styles.current}`
    );
    itemsRef.current[currentCard + 1]?.classList.replace(
      `${styles.hidden}`,
      `${styles.next}`
    );
  };

  const fetchNext = () => {
    let arr;

    if (currentCard === 0) {
      arr = cards.slice(currentCard, currentCard + 26);
    } else {
      arr = cards.slice(currentCard + 1, currentCard + 27);
    }
    setRenderItems([...renderItems, ...arr]);
    replaceClasses();
  };

  useEffect(() => {
    if (
      currentCard === renderItems.length - 1 &&
      currentCard !== cards.length - 1
    ) {
      fetchNext();
    }
  }, [currentCard]);

  useEffect(() => {
    replaceClasses();
  }, [renderItems]);

  useEffect(() => {
    if (isDemo) {
      setCurrentCard(1);
    }
    fetchNext();
    getItemsRef();
  }, []);

  useEffect(() => {
    const displayeNoneRef = itemsRef.current[currentCard - 3];
    const hiddenAfterRef = itemsRef.current[currentCard - 2];
    const prevCardRef = itemsRef.current[currentCard - 1];
    const currentCardRef = itemsRef.current[currentCard];
    const nextCardRef = itemsRef.current[currentCard + 1];
    const hiddenRef = itemsRef.current[currentCard + 2];

    displayeNoneRef?.classList.replace(
      displayeNoneRef.classList[1],
      `${styles.removed}`
    );
    hiddenAfterRef?.classList.replace(
      hiddenAfterRef.classList[1],
      `${styles.hidden_after}`
    );
    prevCardRef?.classList.replace(prevCardRef.classList[1], `${styles.prev}`);
    currentCardRef?.classList.replace(
      currentCardRef.classList[1],
      `${styles.current}`
    );
    nextCardRef?.classList.replace(nextCardRef.classList[1], `${styles.next}`);
    hiddenRef?.classList.replace(hiddenRef.classList[1], `${styles.hidden}`);
  }, [currentCard]);

  const rightSwipe = () => {
    if (currentCard + 1 === itemsRef.current.length) {
      return;
    }

    setCurrentCard(currentCard + 1);
  };

  const leftSwipe = () => {
    if (currentCard - 1 === -1) {
      return;
    }
    setCurrentCard(currentCard - 1);
  };

  const renderSwitch = (param: string, card) => {
    switch (param) {
      case CardTypes.NHIE:
        return (
          <>
            <div className={styles.gamecard_container}>
              <h3 className={styles.gamecard_title}>{card?.title}</h3>
              <h4 className={styles.gamecard_description}>
                {card?.description}
              </h4>
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
              {cardImage && (
                <Image
                  src={cardImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  height={150}
                  width={250}
                  alt="drink"
                />
              )}
            </div>
          </>
        );
      case CardTypes.TOD:
        return (
          <>
            <div className={styles.gamecard_container_tod}>
              <div className={styles.gamecard_truth_container}>
                <h3 className={styles.gamecard_title}>Prawda</h3>
                <h4 className={styles.gamecard_tod}>{card.truth}</h4>
              </div>
              <div className={styles.gamecard_dare_container}>
                <h3 className={styles.gamecard_title}>Wyzwanie</h3>
                <h4 className={styles.gamecard_tod}>{card.dare}</h4>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "2",
                fontSize: "1.5rem",
                fontWeight: "700",
                opacity: ".8",
              }}
            >
              CZY
            </div>
          </>
        );
      case CardTypes.TB:
        return (
          <>
            <TBCard
              title={card.title}
              forbiddenWords={card.forbiddenWords}
              image={cardImage}
            />
          </>
        );
    }
  };

  return (
    <div
      className={styles.cards_container}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => {
        handleTouchMove(e, rightSwipe, leftSwipe);
      }}
    >
      {renderItems &&
        renderItems.map((card, i) => {
          return (
            <div
              className={`${styles.card} ${styles.hidden}`}
              ref={(el) => (itemsRef.current[i] = el)}
              key={i}
            >
              {renderSwitch(gameType, card)}

              {i === 0 ? (
                ""
              ) : (
                <MdArrowBack
                  className={`${styles.card_switch_btn} ${styles.left}`}
                  onClick={leftSwipe}
                />
              )}

              {i === cards.length - 1 ? (
                ""
              ) : (
                <MdArrowForward
                  className={`${styles.card_switch_btn} ${styles.right}`}
                  onClick={rightSwipe}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Game;

"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/logo-no-background.png";
import Game from "./Game";
import type { Card } from "@prisma/client";

export default function GameWrapper({
  cards,
  isDemo,
  cardImage,
  gameType,
}: {
  cards: Card[];
  isDemo: boolean;
  cardImage: string;
  gameType: string;
}) {
  const [enteredGame, setEnteredGame] = useState(false);

  if (enteredGame) {
    return (
      <Game
        cards={cards}
        isDemo={isDemo}
        cardImage={cardImage}
        gameType={gameType}
      />
    );
  }

  return (
    <div className="w-[90%] max-w-sm absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-6 bg-fuchsia-950 p-6 rounded-md drop-shadow-xl ">
      <h2 className="font-bold text-4xl">Cześć!</h2>
      <p className="text-md">
        Jeszcze zanim zaczniecie, chcielibyśmy wam życzyć udanej imprezy!
      </p>
      <p className="text-md">
        Zachęcamy do oznaczania <strong>@drinkifypolska</strong> na Instagramie
        - możliwe że udostępnimy was na naszej relacji 😉
      </p>

      <button
        className="bg-[#8d1380] p-2 rounded-md font-semibold shadow-md"
        onClick={() => {
          setEnteredGame(true);
        }}
      >
        Graj
      </button>

      <div className="flex items-center justify-center">
        <Image
          alt="drinkify logo"
          src={logo}
          width={300}
          height={300}
          className="object-contain w-full max-w-[6rem] mt-5"
        />
      </div>
    </div>
  );
}

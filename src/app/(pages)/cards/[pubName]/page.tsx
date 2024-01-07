import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/app/utils/db";
import NotFound from "@/app/(pages)/not-found";
import GameWrapper from "@/app/components/Game/GameWrapper";

export default async function GameSection({ params }) {
  const { pubName } = params;
  const session = await getServerSession();

  if (!session || !session.user.email) {
    return redirect("/login");
  }

  const product = await prisma.product.findUnique({
    where: { pubName: pubName },
    select: {
      owners: true,
      cards: true,
      thumbnail: true,
      gameType: true,
      name: true,
      backgroundImg: true,
    },
  });

  if (!product) {
    return NotFound();
  }

  const owners = product.owners.map((el) => {
    return el.email;
  });

  if (!owners.includes(session.user.email)) {
    return redirect(`/offer/${pubName}`);
  }

  return (
    <section
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className={`mh ${styles.game_section}`}>
        <GameWrapper
          cards={product.cards}
          cardImage={product.backgroundImg}
          gameType={product.gameType}
          isDemo={false}
        />
      </div>
    </section>
  );
}

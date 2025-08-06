import Image from "next/image";
import styles from "./page.module.css";
import {
  MdOutlineDevices,
  MdBolt,
  MdDone,
  MdWavingHand,
  MdGrade,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import Link from "next/link";
import phoneMockup from "../../../public/phone_mockup.png";
import partyImage from "../../../public/party_1.jpg";
import partyImage2 from "../../../public/party_2.jpg";
import partyImage3 from "../../../public/party_3.jpg";
import cards from "../../../public/cards.webp";
import { Metadata } from "next";
import { getPostData } from "../utils/posts";
import prisma from "../utils/db";

export const metadata: Metadata = {
  title: "Drinkify - gry imprezowe zawsze na wyciągnięcie ręki",
};

const posts = ["5-najlepszych-gier-imprezowych", "alkokarty-przewodnik"];

export const dynamic = "force-dynamic";
export default async function Home() {
  const postsData = await Promise.all(posts.map((post) => getPostData(post)));

  const featuredProducts = await prisma.product.findMany({
    select: {
      name: true,
      thumbnail: true,
      pubName: true,
    },
    orderBy: {
      priority: "desc",
    },
    take: 3,
  });

  return (
    <main className={styles.home_section}>
      <div className={styles.welcome}>
        <div className={styles.blob_container}>
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="b">
                <stop offset="0%" stopColor="#FF0037" />
                <stop offset="100%" stopColor="#9454b0" />
              </linearGradient>
              <clipPath id="a">
                <path
                  fill="currentColor"
                  d="M651.5 655Q500 810 252 655t0-397.5q248-242.5 399.5 0t0 397.5Z"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <path
                fill="url(#b)"
                d="M651.5 655Q500 810 252 655t0-397.5q248-242.5 399.5 0t0 397.5Z"
              />
            </g>
          </svg>
        </div>
        <div className={styles.welcome_container}>
          <div className={styles.welcome_container_grid_item}>
            <h1 className={styles.welcome_header}>
              Przenieś swoje imprezy na{" "}
              <b className={styles.welcome_header_highlight}>wyższy</b> poziom
            </h1>
            <Link className={styles.welcome_btn} href={"/offer"}>
              Zobacz naszą ofertę
            </Link>
          </div>
          <div className={styles.welcome_container_grid_item}>
            <Image
              className={styles.phone_mockup_img}
              src={phoneMockup}
              alt="phone mockup"
              loading="eager"
              priority
              sizes="(min-width: 60em) 20vw,
                    (min-width: 28em) 30vw,
                    50vw"
            />
          </div>
        </div>
        <div className={styles.custom_shape_divider_bottom_1678748201}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={styles.shape_fill}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={styles.shape_fill}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={styles.shape_fill}
            ></path>
          </svg>
        </div>
      </div>

      <section className={styles.about_section}>
        <div className={`${styles.product_description}`}>
          <article className={styles.product_left}>
            <h2 className={styles.product_header}>Co u nas znajdziesz?</h2>
            <div className={styles.product_details_wrapper}>
              <p>
                <strong className={styles.details_hightlight}>Drinkify</strong>{" "}
                to twój imprezowy przewodnik! Oferujemy ekskluzywne zestawy
                mobilnych kart imprezowych, które stanowią idealne połączenie
                śmiechu, pikanterii i dobrej zabawy.
              </p>
              <p>
                Kupując zestaw kart, otrzymujesz dostęp do{" "}
                <strong>interaktywnej gry karcianej</strong> z wybranej
                tematyki, po czym możesz grać na komputerze, tablecie i
                telefonie!
              </p>
              <Link className={styles.see_more_btn} href={"/offer"}>
                Zobacz naszą ofertę
              </Link>
            </div>
          </article>
          <div className={styles.description_img_wrapper}>
            <Image src={cards} alt="alcocards" />
          </div>
        </div>
        <h2 className={styles.about_header}>Dlaczego Drinkify?</h2>
        <div className={styles.about_advantage_container}>
          <AdvantageContainer
            icon={<MdOutlineDevices />}
            title="Responsywność"
            subtitle={"Graj na komputerze, laptopie, telefonie i tablecie "}
          />
          <AdvantageContainer
            icon={<MdBolt />}
            title="Natychmiastowy dostęp"
            subtitle={"Dostęp otrzymasz w momencie zaakceptowanej płatności"}
          />
          <AdvantageContainer
            icon={<MdDone />}
            title="Dostępność 24/7"
            subtitle={"Graj zawsze gdy masz na to ochotę"}
          />
        </div>
      </section>

      <section className={styles.benefits_section}>
        <div className={styles.custom_shape_divider_top_1679344967}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M649.97 0L550.03 0 599.91 54.12 649.97 0z"
              className={styles.shape_fill}
            ></path>
          </svg>
        </div>
        <div className={styles.benefits_grid}>
          <div className={styles.benefits_col}>
            <div className={styles.benefits_header_wrapper}>
              <div className={styles.benefits_icon_wrapper}>
                <MdWavingHand className={styles.benefits_icon} />
              </div>
              <h3 className={styles.benefits_header}>Integracja</h3>
              <span className={styles.benefits_description}>
                Drinkify pozwoli wam się lepiej poznać
              </span>
            </div>
            <Image
              src={partyImage}
              className={styles.benefits_img}
              alt="people partying"
              priority={false}
              sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
            />
          </div>
          <div className={`${styles.benefits_col} ${styles.mid}`}>
            <Image
              src={partyImage2}
              className={styles.benefits_img}
              alt="people drinking"
              priority={false}
              sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
            />
            <div className={styles.benefits_header_wrapper}>
              <div className={styles.benefits_icon_wrapper}>
                <BiDrink className={styles.benefits_icon} />
              </div>
              <h3 className={styles.benefits_header}>Rozrywka</h3>
              <span className={styles.benefits_description}>
                Zapewnimy twojej imprezie szybki start
              </span>
            </div>
          </div>
          <div className={styles.benefits_col}>
            <div className={styles.benefits_header_wrapper}>
              <div className={styles.benefits_icon_wrapper}>
                <MdGrade className={styles.benefits_icon} />
              </div>
              <h3 className={styles.benefits_header}>Innowacja</h3>
              <span className={styles.benefits_description}>
                Wprowadzimy powiew świeżości na twojej domówce
              </span>
            </div>
            <Image
              src={partyImage3}
              className={styles.benefits_img}
              alt="campfire party"
              priority={false}
              sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center w-full bg-gradient-to-b from-[#18031d] to-[#280432] pb-16">
        <h2 className="sm:text-5xl font-bold mt-10 mb-12 text-center p-4 text-4xl">
          Wyróżnione produkty
        </h2>
        <div className="grid lg:grid-cols-3 items-center w-full lg:max-w-[80rem] gap-28 py-8 px-4 grid-cols-1 max-w-[25rem] lg:gap-16">
          {featuredProducts.map((prod) => {
            return (
              <>
                <div key={prod.name} className="flex flex-col items-center">
                  <div className="relative w-full aspect-square mb-6">
                    <Image
                      src={prod.thumbnail}
                      alt={`Miniaturka ${prod.name}`}
                      fill
                      className="filter drop-shadow-2xl "
                    />
                  </div>
                  <span className="font-semibold text-2xl text-center">
                    {prod.name}
                  </span>
                  <Link
                    className="mt-4 bg-[#66006b] px-6 py-2 rounded-md"
                    href={`/offer/${prod.pubName}`}
                  >
                    Pokaż więcej
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </section>
      <section className="flex flex-col items-center p-10 bg-[#280432]">
        <h2 className="text-5xl font-semibold mb-16 mt-4 text-center">
          Nasz blog!
        </h2>
        <div className="flex gap-12 flex-wrap justify-center ">
          {postsData.map((post) => (
            <article className="aspect-square max-w-xs bg-fuchsia-950 rounded-md shadow-md shadow-gray-800">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.metadata.thumbnail}
                  alt={post.metadata.thumbnailAlt}
                  fill
                  className="object-cover rounded-t-md overflow-hidden"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 ">
                <span className="text-sm opacity-80">
                  {post.metadata.createdAt}
                </span>
                <header className=" font-bold text-xl mb-2">
                  {post.metadata.title}
                </header>
                <p className="text-sm opacity-80">
                  {post.metadata.description}
                </p>
                <Link
                  href={post.metadata.url}
                  className="mt-4 bg-fuchsia-900 max-w-fit px-4 py-2 rounded-md"
                >
                  Czytaj dalej
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const AdvantageContainer = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: String;
  subtitle: String;
}) => {
  return (
    <div className={styles.advantage_item}>
      <div className={styles.advantage_item_icon}>{icon}</div>
      <h3 className={styles.advantage_item_title}>{title}</h3>
      <span className={styles.advantage_item_subtitle}>{subtitle}</span>
    </div>
  );
};

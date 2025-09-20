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
import FAQSection from "@/app/components/FAQSection";

export const metadata: Metadata = {
  title: "Drinkify - Nowoczesne Gry Imprezowe | Mobilne Karty do Zabawy",
  description:
    "Odkryj Drinkify - interaktywne gry imprezowe na telefon, tablet i komputer. Responsywne karty imprezowe, które ożywią każdą domówkę. Dostęp 24/7, natychmiastowa aktywacja!",
  keywords:
    "gry imprezowe, karty imprezowe, mobilne gry, impreza, zabawa, alkokarty, gry na telefon, gry towarzyskie, rozrywka",
  authors: [{ name: "Drinkify Team" }],
  creator: "Drinkify",
  publisher: "Drinkify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Drinkify - Nowoczesne Gry Imprezowe | Mobilne Karty do Zabawy",
    description:
      "Interaktywne gry imprezowe dostępne na wszystkich urządzeniach. Ożyw swoją imprezę z Drinkify!",
    url: "https://drinkify.pl",
    siteName: "Drinkify",
    images: [
      {
        url: "https://res.cloudinary.com/dswot6gxk/image/upload/v1701339088/vtqyzoe7e6jjcuuludvs.png",
        width: 1200,
        height: 630,
        alt: "Drinkify - Gry Imprezowe",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drinkify - Nowoczesne Gry Imprezowe",
    description:
      "Interaktywne gry imprezowe dostępne na wszystkich urządzeniach. Ożyw swoją imprezę z Drinkify!",
    images: [
      "https://res.cloudinary.com/dswot6gxk/image/upload/v1701339088/vtqyzoe7e6jjcuuludvs.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
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

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Drinkify",
      url: "https://drinkify.pl",
      description:
        "Nowoczesne gry imprezowe dostępne na telefon, tablet i komputer. Interaktywne karty imprezowe na każdą okazję.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://drinkify.pl/offer?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      sameAs: [
        "https://facebook.com/drinkify",
        "https://instagram.com/drinkify",
      ],
      publisher: {
        "@type": "Organization",
        "@id": "https://drinkify.pl/#organization",
        name: "Drinkify",
        url: "https://drinkify.pl",
        logo: {
          "@type": "ImageObject",
          url: "https://drinkify.pl/logo-no-background.png",
        },
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Gry Imprezowe",
        description:
          "Kolekcja interaktywnych gier imprezowych dostępnych na wszystkich urządzeniach",
        numberOfItems: featuredProducts.length,
        itemListElement: featuredProducts.map((product, index) => ({
          "@type": "Product",
          position: index + 1,
          name: product.name,
          image: product.thumbnail,
          description: `${product.name} - Interaktywna gra imprezowa dostępna na wszystkich urządzeniach`,
          url: `https://drinkify.pl/offer/${product.pubName}`,
          category: "Gry Imprezowe",
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak działa dostęp do gier po zakupie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Po dokonaniu zakupu otrzymujesz natychmiastowy dostęp do gier w swoim panelu użytkownika. Nie musisz niczego pobierać ani instalować - wystarczy zalogować się na swoje konto i rozpocząć zabawę. Gry działają w przeglądarce internetowej na wszystkich urządzeniach - telefonie, tablecie i komputerze. System automatycznie dostosowuje interfejs do wielkości ekranu, zapewniając najlepsze doświadczenie niezależnie od urządzenia, z którego korzystasz.",
          },
        },
        {
          "@type": "Question",
          name: "Czy mogę grać w gry offline bez dostępu do internetu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nasze gry wymagają połączenia z internetem podczas pierwszego uruchomienia, aby zweryfikować dostęp i pobrać najnowsze treści. Jednak po załadowaniu gry możesz korzystać z większości funkcji nawet przy niestabilnym połączeniu internetowym. Niektóre funkcje, takie jak synchronizacja wyników czy aktualizacje treści, będą dostępne ponownie po przywróceniu połączenia. Zalecamy zapewnienie stabilnego internetu dla najlepszego doświadczenia, ale rozumiemy, że czasami połączenie może być ograniczone - dlatego nasze gry są zoptymalizowane pod kątem działania przy niskiej przepustowości.",
          },
        },
        {
          "@type": "Question",
          name: "Dla ilu graczy są przeznaczone wasze gry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nasze gry są uniwersalne i sprawdzą się w różnych konfiguracjach. Większość gier jest zaprojektowana dla grup od 3 do 10 osób, co czyni je idealnymi na domówki, spotkania przyjaciół czy mniejsze imprezy. Jednak wiele z naszych gier może być dostosowanych do większych grup - nawet do 20 czy więcej osób. W opisie każdej gry znajdziesz szczegółowe informacje o zalecanej liczbie graczy. Niezależnie od wielkości grupy, nasze gry zapewniają zabawę i integrację wszystkich uczestników. Jeśli organizujesz większe wydarzenie, skontaktuj się z nami - chętnie pomożemy dobrać odpowiednie gry do Twojej imprezy.",
          },
        },
        {
          "@type": "Question",
          name: "Czy gry są odpowiednie dla wszystkich grup wiekowych?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nasze gry są przeznaczone głównie dla osób pełnoletnich (18+), ponieważ zawierają treści związane z alkoholem i sytuacje dla dorosłych. W opisie każdej gry znajdziesz szczegółowe informacje o jej zawartości i zalecanym wieku graczy. Dbamy o to, aby treści były przedstawione w odpowiedzialny sposób, promując zabawę w gronie znajomych przy jednoczesnym zachowaniu rozsądku. Jeśli szukasz gier dla młodszych uczestników lub wydarzeń bezalkoholowych, skontaktuj się z nami - być może będziemy mogli zaproponować odpowiednie warianty naszych gier lub poinformować o planowanych produktach dla różnych grup wiekowych.",
          },
        },
        {
          "@type": "Question",
          name: "Co robić w przypadku problemów technicznych z grą?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jeśli napotkasz jakiekolwiek problemy techniczne, nasz zespół wsparcia jest gotowy do pomocy. Przede wszystkim sprawdź, czy masz stabilne połączenie internetowe i czy używasz aktualnej wersji przeglądarki. Większość problemów można rozwiązać poprzez odświeżenie strony lub wylogowanie i ponowne zalogowanie się. Jeśli problem nadal występuje, skontaktuj się z nami przez formularz kontaktowy na stronie. Podaj szczegółowy opis problemu, informacje o urządzeniu i przeglądarce - to pomoże nam szybciej zdiagnozować i rozwiązać problem. Odpowiadamy na wszystkie zgłoszenia w ciągu 24 godzin i robimy wszystko, aby zapewnić Ci płynną zabawę.",
          },
        },
        {
          "@type": "Question",
          name: "Jak długo mam dostęp do zakupionych gier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Po zakupie otrzymujesz dożywotni dostęp do gier - możesz z nich korzystać bez ograniczeń czasowych. Nie ma żadnych miesięcznych opłat, odnowień ani ukrytych kosztów. Gra pozostaje Twoja na zawsze, a my stale pracujemy nad ulepszaniem naszych produktów, dodając nowe funkcje i treści bez dodatkowych opłat. Jeśli wprowadzamy znaczące aktualizacje lub nowe wersje gier, jako posiadacz otrzymujesz do nich bezpłatny dostęp. Twoje konto i zakupione gry będą dostępne tak długo, jak długo działamy jako firma. Dbamy o bezpieczeństwo Twoich danych i regularnie tworzymy kopie zapasowe, aby zapewnić ciągłość dostępu do Twojej biblioteki gier.",
          },
        },
        {
          "@type": "Question",
          name: "Czy mogę udostępnić zakupione gry innym osobom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gry zakupione w Drinkify są licencjonowane na użytek osobisty dla właściciela konta. Oznacza to, że możesz grać w zakupione gry ze swoimi przyjaciółmi, rodziną i gośćmi podczas wspólnych spotkań i imprez - to jest dokładnie zgodne z przeznaczeniem naszych produktów. Jednak nie możesz udostępniać danych logowania do swojego konta innym osobom ani odsprzedawać dostępu do gier. Każda osoba, która chce mieć własny dostęp do gier Drinkify, powinna założyć własne konto i dokonać zakupu. Takie podejście pozwala nam utrzymać wysoką jakość usług, zapewnić bezpieczeństwo danych użytkowników oraz finansować dalszy rozwój nowych gier i funkcjonalności. Jeśli organizujesz większe wydarzenia i potrzebujesz licencji komercyjnych, skontaktuj się z nami - oferujemy specjalne rozwiązania dla firm i organizatorów eventów.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
              <p className={styles.welcome_subtitle}>
                Nowoczesne gry imprezowe dostępne na wszystkich urządzeniach.
                Interaktywne karty, które ożywią każdą domówkę i sprawią, że
                wasza zabawa będzie niezapomniana!
              </p>
              <div className={styles.welcome_cta_container}>
                <Link className={styles.welcome_btn_primary} href={"/offer"}>
                  Rozpocznij zabawę
                </Link>
              </div>
              <div className={styles.welcome_features}>
                <div className={styles.feature_item}>
                  <MdOutlineDevices className={styles.feature_icon} />
                  <span>Wszystkie urządzenia</span>
                </div>
                <div className={styles.feature_item}>
                  <MdBolt className={styles.feature_icon} />
                  <span>Natychmiastowy dostęp</span>
                </div>
                <div className={styles.feature_item}>
                  <MdDone className={styles.feature_icon} />
                  <span>Zawsze dostępne</span>
                </div>
              </div>
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
                  <strong className={styles.details_hightlight}>
                    Drinkify
                  </strong>{" "}
                  to nowoczesna platforma oferująca ekskluzywne zestawy
                  mobilnych kart imprezowych. Połączenie innowacyjnej
                  technologii z tradycyjną zabawą, które tworzy idealne
                  połączenie śmiechu, emocji i niezapomnianych chwil.
                </p>
                <p>
                  Kupując zestaw kart, otrzymujesz dostęp do{" "}
                  <strong>interaktywnej gry karcianej</strong> z wybranej
                  tematyki. Graj na komputerze, tablecie i telefonie - wszędzie
                  tam, gdzie jesteś!
                </p>
                <div className={styles.product_stats}>
                  <div className={styles.stat_item}>
                    <span className={styles.stat_number}>24/7</span>
                    <span className={styles.stat_label}>Dostępność</span>
                  </div>
                  <div className={styles.stat_item}>
                    <span className={styles.stat_number}>100%</span>
                    <span className={styles.stat_label}>Mobilne</span>
                  </div>
                  <div className={styles.stat_item}>
                    <span className={styles.stat_number}>∞</span>
                    <span className={styles.stat_label}>Zabawy</span>
                  </div>
                </div>
                <Link className={styles.see_more_btn} href={"/offer"}>
                  Odkryj naszą ofertę
                </Link>
              </div>
            </article>
            <div className={styles.description_img_wrapper}>
              <Image
                src={cards}
                alt="Drinkify - Interaktywne karty imprezowe"
              />
            </div>
          </div>
          <h2 className={styles.about_header}>Dlaczego Drinkify?</h2>
          <div className={styles.about_advantage_container}>
            <AdvantageContainer
              icon={<MdOutlineDevices />}
              title="Wszystkie Urządzenia"
              subtitle={"Funkcjonuje perfekcyjnie na wszystkich urządzeniach"}
            />
            <AdvantageContainer
              icon={<MdBolt />}
              title="Natychmiastowy dostęp"
              subtitle={"Natychmiastowy dostęp po potwierdzeniu płatności"}
            />
            <AdvantageContainer
              icon={<MdDone />}
              title="Dostęp 24/7"
              subtitle={"Dostępne zawsze, gdy masz ochotę na zabawę"}
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
          <div className={styles.benefits_content}>
            <h2 className={styles.benefits_main_header}>
              Jak Drinkify zmieni twoją imprezę?
            </h2>
            <p className={styles.benefits_subtitle}>
              Poznaj trzy filary naszej filozofii zabawy
            </p>
          </div>
          <div className={styles.benefits_grid}>
            <div className={styles.benefits_col}>
              <div className={styles.benefits_header_wrapper}>
                <div className={styles.benefits_icon_wrapper}>
                  <MdWavingHand className={styles.benefits_icon} />
                </div>
                <h3 className={styles.benefits_header}>Integracja</h3>
                <span className={styles.benefits_description}>
                  Drinkify pomoże wam się lepiej poznać i zbudować niezapomniane
                  wspomnienia razem
                </span>
              </div>
              <Image
                src={partyImage}
                className={styles.benefits_img}
                alt="Ludzie bawiący się na imprezie z Drinkify"
                priority={false}
                sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
              />
            </div>
            <div className={`${styles.benefits_col} ${styles.mid}`}>
              <Image
                src={partyImage2}
                className={styles.benefits_img}
                alt="Rozrywka i zabawa z grami Drinkify"
                priority={false}
                sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
              />
              <div className={styles.benefits_header_wrapper}>
                <div className={styles.benefits_icon_wrapper}>
                  <BiDrink className={styles.benefits_icon} />
                </div>
                <h3 className={styles.benefits_header}>Rozrywka</h3>
                <span className={styles.benefits_description}>
                  Zapewnimy twojej imprezie dynamiczny start i nieustającą dawkę
                  śmiechu
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
                  Nowoczesne podejście do klasycznej zabawy - technologia w
                  służbie dobrej atmosfery
                </span>
              </div>
              <Image
                src={partyImage3}
                className={styles.benefits_img}
                alt="Innowacyjne gry imprezowe przy ognisku"
                priority={false}
                sizes="(max-width: 800px) 100vw, (max-width:1520px) 33vw, 600px"
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full bg-gradient-to-b from-[#18031d] to-[#280432] py-20">
          <div className="text-center mb-12 max-w-2xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Nasze bestsellery
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sprawdzone gry, które rozgrzeją atmosferę na każdej imprezie
            </p>
          </div>
          <div className="w-full max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((prod, index) => {
                return (
                  <div key={prod.name} className="group relative">
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10">
                      <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-800/30 to-pink-800/30">
                        <Image
                          src={prod.thumbnail}
                          alt={`${prod.name} - Gra imprezowa Drinkify`}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-3">
                          {prod.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          Odkryj nowe poziomy zabawy z tą wyjątkową grą
                          imprezową
                        </p>
                        <Link
                          href={`/offer/${prod.pubName}`}
                          className="inline-block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                          Sprawdź szczegóły
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/offer"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Zobacz wszystkie gry
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
        <section className="flex flex-col items-center p-16 bg-[#280432] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#280432] to-[#1a0220]"></div>
          <div className="relative z-10 text-center mb-16 max-w-3xl">
            <h2 className="text-5xl font-bold mb-4 text-center">Nasz blog</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              Odkryj porady, inspiracje i najnowsze trendy w świecie gier
              imprezowych
            </p>
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-5xl w-full">
            {postsData.map((post, index) => (
              <article
                key={post.metadata.url}
                className={`blog-card ${
                  index === 0 ? "blog-card-featured" : ""
                }`}
              >
                <div className="blog-image-wrapper">
                  <Image
                    src={post.metadata.thumbnail}
                    alt={post.metadata.thumbnailAlt}
                    fill
                    className="blog-image"
                  />
                  <div className="blog-overlay">
                    <span className="blog-date">{post.metadata.createdAt}</span>
                  </div>
                </div>
                <div className="blog-content">
                  <header className="blog-header">{post.metadata.title}</header>
                  <p className="blog-description">
                    {post.metadata.description}
                  </p>
                  <Link href={post.metadata.url} className="blog-button">
                    <span>Czytaj więcej</span>
                    <svg
                      className="blog-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {/* <div className="relative z-10 mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:transform hover:-translate-y-1"
            >
              Zobacz wszystkie artykuły
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div> */}
        </section>

        <FAQSection />
      </main>
    </>
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

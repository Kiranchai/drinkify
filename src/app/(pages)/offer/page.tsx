import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gry Imprezowe - Pełna Oferta | Drinkify",
  description:
    "Odkryj pełną ofertę interaktywnych gier imprezowych Drinkify. Karty imprezowe na telefon, tablet i komputer. Natychmiastowy dostęp, dożywotnia licencja, dla 2-12+ graczy.",
  keywords:
    "gry imprezowe, karty imprezowe, oferta gier, mobilne gry, alkokarty, gry towarzyskie, rozrywka, impreza, zabawa, gry na telefon",
  authors: [{ name: "Drinkify Team" }],
  creator: "Drinkify",
  publisher: "Drinkify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Gry Imprezowe - Pełna Oferta | Drinkify",
    description:
      "Pełna kolekcja interaktywnych gier imprezowych. Karty na wszystkie urządzenia, natychmiastowy dostęp, dożywotnia licencja.",
    url: "https://drinkify.pl/offer",
    siteName: "Drinkify",
    images: [
      {
        url: "https://res.cloudinary.com/dswot6gxk/image/upload/v1701339088/vtqyzoe7e6jjcuuludvs.png",
        width: 1200,
        height: 630,
        alt: "Drinkify - Gry Imprezowe Oferta",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gry Imprezowe - Pełna Oferta | Drinkify",
    description:
      "Pełna kolekcja interaktywnych gier imprezowych. Karty na wszystkie urządzenia.",
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
  alternates: {
    canonical: "https://drinkify.pl/offer",
  },
};

export const dynamic = "force-dynamic";

export default async function Offer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/api/products`
  );
  const data = await res.json();
  const { products } = data;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gry Imprezowe - Pełna Oferta",
    description:
      "Kompletna kolekcja interaktywnych gier imprezowych dostępnych na wszystkich urządzeniach",
    url: "https://drinkify.pl/offer",
    mainEntity: {
      "@type": "ItemList",
      name: "Gry Imprezowe Drinkify",
      description: "Kolekcja interaktywnych gier imprezowych",
      numberOfItems: products.length,
      itemListElement: products.map((product: any, index: number) => ({
        "@type": "Product",
        position: index + 1,
        name: product.name,
        image: product.thumbnail,
        description: `${product.name} - Interaktywna gra imprezowa dostępna na wszystkich urządzeniach`,
        url: `https://drinkify.pl/offer/${product.pubName}`,
        category: "Gry Imprezowe",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating || 4.8,
          reviewCount: product.reviewCount || 127,
          bestRating: 5,
          worstRating: 1,
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
          url: `https://drinkify.pl/offer/${product.pubName}`,
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Strona główna",
          item: "https://drinkify.pl",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Oferta",
          item: "https://drinkify.pl/offer",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={styles.offer}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#280432] to-[#1a0220] py-20">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Gry Imprezowe Drinkify
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Odkryj pełną kolekcję interaktywnych gier imprezowych Drinkify -
              nowoczesne karty imprezowe dostępne natychmiastowo na telefonie,
              tablecie i komputerze. Nasze gry to idealne rozwiązanie na
              domówki, imprezy urodzinowe, wieczory panieńskie i kawalerskie
              oraz każdą okazję towarzyską.
            </p>
            <div className="max-w-4xl mx-auto text-left md:text-center">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Dlaczego warto wybrać gry imprezowe Drinkify?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-gray-300">
                <div className="space-y-3">
                  <h3 className="font-semibold text-purple-300">
                    Natychmiastowy dostęp
                  </h3>
                  <p className="text-sm">
                    Po zakupie otrzymujesz natychmiastowy dostęp do gry w swoim
                    panelu użytkownika.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-purple-300">
                    Wszystkie urządzenia
                  </h3>
                  <p className="text-sm">
                    Graj na telefonie, tablecie czy komputerze. Gry są w pełni
                    responsywne.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-purple-300">
                    Dożywotni dostęp
                  </h3>
                  <p className="text-sm">
                    Jedna płatność = dostęp na zawsze. Bez miesięcznych opłat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`mh ${styles.offer_section}`}>
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Wybierz swoją grę imprezową
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Poniżej znajdziesz {products.length} różnych gier imprezowych do
                wyboru. Każda gra zawiera unikalny zestaw pytań i wyzwań,
                starannie przygotowany przez nasz zespół. Ceny są jednorazowe -
                płacisz raz i masz dostęp na zawsze.
              </p>
            </div>

            <div className={styles.offer_products}>
              {products.map((product: any, idx: number) => {
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
                      {product.isBestseller && (
                        <span className={styles.offer_bestseller_flag}>
                          BESTSELLER
                        </span>
                      )}

                      {product.isNew && (
                        <span className={styles.offer_new_item_flag}>
                          NOWOŚĆ!
                        </span>
                      )}

                      <div className={styles.offer_image_wrapper}>
                        <Image
                          src={product.thumbnail}
                          alt={`${product.name} - Gra imprezowa`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />

                        {/* Rating badge overlay */}
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                          <span className="text-yellow-400 text-xs font-medium">
                            {(product.rating || 4.8).toFixed(1)}
                          </span>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className="text-xs">
                                {i < Math.floor(product.rating || 4.8)
                                  ? "★"
                                  : "☆"}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={styles.offer_description_container}>
                        <span className={styles.product_name}>
                          {product.name}
                        </span>

                        <span className={styles.product_price}>
                          {product.price} zł
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Games Section - moved below products */}
        <section className="bg-gradient-to-b from-[#1a0220] to-[#280432] py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Jak działają nasze gry imprezowe?
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Każda gra imprezowa Drinkify to starannie przygotowany zestaw
                pytań, wyzwań i zadań, które zapewnią wam niezapomnianą zabawę.
                Nasze karty imprezowe zostały zaprojektowane z myślą o różnych
                grupach wiekowych i preferencjach.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Różnorodne kategorie
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Od klasycznych gier towarzyskich, przez pytania "prawda czy
                  wyzwanie", po specjalne karty tematyczne dopasowane do
                  konkretnych okazji.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Dla każdej grupy
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Większość gier dla grup od 2 do 12+ osób. W opisie każdej gry
                  znajdziesz dokładne informacje o zalecanej liczbie graczy.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Łatwe w użyciu
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Intuicyjny interfejs sprawia, że każdy może łatwo nawigować po
                  grze. Wystarczy kliknąć, żeby przejść do następnej karty.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Idealne na każdą okazję
              </h3>
              <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Gry sprawdzają się podczas domówek, imprez urodzinowych,
                wieczorów panieńskich i kawalerskich, spotkań integracyjnych,
                czy po prostu wieczorów spędzonych z przyjaciółmi.
              </p>
            </div>
          </div>
        </section>

        {/* Additional SEO Content Section */}
        <section className="bg-gradient-to-b from-[#280432] to-[#1a0220] py-20">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">
                Często zadawane pytania o gry imprezowe
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 text-gray-300">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Czym są gry imprezowe Drinkify?
                  </h3>
                  <p className="leading-relaxed">
                    Gry imprezowe Drinkify to interaktywne karty cyfrowe
                    dostępne przez przeglądarkę internetową. Każda gra zawiera
                    starannie przygotowane pytania, wyzwania i zadania, które
                    sprawią, że wasza impreza będzie niezapomniana. To
                    nowoczesna alternatywa dla tradycyjnych kart imprezowych.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Jak kupić gry imprezowe?
                  </h3>
                  <p className="leading-relaxed">
                    Proces zakupu jest bardzo prosty. Wybierz grę, która Cię
                    interesuje, kliknij w nią, aby przejść do strony szczegółów,
                    a następnie dodaj ją do koszyka. Po dokonaniu płatności
                    natychmiastowo otrzymasz dostęp do gry w swoim panelu
                    użytkownika.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Czy gry wymagają instalacji?
                  </h3>
                  <p className="leading-relaxed">
                    Nie! Wszystkie nasze gry działają w przeglądarce
                    internetowej. Nie musisz niczego pobierać ani instalować.
                    Wystarczy połączenie z internetem i dowolne urządzenie -
                    telefon, tablet lub komputer.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Dla ilu osób są gry?
                  </h3>
                  <p className="leading-relaxed">
                    Większość naszych gier imprezowych jest zaprojektowana dla
                    grup od 2 do 12+ osób. Niektóre gry sprawdzają się lepiej w
                    mniejszych grupach (2-4 osoby), inne są idealne dla
                    większych imprez. W opisie każdej gry znajdziesz dokładne
                    informacje o zalecanej liczbie graczy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Czy mogę grać wielokrotnie?
                  </h3>
                  <p className="leading-relaxed">
                    Oczywiście! Po zakupie masz dożywotni dostęp do gry. Możesz
                    grać ile razy chcesz, z różnymi grupami ludzi. Każda
                    rozgrywka może być inna dzięki losowemu wyświetlaniu kart i
                    różnym reakcjom uczestników.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Jakie są ceny gier?
                  </h3>
                  <p className="leading-relaxed">
                    Ceny naszych gier imprezowych wahają się od kilkunastu do
                    kilkudziesięciu złotych. To jednorazowa opłata za dożywotni
                    dostęp - bez miesięcznych abonamentów czy ukrytych kosztów.
                    Inwestycja w dobrą zabawę, która zwroci się już podczas
                    pierwszej imprezy!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Zacznij zabawę już dziś!
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Nie czekaj na następną imprezę - kup swoją pierwszą grę
                imprezową Drinkify już dziś i przekonaj się, jak bardzo mogą
                urozmaicić wasze spotkania. Nasze karty imprezowe to gwarancja
                śmiechu, dobrych wspomnień i integracji grupy. Wybierz swoją grę
                z powyższej listy i rozpocznij niezapomnianą przygodę!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

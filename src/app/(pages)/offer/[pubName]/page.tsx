import styles from "./page.module.css";
import gameStyles from "@/app/(pages)/cards/[pubName]/page.module.css";
import BuyNowButton from "@/app/components/BuyNowButton/BuyNowButton";
import Image from "next/image";
import Link from "next/link";
import Game from "@/app/components/Game/Game";
import prisma from "@/app/utils/db";
import type { Metadata } from "next";
import NotFound from "@/app/(pages)/not-found";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { pubName } = params;
  const product = await prisma.product.findUnique({
    where: {
      pubName: pubName,
      isPublished: true,
    },
    include: {
      owners: {
        select: {
          email: true,
        },
      },
      DemoCard: {},
    },
  });

  if (product) {
    const cleanDescription = product.description
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .substring(0, 160);

    return {
      title: `${product.name} - Interaktywna Gra Imprezowa | Drinkify`,
      description: `${cleanDescription}. Kup ${product.name} za ${product.price} zł i ciesz się zabawą na każdej imprezie. Dostęp natychmiastowy na wszystkich urządzeniach.`,
      keywords: [
        "gra imprezowa",
        "gry dla dorosłych",
        "zabawa na imprezie",
        "gry alkoholowe",
        product.name.toLowerCase(),
        "drinkify",
        "gry towarzyskie",
        "rozrywka",
      ],
      authors: [{ name: "Drinkify" }],
      creator: "Drinkify",
      publisher: "Drinkify",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      openGraph: {
        title: `${product.name} - Gra Imprezowa`,
        description: `${cleanDescription}. Dostęp natychmiastowy za ${product.price} zł.`,
        url: `https://drinkify.pl/offer/${product.pubName}`,
        siteName: "Drinkify - Gry Imprezowe",
        images: [
          {
            url: product.thumbnail,
            width: 1200,
            height: 630,
            alt: `${product.name} - Gra imprezowa Drinkify`,
          },
        ],
        locale: "pl_PL",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - Gra Imprezowa`,
        description: cleanDescription,
        images: [product.thumbnail],
        creator: "@drinkify_pl",
      },
      alternates: {
        canonical: `https://drinkify.pl/offer/${product.pubName}`,
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
    };
  }
}

export const dynamic = "force-dynamic";

export default async function Product({ params }) {
  const { pubName } = params;
  const product = await prisma.product.findUnique({
    where: {
      pubName: pubName,
      isPublished: true,
    },
    include: {
      owners: {
        select: {
          email: true,
        },
      },
      DemoCard: {},
    },
  });

  if (!product) {
    return NotFound();
  }

  // Fetch other products for the "Other Games" section
  const otherProducts = await prisma.product.findMany({
    where: {
      isPublished: true,
      pubName: {
        not: pubName, // Exclude current product
      },
    },
    select: {
      pubName: true,
      name: true,
      price: true,
      thumbnail: true,
      isBestseller: true,
      isNew: true,
      description: true,
      rating: true,
      reviewCount: true,
    },
    orderBy: [
      { isBestseller: "desc" },
      { isNew: "desc" },
      { createdAt: "desc" },
    ],
    take: 3, // Limit to 3 other products
  });

  const priceValidUntil = new Date();
  priceValidUntil.setDate(priceValidUntil.getDate() + 30);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.thumbnail],
    description: product.description.replace(/<[^>]*>/g, ""),
    sku: product.pubName,
    mpn: product.pubName,
    brand: {
      "@type": "Brand",
      name: "Drinkify",
      logo: "https://drinkify.pl/logo-no-background.png",
      url: "https://drinkify.pl",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Drinkify",
      url: "https://drinkify.pl",
    },
    category: "Gry Imprezowe",
    audience: {
      "@type": "Audience",
      audienceType: "Dorośli 18+",
    },
    offers: {
      "@type": "Offer",
      url: `https://drinkify.pl/offer/${product.pubName}`,
      availability: "https://schema.org/InStock",
      price: product.price,
      priceCurrency: "PLN",
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Drinkify",
        url: "https://drinkify.pl",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "PLN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
        shippingDestination: [
          {
            "@type": "DefinedRegion",
            addressCountry: "*",
            addressRegion: ["*"],
          },
        ],
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating?.toString() || "4.8",
      reviewCount: product.reviewCount?.toString() || "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className={styles.hero_section}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <div className={styles.product_image_container}>
              {product.isBestseller && (
                <span className={styles.bestseller_badge}>BESTSELLER</span>
              )}
              {product.isNew && (
                <span className={styles.new_badge}>NOWOŚĆ!</span>
              )}
              <div className={styles.product_image_wrapper}>
                {product.backgroundImg && (
                  <Image
                    src={product.backgroundImg}
                    alt={`${product.name} - Gra imprezowa`}
                    width={600}
                    height={600}
                    priority
                    className={styles.product_image}
                  />
                )}
              </div>
            </div>

            <div className={styles.product_details}>
              <h1 className={styles.product_title}>{product.name}</h1>

              <div className={styles.rating_container}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating || 4.8) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className={styles.rating_text}>
                  {(product.rating || 4.8).toFixed(1)} (
                  {product.reviewCount || 127} opinii)
                </span>
              </div>

              <div className={styles.price_container}>
                <span className={styles.current_price}>{product.price} zł</span>
                <span className={styles.price_note}>Jednorazowa płatność</span>
              </div>

              <div
                className={styles.product_description}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className={styles.product_features}>
                <div className={styles.feature_item}>
                  <svg
                    className={styles.feature_icon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2h2v2h6V2h2zM4 9v10h16V9H4zm2 2h2v2H6v-2zm0 4h2v2H6v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2z" />
                  </svg>
                  <span>Dostęp na wszystkich urządzeniach</span>
                </div>
                <div className={styles.feature_item}>
                  <svg
                    className={styles.feature_icon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 3L4 14h6.5l-.5 4L19 7h-6.5l.5-4z" />
                  </svg>
                  <span>Natychmiastowy dostęp</span>
                </div>
                <div className={styles.feature_item}>
                  <svg
                    className={styles.feature_icon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Dostęp na zawsze</span>
                </div>
                <div className={styles.feature_item}>
                  <svg
                    className={styles.feature_icon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Gotowe do zabawy</span>
                </div>
              </div>

              <div className={styles.cta_container}>
                <BuyNowButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className={styles.demo_section}>
        <div className={styles.section_container}>
          <h2 className={styles.section_title}>Wypróbuj demo gry</h2>
          <p className={styles.section_subtitle}>
            Zobacz jak wygląda gra w akcji dzięki darmowej wersji
            demonstracyjnej
          </p>
        </div>
        <div className={styles.demo_game_container}>
          <div className={styles.demo_game_wrapper}>
            <Game
              cards={product.DemoCard}
              isDemo={true}
              cardImage={product.backgroundImg}
              gameType={product.type}
            />
          </div>
        </div>
      </section>

      {/* Rules Section */}
      {product?.rules && (
        <section className={styles.rules_section}>
          <div className={styles.section_container}>
            <h2 className={styles.section_title}>Zasady gry</h2>
            <div
              className={styles.rules_content}
              dangerouslySetInnerHTML={{ __html: product.rules }}
            />
          </div>
        </section>
      )}

      {/* Product Benefits Section */}
      <section className={styles.benefits_section}>
        <div className={styles.section_container}>
          <h2 className={styles.section_title}>
            Dlaczego warto wybrać {product.name}?
          </h2>
          <div className={styles.benefits_grid}>
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3>Profesjonalnie przygotowane</h3>
              <p>
                Każda karta została starannie opracowana przez nasz zespół, aby
                zapewnić maksymalną zabawę.
              </p>
            </div>
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 1v6h6V1H4zm0 16h6v-6H4v6zM14 7v6h6V7h-6zm0 10h6v-6h-6v6z" />
                </svg>
              </div>
              <h3>Idealne dla grup</h3>
              <p>
                Gra została zaprojektowana tak, aby wszystkie osoby mogły
                aktywnie uczestniczyć w zabawie.
              </p>
            </div>
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Niekończąca się zabawa</h3>
              <p>
                Dzięki dużej liczbie kart, każda rozgrywka będzie inna i pełna
                niespodzianek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className={styles.how_it_works_section}>
        <div className={styles.section_container}>
          <h2 className={styles.section_title}>Jak to działa?</h2>
          <div className={styles.steps_container}>
            <div className={styles.step_item}>
              <div className={styles.step_number}>1</div>
              <h3>Zaloguj się</h3>
              <p>
                Użyj swojego konta, aby uzyskać dostęp do zakupionej gry na
                dowolnym urządzeniu.
              </p>
            </div>
            <div className={styles.step_item}>
              <div className={styles.step_number}>2</div>
              <h3>Kup grę</h3>
              <p>
                Dokonaj bezpiecznej płatności i otrzymaj natychmiastowy dostęp.
              </p>
            </div>
            <div className={styles.step_item}>
              <div className={styles.step_number}>3</div>
              <h3>Zacznij zabawę</h3>
              <p>Otwórz grę i ciesz się wspaniałą zabawą ze znajomymi!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq_section}>
        <div className={styles.section_container}>
          <h2 className={styles.section_title}>Często zadawane pytania</h2>
          <div className={styles.faq_grid}>
            <div className={styles.faq_item}>
              <h3>Czy gra działa na telefonach?</h3>
              <p>
                Tak! Nasza gra została zaprojektowana tak, aby działała płynnie
                na wszystkich urządzeniach - telefonach, tabletach i
                komputerach.
              </p>
            </div>
            <div className={styles.faq_item}>
              <h3>Ile osób może grać jednocześnie?</h3>
              <p>
                Gra jest idealna dla grup od 2 do 10+ osób. Im więcej graczy,
                tym więcej zabawy!
              </p>
            </div>
            <div className={styles.faq_item}>
              <h3>Czy to jednorazowa płatność?</h3>
              <p>
                Tak! Płacisz raz i masz dostęp do gry na zawsze. Brak
                miesięcznych opłat czy ukrytych kosztów.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Games Section */}
      <section className={styles.other_games_section}>
        <div className={styles.section_container}>
          <h2 className={styles.section_title}>Sprawdź nasze inne gry</h2>
          <p className={styles.section_subtitle}>
            Odkryj więcej świetnych gier imprezowych z naszej kolekcji
          </p>
          <div className={styles.other_games_grid}>
            {otherProducts.map((otherProduct) => (
              <div
                key={otherProduct.pubName}
                className={styles.other_game_card}
              >
                <Link
                  href={`/offer/${otherProduct.pubName}`}
                  className={styles.other_game_link}
                >
                  {otherProduct.isBestseller && (
                    <span className={styles.other_game_bestseller}>
                      BESTSELLER
                    </span>
                  )}
                  {otherProduct.isNew && (
                    <span className={styles.other_game_new}>NOWOŚĆ!</span>
                  )}

                  <div className={styles.other_game_image_wrapper}>
                    <Image
                      src={otherProduct.thumbnail}
                      alt={`${otherProduct.name} - Gra imprezowa`}
                      width={200}
                      height={200}
                      className={styles.other_game_image}
                    />
                  </div>

                  <div className={styles.other_game_content}>
                    <h3 className={styles.other_game_title}>
                      {otherProduct.name}
                    </h3>
                    <p className={styles.other_game_description}>
                      {otherProduct.description
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 80)}
                      ...
                    </p>
                    <div className={styles.other_game_price}>
                      {otherProduct.price} zł
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.view_all_games}>
            <Link href="/offer" className={styles.view_all_button}>
              Zobacz wszystkie gry
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.final_cta_section}>
        <div className={styles.section_container}>
          <div className={styles.final_cta_content}>
            <h2>Gotowy na niezapomnianą zabawę?</h2>
            <p>
              Dołącz do tysięcy zadowolonych klientów i zamów {product.name} już
              dziś!
            </p>
            <div className={styles.final_cta_button}>
              <BuyNowButton product={product} />
            </div>
            <div className={styles.trust_indicators}>
              <span>✅ Natychmiastowy dostęp</span>
              <span>✅ Gwarancja satysfakcji</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

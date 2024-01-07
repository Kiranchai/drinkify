import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "@/app/provider.js";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Scroll from "../components/Scroll";
import CookiesConsent from "../components/CookiesConsent/CookiesConsent";
import GoogleAnalytics from "../components/GoogleAnalytics";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drinkify",
  description:
    "Drinkify to gry imprezowe, które dodają klimatu każdej imprezie! Zaskocz swoich gości kreatywnymi pytaniami i spraw, by wasza impreza była niezapomniana. Zróżnicowane alkokarty, które zachęcą każdego uczestnika do zabawy",
  openGraph: {
    title: "Drinkify",
    description:
      "Drinkify to gry imprezowe, które dodają klimatu każdej imprezie! Zaskocz swoich gości kreatywnymi pytaniami i spraw, by wasza impreza była niezapomniana. Zróżnicowane alkokarty, które zachęcą każdego uczestnika do zabawy",
    images: [
      {
        url: "https://res.cloudinary.com/dswot6gxk/image/upload/v1701339088/vtqyzoe7e6jjcuuludvs.png",
        width: 1200,
        height: 630,
        alt: "drinkify logo",
      },
    ],
    url: "https://drinkify.pl/",
    siteName: "Drinkify",
    type: "website",
    locale: "pl_pl",
  },
  alternates: {
    canonical: "https://drinkify.pl",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl">
      {/* {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics GA_MEASUREMENT_ID="G-4GZVX3W2F6" />
      )} */}
      <body className={poppins.className}>
        <Scroll />
        {/* {process.env.NODE_ENV === "production" && <CookiesConsent />} */}
        <Provider session={session}>
          <Navbar />
          {children}
          <Footer />
          <div id="portal"></div>
        </Provider>
      </body>
    </html>
  );
}

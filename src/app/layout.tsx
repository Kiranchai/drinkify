import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "@/app/provider.js";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import ogImage from "public/ogimage.png";

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
    canonical: "https://drinkify.pl/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl">
      <body className={poppins.className}>
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

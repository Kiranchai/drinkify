import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "@/app/provider.js";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drinkify",
  description:
    "Drinkify to gry imprezowe, które dodadzą klimatu każdej imprezie! Zaskocz swoich gości kreatywnymi pytaniami i spraw, by wasza impreza była niezapomniana. Zróżnicowane alkokarty, które zachęcą każdego uczestnika do zabawy.",
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

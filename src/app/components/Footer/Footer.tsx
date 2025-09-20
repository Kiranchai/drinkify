import styles from "@/app/components/Footer/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo-no-background.png";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <header className={styles.footer_logo}>
          <Image alt="drinkify logo" src={logo} height={250} width={250} />
        </header>

        <div className={styles.footer_links_col}>
          <header className={styles.footer_links_header}>Rozrywka</header>
          <div className={styles.footer_links_list}>
            <Link href={"/offer"}>Oferta</Link>
            <Link href={"/cards"}>Moje karty</Link>
          </div>
        </div>
        <div className={styles.footer_links_col}>
          <header className={styles.footer_links_header}>Strony</header>
          <div className={styles.footer_links_list}>
            <Link href={"/"}>Regulamin</Link>
            <Link href={"/privacy-policy"}>Polityka prywatności</Link>
            <Link href={"/contact"}>Kontakt</Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Link href={"https://facebook.com/drinkifypolska"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link href={"https://instagram.com/drinkifypolska"} target="_blank">
          <FaInstagram />
        </Link>
        <Link href={"https://tiktok.com/@drinkifypolska"} target="_blank">
          <FaTiktok />
        </Link>
      </div>
      <span className={styles.copyright_span}>&copy; 2025 Drinkify</span>
    </footer>
  );
};

export default Footer;

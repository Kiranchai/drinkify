"use client";

import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import {
  MdLogout,
  MdShoppingCart,
  MdLogin,
  MdLocalOffer,
} from "react-icons/md";
import { HiGift } from "react-icons/hi2";
import { GiCardPlay } from "react-icons/gi";
import logo from "../../../../public/logo-no-background.png";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/contexts/CartContext";
import styles from "@/app/components/Navbar/Navbar.module.css";
import { signOut, useSession } from "next-auth/react";
import RedeemCodeModal from "../RedeemCodeModal/RedeemCodeModal";
// import RedeemCodeModal from "../Modals/RedeemCodeModal/RedeemCodeModal";

const Navbar = () => {
  const { data: session, status } = useSession();
  const { cartItems } = useCart();

  const handleOnToggle = () => {
    setIconIsActive((prevState) => !prevState);
  };

  const [modalShown, setModalShown] = useState(false);
  const [iconIsActive, setIconIsActive] = useState(false);

  const handleModalDisplay = () => {
    setModalShown(true);
  };

  return (
    <>
      <RedeemCodeModal
        open={modalShown}
        onClose={() => {
          setModalShown(false);
        }}
      />
      <nav className={styles.navbar}>
        <div className={styles.navbar_left}>
          <span>
            <Link className={styles.logo_link} href="/">
              <Image
                alt="drink logo"
                src={logo}
                width={150}
                height={90}
                priority
              />
            </Link>
          </span>

          <span className={styles.hamburger_span}>
            <Hamburger
              onToggle={handleOnToggle}
              toggled={iconIsActive}
              label="hamburger menu button"
            />
          </span>
        </div>

        <ul
          className={
            iconIsActive
              ? `${styles.navbar_list} ${styles.showed}`
              : styles.navbar_list
          }
        >
          <NavbarListItem
            icon={<MdShoppingCart />}
            destination={"cart"}
            name={!cartItems ? "Koszyk (0)" : `Koszyk (${cartItems?.length})`}
            collapse={handleOnToggle}
          />

          <NavbarListItem
            icon={<GiCardPlay />}
            destination={"cards"}
            name={"Moje karty"}
            collapse={handleOnToggle}
          />
          <NavbarListItem
            icon={<MdLocalOffer />}
            destination={"offer"}
            name={"Oferta"}
            collapse={handleOnToggle}
          />

          {status === "authenticated" && (
            <li
              onClick={() => {
                handleModalDisplay();
              }}
            >
              <span className={styles.navbar_link}>
                Wykorzystaj kod
                <HiGift />
              </span>
            </li>
          )}

          {status === "authenticated" ? (
            <li
              className={styles.navbar_link}
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              Wyloguj
              <MdLogout />
            </li>
          ) : (
            <NavbarListItem
              icon={<MdLogin />}
              name={"Zaloguj"}
              destination={"login"}
              collapse={handleOnToggle}
            />
          )}
        </ul>
      </nav>
      <div className={styles.navbar_separator}></div>
    </>
  );
};

interface IListItemProps {
  name: string;
  destination?: string;
  collapse: () => void;
  icon: React.ReactNode;
}

const NavbarListItem = ({
  name,
  destination,
  collapse,
  icon,
}: IListItemProps) => {
  return (
    <li
      onClick={() => {
        collapse();
      }}
    >
      <Link className={styles.navbar_link} href={`/${destination}`}>
        {name}
        {icon}
      </Link>
    </li>
  );
};

export default Navbar;

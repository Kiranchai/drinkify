"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "public/logo-no-background.png";
import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { TbCardsFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import styles from "./Drawer.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Divider } from "@mui/material";

export default function Drawer({ children }) {
  const [drawerShown, setDrawerShown] = useState(false);

  const handleToggleNavbar = () => {
    setDrawerShown((prevState) => !prevState);
  };
  return (
    <div className="flex">
      <nav className={styles.navbar}>
        <div
          className="h-12 flex items-center px-4 cursor-pointer"
          onClick={() => {
            handleToggleNavbar();
          }}
        >
          <RxHamburgerMenu />
        </div>
      </nav>
      <nav
        className={
          drawerShown
            ? `${styles.drawer} ${styles.drawerShown}`
            : `${styles.drawer}`
        }
      >
        <div className="h-12">
          <Image
            src={logo}
            alt="drinkify logo"
            className="object-contain h-full"
          />
        </div>
        <Divider className="border-[#9d5094] pt-4" />
        <ul className="mt-8 flex flex-col gap-1">
          <DrawerItem
            name="Panel główny"
            icon={<CgMenuGridR />}
            destination={"/dashboard"}
          />
          <DrawerItem
            name="Produkty"
            icon={<TbCardsFilled />}
            destination={"/dashboard/products"}
          />
        </ul>
      </nav>
      <div className="ml-0 lg:ml-[180px] xl:ml-[280px] transition-all duration-[400ms] mt-[3rem] lg:mt-0">
        {children}
      </div>
    </div>
  );
}

function DrawerItem({
  name,
  icon,
  destination,
}: {
  name: string;
  icon: React.ReactNode;
  destination: string;
}) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={destination}
        className={`flex items-center gap-4 px-4  hover:bg-[#602c5d] transition-colors py-2 rounded-lg ${
          pathname === destination ? "" : "opacity-40"
        }`}
      >
        <div className="text-xl">{icon}</div>
        {name}
      </Link>
    </li>
  );
}

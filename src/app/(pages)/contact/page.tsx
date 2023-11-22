import styles from "./page.module.css";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import Link from "next/link";

const contactItems = [
  {
    name: "contact@drinkify.pl",
    icon: <MdOutlineMail />,
    link: "mailto:contact@drinkify.pl",
  },
  {
    name: "@drinkifypolska",
    icon: <FaInstagram />,
    link: "https://instagram.com/drinkifypolska",
  },
  {
    name: "@drinkifypolska",
    icon: <FaFacebookF />,
    link: "https://facebook.com/drinkifypolska",
  },
  {
    name: "@drinkifypolska",
    icon: <FaTiktok />,
    link: "https://tiktok.com/@drinkifypolska",
  },
];

export default function page() {
  return (
    <section className={`mh ${styles.contact_section}`}>
      <h1 className={styles.header}>Skontaktuj się z nami</h1>
      <div className={styles.items_wrapper}>
        {contactItems.map((item) => {
          return (
            <ContactItem name={item.name} icon={item.icon} link={item.link} />
          );
        })}
      </div>
    </section>
  );
}

type ContactItemProps = {
  icon: React.ReactNode;
  name: string;
  link?: string;
};

const ContactItem = ({ icon, name, link }: ContactItemProps) => {
  if (link?.length > 0) {
    return (
      <Link href={link} target="_blank" className={styles.contactItem}>
        {icon}
        <span>{name}</span>
      </Link>
    );
  }

  return (
    <div className={styles.contactItem}>
      {icon}
      <span>{name}</span>
    </div>
  );
};

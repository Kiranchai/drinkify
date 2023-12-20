"use client";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import styles from "./CookiesConsent.module.css";
import { usePathname } from "next/navigation";

export default function CookiesConsent() {
  const [consent, setConsent] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setConsent(getCookie("consent"));
  }, [consent, pathname]);

  const acceptConsent = () => {
    setCookie("consent", "true");
    setConsent("true");
  };

  const declineConsent = () => {
    setCookie("consent", "false");
    setConsent("false");
  };

  if (consent === null) {
    return null;
  }

  if (consent === undefined) {
    return (
      <div className={styles.consent}>
        <p className={styles.consentInfo}>
          Używamy ciasteczek, aby analizować ruch na naszej stronie, dzięki
          czemu jesteśmy w stanie stale polepszać twój komfort.
        </p>
        <div className={styles.consentButtonContainer}>
          <button
            className={`${styles.consentButton} ${styles.decline}`}
            onClick={declineConsent}
          >
            Nie zgadzam się
          </button>
          <button className={styles.consentButton} onClick={acceptConsent}>
            Zgadzam się
          </button>
        </div>
      </div>
    );
  }

  if (consent === "true") {
    return (
      <>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-4GZVX3W2F6" />
        <script id="google-analytics">
          {`
         window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());

           gtag('config', 'G-4GZVX3W2F6');
        `}
        </script>
      </>
    );
  }
}

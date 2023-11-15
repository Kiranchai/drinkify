"use client";
import { setCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import styles from "./CookiesConsent.module.css";

export default function CookiesConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (!hasCookie("consent")) {
      setShowConsent(true);
    }
  }, []);

  const acceptConsent = () => {
    setShowConsent(false);
    setCookie("consent", "true");
  };

  const declineConsent = () => {
    setShowConsent(false);
    setCookie("consent", "false");
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className={styles.consent}>
      <p className={styles.consentInfo}>
        Używamy ciasteczek, aby analizować ruch na naszej stronie, dzięki czemu
        jesteśmy w stanie stale polepszać komfort przeglądania naszej witryny.
      </p>
      <div className={styles.consentButtonContainer}>
        <button className={styles.consentButton} onClick={acceptConsent}>
          Zgadzam się
        </button>
        <button className={styles.consentButton} onClick={declineConsent}>
          Nie zgadzam się
        </button>
      </div>
    </div>
  );
}

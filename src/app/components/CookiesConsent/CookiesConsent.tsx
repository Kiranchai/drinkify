"use client";

import styles from "./CookiesConsent.module.css";
import { getLocalStorage, setLocalStorage } from "@/app/utils/storageHelper";
import { useState, useEffect } from "react";

export default function CookiesConsent() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`${styles.consent} ${
        cookieConsent !== null ? "hidden" : "flex"
      }`}
    >
      <p className={styles.consentInfo}>
        Używamy ciasteczek, aby analizować ruch na naszej stronie, dzięki czemu
        jesteśmy w stanie stale polepszać twój komfort.
      </p>
      <div className={styles.consentButtonContainer}>
        <button
          className={`${styles.consentButton} ${styles.decline}`}
          onClick={() => setCookieConsent(false)}
        >
          Nie zgadzam się
        </button>
        <button
          className={styles.consentButton}
          onClick={() => setCookieConsent(true)}
        >
          Zgadzam się
        </button>
      </div>
    </div>
  );
}

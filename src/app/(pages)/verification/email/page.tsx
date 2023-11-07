"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/app/(pages)/login/page.module.css";
import { CircularProgress } from "@mui/material";

export default function EmailVerification() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const makeRequest = async () => {
    if (!token) {
      router.replace("/");
    }

    try {
      const res = await fetch(`/api/verification/email`, {
        method: "POST",
        body: JSON.stringify({ token: token }),
      });
      const data = await res.json();

      if (data.type === "error") {
        router.replace(`/login?error=${data.message}`);
      }

      if (data.type === "success") {
        router.replace(`/login?success=${data.message}`);
      }
    } catch (err) {
      router.replace("/");
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <section className={`mh ${styles.login_section}`}>
      <CircularProgress />
    </section>
  );
}

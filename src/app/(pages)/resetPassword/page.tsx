"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import { TextField } from "@mui/material";
import styles from "@/app/(pages)/login/page.module.css";
import { useSession } from "next-auth/react";

export default function ResetPassword() {
  const token = useSearchParams()?.get("token");
  const router = useRouter();
  const [error, setError] = useState<String>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");

    if (password !== confirmPassword) {
      setButtonDisabled(false);
      return setError("Podane hasła się różnią");
    } else {
      fetch(`/api/password/reset`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          newPassword: password,
          hash: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.type === "error") {
            setError(data.message);
          } else if (data.type === "success") {
            router.replace(`/login?success=${data.message}`);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setButtonDisabled(false);
        });
    }
  };

  return (
    <section className={`mh ${styles.login_section}`}>
      <div className={styles.login_form_wrapper}>
        <h2 className={styles.login_header}>Resetowanie hasła</h2>
        {error && <div className={styles.error_container}>{error}</div>}

        <form className={styles.login_form}>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              fullWidth
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Nowe hasło"
              required
              variant="standard"
            />

            <TextField
              fullWidth
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              label="Powtórz nowe hasło"
              required
              variant="standard"
            />
          </ThemeProvider>

          <span className={styles.password_requirements}>
            Użyj co najmniej ośmiu znaków, w tym jednocześnie małych i wielkich
            liter, cyfr i symboli <b>#?!@$%^&-</b>
          </span>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className={styles.submit_btn}
          >
            {buttonDisabled ? <CircularProgress /> : "Zmień hasło"}
          </button>
        </form>
      </div>
    </section>
  );
}

"use client";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CircularProgress, TextField } from "@mui/material";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import styles from "@/app/(pages)/login/page.module.css";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setButtonDisabled(true);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setButtonDisabled(false);
      return setError("Podane hasła się różnią");
    }

    const newUser = {
      email,
      password,
    };

    fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "error") {
          setError(data.message);
        } else {
          setModalMessage(data.message);
          setModalShown(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        setButtonDisabled(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      {error && <div className={styles.error_container}>{error}</div>}

      <form className={styles.login_form} onSubmit={handleSubmit} noValidate>
        <ThemeProvider theme={TextFieldTheme}>
          <TextField
            fullWidth
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            label="Adres email"
            variant="standard"
          />

          <TextField
            fullWidth
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            label="Hasło"
            variant="standard"
          />

          <TextField
            fullWidth
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
            label="Powtórz hasło"
            variant="standard"
          />
        </ThemeProvider>
        <span className={styles.password_requirements}>
          Użyj co najmniej osiem znaków, w tym jednocześnie małe i wielkie
          litery, cyfry i symbole <b>#?!@$%^&-</b>
        </span>
        <button
          type="submit"
          disabled={buttonDisabled}
          className={styles.submit_btn}
        >
          {isLoading ? (
            <CircularProgress className={styles.loading_anim} />
          ) : (
            "Zarejestruj"
          )}
        </button>
      </form>
    </>
  );
}

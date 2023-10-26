"use client";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import styles from "@/app/(pages)/login/page.module.css";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import TokenResetModal from "@/app/components/TokenResetModal/TokenResetModal";
import PasswordResetModal from "../PasswordResetModal/PasswordResetModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenResetModalShown, setTokenResetModalShown] = useState(false);
  const [passwordResetModalShown, setPasswordResetModalShown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResponse.error) {
      setError(signInResponse.error);
    } else {
      router.refresh();
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <TokenResetModal
        onClose={() => {
          setTokenResetModalShown(false);
        }}
        open={tokenResetModalShown}
      />
      <PasswordResetModal
        open={passwordResetModalShown}
        onClose={() => {
          setPasswordResetModalShown(false);
        }}
      />

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
            label="Hasło"
            required
            variant="standard"
          />
        </ThemeProvider>
        <span
          className={styles.nav_link}
          style={{
            color: "white",
            cursor: "pointer",
            fontSize: ".95rem",
            marginTop: ".1rem",
            marginBottom: ".1rem",
            opacity: ".9",
          }}
          onClick={() => {
            setPasswordResetModalShown(true);
          }}
        >
          Nie pamiętam hasła
        </span>
        <button
          type="submit"
          disabled={buttonDisabled}
          className={styles.submit_btn}
        >
          {isLoading ? (
            <CircularProgress className={styles.loading_anim} />
          ) : (
            "Zaloguj"
          )}
        </button>
      </form>
      <span
        style={{
          paddingBlock: "1rem",
          marginTop: ".75rem",
          textAlign: "center",
        }}
      >
        Nie posiadasz konta?{" "}
        <Link
          style={{
            color: "var(--blueish)",
          }}
          href={"/register"}
        >
          Zarejestruj się
        </Link>
      </span>
      <span
        style={{
          textAlign: "center",
        }}
      >
        Twój link aktywacyjny wygasł?{" "}
        <span
          style={{
            color: "var(--blueish)",
            cursor: "pointer",
          }}
          onClick={() => {
            setTokenResetModalShown(true);
          }}
        >
          Kliknij tutaj
        </span>
      </span>
    </>
  );
}

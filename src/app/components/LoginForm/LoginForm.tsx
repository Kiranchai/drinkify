"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import styles from "@/app/(pages)/login/page.module.css";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import TokenResetModal from "@/app/components/TokenResetModal/TokenResetModal";
import PasswordResetModal from "../PasswordResetModal/PasswordResetModal";
import { signIn } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [success, setSuccess] = useState("");
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

  const checkForError = () => {
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "user_already_verified": {
          setError("Twoje konto jest już zweryfikowane");
          break;
        }

        case "link_expired_or_not_exists": {
          setError("Link wygasł lub nie istnieje");
          break;
        }

        case "an_error_occured": {
          setError("Wystąpił błąd");
          break;
        }
      }

      router.push(pathName);
    }
  };

  const checkForSuccess = () => {
    const success = searchParams.get("success");
    if (success) {
      switch (success) {
        case "user_verified_successfuly": {
          setSuccess("Konto zweryfikowane pomyślnie");
          break;
        }

        case "password_changed_successfuly": {
          setSuccess("Zmiana hasła przebiegła pomyślnie");
          break;
        }
      }
      router.push(pathName);
    }
  };

  useEffect(() => {
    checkForError();
    checkForSuccess();
  }, []);

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

      {success && <div className={styles.success_container}>{success}</div>}
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

      <div className="flex flex-col items-center mt-6 mb-10">
        <span className="w-full text-center ">lub za pomocą</span>

        <div className="flex items-center justify-center w-full mt-4 gap-4">
          <button
            onClick={async (e) => {
              e.preventDefault();
              await signIn("google");
            }}
            className="w-full h-full max-w-[3rem] aspect-square rounded-full bg-slate-200 p-2 text-2xl text-center flex items-center justify-center"
          >
            <FcGoogle />
          </button>
        </div>
      </div>
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

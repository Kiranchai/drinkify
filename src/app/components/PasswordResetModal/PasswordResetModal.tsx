"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import styles from "@/app/components/EmailVerificationModal/EmailVerificationModal.module.css";

type TModalProps = {
  open: boolean;
  onClose: () => void;
};

const PasswordResetModal = ({ open, onClose }: TModalProps) => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    setIsLoading(true);

    fetch(`/api/auth/sendPasswordReset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.type !== "error") {
          setEmail("");
          onClose();
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonDisabled(false);
        setIsLoading(false);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_layout}></div>
      <div className={styles.modal}>
        <h2 className={styles.modal_header}>Zmiana hasła</h2>
        <span className={styles.modal_message}>
          Podaj adres email swojego konta. Wyślemy na niego link do zmiany
          hasła.
        </span>
        <form>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              fullWidth
              type="email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              required
              label="Adres email"
              variant="standard"
              sx={{
                marginBottom: "1rem",
              }}
            />
          </ThemeProvider>
          {error && <div className={styles.error_container}>{error}</div>}

          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <button
              className={styles.submit_btn}
              type="submit"
              onClick={handleResetPassword}
              disabled={buttonDisabled}
            >
              {isLoading ? (
                <CircularProgress className={styles.loading_anim} />
              ) : (
                "Wyślij"
              )}
            </button>
            <button
              className={`${styles.submit_btn} ${styles.cancel}`}
              onClick={onClose}
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default PasswordResetModal;

"use client";

import ReactDOM from "react-dom";
import styles from "@/app/components/EmailVerificationModal/EmailVerificationModal.module.css";
import { TextFieldTheme } from "@/app/themes/MuiTextFieldTheme";
import { CircularProgress, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RedeemCodeModal = ({ open, onClose }) => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    setIsLoading(true);

    fetch(`/api/giftcode/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ giftcode: code }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.type !== "error") {
          onClose();
          router.push("/cards");
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCode("");
        setButtonDisabled(false);
        setIsLoading(false);
      });
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_layout}></div>
      <div className={styles.modal}>
        <h2 className={styles.modal_header}>Wykorzystaj kod</h2>
        <span className={styles.modal_message}>
          W polu poniżej, wpisz otrzymany kod podarunkowy. <br />
          Gra zostanie przypisana do twojego konta.
        </span>
        <form>
          <ThemeProvider theme={TextFieldTheme}>
            <TextField
              fullWidth
              type="email"
              onChange={(e) => {
                setCode(e.currentTarget.value);
              }}
              required
              label="Kod"
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
              onClick={handleRedeemCode}
              disabled={buttonDisabled}
            >
              {isLoading ? (
                <CircularProgress className={styles.loading_anim} />
              ) : (
                "Odbierz"
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

export default RedeemCodeModal;

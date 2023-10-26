"use client";

import ReactDOM from "react-dom";
import styles from "./EmailVerificationModal.module.css";

type TModalProps = {
  open: boolean;
  onClose: () => void;
};

const Modal = ({ open, onClose }: TModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal_layout}></div>
      <div className={styles.modal}>
        <h2 className={styles.modal_header}>Potwierdź email</h2>
        <span className={styles.modal_message}>
          Utworzono konto. Wysłaliśmy link aktywacyjny na podany email.
        </span>
        <button className={styles.submit_btn} onClick={onClose}>
          Rozumiem
        </button>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;

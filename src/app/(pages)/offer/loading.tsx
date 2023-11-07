import styles from "@/app/(pages)/login/page.module.css";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <section className={`mh ${styles.login_section}`}>
      <CircularProgress />
    </section>
  );
}

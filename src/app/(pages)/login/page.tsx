import styles from "./page.module.css";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logowanie | Drinkify",
  alternates: {
    canonical: "https://drinkify.pl/login",
  },
};

const Login = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <section className={`mh ${styles.login_section}`}>
        <div className={styles.login_form_wrapper}>
          <h1 className={styles.login_header}>Logowanie</h1>
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default Login;

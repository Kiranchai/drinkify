import styles from "./page.module.css";
import Link from "next/link";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
        <span
          style={{
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
          >
            Kliknij tutaj
          </span>
        </span>
      </section>
    </>
  );
};

export default Login;

import RegisterForm from "@/app/components/RegisterForm/RegisterForm";
import Link from "next/link";
import styles from "../login/page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <section className={`mh ${styles.login_section}`}>
      {/* <Modal
                  open={modalShown}
                  onClose={() => {
                    navigate("/login", { replace: true });
                  }}
                  message={modalMessage}
                /> */}

      <div className={styles.login_form_wrapper}>
        <h1 className={styles.login_header}>Rejestracja</h1>
        <RegisterForm />
      </div>
      <span
        style={{
          textAlign: "center",
        }}
      >
        Masz już konto?{" "}
        <Link
          style={{
            color: "var(--blueish)",
          }}
          href={"/login"}
        >
          Zaloguj się
        </Link>
      </span>
    </section>
  );
};

export default Register;

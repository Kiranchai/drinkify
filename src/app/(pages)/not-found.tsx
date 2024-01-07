import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="mh"
      style={{
        background: "var(--bg-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1.5rem",
        textAlign: "center",
        padding: ".5rem",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Nie znaleziono podanej strony</h1>
      <Link
        style={{
          backgroundColor: "rgb(95, 2, 109)",
          padding: ".75rem .5rem",
          borderRadius: ".25rem",
        }}
        href="/"
      >
        Powrót do strony głównej
      </Link>
    </section>
  );
}

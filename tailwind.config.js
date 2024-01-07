/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "399px",
      sm: "639px",
      md: "767px",
      lg: "1023px",
      800: "799px",
      xl: "1279px",
      "2xl": "1535px",
    },
    extend: {
      colors: {
        main: "var(--bg-main)",
        secondary: "var(--bg-secondary)",
        lightPink: "var(--light-pink)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

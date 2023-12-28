/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--bg-main)",
        secondary: "var(--bg-secondary)",
        lightPink: "var(--light-pink)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

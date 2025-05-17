/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
      },
      backgroundColor: {
        base: "var(--background)",
        card: "var(--card)",
      },
      textColor: {
        base: "var(--dark)",
      },
      borderColor: {
        base: "var(--border)",
      },
    },
  },
  plugins: [],
};

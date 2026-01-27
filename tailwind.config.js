/** Tailwind config for IND CRM MVC */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Web/Views/**/*.cshtml",
    "./Web/wwwroot/js/**/*.{js,jsx,ts,tsx}",
    "./Web/wwwroot/react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00296b",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

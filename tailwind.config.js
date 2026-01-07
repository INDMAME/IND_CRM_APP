/** Tailwind config for IND CRM MVC */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Views/**/*.cshtml",
    "./wwwroot/js/**/*.{js,jsx}",
    "./wwwroot/react/**/*.{js,jsx}",
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

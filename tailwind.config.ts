/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import topography from "@tailwindcss/typography";

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{tsx, jsx, ts, js, html}",
    "*.{tsx, jsx, ts, js, html}",
      "./**/**/*.{tsx, jsx, ts, js, html}",
      "./*.{ts, tsx, js, jsx}"
    // ...
  ],
  theme: {
    extend: { 
      colors: {
        primary: "#0725ec",
        blackRed: "#0b0000",
        blackBlue: "#000209"
      }
    },
  },
  plugins: [
    forms,
    topography
  ],
}
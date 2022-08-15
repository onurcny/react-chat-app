/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222",
        secondary: "#333",
        tertiary: "#444"
      }
    },
  },
  plugins: [],
}

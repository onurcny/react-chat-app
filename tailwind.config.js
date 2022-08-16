/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002029",
        secondary: "#00303d",
        tertiary: "#004052"
      }
    },
  },
  plugins: [],
}

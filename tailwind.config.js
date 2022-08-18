/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10002b",
        secondary: "#240046",
        tertiary: "#3c096c"
      }
    },
  },
  plugins: [],
}

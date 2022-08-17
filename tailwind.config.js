/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a1128",
        secondary: "#001f54",
        tertiary: "#034078"
      }
    },
  },
  plugins: [],
}

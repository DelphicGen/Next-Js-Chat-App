/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FDD200',
        secondary: '#40825C'
      },
      minWidth: {
        screen: '100vw'
      },
      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [],
}

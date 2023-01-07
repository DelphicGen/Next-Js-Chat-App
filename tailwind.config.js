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
        96: '384px',
        screen: '100vw'
      },
      maxWidth: {
        96: '384px',
      },
      maxHeight: {
        screen: '100vh'
      },
      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [],
}

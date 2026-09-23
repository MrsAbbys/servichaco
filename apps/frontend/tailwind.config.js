/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chaco: {
          50: '#f4f7f6',
          100: '#e3ece9',
          500: '#00796b',
          600: '#00695c',
          700: '#004d40',
        }
      }
    },
  },
  plugins: [],
}

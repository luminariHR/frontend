/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#F0C84B",
        secondary:"#8583FD"
      }
    },
  },
  plugins: [],
}


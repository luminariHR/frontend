/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: "#F0C84B",
        secondary: "#8583FD"
      },
      keyframes: {
        moveLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        moveLeft: 'moveLeft 10s linear infinite',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #e0f7fa, #F9D4FF, #ffebee)',
      },
    },
  },
  variants: {
    extend: {
      display: ['hover'],
    },
  },
  plugins: [],
}

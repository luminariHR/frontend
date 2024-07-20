/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
  plugins: [],
}

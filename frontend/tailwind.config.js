/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          '0%,50%,100%': { color: 'black' },
          '25%,75%': { color: 'white' }
        }
      },
      animation: {
        colorChange: 'colorChange 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

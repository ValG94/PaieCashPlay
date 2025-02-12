/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4FBA73',
        secondary: '#BC7AF9',
      },
    },
  },
  plugins: [],
};
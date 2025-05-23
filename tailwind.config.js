/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d13d57',
        'primary-dark': '#b02e46',
        secondary: '#8a1be2',
        background: '#0a0212',
        'background-light': '#140726',
      },
    },
  },
  plugins: [],
};
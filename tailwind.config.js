/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
      backgroundColor: {
        dark: '#111827',
        'dark-secondary': '#1f2937',
      },
      textColor: {
        dark: '#f9fafb',
        'dark-secondary': '#e5e7eb',
      },
    },
  },
  plugins: [],
};
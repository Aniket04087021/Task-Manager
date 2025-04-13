/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#242424',
          text: 'rgba(255, 255, 255, 0.87)',
        },
        light: {
          bg: '#ffffff',
          text: '#213547',
        },
      },
    },
  },
  plugins: [],
} 
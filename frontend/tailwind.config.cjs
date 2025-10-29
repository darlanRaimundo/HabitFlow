/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy so we can toggle dark mode with a `dark` class on <html>
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

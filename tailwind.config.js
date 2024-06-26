/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './server/**/*.{html,js}',
    './client/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

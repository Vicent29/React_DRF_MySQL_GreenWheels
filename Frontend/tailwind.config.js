/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'hd': '680px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class"
}

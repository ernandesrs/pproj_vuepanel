const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': colors.blue[300],
        'primary': colors.blue[500],
        'primary-dark': colors.blue[700],

        'secondary-light': colors.blue[300],
        'secondary': colors.blue[500],
        'secondary-dark': colors.blue[700],

        'light-light': colors.slate[100],
        'light': colors.slate[200],
        'light-dark': colors.slate[300],

        'dark-light': colors.gray[700],
        'dark': colors.gray[800],
        'dark-dark': colors.gray[900],
      }
    },
  },
  plugins: [],
}
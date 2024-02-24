const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#84be5b',
        inactive: '#656986',
        "txt-primary": colors.gray["100"],
        "txt-secondary": colors.gray["400"],
        "bg-nav": colors.gray["600"],
        error: colors.red["600"],
        input: colors.gray["800"],
      }
    },
  },
  plugins: [],
}

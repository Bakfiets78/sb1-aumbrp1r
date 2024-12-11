/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sncf-blue': '#003b95',
        'sncf-red': '#c60c30',
      },
    },
  },
  plugins: [],
}
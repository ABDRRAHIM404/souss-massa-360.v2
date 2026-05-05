/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E76F51',
        'secondary': '#2A9D8F',
        'accent': '#E9C46A',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
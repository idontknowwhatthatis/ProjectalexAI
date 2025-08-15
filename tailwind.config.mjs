/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-red': '#8b0000',
      },
      backgroundImage: {
        'black-red-gradient': 'linear-gradient(to bottom, #000000, #8b0000)',
      },
    },
  },
  plugins: [],
};

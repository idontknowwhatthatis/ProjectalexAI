/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bde3ff",
          300: "#91d2ff",
          400: "#5ab6ff",
          500: "#2a98ff",
          600: "#0f77e6",
          700: "#0b60bf",
          800: "#0e5099",
          900: "#103f75"
        }
      }
    }
  },
  plugins: []
};

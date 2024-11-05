/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Configura "sans" como Roboto
        roboto: ['Roboto', 'sans-serif'], // Agrega una familia roboto personalizada
      },
    },
  },
  plugins: [],
}

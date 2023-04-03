import palette from './palette.mjs'

console.log('ℹ️  Tailwindcss loaded')


/** @type {import('tailwindcss').Config} */
export default {
  // content: [],

  theme: {
    darkMode: false, // or 'media' or 'class'
    extend: {
      colors: palette
    }
  },

  plugins: [],
}

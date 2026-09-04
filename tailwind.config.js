/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: '#fcfbf8',
          surface: '#ffffff',
          linen: '#f7f4ed',
          border: '#eee8dc',
          borderSubtle: '#f3efe6',
          text: '#1a1918',
          textSecondary: '#6c665e',
          textMuted: '#948e85',
          gold: '#8c6d3b',
          goldLight: '#a38148',
          goldSubtle: '#faf5ea',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        widestLoom: '0.18em',
      }
    },
  },
  plugins: [],
}

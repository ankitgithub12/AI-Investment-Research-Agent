/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0B',      // Stripe/Linear-like dark background
          card: '#121214',    // Elevated card background
          border: '#232326',  // Subtle borders
          input: '#1A1A1E',   // Input field background
          text: {
            primary: '#F4F4F5',  // Off-white primary text
            secondary: '#A1A1AA',// Zinc-400 secondary text
            muted: '#71717A',    // Zinc-500 muted text
          }
        },
        brand: {
          DEFAULT: '#4F46E5',  // Indigo accent
          dark: '#4338CA',
          light: '#818CF8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

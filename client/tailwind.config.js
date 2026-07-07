/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FAFAFB',      // Crisp premium off-white background
          card: '#FFFFFF',    // Crisp pure white card
          border: '#EBECEF',  // Fine light gray borders
          input: '#F4F5F6',   // Soft gray input background
          text: {
            primary: '#0F1115',  // Deep charcoal primary text
            secondary: '#5C6470',// Charcoal gray secondary text
            muted: '#8A92A0',    // Cool gray muted text
          }
        },
        brand: {
          DEFAULT: '#4F46E5',  // Indigo accent
          dark: '#3F37C9',
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

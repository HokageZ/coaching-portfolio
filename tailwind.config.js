/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#B60D0D',
        'primary-hover': '#950B0B',
        'primary-soft': 'rgba(182, 13, 13, 0.3)',
        'background': '#000000',
        'bg-overlay': 'rgba(0, 0, 0, 0.85)',
        'input-bg': '#222',
      },
      fontFamily: {
        'chakra': ['Chakra Petch', 'system-ui', 'sans-serif'],
        'sans': ['Chakra Petch', 'system-ui', 'sans-serif'],
        'arabic': ['Readex Pro', 'sans-serif'],
        'english': ['Chakra Petch', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(182, 13, 13, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(182, 13, 13, 0.03) 0%, transparent 50%)',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.92) 50%, rgba(0, 0, 0, 0.95) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green': {
          50: '#f0f9f4',
          100: '#dbf1e4',
          200: '#acdfc5',
          300: '#7fcca6',
          400: '#4ab584',
          500: '#2a9c6b',
          600: '#1d7d55',
          700: '#1a6446',
          800: '#184f39',
          900: '#164231',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0a140f',
          800: '#0f1c14',
          700: '#162118',
          600: '#1e3a2a',
          500: '#2d5a3f',
          400: '#3d7a54',
          300: '#4ade80',
          200: '#86efac',
          100: '#bbf7d0',
        },
        'lime-accent': '#39ff14',
        cream: '#f0ede6',
        'cream-muted': '#b8b4aa',
        'bento': '#A6BDA6',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'leaf-drift': 'leaf-drift 6s ease-in-out infinite',
        'leaf-fall': 'leaf-fall 4s ease-in-out infinite',
      },
      keyframes: {
        'leaf-drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(8deg)' },
        },
        'leaf-fall': {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'translateY(40px) translateX(15px) rotate(20deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(90px) translateX(-10px) rotate(-10deg)', opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};

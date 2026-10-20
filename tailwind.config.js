/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7f0',
          100: '#dcecdc',
          200: '#bbd8bc',
          300: '#8fbc92',
          400: '#5e9a64',
          500: '#3d7c44',
          600: '#2c6232',
          700: '#234e28',
          800: '#1d3f22',
          900: '#17321b',
          950: '#0c1c0f',
        },
        earth: {
          50: '#faf6f0',
          100: '#f1e8d8',
          200: '#e3d0b6',
          300: '#d0b389',
          400: '#bd9561',
          500: '#a87d49',
          600: '#8d6439',
          700: '#714e30',
          800: '#5c4029',
          900: '#4b3623',
        },
        charcoal: {
          50: '#f6f6f5',
          100: '#e7e7e4',
          200: '#cfcfca',
          300: '#aaa9a2',
          400: '#7d7c74',
          500: '#5d5c54',
          600: '#474640',
          700: '#373631',
          800: '#262623',
          900: '#1a1a18',
          950: '#0e0e0c',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,16,14,0.04), 0 4px 16px rgba(16,16,14,0.06)',
        'card-hover': '0 2px 4px rgba(16,16,14,0.06), 0 12px 32px rgba(16,16,14,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slow-zoom': 'slow-zoom 12s ease-out forwards',
      },
    },
  },
  plugins: [],
};

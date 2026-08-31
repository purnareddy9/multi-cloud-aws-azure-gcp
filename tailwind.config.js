/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aws: {
          light: '#FF9900',
          DEFAULT: '#FF9900',
          dark: '#232F3E',
          accent: '#EC7211',
          bg: '#0f172a'
        },
        azure: {
          light: '#0089D6',
          DEFAULT: '#0078D4',
          dark: '#004578',
          accent: '#50E6FF',
          bg: '#0b192c'
        },
        gcp: {
          light: '#4285F4',
          DEFAULT: '#1A73E8',
          dark: '#0D47A1',
          accent: '#34A853',
          red: '#EA4335',
          yellow: '#FBBC04',
          bg: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

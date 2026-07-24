/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F0',
          100: '#FDF2E3',
          200: '#FBE5C7',
          300: '#F5D5A8',
          400: '#E8C08A',
          500: '#D4A86A',
          600: '#C29560',
          700: '#A67D4D',
          800: '#866540',
          900: '#6B4F32',
        },
        church: {
          gold: '#C2A878',
          goldLight: '#F5EDE0',
          dark: '#4A3728',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
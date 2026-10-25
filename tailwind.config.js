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
        fb: {
          blue: '#1877F2',
          'blue-hover': '#166FE5',
          'blue-light': '#E7F3FF',
          green: '#42B72A',
          red: '#FA383E',
          yellow: '#F7B125',
          'dark-bg': '#18191A',
          'dark-card': '#242526',
          'dark-hover': '#3A3B3C',
          'dark-border': '#393A3B',
          'dark-text': '#E4E6EB',
          'dark-secondary': '#B0B3B8',
          'light-bg': '#F0F2F5',
          'light-card': '#FFFFFF',
          'light-hover': '#F2F2F2',
          'light-border': '#CED0D4',
          'light-text': '#050505',
          'light-secondary': '#65676B',
        }
      },
      boxShadow: {
        'fb': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'fb-lg': '0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'fb-chat': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['Segoe UI Historic', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

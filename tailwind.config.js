/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,vue}",
    "./stories/**/*.{js,ts,vue,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--surface-color)',
          soft: 'var(--surface-soft-color)',
          strong: 'var(--surface-strong-color)',
        },
        textcolor: {
          DEFAULT: 'var(--text-color)',
          mute: 'var(--text-mute-color)',
        },
        brand: {
          DEFAULT: '#6366f1', 
          hover: '#4f46e5',
        }
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem'
      }
    },
  },
  plugins: [],
}

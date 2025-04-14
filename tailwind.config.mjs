/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'koulen': ['Koulen', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
        'sans': ['Manrope', 'sans-serif'],
        'outward': ['Outward', 'sans-serif'],
        'playfair': ['Playfair Display', 'sans-serif'],
      },
      fontDisplay: ['swap'],
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        'soft': '2px',
        'base': '4px',
        'rounded': '8px',
        'large': '16px',
        'circle': '9999px',
      },
      maxWidth: {
        '8xl': '100rem',
      },
      screens: {
        '2xsmall': '320px',
        'xsmall': '512px',
        'small': '1024px',
        'medium': '1280px',
        'large': '1440px',
        'xlarge': '1680px',
        '2xlarge': '1920px',
      },
      fontSize: {
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}

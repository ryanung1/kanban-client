/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jakarta": ["PlusJakartaSans-Bold", "sans-serif"],
        "jakarta-medium": ["PlusJakartaSans-Medium", "sans-serif"]

      },
    },
    colors: {
      black: {
        DEFAULT: "#000112"
      },
      grey: {
        "dark-background": "#20212C",
        "light-background": "#F4F7FD",
        "dark": "#2B2C37",
        "dark-lines": "#3E3F4E",
        "light-lines": "#E4EBFA",
        "medium": "#828FA3"
      },
      white: {
        DEFAULT: "#FFFFFF"
      },
      purple: {
        DEFAULT: "#635FC7",
        hover: "#A8A4FF"
      },
      red: {
        DEFAULT: "#EA5555",
        hover: "#FF9898"
      }

    }
  },
  plugins: [],

}


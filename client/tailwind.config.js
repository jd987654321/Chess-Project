/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideRightToLeft: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0%)" },
        },
        slideLeftToRight: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
      },
      colors: {},
    },
  },
  plugins: [],
};

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
        fall1: {
          "0%": {
            top: "-110px",
            transform: "rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            top: "900px",
            transform: "rotate(360deg)",
            opacity: "0.7",
          },
        },
        fall2: {
          "0%": {
            top: "-110px",
            transform: "rotate(0deg) ",
            opacity: "1",
          },
          "100%": {
            top: "900px",
            transform: "rotate(-360deg)",
            opacity: "0.3",
          },
        },
      },
      animation: {
        fall2: "fall2 5.3s linear infinite .2s",
      },
      colors: {
        background: "#EEECEC",
        nav: "#B8B8B8",
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        ".text-stroke-default": {
          "-webkit-text-stroke": "2px black",
        },
        ".text-stroke-1": {
          "-webkit-text-stroke": "0.25px black",
        },
        ".text-shadow-sm": {
          "text-shadow":
            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
        },
        ".text-shadow-md": {
          "text-shadow":
            "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black",
        },
        ".text-shadow-ssm": {
          "text-shadow":
            "-0.5px -0.5px 0 black, 0.5px -0.5px 0 black, -0.5px 0.5px 0 black, 0.5px 0.5px 0 black",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};

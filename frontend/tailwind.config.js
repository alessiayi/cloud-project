const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./dist/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ducktalk: ["Lilita One", "cursive"],
      },
      zIndex: {
        "-10": -10,
      },
      colors: {
        orange: colors.orange,
      },
      screens: {
        portrait: { raw: "(orientation: portrait)" },
      },
      minHeight: {
        "1/6": "16.666667%",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};

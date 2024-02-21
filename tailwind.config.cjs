/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: true,
  theme: {
    screens: {
      lg: { max: "1023px" },
    },
    extend: {
      width: {
        "1/2": "50%",
        "1/4": "25%",
        "3/8": "37.5%",
      },
    },
  },
  plugins: [plugin(({ addComponents }) => {})],
  corePlugins: {
    preflight: false,
  },
};

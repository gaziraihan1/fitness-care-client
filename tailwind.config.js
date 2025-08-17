const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}" // if you have another folder
],
  darkMode: 'class', 
  theme: {
    extend: {},
  },
  plugins: [],
});

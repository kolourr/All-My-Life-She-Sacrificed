/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./views/*.ejs",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}

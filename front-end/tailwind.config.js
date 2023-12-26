/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container : {
        center : true,
      },
      colors : {
        "main-color" : "#efefef",
        "main-color": "#efefef",
        "primary-color": "#1d2d3d",
        "secondary-color":"#495e74 ",
        "gray-color": "#778697",
        "dark-color": "#292b2c",
        "blue-color": "#0275d8",
        "green-color": "#27ae60",
        "green-sea-color": "#16a085",
        "pumpkin-color": "#d35400",
        "red-color": "#d9534f",
        "white-color": "#fff",
      },
    },
  },
  plugins: [],
}
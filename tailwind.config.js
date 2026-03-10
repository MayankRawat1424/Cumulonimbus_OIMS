/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        logo: ["Montserrat", "sans-serif"],
      },
      colors: {
        testcolor: "#ff5733",
      },
    },
  },
  plugins: [],
};

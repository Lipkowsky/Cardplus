/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinsSemiBold: ["Poppins-SemiBold", "sans-serif"],
        PoppinsBold: ["Poppins-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 5px 10px rgba(0, 0, 0, 0.2)", // Adjust this value for your custom shadow color
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        'bg-light': '#f4f4f4', 
        'vibrant-blue': '#007BFF',
        'vibrant-teal': '#008080',
        'text-dark': '#333333',
        'text-secondary': '#888888',
        'coral': '#FF6F61',
        'orange': '#FFA500',
        'link-default': '#007BFF',
        'link-hover': '#0056b3',
      },
    },
  }
 ,};

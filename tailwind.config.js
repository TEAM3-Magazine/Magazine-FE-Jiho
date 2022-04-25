module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        duck: "url('https://velog.velcdn.com/images/jiho3894/post/44bba13c-dbe0-4915-8f0a-400f325c5ff0/image.jpg')",
      },
    },
    screens: {
      sm: { max: "551px" },
    },
  },
  plugins: [],
  darkMode: "class",
};

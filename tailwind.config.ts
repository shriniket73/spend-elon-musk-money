module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        button: "rgb(37 99 235)",
        cardBackground: "#000000", // Black color for the card's inside
        websiteBackground: "#121212", // Off-black for the website background
      },
    },
  },
  plugins: [],
};
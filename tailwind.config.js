// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // margin: {
      //   '300px': '300px',
      // },
      colors: {
        customDark: "#17161b",
        customGray: "#474752",
        brandBlue: "#16355e",
        brandRed: "#d62e2b",
        customBlue: "#d8def6",
        focusedBlue: "#4873f5",
        customGreen: "#98c5b6",
        brandWhite: "#eeeeee",
      },
      container: {
        padding:{
          DEFAULT: "1rem",
          sm: "3rem"
        }
      },
      screens: {
        tablet: '640px',
        // => @media (min-width: 640px) { ... }
  
        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }
  
        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }

        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}


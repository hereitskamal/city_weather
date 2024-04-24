/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            black: {
                1: "#323544",
                2: "#0000001a",
                3: "#262936",
            },
            white: {
                DEFAULT: "#fff",
                1: "#bfc1c8",
            },
            blue: {
                "1": "#009ad8",
            },
        },
    },
},
  plugins: [],
}


module.exports = {
    content: [
      "./src/**/*.{tsx, jsx, ts, js, html}",
        "./**/**/*.{tsx, jsx, ts, js, html}"
        // ...
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
}
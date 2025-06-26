/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                // Add your custom colors here
                'primary': '#3490dc',
                'secondary': '#ffed4a',
                'danger': '#e3342f',
            },
        },
    },
    plugins: [],
}
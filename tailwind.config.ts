import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
        ".src/*.{js,jsx,ts,tsx}"
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            fontFamily: {
                burtons: ['Burtons']
            },
            colors: {
                // Custom dark mode colors
                dark: {
                    50: '#f8f9fa',
                    100: '#e9ecef',
                    200: '#dee2e6',
                    300: '#ced4da',
                    400: '#adb5bd',
                    500: '#6c757d',
                    600: '#495057',
                    700: '#343a40',
                    800: '#212529',
                    900: '#121417',
                }
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
};

export default config;
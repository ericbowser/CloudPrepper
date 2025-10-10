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
                },
                // Pastel theme colors
                pastel: {
                    // Primary mint & blue tones
                    mint: '#B4E7CE',
                    blue: '#A8D8EA',
                    babyblue: '#C6E2FF',
                    cyan: '#D4F1F4',

                    // Light backgrounds
                    mintlight: '#E8F5E9',
                    bluelight: '#F0F8FF',
                    aqua: '#B8E6E0',
                    mintdark: '#7DD3C0',

                    // Complementary accents
                    pink: '#FFE5E5',
                    cream: '#FFF4E6',
                    lavender: '#E8D5F2',

                    // Text colors
                    text: '#4A5568',
                    textlight: '#718096',
                    border: '#E2E8F0',
                }
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
};

export default config;
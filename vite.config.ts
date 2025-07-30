// vite.config.js
import { defineConfig } from 'vite';
import fs from "fs"; // Import the file system module

export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync('./ssl_cert/127.0.0.1+1-key.pem'), // Replace with actual path
            cert: fs.readFileSync('./ssl_cert/127.0.0.1+1.pem'), // Replace with actual path
        },
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
            ],
        },
    },
})
<<<<<<< HEAD
import { defineConfig } from 'vite'

export default defineConfig({
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
            ],
        },
    },
=======
import { defineConfig } from 'vite'
import fs from 'fs';
import https from 'https';
import path from 'path';

const httpConfig = {
    key: fs.readFileSync(path.resolve(__dirname, './ssl_cert/localhost+2-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './ssl_cert/localhost+2.pem')),
}

export default defineConfig({
    server: {
      https: httpConfig  
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
            ],
        },
    },
>>>>>>> 8f9b0da59e4ff5f491fc7f5a67bceff9102d32d6
})
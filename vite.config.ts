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
})
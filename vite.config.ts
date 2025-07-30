<<<<<<< HEAD
// vite.config.js
import { defineConfig } from 'vite';
import fs from "fs"; // Import the file system module

export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync('./ssl_cert/127.0.0.1+1-key.pem'), // Replace with actual path
            cert: fs.readFileSync('./ssl_cert/127.0.0.1+1.pem'), // Replace with actual path
        },
=======
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
>>>>>>> 4c626f45bd33ec903730cd9eefe159db1f362cb8
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
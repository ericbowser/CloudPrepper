import {defineConfig} from 'vite';
import config from './env.json';
export default defineConfig(function ({mode}: { mode: string }) {
    return ({
        build: {
            outDir: 'dist',
            sourcemap: config.NODE_ENV === 'development'
        },
        server: {
            https: {
                key: './ssl_cert/127.0.0.1+1-key.pem',
                cert: './ssl_cert/127.0.0.1+1.pem',
            },
            css: {
                postcss: {
                    plugins: [
                        require('tailwindcss'),
                    ],
                },
            },
        }
    });
});

const {defineConfig} = require('vite');
const commonjs = require("@rollup/plugin-commonjs");
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    plugins: [
        commonjs(),
        nodePolyfills()
    ],
    server: {
        https: {
         /*   key: './ssl_cert/127.0.0.1-key.pem',
            cert: './ssl_cert/127.0.0.1.pem',*/
        },
    }
});

const {defineConfig} = require('vite');
const commonjs = require("@rollup/plugin-commonjs");
const {nodePolyfills} = require('vite-plugin-node-polyfills');
const react = require('@vitejs/plugin-react');
const {HOST, PORT} = require('./env.json');

module.exports = defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    server: {
        port: PORT,
        host: HOST, 
        proxy: [nodePolyfills() ]
    },
    plugins: [
        react(),
        commonjs(),
        nodePolyfills()
    ]
});

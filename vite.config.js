import {defineConfig} from 'vite';
import commonjs from "@rollup/plugin-commonjs";
import {nodePolyfills} from 'vite-plugin-node-polyfills';

import react from '@vitejs/plugin-react';  // ← Add this import

export default defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    server: {
        port: 5436,
        host: 'localhost',
        proxy: [nodePolyfills() ]
    },
    plugins: [
        react(),
        commonjs(),
        nodePolyfills()
    ]
});

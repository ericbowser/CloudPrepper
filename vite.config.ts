import { defineConfig } from 'vite';
import commonjs from "@rollup/plugin-commonjs";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';
import { HOST, PORT } from './env.json';

export default defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    server: {
        port: PORT,
        host: HOST,
    },
    plugins: [
        react(),
        commonjs(),
        nodePolyfills()
    ]
});
import { defineConfig } from 'vite';
import commonjs from "@rollup/plugin-commonjs";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react/dist';
import { HOST, PORT } from './env.json';

export default defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    server: {
        port: PORT,
        host: HOST,
        https: {
            cert: 'ssl/server.crt',
            key: 'ssl/server.key'
        }
    },
    plugins: [
        react(),
        commonjs(),
        nodePolyfills()
    ]
});
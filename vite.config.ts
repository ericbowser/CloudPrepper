import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { config } from 'dotenv';
const {HOST, PORT} = config().parsed;

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
        tailwindcss(),
        nodePolyfills()
    ],
    optimizeDeps: {
        include: ['react', 'react-dom']
    }
});

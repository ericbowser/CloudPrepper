import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { config } from 'dotenv';

// Load environment variables
config();

// Get HOST and PORT from process.env with defaults
const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT || '36237', 10);

export default defineConfig(async () => {
    // Dynamic import for ESM-only plugin
    const { nodePolyfills } = await import('vite-plugin-node-polyfills');
    
    return {
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
            nodePolyfills({
                // Minimal configuration - only Buffer
                globals: {
                    Buffer: true,
                },
            })
        ],
        optimizeDeps: {
            include: ['react', 'react-dom', 'buffer'],
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
            },
        },
        resolve: {
            alias: {
                buffer: 'buffer',
            }
        },
        define: {
            'global': 'globalThis',
            'process.env': '{}',
        }
    };
});

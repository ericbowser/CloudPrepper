import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    build: {
        outDir: 'dist',
        sourcemap: mode === 'development',
        minify: mode === 'production' ? 'esbuild' : false,
    },
    server: mode === 'development' ? {
        https: {
            key: './ssl_cert/127.0.0.1+1-key.pem',
            cert: './ssl_cert/127.0.0.1+1.pem',
        },
    } : {},
}))
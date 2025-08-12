import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    build: {
        outDir: 'dist',
        sourcemap: mode === 'development',
        minify: mode === 'production' ? 'esbuild' : false,
    },
    server: mode === 'development' ? {
        https: {
<<<<<<< Updated upstream
            key: './ssl_cert/127.0.0.1+1-key.pem',
            cert: './ssl_cert/127.0.0.1+1.pem',
        },
    } : {},
}))
=======
/*
            key: fs.readFileSync('./ssl_cert/127.0.0.1+1-key.pem'), // Replace with actual path
            cert: fs.readFileSync('./ssl_cert/127.0.0.1+1.pem'), // Replace with actual path
*/
        },
        port: 3000,
        host: 'localhost'
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
            ],
        },
    },
})
>>>>>>> Stashed changes

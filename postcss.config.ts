import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite"; 

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [autoprefixer, tailwindcss]
};

export default config;

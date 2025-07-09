import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'

const srcPath = (...paths: string[]) => path.resolve(__dirname, 'src', ...paths);

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },

    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            shared: srcPath('shared'),
            pages: srcPath('pages'),
            widgets: srcPath('widgets'),
            features: srcPath('features'),
            entities: srcPath('entities'),
            app: srcPath('app'),
            assets: srcPath('assets'),
            components: srcPath('components'),
        },
    },

    build: {
        minify: 'esbuild',
        target: 'esnext',
        terserOptions: undefined,
        rollupOptions: {},
    },
    esbuild: {
        drop: ['console', 'debugger'],
    },
})
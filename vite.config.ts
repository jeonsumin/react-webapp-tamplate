import {defineConfig} from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import path from 'path';

const srcPath = (...paths: string[]) => path.resolve(__dirname, 'src', ...paths);


export default defineConfig({
    base: '/',
    server: {
        port: 3000
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': srcPath('app'),
            pages: srcPath('pages'),
            entities: srcPath('entities'),
            features: srcPath('features'),
            widgets: srcPath('widgets'),
            shared: srcPath('shared'),
        },
    },
    esbuild: {
        drop: ['debugger']
    },
});

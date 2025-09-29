import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

const srcPath = (...paths: string[]) => path.resolve(__dirname, 'src', ...paths);

// https://vite.dev/config/
export default defineConfig({
        server: {
            port: 3000,
        },
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                app: srcPath("app"),
                shared: srcPath('shared'),
                pages: srcPath('pages'),
                entities: srcPath('entities'),
                features: srcPath('features'),
                widgets: srcPath('widgets'),
                assets: srcPath('assets'),
                components: srcPath('components'),
            }
        },
        esbuild: {
            drop: ['console', 'debugger']
        },
    },
)

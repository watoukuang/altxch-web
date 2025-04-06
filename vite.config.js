import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    define: {
        global: 'globalThis',
    },
    plugins: [
        vue(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', // 后端服务地址
                changeOrigin: true, // 修改请求头中的 Origin
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
            },
            '/ws': {
                target: 'ws://127.0.0.1:8080',
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ws/, '')
            }
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 配置 @ 别名
        },
    },
});
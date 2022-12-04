import { loadEnv, defineConfig } from 'vite';
import path from 'path';
import { wrapperEnv } from './config/utils';
import { createVitePlugins } from './config/vite/plugins';

const resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default configEnv => {
    const viteEnv = wrapperEnv(loadEnv(configEnv.mode, process.cwd()));
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_DROP_DEBUG, VITE_LISTEN_HTTPS } = viteEnv;
    return defineConfig({
        base: VITE_PUBLIC_PATH,
        root: process.cwd(),
        plugins: createVitePlugins(configEnv, viteEnv),
        resolve: {
            alias: {
                '@src': resolve('./src'),
            },
        },
        esbuild: {
            pure: [VITE_DROP_CONSOLE && 'console.log', VITE_DROP_DEBUG && 'debugger'].filter(Boolean),
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            // 关掉 brotliSize 可略微减少打包时间
            // brotliSize: false,
            chunkSizeWarningLimit: 4000,
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖 https://rollupjs.org/guide/en/#big-list-of-options
                external: [],
                // 静态资源分类打包
                output: {
                    manualChunks: {},
                    chunkFileNames: 'js/[hash].js',
                    entryFileNames: 'js/[hash].js',
                    assetFileNames: '[ext]/[hash].[ext]',
                },
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    additionalData: `@import "${path.resolve(__dirname, 'src/styles/theme/index.less')}";`,
                },
            },
        },
        server: {
            https: VITE_LISTEN_HTTPS,
            port: VITE_PORT,
            host: true,
            // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
            proxy: {},
        },
    });
};

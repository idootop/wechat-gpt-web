import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const title = '乂乂又又';
const description = '纸上得来终觉浅，绝知此事要躬行';

export default defineConfig({
  plugins: [
    react(),
    // 分包加载
    splitVendorChunkPlugin(),
    // html 压缩 + 元数据替换
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title,
          description,
        },
      },
    }),
  ],
  envPrefix: 'k',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src/') }],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: false,
  },
  build: {
    minify: true,
    chunkSizeWarningLimit: 1024, // 1MB
  },
});

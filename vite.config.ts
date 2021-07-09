/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [vue(), eslintPlugin(), styleImport({
    libs: [{
      libraryName: 'element-plus',
      esModule: true,
      ensureStyleFile: true,
      resolveStyle: (name) => {
        name = name.slice(3);
        return `element-plus/packages/theme-chalk/src/${name}.scss`;
      },
      resolveComponent: (name) => `element-plus/lib/${name}`,
    }],
  })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'iframe.html'),
      },
    },
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});

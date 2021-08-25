/* eslint-disable import/no-extraneous-dependencies */
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport from 'vite-plugin-style-import';

const baseConfig: UserConfig = {
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },

  plugins: [vue(), vueJsx(), eslintPlugin(), styleImport({
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
  server: {
    proxy: {
      '^/api': 'http://localhost:7001',
    },
  },
};
export default baseConfig;

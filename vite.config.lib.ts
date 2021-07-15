/* eslint-disable import/no-extraneous-dependencies */
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport from 'vite-plugin-style-import';

const baseConfig: UserConfig = {
  plugins: [vue(), eslintPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/build-in/image/index.ts'),
      name: 'Image',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
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
};
export default baseConfig;

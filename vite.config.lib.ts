/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseConfig from './vite.config';

baseConfig.build = {
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
};
export default baseConfig;

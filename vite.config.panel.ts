/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseConfig from './vite.config';

baseConfig.build = {
  lib: {
    entry: resolve(__dirname, 'src/components/right-side/style/PbBackground.vue'),
    name: 'PbBackground',
  },
  cssCodeSplit: false,
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

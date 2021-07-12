/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseConfig from './vite.config';

baseConfig.build.rollupOptions.input = {
  main: resolve(__dirname, 'iframe.html'),
};
baseConfig.build.outDir = resolve(__dirname, 'iframe');
export default baseConfig;

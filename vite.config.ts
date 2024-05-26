import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

import { version } from './package.json';

import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  resolve: {
    alias: [
      {
        find: '#/assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '#/base',
        replacement: fileURLToPath(
          new URL('./src/features/base', import.meta.url),
        ),
      },
      {
        find: '#/core',
        replacement: fileURLToPath(
          new URL('./src/features/core', import.meta.url),
        ),
      },
      {
        find: '#/static',
        replacement: fileURLToPath(
          new URL('./src/features/static', import.meta.url),
        ),
      },
      {
        find: '#/wpm-test',
        replacement: fileURLToPath(
          new URL('./src/features/wpm-test', import.meta.url),
        ),
      },
    ],
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
  },
});

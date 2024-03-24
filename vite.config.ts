import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '#/assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '#/core',
        replacement: fileURLToPath(
          new URL('./src/features/core', import.meta.url),
        ),
      },
      {
        find: '#/keyboard-typing',
        replacement: fileURLToPath(
          new URL('./src/features/keyboard-typing', import.meta.url),
        ),
      },
    ],
  },
});

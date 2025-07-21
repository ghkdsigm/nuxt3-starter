// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@composables': path.resolve(__dirname, './composables'),
      '@stores': path.resolve(__dirname, './stores'),
      '@utils': path.resolve(__dirname, './utils'),
    },
  },
});

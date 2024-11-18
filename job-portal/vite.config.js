// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({

  build: {
    rollupOptions: {
      external: ['react-quill']
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Example alias configuration
      '@components': '/src/components',
    },
  },
});

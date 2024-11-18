// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'react-quill/dist/quill.snow.css', // Externalize the CSS file
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Example alias configuration
      '@components': '/src/components',
    },
  },
});

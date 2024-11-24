import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default Vite output directory
  },
  server: {
    historyApiFallback: true, // Ensures fallback for React routing during development
  },
});

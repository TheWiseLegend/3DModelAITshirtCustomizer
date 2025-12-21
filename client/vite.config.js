import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/', 'src/test/', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', 'dist/'],
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
});

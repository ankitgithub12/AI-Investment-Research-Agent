import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        timeout: 120000,       // 120s — long enough for the full LLM pipeline
        proxyTimeout: 120000,  // 120s — prevents ECONNRESET during research
      },
    },
  },
});

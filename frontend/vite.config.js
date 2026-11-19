import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/ask': 'http://localhost:3000',
      '/documents': 'http://localhost:3000',
    },
  },
});

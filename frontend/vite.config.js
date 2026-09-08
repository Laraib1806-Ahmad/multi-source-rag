import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/ask': 'http://localhost:3000',
      '/documents': 'http://localhost:3000',
    },
  },
})
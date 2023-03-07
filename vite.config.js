import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
    minify: true, // optional
    brotliSize: false, // optional
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    mimeTypes: {
      'text/javascript': ['js', 'jsx'],
    },
  },
})
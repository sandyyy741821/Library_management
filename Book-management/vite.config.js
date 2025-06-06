import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
  build: {
    outDir: 'dist',
  },
  // 👇 This handles SPA routing (very important!)
  base: '/',
  preview: {
    port: 5173,
  },
})

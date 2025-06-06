import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    // 👇 Fallback to index.html for all unknown routes
    fs: {
      strict: false,
    },
    historyApiFallback: true, // for react-router-dom to work properly
  },
})

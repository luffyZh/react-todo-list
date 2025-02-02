import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 适配 github pages
  base: '/react-todo-list/',
  build: {
    // 适配 github pages
    outDir: 'docs'
  }
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@editor': fileURLToPath(new URL('./src/components/CodeEditor', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        editor: 'src/components/CodeEditor/index.html'
      }
    }
  }
}) 
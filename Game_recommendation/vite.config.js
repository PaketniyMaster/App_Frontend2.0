import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Важно для корректной работы маршрутов на Vercel
  build: {
    outDir: 'dist', // Директория для продакшен-сборки
  },
})

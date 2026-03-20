import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: new URL('./setup.ts', import.meta.url).pathname,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})

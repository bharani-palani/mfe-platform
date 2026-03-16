import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  base: '/test/',
  plugins: [
    react(),
    federation({
      name: 'shellApp',
      filename: 'remoteEntry.js',
      exposes: {},
      remotes: {},
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  server: {
    port: 4002,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@repo/ui': '../../../packages/ui/src',
      '@repo/store': '../../../packages/store/mainStore',
    },
  },
})

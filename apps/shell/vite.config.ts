import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => ({
  base: '/test/',
  plugins: [
    react(),
    federation({
      name: 'shellApp',
      filename: 'remoteEntry.js',
      remotes: {
        ledgerelyApp:
          mode === 'production'
            ? 'https://ledgerely.com/ledgerely/assets/remoteEntry.js'
            : 'http://localhost:4000/dist/assets/remoteEntry.js',
      },
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
  test: {
    deps: {
      external: ['ledgerelyApp/Dashboard'],
    },
  },
}))

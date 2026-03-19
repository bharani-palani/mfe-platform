import baseConfig from '@repo/test-config'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'shell-app',
    },
  }),
)

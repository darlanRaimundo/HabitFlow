import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    deps: {
      optimizer: {
        web: {
          include: ['whatwg-url', 'webidl-conversions'],
        },
      },
    },
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

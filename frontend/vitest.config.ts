import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    deps: {
      inline: ['whatwg-url', 'webidl-conversions'],
    },
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: 'whatwg-url', replacement: path.resolve(__dirname, 'src/test-shims/whatwg-url-shim.ts') },
      { find: /^whatwg-url\/lib\/.+$/, replacement: path.resolve(__dirname, 'src/test-shims/whatwg-url-shim.ts') },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

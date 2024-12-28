import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import tsconfig from './tsconfig.json';

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
    key.replace('/*', ''),
    resolve(__dirname, value.replace('/*', '')),
  ]),
);

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.test.ts'],
    setupFiles: './setupTest.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/lib/**/*.ts'],
    },
    watch: true,
    reporters: ['verbose'],
  },
  resolve: { alias },
});

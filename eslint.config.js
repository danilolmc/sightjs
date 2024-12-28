import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'test/**',
      'dist/**',
      'commitlint.config.ts',
      'eslint.config.js',
      './tsup.config.js',
      'vitest.config.js',
      'vite.config.js',
    ],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

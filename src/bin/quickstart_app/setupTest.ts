import '@testing-library/jest-dom/vitest';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { beforeAll, vi } from 'vitest';

import { boostrap } from 'vistajs/boot';
import { app } from './src';

vi.mock('vistajs/boot', () => ({
  boostrap: vi.fn(),
}));

const html = readFileSync(resolve(__dirname, './index.html'), 'utf-8');

beforeAll(() => {
  document.body.innerHTML = html;

  const root = document.querySelector('#app') as Element;
  if (root) {
    boostrap(root, app);
  } else {
    throw new Error('Missing #app element in DOM');
  }
});

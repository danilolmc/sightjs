import { routeTesting } from '@/lib/router/testing/router.testing.ts';
import { Routes } from '@/lib/router';
import { describe, expect, it } from 'vitest';

describe('RouterTesting function', () => {
  it('should boostrap routes', () => {
    const routes: Routes = [
      {
        path: '',
      },
      {
        path: 'about',
      },
    ];

    const router = routeTesting(routes);

    expect(router).toBeDefined();
  });

  it('should not boostrap routes if routes list is empty', () => {
    const routes: Routes = [];

    const router = routeTesting(routes);

    expect(router).toBeNull();
  });

  it('should not boostrap routes if routes list is undefined', () => {
    const router = routeTesting(undefined);

    expect(router).toBeNull();
  });
});

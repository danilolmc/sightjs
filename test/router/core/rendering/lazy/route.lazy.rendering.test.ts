import { screen, waitFor } from '@testing-library/dom';
import { beforeAll, describe, expect, it } from 'vitest';
import { router, routeTesting } from '@/lib/router';
import { lazy } from '@/lib/utils';
import { componentRenderingCases } from '../component-cases.ts';

describe('route rendering - lazy loading', () => {
  beforeAll(() => {
    routeTesting([
      {
        path: '',
        component: () => componentRenderingCases.home,
      },
      {
        path: 'about',
        component: lazy(() => import('./lazy.component.ts')),
      },
      {
        path: '**',
        component: () => componentRenderingCases.notFound,
      },
    ]);
  });

  it('should render lazy loaded component', async () => {
    const route = router();

    route.navigateByUrl('/about');

    await waitFor(async () => {
      const parent = await screen.findByTestId('about-content');
      expect(parent).toBeInTheDocument();
    });
  });
});

import { screen } from '@testing-library/dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { HandlersFacade, router, routeTesting } from '@/lib/router';
import { componentRenderingCases } from './component-cases.ts';

describe('Router Rendering - Nested Routes', () => {
  const HandlersFacadeMock: HandlersFacade = {
    notFoundHandler: vi.fn(() => ({
      handle: vi.fn(),
    })),
    documentTitleHandler: vi.fn(() => ({
      handle: vi.fn(),
    })),
  };

  beforeAll(() => {
    routeTesting(
      [
        {
          path: 'parent',
          component: () => componentRenderingCases.parentOutlet,
          children: [
            {
              path: 'child',
              component: () => componentRenderingCases.childOutlet,
            },
          ],
        },
      ],
      {
        handlersFacade: HandlersFacadeMock,
      },
    );
  });

  it('should render child route in outlet', async () => {
    const route = router();

    route.navigateByUrl('/parent/child');

    const parent = await screen.findByTestId('child-outlet-content');
    const child = parent.querySelector('[data-testid=child-outlet-content]');

    expect(parent).toBeInTheDocument();
    expect(child).toBeDefined();
  });
});

import { screen, waitFor } from '@testing-library/dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { componentRenderingCases } from './component-cases.ts';
import {
  HandlersFacade,
  NotFoundRouteError,
  router,
  RouterEvents,
  routeTesting,
  routingEventListener,
} from '@/lib/router';

const HandlersFacadeMock: HandlersFacade = {
  notFoundHandler: vi.fn(() => ({
    handle: vi.fn(),
  })),
  documentTitleHandler: vi.fn(() => ({
    handle: vi.fn(),
  })),
};

describe('Router Rendering', () => {
  beforeAll(() => {
    routeTesting([
      {
        path: '',
        component: () => componentRenderingCases.home,
      },
      {
        path: 'about',
        component: () => componentRenderingCases.about,
        children: [
          {
            path: 'hello',
            component: () => componentRenderingCases.postAuthor,
          },
        ],
      },
      {
        path: 'post/:id',
        component: () => componentRenderingCases.post,
        children: [
          {
            path: 'author/:name',
            component: () => componentRenderingCases.postAuthor,
          },
        ],
      },
      {
        path: '**',
        component: () => componentRenderingCases.notFound,
      },
    ]);
  });

  it.each([
    { routeToNavigateFor: '', testId: 'home-content' },
    { routeToNavigateFor: '/about', testId: 'about-content' },
    { routeToNavigateFor: '/post/1', testId: 'post-content' },
    { routeToNavigateFor: '/post/1/author/John Doe', testId: 'author-content' },
  ])(
    'should navigate to $routeToNavigateFor route and render component with $testId data-testid attribute',
    async (data) => {
      const route = router();
      route.navigateByUrl(data.routeToNavigateFor);

      const about = await screen.findByTestId(data.testId);

      expect(about).toBeInTheDocument();
    },
  );

  it('should render fallback when route does not exist', async () => {
    const route = router();
    route.navigateByUrl('/inexistent-route');

    const notFound = await screen.findByTestId('notFound-content');
    expect(notFound).toBeInTheDocument();
  });

  it('should dispatch route error event when fallback for not existent route is not defined', async () => {
    const route = router();

    routingEventListener.on(RouterEvents.CHANGE_ERROR, (error) => {
      expect(error).toBeUndefined();
      expect(error).toEqual(expect.any(NotFoundRouteError));
    });

    route.navigateByUrl('/about/hello/no');
  });
});

describe('Router Rendering - Root', () => {
  beforeAll(() => {
    routeTesting(
      [
        {
          path: 'would-be-root',
          component: () => componentRenderingCases.home,
        },
      ],
      {
        handlersFacade: HandlersFacadeMock,
      },
    );
  });

  it('should handle missing root route', async () => {
    const route = router();

    vi.spyOn(HandlersFacadeMock, 'notFoundHandler');

    route.navigateByUrl('');

    expect(HandlersFacadeMock.notFoundHandler).toHaveBeenCalled();
  });
});

describe('Router Rendering - Outlet', () => {
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

    await waitFor(async () => {
      const parent = await screen.findByTestId('child-outlet-content');
      expect(parent).toBeInTheDocument();
    });
  });
});

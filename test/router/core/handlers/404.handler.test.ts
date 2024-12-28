import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  router,
  RouterEvents,
  routeTesting,
  routingEventListener,
} from '@/lib/router';
import { Component, html } from '@/lib/dom';
import { screen } from '@testing-library/dom';

const componentsCases = {
  home: Component(
    'app-home-test-a',
    () => () => html` <div data-testid="home-content">Home</div>`,
  ),
  about: Component(
    'app-home-about-test-b',
    () => () => html` <div data-testid="about-content">Home - About</div>`,
  ),
  notFound: Component(
    'app-not-found',
    () => () => html` <div data-testid="notfound-content">Page not found</div>`,
  ),
};

function routeStart() {
  routeTesting([
    {
      path: '',
      component: () => componentsCases.home,
    },
    {
      path: 'about',
      component: () => componentsCases.about,
    },
    {
      path: '**',
      component: () => componentsCases.notFound,
    },
  ]);
}

function routeStartMissingNotFound() {
  routeTesting([
    {
      path: '',
      component: () => componentsCases.home,
    },
    {
      path: 'about',
      component: () => componentsCases.about,
    },
  ]);
}

describe('Not found route handler', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render render fallback component when defined', async () => {
    routeStart();
    const route = router();

    route.navigateByUrl('/not-found');

    const home = await screen.findByTestId('notfound-content');

    expect(home).toBeInTheDocument();
  });

  it('should trigger CHANGE_ERROR route event when navigating to undeclared route but fallback is not defined', async () => {
    routeStartMissingNotFound();
    const route = router();

    routingEventListener.on(RouterEvents.CHANGE_ERROR, (error: Error) => {
      expect(error.message).toBe(
        'Cannot match any routes. URL segment: not-found',
      );
      routingEventListener.clear();
    });

    route.navigateByUrl('/not-found');
  });
});

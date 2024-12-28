import { describe, expect, it, vi } from 'vitest';
import {
  ActivatedRouteSnapshotApi,
  HandlersFacade,
  HistoryAPIAdapter,
  RouteGuard,
  Router,
  router,
  RouterEvents,
  routerEventTriggers,
  Routes,
  routingEventListener,
} from '@/lib/router';
import { Component, html } from '@/lib/dom';

const componentsCases = {
  home: Component(
    'app-home-test-a',
    () => () => html` <div data-testid="home-content">Home</div>`,
  ),
  about: Component(
    'app-home-about-test-b',
    () => () => html` <div data-testid="about-content">Home - About</div>`,
  ),
};

describe('Router Core - Matcher', () => {
  it('should invoke not found handler when pathname is greater than total declared routes', async () => {
    const routes: Routes = [
      {
        path: '',
        component: () => componentsCases.home,
      },
      {
        path: 'about',
        component: () => componentsCases.about,
      },
    ];
    const handlersFacade = new HandlersFacade();
    new Router(
      routes,
      document.body,
      routerEventTriggers,
      ActivatedRouteSnapshotApi.getInstance(),
      new HistoryAPIAdapter(),
      handlersFacade,
      new RouteGuard(),
    ).init();

    const route = router();

    vi.spyOn(handlersFacade, 'notFoundHandler');

    routingEventListener.on(RouterEvents.CHANGE_ERROR, (error: Error) => {
      expect(error.message).toBe('Cannot match any routes. URL segment: test');

      expect(handlersFacade.notFoundHandler).toHaveBeenCalled();

      routingEventListener.clear();
    });

    route.navigateByUrl('/about/test');
  });
});

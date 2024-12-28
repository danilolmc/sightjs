import { beforeAll, describe, expect, it, vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import { router, routerEventTriggers, routeTesting } from '@/lib/router';
import { Component, html } from '@/lib/dom';

describe('Router Events', () => {
  const eventsExecutionOrdering = new Set();

  const componentsCases = {
    home: Component('app-event-route-home', () => () => html`<p>Home</p>`),
  };

  beforeAll(() => {
    routeTesting([
      {
        path: '',
        component: () => componentsCases.home,
      },
      {
        path: 'about',
        component: () => componentsCases.home,
      },
    ]);
  });

  it('should dispatch route change start event when a route change gets triggered', () => {
    const route = router();

    vi.spyOn(routerEventTriggers, 'dispatchRoutingStart');

    route.navigateByUrl('/about');

    expect(routerEventTriggers.dispatchRoutingStart).toHaveBeenCalled();
  });

  it('should dispatch route loading start event when a route change gets triggered', () => {
    const route = router();

    vi.spyOn(routerEventTriggers, 'dispatchRoutingLoadingStart');

    route.navigateByUrl('/about');

    expect(routerEventTriggers.dispatchRoutingLoadingStart).toHaveBeenCalled();
  });

  it('should dispatch route loading end event when a route change gets triggered', async () => {
    const route = router();

    vi.spyOn(routerEventTriggers, 'dispatchRoutingLoadingEnd');

    route.navigateByUrl('/about');

    await waitFor(() => {
      expect(routerEventTriggers.dispatchRoutingLoadingEnd).toHaveBeenCalled();
    });
  });

  it('should dispatch route end event when a route change gets triggered', async () => {
    const route = router();

    vi.spyOn(routerEventTriggers, 'dispatchRoutingEnd');

    route.navigateByUrl('/about');

    await waitFor(() => {
      expect(routerEventTriggers.dispatchRoutingEnd).toHaveBeenCalled();
    });
  });

  it('should dispatch events in the correct order', async () => {
    const route = router();

    function saveEvent(name: string) {
      eventsExecutionOrdering.add(name);
    }

    vi.spyOn(routerEventTriggers, 'dispatchRoutingStart').mockImplementation(
      () => saveEvent(routerEventTriggers.dispatchRoutingStart.name),
    );

    vi.spyOn(
      routerEventTriggers,
      'dispatchRoutingLoadingStart',
    ).mockImplementation(() =>
      saveEvent(routerEventTriggers.dispatchRoutingLoadingStart.name),
    );
    vi.spyOn(
      routerEventTriggers,
      'dispatchRoutingLoadingEnd',
    ).mockImplementation(() =>
      saveEvent(routerEventTriggers.dispatchRoutingLoadingEnd.name),
    );

    vi.spyOn(routerEventTriggers, 'dispatchRoutingError').mockImplementation(
      () => saveEvent(routerEventTriggers.dispatchRoutingError.name),
    );

    vi.spyOn(routerEventTriggers, 'dispatchRoutingEnd').mockImplementation(() =>
      saveEvent(routerEventTriggers.dispatchRoutingEnd.name),
    );

    route.navigateByUrl('/about');

    await waitFor(() => {
      const callOrdering = Array.from(eventsExecutionOrdering);

      expect(callOrdering.at(0)).toBe(
        routerEventTriggers.dispatchRoutingStart.name,
      );
      expect(callOrdering.at(1)).toBe(
        routerEventTriggers.dispatchRoutingLoadingStart.name,
      );
      expect(callOrdering.at(2)).toBe(
        routerEventTriggers.dispatchRoutingLoadingEnd.name,
      );
      expect(callOrdering.at(3)).toBe(
        routerEventTriggers.dispatchRoutingEnd.name,
      );
    });
  });
});

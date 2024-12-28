import {
  IRouterDispatchingEvents,
  IRouterRenderer,
  Route,
  Routes,
} from '@/lib/router/types.ts';
import { NotFoundRouteError } from '@/lib/router/core/handlers/404/errors/not-found.error.ts';

export class NotFoundRouteFallbackHandler {
  constructor(
    private readonly renderer: IRouterRenderer,
    private readonly routerEvents: IRouterDispatchingEvents,
  ) {}

  async handleNotFound(routes: Routes, element: Element, segment: string) {
    const notFoundRoute = routes.find((route: Route) => route.path == '**');

    if (!notFoundRoute) {
      const error = new NotFoundRouteError(
        `Cannot match any routes. URL segment: ${segment}`,
      );

      this.routerEvents.dispatchRoutingError(error);
      this.routerEvents.dispatchRoutingLoadingEnd();
      this.routerEvents.dispatchRoutingEnd();

      this.renderer.render(element, document.createElement('div'));
      console.error(error);
      return;
    }

    this.renderer.render(element, await notFoundRoute.component());
  }
}

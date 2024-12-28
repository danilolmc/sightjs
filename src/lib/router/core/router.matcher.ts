import {
  HistoryAPI,
  IActiveRouteSnapshot,
  IRouteGuard,
  IRouteMatcher,
  IRouterDispatchingEvents,
  IRouterNavigationApi,
  Route,
  Routes,
} from '@/lib/router/types.ts';
import { HandlersFacade } from '@/lib/router/core/handlers/handlers.facade.ts';
import { RouterRenderer } from '@/lib/router/core/router.renderer.ts';

export class RouterMatcher implements IRouteMatcher {
  private routeDepth = 0;
  private segmentHistory: string[] = [];

  constructor(
    private _segmentList: IterableIterator<string>,
    private routerEvents: IRouterDispatchingEvents,
    private readonly activeRouteSnapshot: IActiveRouteSnapshot,
    private readonly handlersFacade: HandlersFacade,
    private readonly routeGuard: IRouteGuard,
    private readonly historyAdapter: HistoryAPI,
    private readonly routeNavigation: IRouterNavigationApi,
  ) {}

  private matchingRoute(
    routes: Routes,
    segmentList: IterableIterator<string>,
  ): Route | undefined {
    const routeParamRegex = /\/:([^/]+)$/;

    const currentSegment = segmentList.next();

    this.segmentHistory.push(currentSegment.value);

    const result = routes.find((route) => {
      if (routeParamRegex.test(route.path)) {
        const segmentRoute = currentSegment.value;
        const segmentedRouteParam = segmentList.next().value;

        const routeParamKey = route.path.match(routeParamRegex);
        const extractedParamKey: string = routeParamKey
          ? routeParamKey[1]
          : null;

        if (routeParamKey) {
          this.activeRouteSnapshot.setParam(route.path.split('/:')[0], {
            [extractedParamKey]: segmentedRouteParam,
          });
        }

        if (!segmentRoute || !segmentedRouteParam) return false;

        const fullRouteSegment = `${segmentRoute}/${segmentedRouteParam}`;
        const routeReplacing = route.path.replace(
          /:[^/]+$/,
          segmentedRouteParam,
        );

        return fullRouteSegment === routeReplacing;
      } else {
        return route.path === currentSegment.value;
      }
    });

    if (result?.path) {
      this.routeDepth += result.path.split('/').length;
    }

    return result;
  }

  private restorePreviousUrl() {
    this.segmentHistory.pop();
    const previousUrl = `/${this.segmentHistory.join('/')}`;
    this.historyAdapter.replaceState({}, '', previousUrl);
  }

  async matchRoute(routes: Routes, parentElement: Element) {
    const routeRenderer = new RouterRenderer();

    const matchingRoute = this.matchingRoute(routes, this._segmentList);

    if (matchingRoute?.redirectTo) {
      this.routeNavigation.navigateByUrl(`/${matchingRoute.redirectTo}`);
      return;
    }

    const canActivateRoute = this.routeGuard.handleCanActivate(matchingRoute);

    if (!canActivateRoute) {
      this.restorePreviousUrl();
      return;
    }

    if (!matchingRoute) {
      this.handlersFacade
        .notFoundHandler(routeRenderer, this.routerEvents)
        .handle(
          routes,
          parentElement,
          window.location.pathname.split('/').at(-1),
        );

      return;
    }

    const component = await matchingRoute?.component();

    const traversedRouteSegments =
      window.location.pathname.split('/').length == this.routeDepth + 1;

    routeRenderer.render(parentElement, component);

    if (traversedRouteSegments) {
      const setTitleHandler = this.handlersFacade.documentTitleHandler();
      setTitleHandler.handle(matchingRoute?.title);

      this.routerEvents.dispatchRoutingLoadingEnd();
      this.routerEvents.dispatchRoutingEnd();

      return;
    }

    if (matchingRoute.children?.length > 0) {
      setTimeout(async () => {
        const outlet = component.querySelector('n-outlet') || parentElement;
        await this.matchRoute(matchingRoute.children, outlet);
      });
    } else {
      const actualRouteSegmentsMismatch =
        window.location.pathname.split('/').length > this.routeDepth + 1;
      if (actualRouteSegmentsMismatch) {
        this.handlersFacade
          .notFoundHandler(routeRenderer, this.routerEvents)
          .handle(
            routes,
            parentElement,
            window.location.pathname.split('/').at(-1),
          );
        return;
      }
    }
  }
}

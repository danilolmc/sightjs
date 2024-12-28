import {
  HistoryAPI,
  IActiveRouteSnapshot,
  IRouteGuard,
  IRouter,
  IRouterDispatchingEvents,
  Route,
  Routes,
} from '@/lib/router/types.ts';
import { RouterRenderer } from '@/lib/router/core/router.renderer.ts';
import { HandlersFacade } from '@/lib/router/core/handlers/handlers.facade.ts';
import { RouterMatcher } from '@/lib/router/core/router.matcher.ts';
import { RouteNavigationApi } from '@/lib/router/api/navigation.ts';

export class Router implements IRouter {
  private readonly routeRenderer = new RouterRenderer();

  constructor(
    private readonly routes: Routes,
    private readonly element: Element,
    private readonly routerEvents: IRouterDispatchingEvents,
    private readonly activeRouteSnapshot: IActiveRouteSnapshot,
    private readonly historyAdapter: HistoryAPI,
    private readonly handlersFacade: HandlersFacade,
    private readonly routeGuard: IRouteGuard,
  ) {}

  init() {
    this.bindRouteChangeEvents();
    this.handleRouteChange();
  }

  private bindRouteChangeEvents() {
    this.definePopStateListener();
    this.patchPushStateDispatcher();
    this.patchReplaceStateDispatcher();
    this.defineHasChangeListener();
  }

  private async handleRootRoute() {
    const rootRoute = this.routes.find((route: Route) => route.path === '');

    if (!rootRoute) {
      const notFoundHandler = this.handlersFacade.notFoundHandler(
        this.routeRenderer,
        this.routerEvents,
      );

      notFoundHandler.handle(this.routes, this.element, '');

      return;
    }

    this.routerEvents.dispatchRoutingLoadingEnd();
    this.routerEvents.dispatchRoutingEnd();

    if (rootRoute.component) {
      this.routeRenderer.render(this.element, await rootRoute.component());
    }
  }

  async handleRouteChange() {
    this.routerEvents.dispatchRoutingStart();
    this.routerEvents.dispatchRoutingLoadingStart();

    this.activeRouteSnapshot.setQueryParams(
      Object.fromEntries(new URL(window.location.href).searchParams),
    );

    const isRootRoute = window.location.pathname === '/';

    if (isRootRoute) await this.handleRootRoute();
    else {
      const subsegments = window.location.pathname.split('/').filter(Boolean);
      const segmentList = subsegments[Symbol.iterator]();

      const matcher = new RouterMatcher(
        segmentList,
        this.routerEvents,
        this.activeRouteSnapshot,
        this.handlersFacade,
        this.routeGuard,
        this.historyAdapter,
        new RouteNavigationApi(this.historyAdapter),
      );
      await matcher.matchRoute(this.routes, this.element);
    }
  }

  private definePopStateListener() {
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
  }

  private patchPushStateDispatcher() {
    this.historyAdapter.patchPushState(() => {
      this.handleRouteChange.call(this);
    });
  }

  private patchReplaceStateDispatcher() {
    this.historyAdapter.patchReplaceState(() => {
      this.handleRouteChange.call(this);
    });
  }

  private defineHasChangeListener() {
    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
  }
}

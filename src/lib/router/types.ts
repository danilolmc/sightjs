import { HistoryAPIAdapter } from '@/lib/router/core/adapters/history.adapter.ts';
import { HandlersFacade } from '@/lib/router/core/handlers/handlers.facade.ts';

export type CanActivateFn = (route?: Route) => boolean;

export interface IRouteGuard {
  handleCanActivate: (route: Route) => boolean;
}

export type Route = {
  path: string;
  component?: () => HTMLElement | Promise<HTMLElement>;
  title?: string;
  children?: Route[];
  canActivate?: CanActivateFn[];
  redirectTo?: string;
};

export type Routes = Route[];

/**
 * Interface representing a route renderer.
 *
 * @interface IRouterRenderer
 */
export interface IRouterRenderer {
  /**
   * Renders the given component into the given parent element of a route context.
   *
   * @param {Element} parentElement - The parent element where the component will be rendered.
   * @param {Element} component - The component of the route to be rendered.
   */
  render(parentElement: Element, component: Element): void;
}

/**
 * Interface representing a route matcher.
 */
export interface IRouteMatcher {
  /**
   * Matches a route from the provided routes and renders it into the given parent element.
   *
   * @param {Routes} routes - The collection of routes to match against.
   * @param {Element} element - The parent element where the matched route's component will be rendered.
   */
  matchRoute(routes: Routes, parentElement: Element): void;
}

/**
 * Interface representing router dispatching events.
 */
export interface IRouterDispatchingEvents {
  /**
   * Dispatches an event indicating the start of a routing process.
   */
  dispatchRoutingStart: () => void;

  /**
   * Dispatches an event indicating the end of a routing process.
   */
  dispatchRoutingEnd: () => void;

  /**
   * Dispatches an event indicating an error during the routing process.
   */
  dispatchRoutingError: (error: Error) => void;

  /**
   * Dispatches an event indicating the beginning of the loading state of a routing process.
   *
   */
  dispatchRoutingLoadingStart: () => void;
  /**
   * Dispatches an event indicating the ending state of a routing process.
   *
   */
  dispatchRoutingLoadingEnd: () => void;
}

/**
 * Interface representing a router.
 */
export interface IRouter {
  /**
   * Initializes the router and sets up necessary event listeners.
   */
  init(): void;

  /**
   * Handles changes in the route, updating the view accordingly.
   */
  handleRouteChange(): void;
}

/**
 * The name of the event fired by the router when the route changes.
 * @constant
 * @type {string}
 * @default 'route-change'
 */

export interface HistoryAPI {
  pushState(state: unknown, title: string, url?: string): void;

  replaceState(state: unknown, title: string, url?: string): void;

  patchPushState(callback: () => void): void;

  patchReplaceState(callback: () => void): void;
}

export interface NavigationExtras {
  queryParams?: { [key: string]: string };
  fragment?: string;
  replaceUrl?: boolean;
  state?: unknown;
}

export interface IRouterNavigationApi {
  navigateByUrl(url: string, extras?: NavigationExtras): void;
}

export type RootParams = Record<string, Record<string, string>>;

export type RouteParams = Record<string, string>;

export type QueryParams = Record<string, string>;

export interface RouterFunction {
  snapshot: {
    root: RootParams;
    params: RouteParams;
    queryParams: QueryParams;
  };
  navigateByUrl: IRouterNavigationApi['navigateByUrl'];
}

export interface RouteTestingDependencies {
  container?: HTMLElement;
  routerEventTriggers?: IRouterDispatchingEvents;
  activatedRouteSnapshotApi?: IActiveRouteSnapshot;
  historyApiAdapter?: HistoryAPIAdapter;
  handlersFacade?: HandlersFacade;
  routeGuard?: IRouteGuard;
}

export interface IActiveRouteSnapshot {
  setParam(key: string, value: Record<string, string>): void;

  setQueryParams(queryParams: QueryParams): void;

  getQueryParams(): QueryParams;

  getCurrentRouteParam(): RouteParams;
}

export enum RouterEvents {
  CHANGE_START = 'routing-start',
  CHANGE_END = 'routing-end',
  CHANGE_ERROR = 'routing-error',
  CHANGE_LOADING_START = 'routing-loading-start',
  CHANGE_LOADING_END = 'routing-loading-end',
}

export interface IRouteHandler {
  handle: (...args: unknown[]) => void | unknown;
}

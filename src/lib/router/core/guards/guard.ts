import { CanActivateFn, IRouteGuard, Route } from '@/lib/router/types.ts';

export class RouteGuard implements IRouteGuard {
  handleCanActivate(route: Route) {
    if (!route?.canActivate || route?.canActivate?.length === 0) return true;
    return route.canActivate.every((guard: CanActivateFn) => {
      return guard(route);
    });
  }
}

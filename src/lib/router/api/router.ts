import { RouterFunction } from '@/lib/router/types.ts';
import { ActivatedRouteSnapshotApi } from '@/lib/router/api/snapshot.ts';
import { RouteNavigationApi } from '@/lib/router/api/navigation.ts';
import { HistoryAPIAdapter } from '@/lib/router/core/adapters/history.adapter.ts';

export function router(): RouterFunction {
  const activatedRouteSnapshotApi = ActivatedRouteSnapshotApi.getInstance();

  const routerNavigation = new RouteNavigationApi(new HistoryAPIAdapter());

  return {
    snapshot: {
      get root() {
        return activatedRouteSnapshotApi.getAllParams.call(
          activatedRouteSnapshotApi,
        );
      },
      get params() {
        return activatedRouteSnapshotApi.getCurrentRouteParam.call(
          activatedRouteSnapshotApi,
        );
      },
      get queryParams() {
        return activatedRouteSnapshotApi.getQueryParams.call(
          activatedRouteSnapshotApi,
        );
      },
    },
    navigateByUrl: routerNavigation.navigateByUrl.bind(routerNavigation),
  };
}

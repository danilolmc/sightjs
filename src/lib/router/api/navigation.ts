import { HistoryAPI, IRouterNavigationApi } from '@/lib/router/types.ts';

export class RouteNavigationApi implements IRouterNavigationApi {
  constructor(private historyAdapter: HistoryAPI) {}

  navigateByUrl(
    url: string,
    extras?: {
      queryParams?: { [key: string]: string };
      fragment?: string;
      replaceUrl?: boolean;
      state?: unknown;
    },
  ) {
    const queryParams = extras?.queryParams
      ? Object.entries(extras.queryParams)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          )
          .join('&')
      : '';

    const fragment = extras?.fragment
      ? `#${encodeURIComponent(extras.fragment)}`
      : '';

    const newUrl = `${url}${queryParams ? `?${queryParams}` : ''}${fragment}`;

    if (extras?.replaceUrl) {
      this.historyAdapter.replaceState(extras?.state || null, '', newUrl);
      return;
    }

    this.historyAdapter.pushState(extras?.state || null, '', newUrl);
  }
}

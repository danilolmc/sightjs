import { IActiveRouteSnapshot, RouteParams } from '@/lib/router/types.ts';

export class ActivatedRouteSnapshotApi implements IActiveRouteSnapshot {
  private _params = {};
  private _queryParams = {};
  private static instance: ActivatedRouteSnapshotApi;

  private constructor() {}

  public static getInstance(): ActivatedRouteSnapshotApi {
    if (!ActivatedRouteSnapshotApi.instance) {
      ActivatedRouteSnapshotApi.instance = new ActivatedRouteSnapshotApi();
    }
    return ActivatedRouteSnapshotApi.instance;
  }

  getAllParams(): RouteParams {
    return this._params;
  }

  setParam(key: string, value: Record<string, string>) {
    const param = Object.entries(value)[0];

    this._params[key] = {
      [param[0]]: decodeURIComponent(param[1]),
    };
  }

  getQueryParams(): RouteParams {
    return this._queryParams;
  }

  setQueryParams(queryParams: RouteParams) {
    this._queryParams = queryParams;
  }

  getCurrentRouteParam() {
    return Object.values(this._params).at(-1) as RouteParams;
  }
}

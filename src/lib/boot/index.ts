import { render } from '@/lib/dom/render.ts';
import { routerEventTriggers } from '@/lib/router/core/events/router-events.ts';
import { ActivatedRouteSnapshotApi } from '@/lib/router/api/snapshot.ts';
import { HistoryAPIAdapter } from '@/lib/router/core/adapters/history.adapter.ts';
import { HandlersFacade } from '@/lib/router/core/handlers/handlers.facade.ts';
import { RouteGuard } from '@/lib/router/core/guards/guard.ts';
import { Routes } from '@/lib/router/types';
import { Router } from '@/lib/router/core/router';

export function boostrap(
  root: Element,
  component: Element,
  providers?: { routes: Routes },
) {
  render(root, component);

  const hasRoutesDef = Boolean(providers?.routes?.length);
  if (!hasRoutesDef) return;

  new Router(
    providers.routes,
    component,
    routerEventTriggers,
    ActivatedRouteSnapshotApi.getInstance(),
    new HistoryAPIAdapter(),
    new HandlersFacade(),
    new RouteGuard(),
  ).init();
}

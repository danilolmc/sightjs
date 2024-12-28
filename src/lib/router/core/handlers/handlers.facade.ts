import {
  IRouteHandler,
  IRouterDispatchingEvents,
  IRouterRenderer,
  Routes,
} from '@/lib/router/types.ts';
import { NotFoundRouteFallbackHandler } from '@/lib/router/core/handlers/404/404.router.handler.ts';
import { DocumentTitleRouterHandler } from '@/lib/router/core/handlers/document/document-title.router.handler.ts';

export class HandlersFacade {
  notFoundHandler(
    renderer: IRouterRenderer,
    routerEvents: IRouterDispatchingEvents,
  ): IRouteHandler {
    const notFoundHandler = new NotFoundRouteFallbackHandler(
      renderer,
      routerEvents,
    );

    return {
      handle: (routes: Routes, element: Element, currentSegment: string) =>
        notFoundHandler.handleNotFound(routes, element, currentSegment),
    };
  }

  documentTitleHandler(): IRouteHandler {
    const documentTitleHandler = new DocumentTitleRouterHandler();

    return {
      handle: (routeTitle: string) =>
        documentTitleHandler.setDocumentTitle(routeTitle),
    };
  }
}

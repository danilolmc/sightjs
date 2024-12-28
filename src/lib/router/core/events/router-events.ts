import { IRouterDispatchingEvents, RouterEvents } from '@/lib/router/types.ts';

export type RouterEventCallback = <T>(data: T) => void | unknown;

class RoutingEventHandler {
  private callbacks = new Map<RouterEvents, RouterEventCallback[]>([]);

  on(event: RouterEvents, callback: RouterEventCallback) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      this.callbacks.get(event).push(callback);
      return;
    }
    this.callbacks.set(event, [callback]);
  }

  dispatch(event: RouterEvents, detail?: unknown) {
    const eventCallbacks = this.callbacks.get(event);

    if (!eventCallbacks) return;

    eventCallbacks.forEach((callback) => callback(detail));
  }

  clear() {
    this.callbacks.clear();
  }
}

const eventHandler = new RoutingEventHandler();

export const routingEventListener = {
  on: (event: RouterEvents, callback: (data: unknown) => void) => {
    eventHandler.on(event, callback);
  },
  clear: () => {
    eventHandler.clear();
  },
};

async function triggerRouteEvent(event: RouterEvents, detail?: unknown) {
  eventHandler.dispatch(event, detail);
}

export const routerEventTriggers: IRouterDispatchingEvents = {
  dispatchRoutingStart: () => triggerRouteEvent(RouterEvents.CHANGE_START),
  dispatchRoutingEnd: () => triggerRouteEvent(RouterEvents.CHANGE_END),
  dispatchRoutingError: (error: Error) =>
    triggerRouteEvent(RouterEvents.CHANGE_ERROR, error),
  dispatchRoutingLoadingStart: () =>
    triggerRouteEvent(RouterEvents.CHANGE_LOADING_START),
  dispatchRoutingLoadingEnd: () =>
    triggerRouteEvent(RouterEvents.CHANGE_LOADING_END),
};

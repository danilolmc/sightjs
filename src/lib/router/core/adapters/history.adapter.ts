import { HistoryAPI } from '@/lib/router/types.ts';

export class HistoryAPIAdapter implements HistoryAPI {
  pushState(state: unknown, title: string, url?: string): void {
    window.history.pushState(state, title, url);
  }

  replaceState(state: unknown, title: string, url?: string): void {
    window.history.replaceState(state, title, url);
  }

  patchPushState(callback: () => void) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      if (callback) {
        callback();
      }
    };
  }

  patchReplaceState(callback: () => void) {
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      if (callback) {
        callback();
      }
    };
  }
}

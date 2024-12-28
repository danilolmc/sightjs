import { HookHandler } from '@/lib/dom/component/handlers/lifecycle/hook.ts';

export class OnDestroyHandler extends HookHandler {
  constructor() {
    super();
  }

  onDestroy(callback: () => void) {
    super.add(callback);
  }
}

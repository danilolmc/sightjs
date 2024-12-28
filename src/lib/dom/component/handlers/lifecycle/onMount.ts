import { HookHandler } from '@/lib/dom/component/handlers/lifecycle/hook.ts';

export class OnMountHandler extends HookHandler {
  constructor() {
    super();
  }

  onMount(callback: () => void) {
    super.add(callback);
  }
}

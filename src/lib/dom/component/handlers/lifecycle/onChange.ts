import { HookHandler } from '@/lib/dom/component/handlers/lifecycle/hook.ts';

export class OnChangeHandler extends HookHandler {
  constructor() {
    super();
  }

  onChange(callback: () => void) {
    super.add(callback);
  }
}

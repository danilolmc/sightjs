import { Ref } from '@/lib/dom';

export class RefHandler {
  constructor(
    private component: HTMLElement,
    private readonly refContext: Map<string, Ref<unknown>>,
  ) {}

  registerRefs() {
    if (!this.component) return;

    const refElements = document.querySelectorAll('[ref]');

    refElements.forEach((element) => {
      const elementRefName = element.getAttribute('ref');
      const ref = this.refContext.get(elementRefName);

      if (ref) {
        const current = ref.current;
        if (current !== element) {
          ref.current = element;
        }
      }
    });
  }
}

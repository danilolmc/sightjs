import { ComponentClass } from '@/lib/dom/component/component.base.ts';
import { LifeCycleHooks } from '@/lib/dom';

export class PropsHandler<T> {
  constructor(
    private component: ComponentClass<T>,
    private hooks: LifeCycleHooks,
  ) {}

  getProps() {
    return Array.from(this.component.attributes).reduce(
      (acc: Record<string, string | HTMLCollection | never>, attr: Attr) => {
        acc[attr.name] = attr.value;
        return acc;
      },
      {
        children: this.component.children,
        onDestroy: this.hooks.destroyHandler.onDestroy.bind(
          this.hooks.destroyHandler,
        ),
        onMount: this.hooks.onMountHandler.onMount.bind(
          this.hooks.onMountHandler,
        ),
        onChange: this.hooks.onChangeHandler.onChange.bind(
          this.hooks.onChangeHandler,
        ),
      },
    );
  }
}

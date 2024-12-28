import { ComponentClass } from '@/lib/dom/component/component.base.ts';

import { OnDestroyHandler } from '@/lib/dom/component/handlers/lifecycle/onDestroy.ts';
import { OnMountHandler } from '@/lib/dom/component/handlers/lifecycle/onMount.ts';
import { OnChangeHandler } from '@/lib/dom/component/handlers/lifecycle/onChange.ts';

export type ComponentDef<T> = (
  props: {
    children: HTMLElement[];
    onDestroy: (callback: () => void) => void;
    onMount: (callback: () => void) => void;
    onChange: (callback: () => void) => void;
  } & T,
) => (() => HTMLElement) | Promise<() => HTMLElement>;

export type LifeCycleHooks = {
  destroyHandler: OnDestroyHandler;
  onMountHandler: OnMountHandler;
  onChangeHandler: OnChangeHandler;
};

export type Ref<T> = { current: T };

export type RefFunction<T> = {
  (): string;
  current: T;
};

export const Component = function <T>(
  tagname: string,
  componentDef: ComponentDef<T>,
) {
  const ComponentElement = class extends ComponentClass<T> {
    constructor() {
      super(componentDef);
    }
  };

  customElements.define(tagname, ComponentElement);

  return document.createElement(tagname);
};

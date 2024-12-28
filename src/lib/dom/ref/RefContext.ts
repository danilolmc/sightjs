import { Ref } from '@/lib/dom';

export class RefContext<T> {
  refContext = new Map<string, Ref<T>>();
  static instance: RefContext<unknown> = null;

  private constructor() {}

  static getInstance<T>() {
    if (!RefContext.instance) {
      RefContext.instance = new RefContext<T>();
    }
    return RefContext.instance.refContext as Map<string, Ref<T>>;
  }
}

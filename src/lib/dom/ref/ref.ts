import { RefContext } from '@/lib/dom/ref/RefContext.ts';
import { RefFunction } from '@/lib/dom';

export function ref<T>(initialValue: T, name: string) {
  const refContext = RefContext.getInstance<T>();

  if (!refContext.has(name)) {
    refContext.set(name, { current: initialValue });
  }

  function ref() {
    return name;
  }

  Object.defineProperty(ref, 'current', {
    get() {
      return refContext.get(name)!.current;
    },
    set(value: T) {
      const current = refContext.get(name)!.current;

      if (current !== value) {
        refContext.get(name)!.current = value;
      }
    },
  });

  return ref as RefFunction<T>;
}

export function clearRefs() {
  RefContext.getInstance().clear();
}

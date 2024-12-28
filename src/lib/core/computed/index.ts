import { effect } from '@/lib/core/effect';
import { ComputedCallback, ReadableSignal } from '@/lib/core/types.ts';

export function computed<T>(callback: ComputedCallback<T>): ReadableSignal<T> {
  let value: T;
  let isDirty = true;

  const computed = () => {
    if (isDirty) {
      value = callback();
    }

    return value;
  };

  effect(() => {
    isDirty = true;
    computed();
  });

  return computed;
}

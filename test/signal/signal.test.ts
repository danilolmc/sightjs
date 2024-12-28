import { signal, topologicalSortAndRun } from '@/lib/core/signal';
import { dependencyGraph } from '@/lib/core/effect';
import { describe, expect, it, vi } from 'vitest';
import { DependencyCycleError } from '@/lib/core/signal/errors/ciclic-dependency.ts';

describe('Signals', () => {
  it('should initialize with the correct value', () => {
    const sig = signal(42);
    expect(sig()).toBe(42);
  });

  it.each([2, 'hello', true, false, null, undefined, 12345n, { a: 'hello' }])(
    'should change to value: %s',
    (newValue: never) => {
      const value = signal(0);

      value.set(newValue);

      expect(value()).toBe(newValue);
    },
  );

  it('should not change if the last value and the new one are the same', () => {
    const obj = { a: 'hello' };
    const value = signal(obj);

    value.set(obj);

    expect(value()).toBe(obj);
  });

  it('should throw error when cyclic dependency has been detected', () => {
    dependencyGraph.clear();

    const effectA = vi.fn();
    const effectB = vi.fn();

    dependencyGraph.set(effectA, new Set([effectB]));
    dependencyGraph.set(effectB, new Set([effectA]));

    expect(() => topologicalSortAndRun(effectA)).toThrow(
      expect.any(DependencyCycleError),
    );
  });
});

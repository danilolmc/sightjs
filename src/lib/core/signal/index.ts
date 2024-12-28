import { DependencyCycleError } from '@/lib/core/signal/errors/ciclic-dependency.ts';
import { activeEffect, dependencyGraph } from '@/lib/core/effect';
import { Effect, WritableSignal } from '@/lib/core/types.ts';

export function topologicalSortAndRun<T>(value: T) {
  const visited = new Set();
  const temp = new Set();
  const sortedEffects = [];

  function visit(effect: Effect) {
    if (temp.has(effect)) {
      throw new DependencyCycleError();
    }
    if (!visited.has(effect)) {
      temp.add(effect);
      visited.add(effect);
      if (dependencyGraph.has(effect)) {
        dependencyGraph.get(effect).forEach(visit);
      }
      temp.delete(effect);
      sortedEffects.push(effect);
    }
  }

  const effectsToRun = dependencyGraph.get(value);
  if (effectsToRun) {
    effectsToRun.forEach((effect: Effect) => visit(effect));
    sortedEffects.forEach((effect: Effect) => Promise.resolve().then(effect));
  }
}

function addDependency(signal: never, effect: Effect) {
  if (!dependencyGraph.has(signal)) {
    dependencyGraph.set(signal, new Set());
  }
  dependencyGraph.get(signal).add(effect);
}

export function signal<T>(initialValue: T): WritableSignal<T> {
  let value = initialValue;

  function read() {
    if (activeEffect) {
      addDependency(read as never, activeEffect);
    }
    return value;
  }

  function write(newValue: T) {
    if (newValue !== value) {
      value = newValue;
      topologicalSortAndRun(read);
    }
  }

  const signalFn = () => {
    return read();
  };

  signalFn.set = write;

  return signalFn as WritableSignal<T>;
}

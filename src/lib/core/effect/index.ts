import { Effect } from '@/lib/core/types.ts';

export const dependencyGraph = new Map();
export let activeEffect = null;

export function setActiveEffect(effect: Effect) {
  activeEffect = effect;
}

function removeDependencies(effect: Effect) {
  dependencyGraph.forEach((effects) => effects.delete(effect));
}

export function effect(callback: Effect) {
  const wrappedEffect = async () => {
    removeDependencies(wrappedEffect);
    setActiveEffect(wrappedEffect);
    await callback();
    setActiveEffect(null);
  };
  wrappedEffect();
}

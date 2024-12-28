import { signal } from '@/lib/core/signal';
import { computed } from '@/lib/core/computed';
import { describe, expect, it } from 'vitest';

describe('Computed', () => {
  it('should react to signal change', () => {
    const count = signal(2);

    const triple = computed(() => count() * 3);
    expect(triple()).toBe(6);
  });

  it('should react to multiple signals change', () => {
    const base = signal(2);
    const power = signal(3);

    const exponential = computed(() => base() ** power());

    expect(exponential()).toBe(8);
  });

  it('should react to other computed change', () => {
    const count = signal(2);
    const tripleBase = computed(() => count() * 3);

    const power = signal(2);

    const exponential = computed(() => Number(tripleBase()) ** power());

    expect(exponential()).toBe(36);
  });

  it('should be readonly', () => {
    const count = signal(2);
    const double = computed(() => count() * 2);

    expect(() =>
      (double as unknown as { set: (value: number) => void }).set(5),
    ).toThrow();
    expect(double()).toBe(4);
  });

  it('should react to signal change with objects', () => {
    const name = signal('');
    const surname = signal('');

    const user = computed(() => ({
      lowerCaseName: name().toLowerCase(),
      lowerCaseSurname: surname().toLowerCase(),
    }));

    name.set('John');
    surname.set('Doe');

    expect(user().lowerCaseName).toBe('john');
    expect(user().lowerCaseSurname).toBe('doe');
  });
});

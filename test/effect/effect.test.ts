import { effect } from '@/lib/core/effect';
import { describe, expect, it, vi } from 'vitest';

describe('Effects', () => {
  it('deve executar o callback sincrono', async () => {
    const callback = vi.fn();
    effect(callback);

    expect(callback).toHaveBeenCalled();
  });

  it('deve executar o callback assíncrono', async () => {
    const callback = vi.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    effect(callback);

    expect(callback).toHaveBeenCalled();
  });
});

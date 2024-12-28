import { describe, expect, it } from 'vitest';
import { Ref, RefHandler } from '@/lib/dom';

describe('RefHandler', () => {
  it('should not register refs if theres no component', () => {
    const RefContext = new Map<string, Ref<any>>();

    const refHandler = new RefHandler(null, RefContext);

    refHandler.registerRefs();

    expect(RefContext.size).toBe(0);
  });

  it('should not set current if ref is not found', () => {
    const RefContext = new Map<string, Ref<any>>();

    const refHandler = new RefHandler(null, RefContext);

    refHandler.registerRefs();

    expect(RefContext.size).toBe(0);
  });
});
